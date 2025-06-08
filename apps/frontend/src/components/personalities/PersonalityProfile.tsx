import { Personality } from '@/types';
import Image from 'next/image';

interface PersonalityProfileProps {
  personality: Personality;
  isDetailed?: boolean;
}

export default function PersonalityProfile({ personality, isDetailed = false }: PersonalityProfileProps) {
  return (
    <div className={`bg-white rounded-lg ${isDetailed ? 'p-6' : 'p-4'} border border-lighter`}>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <Image
          src={personality.avatarUrl}
          alt={personality.name}
          width={isDetailed ? 128 : 80}
          height={isDetailed ? 128 : 80}
          className="rounded-full mb-4 md:mb-0 md:mr-6"
        />
        
        <div>
          <h1 className={`${isDetailed ? 'text-2xl' : 'text-xl'} font-bold mb-1`}>{personality.name}</h1>
          <p className="text-muted mb-3">{personality.era}</p>
          
          <div className="mb-4">
            <span className="inline-block bg-lighter text-muted rounded-full px-3 py-1 text-sm mr-2">
              {personality.style}
            </span>
          </div>
          
          <p className={`text-gray-700 ${isDetailed ? 'text-base' : 'text-sm'}`}>
            {personality.bio}
          </p>
        </div>
      </div>
    </div>
  );
}
