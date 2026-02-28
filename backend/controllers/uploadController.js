const csv = require('csv-parser');
const fs = require('fs');
const Question = require('../models/Question');

// @desc    Upload questions from CSV
// @route   POST /api/upload/csv
// @access  Private (Admin)
exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a CSV file'
      });
    }

    const results = [];
    const errors = [];
    const filePath = req.file.path;

    // Parse CSV file
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        // Clean up uploaded file
        fs.unlinkSync(filePath);

        // Transform and validate data
        const questions = [];
        
        results.forEach((row, index) => {
          try {
            // Parse options if it's a string
            let options = [];
            if (row.options) {
              try {
                options = JSON.parse(row.options);
              } catch {
                // Try comma-separated format
                options = row.options.split(',').map((opt, i) => ({
                  id: String.fromCharCode(97 + i), // a, b, c, d...
                  text: opt.trim()
                }));
              }
            }

            // Parse tags
            let tags = [];
            if (row.tags) {
              tags = row.tags.split(',').map(tag => tag.trim());
            }

            const question = {
              category: row.category,
              subcategory: row.subcategory,
              type: row.type || 'MCQ',
              difficulty: row.difficulty,
              experienceLevel: row.experienceLevel,
              question: row.question,
              codeSnippet: row.codeSnippet || null,
              options: options,
              correctAnswer: row.correctAnswer,
              explanation: row.explanation,
              tags: tags,
              source: row.source || 'CSV Upload'
            };

            // Validate
            if (question.type === 'MCQ' && options.length < 2) {
              errors.push(`Row ${index + 2}: MCQ must have at least 2 options`);
            } else {
              questions.push(question);
            }
          } catch (err) {
            errors.push(`Row ${index + 2}: ${err.message}`);
          }
        });

        if (questions.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'No valid questions found in CSV',
            errors
          });
        }

        // Insert questions
        try {
          const created = await Question.insertMany(questions, { ordered: false });
          
          res.status(201).json({
            success: true,
            message: `Successfully uploaded ${created.length} questions`,
            count: created.length,
            errors: errors.length > 0 ? errors : undefined
          });
        } catch (insertError) {
          res.status(500).json({
            success: false,
            message: 'Error inserting questions',
            error: insertError.message,
            errors
          });
        }
      })
      .on('error', (error) => {
        // Clean up on error
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        
        res.status(500).json({
          success: false,
          message: 'Error parsing CSV file',
          error: error.message
        });
      });

  } catch (error) {
    console.error('CSV upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during CSV upload',
      error: error.message
    });
  }
};

// @desc    Upload questions from JSON
// @route   POST /api/upload/json
// @access  Private (Admin)
exports.uploadJSON = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a JSON file'
      });
    }

    const filePath = req.file.path;
    let questions;

    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      questions = JSON.parse(fileContent);
    } catch (error) {
      fs.unlinkSync(filePath);
      return res.status(400).json({
        success: false,
        message: 'Invalid JSON file',
        error: error.message
      });
    }

    // Clean up file
    fs.unlinkSync(filePath);

    // Ensure questions is an array
    if (!Array.isArray(questions)) {
      if (questions.questions && Array.isArray(questions.questions)) {
        questions = questions.questions;
      } else {
        return res.status(400).json({
          success: false,
          message: 'JSON must contain an array of questions or an object with a "questions" property'
        });
      }
    }

    // Validate and filter questions
    const validQuestions = [];
    const errors = [];

    questions.forEach((q, index) => {
      if (q.type === 'MCQ' && (!q.options || q.options.length < 2)) {
        errors.push(`Question ${index + 1}: MCQ must have at least 2 options`);
      } else {
        validQuestions.push(q);
      }
    });

    if (validQuestions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid questions found in JSON',
        errors
      });
    }

    // Insert questions
    const created = await Question.insertMany(validQuestions, { ordered: false });

    res.status(201).json({
      success: true,
      message: `Successfully uploaded ${created.length} questions`,
      count: created.length,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('JSON upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during JSON upload',
      error: error.message
    });
  }
};

// @desc    Get CSV template
// @route   GET /api/upload/template/csv
// @access  Private (Admin)
exports.getCSVTemplate = async (req, res) => {
  try {
    const template = `category,subcategory,type,difficulty,experienceLevel,question,codeSnippet,options,correctAnswer,explanation,tags,source
C Programming,Variables and Data Types,MCQ,Easy,Fresher,"What is the size of int in C?","","[{ ""id"": ""a"", ""text"": ""2 bytes""},{""id"": ""b"", ""text"": ""4 bytes""}]","b","The size of int is typically 4 bytes on most modern systems.","C,Basic,Variables",EmbedPrep
C Programming,Pointers,MCQ,Medium,1-3 Years,"What does the following code print?","int x = 10; int *p = &x; printf(""%d"", *p);","[{ ""id"": ""a"", ""text"": ""Address of x""},{""id"": ""b"", ""text"": ""10""},{""id"": ""c"", ""text"": ""Garbage value""}]","b","The * operator dereferences the pointer, giving the value at the address.","C,Pointers,Dereference",EmbedPrep`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=embedprep_template.csv');
    res.send(template);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get JSON template
// @route   GET /api/upload/template/json
// @access  Private (Admin)
exports.getJSONTemplate = async (req, res) => {
  try {
    const template = {
      questions: [
        {
          category: "C Programming",
          subcategory: "Variables and Data Types",
          type: "MCQ",
          difficulty: "Easy",
          experienceLevel: "Fresher",
          question: "What is the size of int in C?",
          options: [
            { id: "a", text: "2 bytes" },
            { id: "b", text: "4 bytes" },
            { id: "c", text: "8 bytes" }
          ],
          correctAnswer: "b",
          explanation: "The size of int is typically 4 bytes on most modern 32-bit and 64-bit systems.",
          tags: ["C", "Basic", "Variables"],
          source: "EmbedPrep"
        },
        {
          category: "Embedded Systems",
          subcategory: "Interrupts",
          type: "DESCRIPTIVE",
          difficulty: "Hard",
          experienceLevel: "3-5 Years",
          question: "Explain the difference between polling and interrupt-driven I/O.",
          correctAnswer: "Polling continuously checks device status consuming CPU cycles, while interrupts allow the CPU to perform other tasks until the device signals it's ready.",
          explanation: "Interrupts are more efficient for event-driven systems as they eliminate busy-waiting and allow better CPU utilization.",
          tags: ["Embedded", "Interrupts", "I/O"],
          source: "EmbedPrep"
        }
      ]
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=embedprep_template.json');
    res.json(template);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
