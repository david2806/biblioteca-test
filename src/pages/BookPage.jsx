import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, BookOpen, Building2 } from 'lucide-react';
import * as api from '../services/googleBooksApi';
import { 
  getBookCover, 
  getBookTitle, 
  getAuthors, 
  getBookDescription,
  getBookRating,
  getBookCategories,
  getBookPageCount,
  getBookPublisher,
  getBookPublishedDate,
} from '../utils/helpers';
import Rating from '../components/ui/Rating';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import BookGrid from '../components/books/BookGrid';
import { useLibrary } from '../hooks/useLibrary';

const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToList, getBookList, rateBook, getUserRating } = useLibrary();

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      try {
        const bookData = await api.getBookById(id);
        setBook(bookData);
        
        if (bookData?.volumeInfo?.title) {
          const similar = await api.getSimilarBooks(bookData.volumeInfo.title);
          setSimilarBooks(similar.filter(b => b.id !== id).slice(0, 4));
        }
      } catch (error) {
        console.error('Error loading book:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="md:col-span-2 space-y-4">
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Book Not Found</h2>
          <Button onClick={() => navigate('/explorar')}>
            Explore Books
          </Button>
        </Card>
      </div>
    );
  }

  const cover = getBookCover(book);
  const title = getBookTitle(book);
  const authors = getAuthors(book);
  const description = getBookDescription(book);
  const rating = getBookRating(book);
  const categories = getBookCategories(book);
  const pageCount = getBookPageCount(book);
  const publisher = getBookPublisher(book);
  const publishedDate = getBookPublishedDate(book);
  const currentList = getBookList(book.id);
  const userRating = getUserRating(book.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-accent-500 mb-8"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div>
            <img
              src={cover}
              alt={title}
              className="w-full rounded-xl shadow-2xl"
            />
          </div>

          <div className="md:col-span-2">
            <h1 className="text-4xl font-serif font-bold mb-2">{title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              by {authors}
            </p>

            <div className="flex items-center gap-4 mb-6">
              {rating > 0 && (
                <div className="flex items-center gap-2">
                  <Rating rating={Math.round(rating)} readonly size={24} />
                  <span className="text-lg font-medium">{rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Your Rating</h3>
              <Rating 
                rating={userRating} 
                onRate={(newRating) => rateBook(book.id, newRating)} 
                size={28}
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent-100 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <BookOpen size={20} />
                <span>{pageCount} pages</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Building2 size={20} />
                <span>{publisher}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Calendar size={20} />
                <span>{publishedDate}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Add to List</h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => addToList(book, 'wantToRead')}
                  variant={currentList === 'wantToRead' ? 'primary' : 'outline'}
                >
                  Want to Read
                </Button>
                <Button
                  onClick={() => addToList(book, 'reading')}
                  variant={currentList === 'reading' ? 'primary' : 'outline'}
                >
                  Reading
                </Button>
                <Button
                  onClick={() => addToList(book, 'read')}
                  variant={currentList === 'read' ? 'primary' : 'outline'}
                >
                  Read
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold mb-4">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>

        {similarBooks.length > 0 && (
          <div>
            <h2 className="text-3xl font-serif font-bold mb-6">Similar Books</h2>
            <BookGrid books={similarBooks} />
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default BookPage;
