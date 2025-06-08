export interface Personality {
  id: string;
  name: string;
  era: string;
  style: string;
  avatarUrl: string;
  bio: string;
}

export interface Post {
  id: string;
  content: string;
  sourceUrl: string;
  createdAt: string;
  personalityId: string;
  personality: Personality;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  personalityId: string;
  personality: Personality;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
