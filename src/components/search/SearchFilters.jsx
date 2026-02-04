import { motion } from 'framer-motion';

const SearchFilters = ({ filters, onChange }) => {
  const categories = [
    'All',
    'Fiction',
    'Non-fiction',
    'Science',
    'History',
    'Fantasy',
    'Romance',
    'Mystery',
    'Biography',
    'Self-help',
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <h3 className="font-serif text-xl font-bold mb-4">Filters</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange({ ...filters, category })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.category === category
                  ? 'bg-accent-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Sort By</label>
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
          className="input w-full"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;
