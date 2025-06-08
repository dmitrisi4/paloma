import express from 'express';
import { 
  getPersonalities,
  getPersonalityById,
  createPersonality,
  updatePersonality,
  deletePersonality
} from '../controllers/personalityController';

const router = express.Router();

// @route   GET /api/personalities
// @desc    Get all personalities
// @access  Public
router.get('/', getPersonalities);

// @route   GET /api/personalities/:id
// @desc    Get personality by ID
// @access  Public
router.get('/:id', getPersonalityById);

// @route   POST /api/personalities
// @desc    Create a new personality
// @access  Private
router.post('/', createPersonality);

// @route   PUT /api/personalities/:id
// @desc    Update a personality
// @access  Private
router.put('/:id', updatePersonality);

// @route   DELETE /api/personalities/:id
// @desc    Delete a personality
// @access  Private
router.delete('/:id', deletePersonality);

export default router;
