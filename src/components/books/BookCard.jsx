import { motion } from 'framer-motion';
import { Plus, Check, BookOpen, BookMarked } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBookCover, getAuthors, getBookTitle, getBookRating } from '../../utils/helpers';
import { useLibrary } from '../../hooks/useLibrary';
import Rating from '../ui/Rating';

const BookCard = ({ book, index = 0 }) => {
  const navigate = useNavigate();
  const { getBookList, addToList, removeFromList } = useLibrary();
  
  const cover = getBookCover(book);
  const authors = getAuthors(book);
  const title = getBookTitle(book);
  const rating = getBookRating(book);
  const currentList = getBookList(book.id);

  const handleAddToList = (e, listName) => {
    e.stopPropagation();
    if (currentList === listName) {
      removeFromList(book.id, listName);
    } else {
      addToList(book, listName);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="card overflow-hidden cursor-pointer group relative shadow-elegant hover:shadow-elegant-lg dark:shadow-elegant-dark dark:hover:shadow-elegant-dark-lg"
      onClick={() => navigate(`/libro/${book.id}`)}
    >
      {/* Status Badge */}
      {currentList && (
        <div className="absolute top-4 right-4 z-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
            style={{
              background: currentList === 'read' 
                ? 'linear-gradient(135deg, #38a169 0%, #276749 100%)'
                : currentList === 'reading'
                ? 'linear-gradient(135deg, #3182ce 0%, #2c5282 100%)'
                : 'linear-gradient(135deg, #d69e2e 0%, #ecc94b 100%)'
            }}
          >
            {currentList === 'read' ? '✓ Leído' : currentList === 'reading' ? '📖 Leyendo' : '💭 Por Leer'}
          </motion.div>
        </div>
      )}
      
      <div className="relative">
        <img
          src={cover}
          alt={title}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleAddToList(e, 'wantToRead')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-white text-sm font-semibold transition-all duration-300 ${
                currentList === 'wantToRead' 
                  ? 'bg-gradient-secondary shadow-lg' 
                  : 'bg-white/20 backdrop-blur-md hover:bg-white/30'
              }`}
              title="Quiero Leer"
            >
              {currentList === 'wantToRead' ? <Check size={18} className="mx-auto" /> : <Plus size={18} className="mx-auto" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleAddToList(e, 'reading')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-white text-sm font-semibold transition-all duration-300 ${
                currentList === 'reading' 
                  ? 'bg-gradient-primary shadow-lg' 
                  : 'bg-white/20 backdrop-blur-md hover:bg-white/30'
              }`}
              title="Leyendo Ahora"
            >
              {currentList === 'reading' ? <Check size={18} className="mx-auto" /> : <BookOpen size={18} className="mx-auto" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleAddToList(e, 'read')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-white text-sm font-semibold transition-all duration-300 ${
                currentList === 'read' 
                  ? 'bg-gradient-accent shadow-lg' 
                  : 'bg-white/20 backdrop-blur-md hover:bg-white/30'
              }`}
              title="Leído"
            >
              {currentList === 'read' ? <Check size={18} className="mx-auto" /> : <BookMarked size={18} className="mx-auto" />}
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="p-5 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
        <h3 className="font-serif font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-1 font-medium">
          {authors}
        </p>
        {rating > 0 && (
          <div className="flex items-center gap-2">
            <Rating rating={Math.round(rating)} readonly size={18} />
            <span className="text-sm font-semibold text-secondary-600 dark:text-secondary-400">
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
