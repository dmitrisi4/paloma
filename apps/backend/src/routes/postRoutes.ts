import express from 'express';
import { 
  getPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost 
} from '../controllers/postController';

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getPosts);

// @route   GET /api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', getPostById);

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post('/', createPost);

// @route   PUT /api/posts/:id
// @desc    Update a post
// @access  Private
router.put('/:id', updatePost);

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private
router.delete('/:id', deletePost);

export default router;
