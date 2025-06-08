import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../index';
import { ApiError } from '../middleware/errorMiddleware';

// @desc    Get all personalities
// @route   GET /api/personalities
// @access  Public
export const getPersonalities = asyncHandler(async (req: Request, res: Response) => {
  const personalities = await prisma.personality.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  res.json({
    success: true,
    data: personalities,
  });
});

// @desc    Get personality by ID
// @route   GET /api/personalities/:id
// @access  Public
export const getPersonalityById = asyncHandler(async (req: Request, res: Response) => {
  const personality = await prisma.personality.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      posts: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!personality) {
    throw new ApiError('Personality not found', 404);
  }

  res.json({
    success: true,
    data: personality,
  });
});

// @desc    Create a new personality
// @route   POST /api/personalities
// @access  Private
export const createPersonality = asyncHandler(async (req: Request, res: Response) => {
  const { name, era, style, avatarUrl, bio } = req.body;

  if (!name || !era || !style || !bio) {
    throw new ApiError('Please provide all required fields', 400);
  }

  const personality = await prisma.personality.create({
    data: {
      name,
      era,
      style,
      avatarUrl: avatarUrl || '',
      bio,
    },
  });

  res.status(201).json({
    success: true,
    data: personality,
  });
});

// @desc    Update a personality
// @route   PUT /api/personalities/:id
// @access  Private
export const updatePersonality = asyncHandler(async (req: Request, res: Response) => {
  const { name, era, style, avatarUrl, bio } = req.body;
  const personality = await prisma.personality.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!personality) {
    throw new ApiError('Personality not found', 404);
  }

  const updatedPersonality = await prisma.personality.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: name || personality.name,
      era: era || personality.era,
      style: style || personality.style,
      avatarUrl: avatarUrl || personality.avatarUrl,
      bio: bio || personality.bio,
    },
  });

  res.json({
    success: true,
    data: updatedPersonality,
  });
});

// @desc    Delete a personality
// @route   DELETE /api/personalities/:id
// @access  Private
export const deletePersonality = asyncHandler(async (req: Request, res: Response) => {
  const personality = await prisma.personality.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      posts: true,
      comments: true
    }
  });

  if (!personality) {
    throw new ApiError('Personality not found', 404);
  }

  // First delete all comments made by this personality
  await prisma.comment.deleteMany({
    where: {
      personalityId: req.params.id,
    },
  });

  // Then delete all comments on posts made by this personality
  for (const post of personality.posts) {
    await prisma.comment.deleteMany({
      where: {
        postId: post.id,
      },
    });
  }

  // Then delete all posts by this personality
  await prisma.post.deleteMany({
    where: {
      personalityId: req.params.id,
    },
  });

  // Finally delete the personality
  await prisma.personality.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({
    success: true,
    message: 'Personality removed',
  });
});

