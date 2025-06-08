import { useRouter } from 'next/router';
import { usePostQuery, useCommentsByPostQuery } from '@/hooks/useQueries';
import { formatDate } from '@/utils/formatters';
import CommentList from '@/components/comments/CommentList';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Head from 'next/head';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query;
  
  // Получаем данные поста
  const { data: post, isLoading: isLoadingPost, error: postError } = usePostQuery(id as string);
  
  // Получаем комментарии к посту
  const { data: comments, isLoading: isLoadingComments } = useCommentsByPostQuery(id as string);
  
  if (isLoadingPost) {
    return <LoadingSpinner size="large" />;
  }
  
  if (postError) {
    return <ErrorMessage message="Failed to load post. Please try again later." />;
  }
  
  if (!post) {
    return <ErrorMessage message="Post not found." />;
  }
  
  return (
    <>
      <Head>
        <title>{post.personality.name}'s Post | Human Paloma</title>
        <meta name="description" content={`${post.content.substring(0, 150)}...`} />
        <meta property="og:title" content={`${post.personality.name}'s Post | Human Paloma`} />
        <meta property="og:description" content={`${post.content.substring(0, 150)}...`} />
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <div className="flex items-start mb-4">
              <Link href={`/personalities/${post.personalityId}`} className="mr-3 flex-shrink-0">
                <img
                  src={post.personality.avatarUrl}
                  alt={post.personality.name}
                  className="w-12 h-12 rounded-full"
                />
              </Link>
              
              <div>
                <Link href={`/personalities/${post.personalityId}`} className="font-bold hover:underline">
                  {post.personality.name}
                </Link>
                <p className="text-muted text-sm">{post.personality.era}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-lg whitespace-pre-wrap">{post.content}</p>
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted mt-6">
              <span>{formatDate(post.createdAt)}</span>
              
              {post.sourceUrl && (
                <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary">
                  <FaExternalLinkAlt className="mr-1" />
                  <span>Source</span>
                </a>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          <CommentList comments={comments || []} isLoading={isLoadingComments} />
        </div>
      </div>
    </>
  );
}