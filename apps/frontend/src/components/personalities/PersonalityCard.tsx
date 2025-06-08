import { Personality } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface PersonalityCardProps {
  personality: Personality;
}

export default function PersonalityCard({ personality }: PersonalityCardProps) {
  return (
    <Link href={`/personalities/${personality.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-lighter p-4 hover:shadow-md transition-shadow">
        <div className="flex flex-col items-center text-center">
          <Image
            src={personality.avatarUrl}
            alt={personality.name}
            width={80}
            height={80}
            className="rounded-full mb-3"
          />
          
          <h3 className="font-bold text-lg mb-1">{personality.name}</h3>
          <p className="text-muted text-sm mb-2">{personality.era}</p>
          
          <span className="inline-block bg-lighter text-muted rounded-full px-3 py-1 text-xs">
            {personality.style}
          </span>
        </div>
      </div>
    </Link>
  );
}
