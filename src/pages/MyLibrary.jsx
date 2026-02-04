import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookMarked, BookOpen, Heart } from 'lucide-react';
import { useLibrary } from '../hooks/useLibrary';
import BookList from '../components/library/BookList';

const MyLibrary = () => {
  const { wantToRead, reading, read } = useLibrary();
  const [activeTab, setActiveTab] = useState('wantToRead');

  const tabs = [
    { id: 'wantToRead', label: 'Want to Read', icon: Heart, books: wantToRead },
    { id: 'reading', label: 'Currently Reading', icon: BookOpen, books: reading },
    { id: 'read', label: 'Read', icon: BookMarked, books: read },
  ];

  const activeBooks = tabs.find(tab => tab.id === activeTab)?.books || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-serif font-bold mb-8">My Library</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent-500 text-white shadow-md'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-sm ${
                  activeTab === tab.id
                    ? 'bg-white/20'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}>
                  {tab.books.length}
                </span>
              </motion.button>
            );
          })}
        </div>

        <BookList books={activeBooks} listName={activeTab} />
      </motion.div>
    </div>
  );
};

export default MyLibrary;
