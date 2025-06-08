import axios from 'axios';
import { ApiResponse, Comment, Personality, Post } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Посты
export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<ApiResponse<Post[]>>('/api/posts');
  return response.data.data;
};

export const getPost = async (id: string): Promise<Post> => {
  const response = await api.get<ApiResponse<Post>>(`/api/posts/${id}`);
  return response.data.data;
};

export const getPostsByPersonality = async (personalityId: string): Promise<Post[]> => {
  const response = await api.get<ApiResponse<Post[]>>(`/api/posts/personality/${personalityId}`);
  return response.data.data;
};

// Личности
export const getPersonalities = async (): Promise<Personality[]> => {
  const response = await api.get<ApiResponse<Personality[]>>('/api/personalities');
  return response.data.data;
};

export const getPersonality = async (id: string): Promise<Personality> => {
  const response = await api.get<ApiResponse<Personality>>(`/api/personalities/${id}`);
  return response.data.data;
};

// Комментарии
export const getCommentsByPost = async (postId: string): Promise<Comment[]> => {
  const response = await api.get<ApiResponse<Comment[]>>(`/api/comments?postId=${postId}`);
  return response.data.data;
};

// Генерация контента
export interface GeneratePostParams {
  personalityId: string;
  topic?: string;
  sourceUrl?: string;
}

export const generatePost = async (params: GeneratePostParams): Promise<Post> => {
  const response = await api.post<ApiResponse<Post>>('/generate/post', params);
  return response.data.data;
};

export default api;
