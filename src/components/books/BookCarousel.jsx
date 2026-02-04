import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BookCard from './BookCard';

const BookCarousel = ({ books, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleBooks, setVisibleBooks] = useState(4);
  const carouselRef = useRef(null);

  useEffect(() => {
    const updateVisibleBooks = () => {
      if (window.innerWidth < 640) setVisibleBooks(1);
      else if (window.innerWidth < 768) setVisibleBooks(2);
      else if (window.innerWidth < 1024) setVisibleBooks(3);
      else setVisibleBooks(4);
    };

    updateVisibleBooks();
    window.addEventListener('resize', updateVisibleBooks);
    return () => window.removeEventListener('resize', updateVisibleBooks);
  }, []);

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < books.length - visibleBooks;

  const scrollLeft = () => {
    if (canScrollLeft) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const scrollRight = () => {
    if (canScrollRight) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (!books || books.length === 0) return null;

  return (
    <div className="mb-12">
      {title && (
        <h2 className="text-3xl font-serif font-bold mb-6">{title}</h2>
      )}
      
      <div className="relative">
        {canScrollLeft && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 -ml-4"
          >
            <ChevronLeft size={24} className="text-accent-500" />
          </motion.button>
        )}

        <div className="overflow-hidden" ref={carouselRef}>
          <motion.div
            className="flex gap-6"
            animate={{ x: `${-currentIndex * (100 / visibleBooks)}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {books.map((book, index) => (
              <div
                key={book.id}
                style={{ minWidth: `${100 / visibleBooks}%` }}
                className="px-2"
              >
                <BookCard book={book} index={0} />
              </div>
            ))}
          </motion.div>
        </div>

        {canScrollRight && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 shadow-lg rounded-full p-2 -mr-4"
          >
            <ChevronRight size={24} className="text-accent-500" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default BookCarousel;
