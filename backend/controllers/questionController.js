const Question = require('../models/Question');

// @desc    Get all questions with filtering, pagination, and search
// @route   GET /api/questions
// @access  Public
exports.getQuestions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      subcategory,
      difficulty,
      experienceLevel,
      type,
      search,
      tags,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (difficulty) filter.difficulty = difficulty;
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (type) filter.type = type;
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      filter.tags = { $in: tagArray };
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Build sort object
    const sortOptions = {};
    if (search) {
      // If searching, sort by relevance first
      sortOptions.score = { $meta: 'textScore' };
    }
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    // Calculate pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    let query = Question.find(filter);
    
    if (search) {
      query = query.select({ score: { $meta: 'textScore' } });
    }

    const questions = await query
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination
    const total = await Question.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: questions,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum,
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching questions',
      error: error.message
    });
  }
};

// @desc    Get single question by ID
// @route   GET /api/questions/:id
// @access  Public
exports.getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Increment view count asynchronously (don't wait for it)
    question.incrementViewCount().catch(console.error);

    res.status(200).json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching question',
      error: error.message
    });
  }
};

// @desc    Get related questions
// @route   GET /api/questions/:id/related
// @access  Public
exports.getRelatedQuestions = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    const relatedQuestions = await Question.find({
      _id: { $ne: question._id },
      category: question.category,
      isActive: true
    })
      .limit(5)
      .select('question category difficulty type')
      .lean();

    res.status(200).json({
      success: true,
      data: relatedQuestions
    });
  } catch (error) {
    console.error('Error fetching related questions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching related questions',
      error: error.message
    });
  }
};

// @desc    Create new question
// @route   POST /api/questions
// @access  Private (Admin)
exports.createQuestion = async (req, res) => {
  try {
    const questionData = req.body;

    // Validate MCQ has options
    if (questionData.type === 'MCQ' && (!questionData.options || questionData.options.length < 2)) {
      return res.status(400).json({
        success: false,
        message: 'MCQ questions must have at least 2 options'
      });
    }

    const question = await Question.create(questionData);

    res.status(201).json({
      success: true,
      data: question,
      message: 'Question created successfully'
    });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating question',
      error: error.message
    });
  }
};

// @desc    Create multiple questions (bulk)
// @route   POST /api/questions/bulk
// @access  Private (Admin)
exports.createBulkQuestions = async (req, res) => {
  try {
    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of questions'
      });
    }

    // Validate each question
    const validQuestions = [];
    const errors = [];

    questions.forEach((q, index) => {
      if (q.type === 'MCQ' && (!q.options || q.options.length < 2)) {
        errors.push(`Question at index ${index}: MCQ must have at least 2 options`);
      } else {
        validQuestions.push(q);
      }
    });

    if (errors.length > 0 && validQuestions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors
      });
    }

    const createdQuestions = await Question.insertMany(validQuestions, {
      ordered: false // Continue on error
    });

    res.status(201).json({
      success: true,
      data: createdQuestions,
      count: createdQuestions.length,
      errors: errors.length > 0 ? errors : undefined,
      message: `Successfully created ${createdQuestions.length} questions`
    });
  } catch (error) {
    console.error('Error creating bulk questions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating bulk questions',
      error: error.message
    });
  }
};

// @desc    Update question
// @route   PUT /api/questions/:id
// @access  Private (Admin)
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Validate MCQ has options if type is being changed to MCQ
    if (req.body.type === 'MCQ' && req.body.options && req.body.options.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'MCQ questions must have at least 2 options'
      });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedQuestion,
      message: 'Question updated successfully'
    });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating question',
      error: error.message
    });
  }
};

// @desc    Delete question (soft delete)
// @route   DELETE /api/questions/:id
// @access  Private (Admin)
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    // Soft delete
    question.isActive = false;
    await question.save();

    res.status(200).json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting question',
      error: error.message
    });
  }
};

// @desc    Hard delete question (permanent)
// @route   DELETE /api/questions/:id/permanent
// @access  Private (Admin)
exports.permanentDeleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }

    await Question.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Question permanently deleted'
    });
  } catch (error) {
    console.error('Error permanently deleting question:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting question',
      error: error.message
    });
  }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const categories = await Question.distinct('category', { isActive: true });
    
    // Get subcategories for each category
    const categoriesWithSubs = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await Question.distinct('subcategory', { 
          category, 
          isActive: true 
        });
        return {
          name: category,
          subcategories
        };
      })
    );

    res.status(200).json({
      success: true,
      data: categoriesWithSubs
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories',
      error: error.message
    });
  }
};

// @desc    Get statistics
// @route   GET /api/stats
// @access  Public
exports.getStats = async (req, res) => {
  try {
    const totalQuestions = await Question.countDocuments({ isActive: true });
    
    const statsByCategory = await Question.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const statsByDifficulty = await Question.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 }
        }
      }
    ]);

    const statsByExperience = await Question.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$experienceLevel',
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalQuestions,
        byCategory: statsByCategory,
        byDifficulty: statsByDifficulty,
        byExperience: statsByExperience
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: error.message
    });
  }
};
