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

  // Status badge configuration
  const getStatusBadge = () => {
    if (!currentList) return null;
    
    const statusConfig = {
      read: { label: '✓ Leído', gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' },
      reading: { label: '📖 Leyendo', gradient: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)' },
      wantToRead: { label: '💭 Por Leer', gradient: 'linear-gradient(135deg, #6ee7b7 0%, #34d399 100%)' }
    };
    
    const config = statusConfig[currentList];
    if (!config) return null;
    
    return (
      <div className="absolute top-4 right-4 z-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
          style={{ background: config.gradient }}
        >
          {config.label}
        </motion.div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="card overflow-hidden cursor-pointer group relative shadow-elegant hover:shadow-elegant-lg"
      onClick={() => navigate(`/libro/${book.id}`)}
    >
      {/* Status Badge */}
      {getStatusBadge()}
      
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
      
      <div className="p-5 bg-gradient-to-b from-white to-warm-50">
        <h3 className="font-serif font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors text-primary-800">
          {title}
        </h3>
        <p className="text-sm text-warm-700 mb-3 line-clamp-1 font-medium">
          {authors}
        </p>
        {rating > 0 && (
          <div className="flex items-center gap-2">
            <Rating rating={Math.round(rating)} readonly size={18} />
            <span className="text-sm font-semibold text-accent-gold">
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
