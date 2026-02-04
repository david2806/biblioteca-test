import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative p-3 rounded-xl bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-neutral-700 dark:to-neutral-600 text-secondary-800 dark:text-secondary-200 transition-all duration-300 shadow-md hover:shadow-lg"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'light' ? 0 : 180,
          scale: theme === 'light' ? 1 : 0.8,
        }}
        transition={{ duration: 0.3, type: "spring" }}
      >
        {theme === 'light' ? (
          <Moon size={22} className="text-primary-700" />
        ) : (
          <Sun size={22} className="text-secondary-300" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
