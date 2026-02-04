import { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [wantToRead, setWantToRead] = useLocalStorage('wantToRead', []);
  const [reading, setReading] = useLocalStorage('reading', []);
  const [read, setRead] = useLocalStorage('read', []);
  const [userRatings, setUserRatings] = useLocalStorage('userRatings', {});

  const addToList = (book, listName) => {
    const bookId = book.id;
    
    // Remove from other lists
    setWantToRead(prev => prev.filter(b => b.id !== bookId));
    setReading(prev => prev.filter(b => b.id !== bookId));
    setRead(prev => prev.filter(b => b.id !== bookId));

    // Add to the specified list
    if (listName === 'wantToRead') {
      setWantToRead(prev => [...prev, book]);
    } else if (listName === 'reading') {
      setReading(prev => [...prev, book]);
    } else if (listName === 'read') {
      setRead(prev => [...prev, book]);
    }
  };

  const removeFromList = (bookId, listName) => {
    if (listName === 'wantToRead') {
      setWantToRead(prev => prev.filter(b => b.id !== bookId));
    } else if (listName === 'reading') {
      setReading(prev => prev.filter(b => b.id !== bookId));
    } else if (listName === 'read') {
      setRead(prev => prev.filter(b => b.id !== bookId));
    }
  };

  const isInList = (bookId, listName) => {
    if (listName === 'wantToRead') {
      return wantToRead.some(b => b.id === bookId);
    } else if (listName === 'reading') {
      return reading.some(b => b.id === bookId);
    } else if (listName === 'read') {
      return read.some(b => b.id === bookId);
    }
    return false;
  };

  const getBookList = (bookId) => {
    if (wantToRead.some(b => b.id === bookId)) return 'wantToRead';
    if (reading.some(b => b.id === bookId)) return 'reading';
    if (read.some(b => b.id === bookId)) return 'read';
    return null;
  };

  const rateBook = (bookId, rating) => {
    setUserRatings(prev => ({
      ...prev,
      [bookId]: rating
    }));
  };

  const getUserRating = (bookId) => {
    return userRatings[bookId] || 0;
  };

  return (
    <LibraryContext.Provider value={{
      wantToRead,
      reading,
      read,
      addToList,
      removeFromList,
      isInList,
      getBookList,
      rateBook,
      getUserRating,
    }}>
      {children}
    </LibraryContext.Provider>
  );
};
