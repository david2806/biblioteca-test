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
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-serif font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent"
        >
          {title}
        </motion.h2>
      )}
      
      <div className="relative group">
        {canScrollLeft && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-elegant hover:shadow-elegant-lg rounded-full p-3 -ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous books"
          >
            <ChevronLeft size={28} className="text-primary-600" />
          </motion.button>
        )}

        <div className="overflow-hidden" ref={carouselRef}>
          <motion.div
            className="flex gap-6"
            animate={{ x: `${-currentIndex * (100 / visibleBooks)}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                style={{ minWidth: `${100 / visibleBooks}%` }}
                className="px-2"
              >
                <BookCard book={book} index={0} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {canScrollRight && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1, x: 4 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-elegant hover:shadow-elegant-lg rounded-full p-3 -mr-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next books"
          >
            <ChevronRight size={28} className="text-primary-600" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default BookCarousel;
