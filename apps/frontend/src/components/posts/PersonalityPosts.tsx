import { usePostsByPersonalityQuery } from '@/hooks/useQueries';
import PostCard from './PostCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

interface PersonalityPostsProps {
  personalityId: string;
}

export default function PersonalityPosts({ personalityId }: PersonalityPostsProps) {
  const { data: posts, isLoading, error } = usePostsByPersonalityQuery(personalityId);
  
  if (isLoading) {
    return <LoadingSpinner size="small" />;
  }
  
  if (error) {
    return <ErrorMessage message="Failed to load posts. Please try again later." />;
  }
  
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-muted">No posts from this personality yet.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}