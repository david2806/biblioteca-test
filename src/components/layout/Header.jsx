import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Search, Library, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';
import { useLibrary } from '../../hooks/useLibrary';

const Header = () => {
  const location = useLocation();
  const { wantToRead, reading, read } = useLibrary();
  const totalBooks = wantToRead.length + reading.length + read.length;

  const navItems = [
    { path: '/', label: 'Home', icon: BookOpen },
    { path: '/explorar', label: 'Explore', icon: Search },
    { path: '/mi-biblioteca', label: 'My Library', icon: Library, badge: totalBooks },
    { path: '/estadisticas', label: 'Statistics', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <BookOpen className="text-accent-500 group-hover:rotate-12 transition-transform" size={32} />
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-accent-500 to-accent-700 bg-clip-text text-transparent">
              BiblioApp
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                >
                  <div className="flex items-center gap-2">
                    <Icon 
                      size={20} 
                      className={`${isActive ? 'text-accent-500' : 'text-gray-600 dark:text-gray-400'} group-hover:text-accent-500 transition-colors`}
                    />
                    <span className={`${isActive ? 'text-accent-500 font-semibold' : 'text-gray-700 dark:text-gray-300'} group-hover:text-accent-500 transition-colors`}>
                      {item.label}
                    </span>
                    {item.badge > 0 && (
                      <span className="bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent-500"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around mt-4 border-t border-gray-200 dark:border-gray-800 pt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-1 relative"
              >
                <Icon 
                  size={24} 
                  className={isActive ? 'text-accent-500' : 'text-gray-600 dark:text-gray-400'}
                />
                <span className={`text-xs ${isActive ? 'text-accent-500 font-semibold' : 'text-gray-600 dark:text-gray-400'}`}>
                  {item.label}
                </span>
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-accent-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;
