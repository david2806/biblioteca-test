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
      whileHover={{ y: -8 }}
      className="card overflow-hidden cursor-pointer group"
      onClick={() => navigate(`/libro/${book.id}`)}
    >
      <div className="relative">
        <img
          src={cover}
          alt={title}
          className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleAddToList(e, 'wantToRead')}
              className={`flex-1 py-2 px-3 rounded-lg text-white text-sm font-medium transition-colors ${
                currentList === 'wantToRead' 
                  ? 'bg-accent-600' 
                  : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
              }`}
              title="Want to Read"
            >
              {currentList === 'wantToRead' ? <Check size={16} className="mx-auto" /> : <Plus size={16} className="mx-auto" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleAddToList(e, 'reading')}
              className={`flex-1 py-2 px-3 rounded-lg text-white text-sm font-medium transition-colors ${
                currentList === 'reading' 
                  ? 'bg-accent-600' 
                  : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
              }`}
              title="Currently Reading"
            >
              {currentList === 'reading' ? <Check size={16} className="mx-auto" /> : <BookOpen size={16} className="mx-auto" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleAddToList(e, 'read')}
              className={`flex-1 py-2 px-3 rounded-lg text-white text-sm font-medium transition-colors ${
                currentList === 'read' 
                  ? 'bg-accent-600' 
                  : 'bg-white/20 backdrop-blur-sm hover:bg-white/30'
              }`}
              title="Read"
            >
              {currentList === 'read' ? <Check size={16} className="mx-auto" /> : <BookMarked size={16} className="mx-auto" />}
            </motion.button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-serif font-semibold text-lg mb-1 line-clamp-2 group-hover:text-accent-500 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
          {authors}
        </p>
        {rating > 0 && (
          <div className="flex items-center gap-2">
            <Rating rating={Math.round(rating)} readonly size={16} />
            <span className="text-sm text-gray-500">({rating.toFixed(1)})</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
