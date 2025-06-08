import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../index';
import { ApiError } from '../middleware/errorMiddleware';

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = asyncHandler(async (req: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: {
      personality: true,
      comments: {
        include: {
          personality: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.json({
    success: true,
    data: posts,
  });
});

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = asyncHandler(async (req: Request, res: Response) => {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      personality: true,
      comments: {
        include: {
          personality: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  if (!post) {
    throw new ApiError('Post not found', 404);
  }

  res.json({
    success: true,
    data: post,
  });
});

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req: Request, res: Response) => {
  const { content, sourceUrl, personalityId } = req.body;

  if (!content || !personalityId) {
    throw new ApiError('Please provide content and personality ID', 400);
  }

  const personality = await prisma.personality.findUnique({
    where: {
      id: personalityId,
    },
  });

  if (!personality) {
    throw new ApiError('Personality not found', 404);
  }

  const post = await prisma.post.create({
    data: {
      content,
      sourceUrl: sourceUrl || '',
      personalityId,
    },
    include: {
      personality: true,
    },
  });

  res.status(201).json({
    success: true,
    data: post,
  });
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req: Request, res: Response) => {
  const { content, sourceUrl } = req.body;
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!post) {
    throw new ApiError('Post not found', 404);
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: req.params.id,
    },
    data: {
      content: content || post.content,
      sourceUrl: sourceUrl || post.sourceUrl,
    },
    include: {
      personality: true,
    },
  });

  res.json({
    success: true,
    data: updatedPost,
  });
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req: Request, res: Response) => {
  const post = await prisma.post.findUnique({
    where: {
      id: req.params.id,
    },
  });

  if (!post) {
    throw new ApiError('Post not found', 404);
  }

  // First delete all comments associated with this post
  await prisma.comment.deleteMany({
    where: {
      postId: req.params.id,
    },
  });

  // Then delete the post
  await prisma.post.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({
    success: true,
    message: 'Post removed',
  });
});
