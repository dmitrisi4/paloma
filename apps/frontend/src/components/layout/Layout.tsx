import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Head from 'next/head';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Human Paloma - Historical Personalities Talk</title>
        <meta name="description" content="See what historical personalities would say about today's news" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <div className="flex-1 flex">
          <Sidebar />
          
          <main className="flex-1 border-x border-lighter">
            <div className="container-custom py-4">
              {children}
            </div>
          </main>
          
          <div className="hidden lg:block w-80">
            {/* Right sidebar if needed */}
          </div>
        </div>
      </div>
    </>
  );
}
