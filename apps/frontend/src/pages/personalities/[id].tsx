import { useRouter } from 'next/router';
import { usePersonalityQuery } from '@/hooks/useQueries';
import PersonalityProfile from '@/components/personalities/PersonalityProfile';
import PersonalityPosts from '@/components/posts/PersonalityPosts';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Head from 'next/head';
import Link from 'next/link';

export default function PersonalityPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const { data: personality, isLoading, error } = usePersonalityQuery(id as string);
  
  if (isLoading) {
    return <LoadingSpinner size="large" />;
  }
  
  if (error) {
    return <ErrorMessage message="Failed to load personality. Please try again later." />;
  }
  
  if (!personality) {
    return <ErrorMessage message="Personality not found." />;
  }
  
  return (
    <>
      <Head>
        <title>{personality.name} | Human Paloma</title>
        <meta name="description" content={`Learn about ${personality.name}, ${personality.era} ${personality.style} personality`} />
        <meta property="og:title" content={`${personality.name} | Human Paloma`} />
        <meta property="og:description" content={`Learn about ${personality.name}, ${personality.era} ${personality.style} personality`} />
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/personalities" className="text-blue-600 hover:text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Personalities
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <PersonalityProfile personality={personality} isDetailed={true} />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 mt-8">
          <h2 className="text-2xl font-bold mb-6">Posts by {personality.name}</h2>
          <PersonalityPosts personalityId={personality.id} />
        </div>
      </div>
    </>
  );
}