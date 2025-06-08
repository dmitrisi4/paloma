import { Comment } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="bg-white rounded-lg border border-lighter p-4">
      <div className="flex items-start">
        <Link href={`/personalities/${comment.personality.id}`} className="mr-3 flex-shrink-0">
          <Image
            src={comment.personality.avatarUrl}
            alt={comment.personality.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
        
        <div className="flex-1">
          <div className="flex items-baseline">
            <Link href={`/personalities/${comment.personality.id}`} className="font-bold hover:underline mr-2">
              {comment.personality.name}
            </Link>
            <span className="text-xs text-muted">
              {format(new Date(comment.createdAt), 'MMM d, yyyy • h:mm a')}
            </span>
          </div>
          
          <p className="mt-1">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}
