import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { usePersonalitiesQuery, useGeneratePostMutation } from '@/hooks/useQueries';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import { Personality } from '@/types';

export default function GeneratePostPage() {
  const router = useRouter();
  const [personalityId, setPersonalityId] = useState('');
  const [topic, setTopic] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Получаем список личностей для выбора
  const { data: personalities, isLoading: isLoadingPersonalities } = usePersonalitiesQuery();
  
  // Мутация для генерации поста
  const generatePostMutation = useGeneratePostMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!personalityId) {
      setError('Please select a personality');
      return;
    }
    
    if (!topic) {
      setError('Please enter a topic');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await generatePostMutation.mutateAsync({
        personalityId,
        topic,
        sourceUrl: sourceUrl || undefined
      });
      
      // После успешной генерации перенаправляем на страницу созданного поста
      router.push(`/posts/${result.id}`);
    } catch (err) {
      setError('Failed to generate post. Please try again.');
      console.error('Generate post error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Generate New Post | Human Paloma</title>
        <meta name="description" content="Generate a new historical perspective on a current topic" />
      </Head>
      
      <div className="container-custom py-8">
        <h1 className="text-2xl font-bold mb-6">Generate New Post</h1>
        
        {error && <ErrorMessage message={error} className="mb-4" />}
        
        <div className="bg-white rounded-lg shadow-sm border border-lighter p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="personality" className="block font-medium mb-2">
                Choose a Historical Personality
              </label>
              
              {isLoadingPersonalities ? (
                <LoadingSpinner size="small" />
              ) : (
                <select
                  id="personality"
                  value={personalityId}
                  onChange={(e) => setPersonalityId(e.target.value)}
                  className="w-full p-2 border border-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isSubmitting}
                >
                  <option value="">Select a personality...</option>
                  {personalities?.map((personality: Personality) => (
                    <option key={personality.id} value={personality.id}>
                      {personality.name} ({personality.era})
                    </option>
                  ))}
                </select>
              )}
            </div>
            
            <div className="mb-4">
              <label htmlFor="topic" className="block font-medium mb-2">
                Topic
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic or question..."
                className="w-full p-2 border border-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              />
              <p className="text-sm text-muted mt-1">
                Example: "Climate change", "Artificial intelligence", "Modern politics"
              </p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="sourceUrl" className="block font-medium mb-2">
                Source URL (Optional)
              </label>
              <input
                id="sourceUrl"
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://example.com/article"
                className="w-full p-2 border border-lighter rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              />
              <p className="text-sm text-muted mt-1">
                Link to a news article or source material (optional)
              </p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Generating...</span>
                  </>
                ) : (
                  'Generate Post'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}