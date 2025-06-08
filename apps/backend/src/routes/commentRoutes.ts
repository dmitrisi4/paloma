import express from 'express';
import { 
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
} from '../controllers/commentController';

const router = express.Router();

// @route   GET /api/comments
// @desc    Get all comments
// @access  Public
router.get('/', getComments);

// @route   GET /api/comments/:id
// @desc    Get comment by ID
// @access  Public
router.get('/:id', getCommentById);

// @route   POST /api/comments
// @desc    Create a new comment
// @access  Private
router.post('/', createComment);

// @route   PUT /api/comments/:id
// @desc    Update a comment
// @access  Private
router.put('/:id', updateComment);

// @route   DELETE /api/comments/:id
// @desc    Delete a comment
// @access  Private
router.delete('/:id', deleteComment);

export default router;
