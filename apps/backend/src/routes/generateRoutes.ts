import express from 'express';
import { generatePost, generateComment } from '../controllers/generateController';

const router = express.Router();

// @route   POST /api/generate/comment
// @desc    Generate a new comment using AI
// @access  Private
router.post('/comment', generateComment);

export default router;