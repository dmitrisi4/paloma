import { Post } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { FaComments, FaExternalLinkAlt } from 'react-icons/fa';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-lighter p-4 mb-4">
      <div className="flex items-start mb-3">
        <Link href={`/personalities/${post.personalityId}`} className="mr-3 flex-shrink-0">
          <Image
            src={post.personality.avatarUrl}
            alt={post.personality.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
        
        <div>
          <Link href={`/personalities/${post.personalityId}`} className="font-bold hover:underline">
            {post.personality.name}
          </Link>
          <p className="text-muted text-sm">{post.personality.era}</p>
        </div>
      </div>
      
      <Link href={`/posts/${post.id}`} className="block mb-3">
        <p className="text-lg">{post.content}</p>
      </Link>
      
      <div className="flex items-center justify-between text-sm text-muted mt-4">
        <div className="flex items-center space-x-4">
          <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
          <Link href={`/posts/${post.id}`} className="flex items-center hover:text-primary">
            <FaComments className="mr-1" />
            <span>{post.comments?.length || 0} comments</span>
          </Link>
        </div>
        
        {post.sourceUrl && (
          <a href={post.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary">
            <FaExternalLinkAlt className="mr-1" />
            <span>Source</span>
          </a>
        )}
      </div>
    </div>
  );
}
