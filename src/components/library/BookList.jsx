import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBookCover, getAuthors, getBookTitle } from '../../utils/helpers';
import { useLibrary } from '../../hooks/useLibrary';

const BookList = ({ books, listName }) => {
  const navigate = useNavigate();
  const { removeFromList, addToList } = useLibrary();

  const handleMove = (book, newList) => {
    addToList(book, newList);
  };

  if (!books || books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-serif font-bold mb-2">No books yet</h3>
          <p className="text-warm-700 mb-6">
            Start building your library by adding books from the explore page!
          </p>
          <button
            onClick={() => navigate('/explorar')}
            className="btn-primary"
          >
            Explore Books
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book, index) => {
        const cover = getBookCover(book);
        const authors = getAuthors(book);
        const title = getBookTitle(book);

        return (
          <motion.div
            key={book.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05 }}
            className="card overflow-hidden group relative"
          >
            <button
              onClick={() => removeFromList(book.id, listName)}
              className="absolute top-2 right-2 z-10 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>

            <div
              className="cursor-pointer"
              onClick={() => navigate(`/libro/${book.id}`)}
            >
              <img
                src={cover}
                alt={title}
                className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <div className="p-4">
                <h3 className="font-serif font-semibold text-lg mb-1 line-clamp-2">
                  {title}
                </h3>
                <p className="text-sm text-warm-700 line-clamp-1">
                  {authors}
                </p>
              </div>
            </div>

            <div className="p-4 pt-0">
              <select
                value={listName}
                onChange={(e) => handleMove(book, e.target.value)}
                className="input text-sm py-1"
                onClick={(e) => e.stopPropagation()}
              >
                <option value="wantToRead">Want to Read</option>
                <option value="reading">Currently Reading</option>
                <option value="read">Read</option>
              </select>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BookList;
