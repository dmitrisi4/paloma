import Head from 'next/head';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Human Paloma | Historical Perspectives on Current Events</title>
        <meta name="description" content="Learn about the Human Paloma project, which brings historical perspectives to current events" />
        <meta property="og:title" content="About Human Paloma" />
        <meta property="og:description" content="Learn about the Human Paloma project, which brings historical perspectives to current events" />
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">About Human Paloma</h1>
        
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Project Concept</h2>
          <p className="mb-4">
            Human Paloma is a unique platform that brings historical perspectives to current events. 
            We use artificial intelligence to simulate how historical personalities might comment on 
            today's news, creating an educational and thought-provoking experience.
          </p>
          <p className="mb-4">
            By connecting the past with the present, we aim to provide fresh insights into contemporary 
            issues and help users see current events through the lens of historical wisdom and experience.
          </p>
          <p>
            Each historical personality in our database has a distinct style and perspective based on 
            their era, achievements, and known philosophies. This creates a diverse range of viewpoints 
            on modern news stories.
          </p>
        </section>
        
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Technologies</h2>
          <p className="mb-4">Human Paloma is built using a modern tech stack:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Frontend</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Next.js for server-side rendering and routing</li>
                <li>React for component-based UI</li>
                <li>TailwindCSS for styling</li>
                <li>React Query for data fetching and caching</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Backend</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Node.js with Express for the API</li>
                <li>Prisma ORM for database interactions</li>
                <li>AI-powered content generation</li>
                <li>RSS feed integration for news sources</li>
              </ul>
            </div>
          </div>
        </section>
        
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">How are the historical personalities selected?</h3>
              <p>
                We've curated a diverse range of influential figures from different eras, cultures, and fields. 
                Our selection aims to represent various perspectives and areas of expertise, from philosophers 
                and scientists to artists and political leaders.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">How accurate are the simulated perspectives?</h3>
              <p>
                While we strive for historical accuracy based on known writings, speeches, and philosophies 
                of each personality, the generated content is ultimately a simulation. It represents a 
                plausible interpretation of how these figures might respond to modern events, but should 
                not be considered historically definitive.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">How often is new content generated?</h3>
              <p>
                New posts are generated regularly based on current news stories. The system automatically 
                selects news items and matches them with appropriate historical personalities to create 
                fresh perspectives.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I suggest a historical personality to add?</h3>
              <p>
                We're always looking to expand our database of historical figures. While we don't currently 
                have a formal submission process, you can contact us with suggestions for personalities 
                you'd like to see included.
              </p>
            </div>
          </div>
        </section>
        
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p className="mb-4">
            Have questions, suggestions, or feedback? We'd love to hear from you!
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <a 
              href="mailto:contact@humanpaloma.com" 
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Email Us
            </a>
            
            <a 
              href="https://twitter.com/humanpaloma" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 border-blue-600"
            >
              Twitter
            </a>
          </div>
        </section>
      </div>
    </>
  );
}