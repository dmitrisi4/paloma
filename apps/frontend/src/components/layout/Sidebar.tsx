import Link from 'next/link';
import { FaHome, FaUserFriends, FaInfoCircle } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <aside className="w-16 md:w-64 p-4 hidden md:block">
      <nav className="space-y-4">
        <Link href="/" className="flex items-center space-x-3 p-3 rounded-full hover:bg-lighter transition-colors">
          <FaHome className="text-xl" />
          <span className="hidden md:inline">Home</span>
        </Link>
        
        <Link href="/personalities" className="flex items-center space-x-3 p-3 rounded-full hover:bg-lighter transition-colors">
          <FaUserFriends className="text-xl" />
          <span className="hidden md:inline">Personalities</span>
        </Link>
        
        <Link href="/about" className="flex items-center space-x-3 p-3 rounded-full hover:bg-lighter transition-colors">
          <FaInfoCircle className="text-xl" />
          <span className="hidden md:inline">About</span>
        </Link>
      </nav>
    </aside>
  );
}
