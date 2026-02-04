import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, placeholder = "Buscar por título, autor o ISBN..." }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <motion.div 
        className="relative"
        animate={{ scale: isFocused ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="input pl-14 pr-32 py-5 text-lg w-full shadow-elegant focus:shadow-elegant-lg transition-all duration-300"
        />
        <SearchIcon 
          className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
            isFocused ? 'text-primary-600' : 'text-warm-400'
          }`}
          size={24} 
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-primary text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Buscar
        </motion.button>
      </motion.div>
    </form>
  );
};

export default SearchBar;
