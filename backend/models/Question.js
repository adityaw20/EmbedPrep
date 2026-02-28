const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'C Programming',
      'C++ Programming',
      'Communication Protocols',
      'Embedded Systems',
      'RTOS',
      'Microcontrollers',
      'IoT',
      'PCB & Hardware Design',
      'Interview Questions'
    ],
    index: true
  },
  subcategory: {
    type: String,
    required: [true, 'Subcategory is required'],
    index: true
  },
  type: {
    type: String,
    required: [true, 'Question type is required'],
    enum: ['MCQ', 'DESCRIPTIVE'],
    default: 'MCQ'
  },
  difficulty: {
    type: String,
    required: [true, 'Difficulty level is required'],
    enum: ['Easy', 'Medium', 'Hard'],
    index: true
  },
  experienceLevel: {
    type: String,
    required: [true, 'Experience level is required'],
    enum: ['Fresher', '1-3 Years', '3-5 Years', '5+ Years', 'Automotive', 'Product Companies'],
    index: true
  },
  question: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
    maxlength: [2000, 'Question cannot exceed 2000 characters']
  },
  codeSnippet: {
    type: String,
    default: null
  },
  options: {
    type: [{
      id: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true,
        trim: true
      }
    }],
    validate: {
      validator: function(v) {
        // Only validate options for MCQ type
        if (this.type === 'MCQ') {
          return v && v.length >= 2 && v.length <= 6;
        }
        return true;
      },
      message: 'MCQ questions must have between 2 and 6 options'
    },
    default: []
  },
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required'],
    trim: true
  },
  explanation: {
    type: String,
    required: [true, 'Explanation is required'],
    trim: true,
    maxlength: [5000, 'Explanation cannot exceed 5000 characters']
  },
  tags: {
    type: [String],
    default: [],
    index: true
  },
  source: {
    type: String,
    default: 'EmbedPrep'
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  viewCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Compound indexes for common query patterns
questionSchema.index({ category: 1, difficulty: 1 });
questionSchema.index({ category: 1, experienceLevel: 1 });
questionSchema.index({ category: 1, subcategory: 1 });
questionSchema.index({ difficulty: 1, experienceLevel: 1 });
questionSchema.index({ tags: 1 });
questionSchema.index({ question: 'text', explanation: 'text', tags: 'text' });

// Update the updatedAt field before saving
questionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Static method to get distinct subcategories
questionSchema.statics.getSubcategories = async function(category) {
  const query = category ? { category } : {};
  return await this.distinct('subcategory', query);
};

// Static method to get statistics
questionSchema.statics.getStats = async function() {
  return await this.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        byDifficulty: {
          $push: {
            k: '$difficulty',
            v: '$$ROOT._id'
          }
        }
      }
    },
    {
      $project: {
        category: '$_id',
        count: 1,
        _id: 0
      }
    }
  ]);
};

// Instance method to increment view count
questionSchema.methods.incrementViewCount = async function() {
  this.viewCount += 1;
  return await this.save();
};

module.exports = mongoose.model('Question', questionSchema);
