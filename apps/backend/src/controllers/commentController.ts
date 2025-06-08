import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../index';
import { ApiError } from '../middleware/errorMiddleware';

// @desc    Get all comments
// @route   GET /api/comments
// @access  Public
export const getComments = asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.query;

  let query = {};
  if (postId) {
    query = {
      where: {
        postId: postId as string,
      },
    };
  }

  const comments = await prisma.comment.findMany({
    ...query,
    include: {
      personality: true,
      post: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.json({
    success: true,
    data: comments,
  });
});

// @desc    Get comment by ID
// @route   GET /api/comments/:id
// @access  Public
export const getCommentById = asyncHandler(async (req: Request, res: Response) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      personality: true,
      post: true,
    },
  });

  if (!comment) {
    throw new ApiError('Comment not found', 404);
  }

  res.json({
    success: true,
    data: comment,
  });
});

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Private
export const createComment = asyncHandler(async (req: Request, res: Response) => {
  const { content, postId, personalityId } = req.body;

  if (!content || !postId || !personalityId) {
    throw new ApiError('Please provide content, post ID, and personality ID', 400);
  }

  // Check if post exists
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new ApiError('Post not found', 404);
  }

  // Check if personality exists
  const personality = await prisma.personality.findUnique({
    where: {
      id: personalityId,
    },
  });

  if (!personality) {
    throw new ApiError('Personality not found', 404);
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      personalityId,
    },
    include: {
      personality: true,
      post: true,
    },
  });

  res.status(201).json({
    success: true,
    data: comment,
  });
});

// @desc    Update a comment
// @route   PUT /api/comments/:id
// @access  Private
export const updateComment = asyncHandler(async (req: Request, res: Response) => {
  const { content } = req.body;
  const comment = await prisma.comment.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!comment) {
    throw new ApiError('Comment not found', 404);
  }

  const updatedComment = await prisma.comment.update({
    where: {
      id: req.params.id,
    },
    data: {
      content: content || comment.content,
    },
    include: {
      personality: true,
      post: true,
    },
  });

  res.json({
    success: true,
    data: updatedComment,
  });
});

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private
export const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!comment) {
    throw new ApiError('Comment not found', 404);
  }

  await prisma.comment.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({
    success: true,
    message: 'Comment removed',
  });
});
