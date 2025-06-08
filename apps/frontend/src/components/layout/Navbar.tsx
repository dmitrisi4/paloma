import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBrain } from 'react-icons/fa';

export default function Navbar() {
  const router = useRouter();
  
  // Определяем активный путь для стилизации активных ссылок
  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container-custom flex items-center justify-between h-16">
        <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-primary">
          <FaBrain className="text-2xl" />
          <span>Human Paloma</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={`font-medium transition-colors ${isActive('/') && !isActive('/personalities') && !isActive('/about') ? 'text-primary' : 'hover:text-primary'}`}>
            Home
          </Link>
          <Link href="/personalities" className={`font-medium transition-colors ${isActive('/personalities') ? 'text-primary' : 'hover:text-primary'}`}>
            Personalities
          </Link>
          <Link href="/about" className={`font-medium transition-colors ${isActive('/about') ? 'text-primary' : 'hover:text-primary'}`}>
            About
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link href="/generate" className="btn btn-primary">
            Generate Post
          </Link>
        </div>
      </div>
    </header>
  );}
