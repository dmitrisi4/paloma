import { Comment } from '@/types';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  isLoading?: boolean;
}

export default function CommentList({ comments, isLoading = false }: CommentListProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 my-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-lighter rounded-lg p-4">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-light rounded-full mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-light rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-light rounded w-1/4 mb-4"></div>
                <div className="h-4 bg-light rounded w-full mb-1"></div>
                <div className="h-4 bg-light rounded w-11/12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-6 text-muted">
        <p>No comments yet</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4 my-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
