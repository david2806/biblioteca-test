import { useState, useEffect } from 'react';
import * as api from '../services/googleBooksApi';

export const useBooks = (initialQuery = '') => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchBooks = async (query) => {
    if (!query) {
      setBooks([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const results = await api.searchBooks(query);
      setBooks(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadBooksByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const results = await api.getBooksByCategory(category);
      setBooks(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      searchBooks(initialQuery);
    }
  }, [initialQuery]);

  return { books, loading, error, searchBooks, loadBooksByCategory };
};
