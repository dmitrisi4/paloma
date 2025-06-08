import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getPosts, 
  getPost, 
  getPersonalities, 
  getPersonality, 
  getCommentsByPost,
  getPostsByPersonality,
  generatePost,
  GeneratePostParams
} from '@/services/api';

// Хуки для постов
export const usePostsQuery = () => {
  return useQuery(['posts'], getPosts, {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const usePostQuery = (id: string) => {
  return useQuery(['post', id], () => getPost(id), {
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });
};

export const usePostsByPersonalityQuery = (personalityId: string) => {
  return useQuery(
    ['posts', 'personality', personalityId], 
    () => getPostsByPersonality(personalityId), 
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: !!personalityId,
    }
  );
};

// Хуки для личностей
export const usePersonalitiesQuery = () => {
  return useQuery(['personalities'], getPersonalities, {
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const usePersonalityQuery = (id: string) => {
  return useQuery(['personality', id], () => getPersonality(id), {
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!id,
  });
};

// Хуки для комментариев
export const useCommentsByPostQuery = (postId: string) => {
  return useQuery(
    ['comments', 'post', postId], 
    () => getCommentsByPost(postId), 
    {
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: !!postId,
    }
  );
};

// Мутации
export const useGeneratePostMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    (params: GeneratePostParams) => generatePost(params),
    {
      onSuccess: () => {
        // Инвалидируем кэш постов, чтобы обновить список после успешной генерации
        queryClient.invalidateQueries(['posts']);
      },
    }
  );
};
