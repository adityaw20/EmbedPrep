const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getQuestions,
  getQuestionById,
  getRelatedQuestions,
  createQuestion,
  createBulkQuestions,
  updateQuestion,
  deleteQuestion,
  permanentDeleteQuestion,
  getCategories,
  getStats
} = require('../controllers/questionController');
const { authenticate } = require('../middleware/auth');

// Validation middleware
const questionValidation = [
  body('category').notEmpty().withMessage('Category is required'),
  body('subcategory').notEmpty().withMessage('Subcategory is required'),
  body('type').isIn(['MCQ', 'DESCRIPTIVE']).withMessage('Type must be MCQ or DESCRIPTIVE'),
  body('difficulty').isIn(['Easy', 'Medium', 'Hard']).withMessage('Invalid difficulty level'),
  body('experienceLevel').isIn(['Fresher', '1-3 Years', '3-5 Years', '5+ Years', 'Automotive', 'Product Companies'])
    .withMessage('Invalid experience level'),
  body('question').notEmpty().withMessage('Question is required'),
  body('correctAnswer').notEmpty().withMessage('Correct answer is required'),
  body('explanation').notEmpty().withMessage('Explanation is required')
];

// Public routes
router.get('/stats', getStats);
router.get('/categories', getCategories);
router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.get('/:id/related', getRelatedQuestions);

// Protected routes (Admin only)
router.post('/', authenticate, questionValidation, createQuestion);
router.post('/bulk', authenticate, createBulkQuestions);
router.put('/:id', authenticate, questionValidation, updateQuestion);
router.delete('/:id', authenticate, deleteQuestion);
router.delete('/:id/permanent', authenticate, permanentDeleteQuestion);

module.exports = router;
