import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, placeholder = "Search by title, author, or ISBN..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="input pl-12 pr-4 py-4 text-lg w-full"
        />
        <SearchIcon 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
          size={24} 
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Search
        </motion.button>
      </div>
    </form>
  );
};

export default SearchBar;
