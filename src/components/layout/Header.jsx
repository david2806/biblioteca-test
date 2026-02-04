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
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="text-primary-500 dark:text-primary-400 transition-transform" size={36} />
            </motion.div>
            <div>
              <span className="text-2xl md:text-3xl font-serif font-bold bg-gradient-primary bg-clip-text text-transparent">
                BiblioApp
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">Tu biblioteca personal</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
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
                      size={22} 
                      className={`${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'} group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors`}
                    />
                    <span className={`${isActive ? 'text-primary-600 dark:text-primary-400 font-bold' : 'text-gray-700 dark:text-gray-300 font-medium'} group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors`}>
                      {item.label}
                    </span>
                    {item.badge > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-gradient-accent text-white text-xs font-bold rounded-full min-w-[24px] h-6 flex items-center justify-center px-2 shadow-md"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </div>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-1 relative"
              >
                <div className="relative">
                  <Icon 
                    size={26} 
                    className={isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}
                  />
                  {item.badge > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-gradient-accent text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </div>
                <span className={`text-xs ${isActive ? 'text-primary-600 dark:text-primary-400 font-bold' : 'text-gray-600 dark:text-gray-400 font-medium'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;
