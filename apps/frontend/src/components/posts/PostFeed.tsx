import { usePostsQuery } from '@/hooks/useQueries';
import PostCard from './PostCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

export default function PostFeed() {
  const { data: posts, isLoading, error } = usePostsQuery();
  
  if (isLoading) {
    return <LoadingSpinner size="large" />;
  }
  
  if (error) {
    return <ErrorMessage message="Failed to load posts. Please try again later." />;
  }
  
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-2">No posts yet</h2>
        <p className="text-muted">Check back later for historical perspectives on current news.</p>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Historical Timeline</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
