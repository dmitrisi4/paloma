import PostFeed from '@/components/posts/PostFeed';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Human Paloma - Historical Personalities Talk</title>
        <meta name="description" content="Discover what historical figures would say about today's news" />
        <meta property="og:title" content="Human Paloma" />
        <meta property="og:description" content="Discover what historical figures would say about today's news" />
        <meta property="og:image" content="/og-image.jpg" />
      </Head>
      
      <div>
        <PostFeed />
      </div>
    </>
  );
}
