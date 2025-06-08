import { useState } from 'react';
import { usePersonalitiesQuery } from '@/hooks/useQueries';
import PersonalityCard from '@/components/personalities/PersonalityCard';
import PersonalityFilters from '@/components/personalities/PersonalityFilters';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import Head from 'next/head';
import { Personality } from '@/types';

export default function PersonalitiesPage() {
  const { data: personalities, isLoading, error } = usePersonalitiesQuery();
  const [filteredPersonalities, setFilteredPersonalities] = useState<Personality[]>([]);
  
  if (isLoading) {
    return <LoadingSpinner size="large" />;
  }
  
  if (error) {
    return <ErrorMessage message="Failed to load personalities. Please try again later." />;
  }
  
  if (!personalities || personalities.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-2">No personalities found</h2>
        <p className="text-muted">There are no historical personalities in the database yet.</p>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>Historical Personalities | Human Paloma</title>
        <meta name="description" content="Explore historical personalities and their perspectives on current events" />
        <meta property="og:title" content="Historical Personalities | Human Paloma" />
        <meta property="og:description" content="Explore historical personalities and their perspectives on current events" />
      </Head>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Historical Personalities</h1>
        
        <PersonalityFilters 
          personalities={personalities} 
          onFilterChange={setFilteredPersonalities} 
        />
        
        {filteredPersonalities.length === 0 ? (
          <div className="text-center py-10">
            <h2 className="text-xl font-bold mb-2">No matching personalities</h2>
            <p className="text-muted">Try changing your filter criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPersonalities.map((personality) => (
              <PersonalityCard key={personality.id} personality={personality} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}