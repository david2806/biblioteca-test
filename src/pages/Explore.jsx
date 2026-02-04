import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shuffle } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import SearchFilters from '../components/search/SearchFilters';
import BookGrid from '../components/books/BookGrid';
import Button from '../components/ui/Button';
import * as api from '../services/googleBooksApi';

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    sortBy: 'relevance',
  });

  const initialQuery = searchParams.get('q') || '';

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    } else {
      loadDefaultBooks();
    }
  }, []);

  const loadDefaultBooks = async () => {
    setLoading(true);
    try {
      const results = await api.getPopularBooks(20);
      setBooks(results);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setSearchParams({ q: query });
    try {
      let searchQuery = query;
      if (filters.category !== 'All') {
        searchQuery += ` subject:${filters.category}`;
      }
      const results = await api.searchBooks(searchQuery, 0, 20);
      setBooks(results);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (newFilters) => {
    setFilters(newFilters);
    if (initialQuery || searchParams.get('q')) {
      handleSearch(searchParams.get('q') || initialQuery);
    } else if (newFilters.category !== 'All') {
      setLoading(true);
      try {
        const results = await api.getBooksByCategory(newFilters.category, 20);
        setBooks(results);
      } catch (error) {
        console.error('Error loading category books:', error);
      } finally {
        setLoading(false);
      }
    } else {
      loadDefaultBooks();
    }
  };

  const handleSurpriseMe = async () => {
    setLoading(true);
    try {
      const randomBook = await api.getRandomBook();
      setBooks(randomBook ? [randomBook] : []);
    } catch (error) {
      console.error('Error getting random book:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold mb-6">Explore Books</h1>
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <SearchFilters filters={filters} onChange={handleFilterChange} />
            
            <div className="mt-6">
              <Button
                onClick={handleSurpriseMe}
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
              >
                <Shuffle size={20} />
                Surprise Me!
              </Button>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600 dark:text-gray-400">
                {loading ? 'Searching...' : `${books.length} books found`}
              </p>
            </div>
            
            <BookGrid books={books} loading={loading} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Explore;
