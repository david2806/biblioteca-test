import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import BookCarousel from '../components/books/BookCarousel';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import * as api from '../services/googleBooksApi';
import { getBookCover, getBookTitle, getAuthors, truncateText, getBookDescription } from '../utils/helpers';

const Home = () => {
  const navigate = useNavigate();
  const [bookOfTheDay, setBookOfTheDay] = useState(null);
  const [popularBooks, setPopularBooks] = useState([]);
  const [fictionBooks, setFictionBooks] = useState([]);
  const [scienceBooks, setScienceBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      try {
        const [daily, popular, fiction, science] = await Promise.all([
          api.getBookOfTheDay(),
          api.getPopularBooks(12),
          api.getBooksByCategory('fiction', 12),
          api.getBooksByCategory('science', 12),
        ]);
        
        setBookOfTheDay(daily);
        setPopularBooks(popular);
        setFictionBooks(fiction);
        setScienceBooks(science);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  const handleSearch = (query) => {
    navigate(`/explorar?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent-50 to-primary-100 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-accent-600 to-accent-800 bg-clip-text text-transparent">
              Discover Your Next Great Read
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
              Explore millions of books, build your personal library, and track your reading journey
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Book of the Day */}
      {bookOfTheDay && (
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-accent-500" size={32} />
              <h2 className="text-3xl font-serif font-bold">Book of the Day</h2>
            </div>
            
            <Card className="p-0 overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-96 md:h-auto">
                  <img
                    src={getBookCover(bookOfTheDay)}
                    alt={getBookTitle(bookOfTheDay)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-3xl font-serif font-bold mb-2">
                    {getBookTitle(bookOfTheDay)}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    by {getAuthors(bookOfTheDay)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {truncateText(getBookDescription(bookOfTheDay), 300)}
                  </p>
                  <Button
                    onClick={() => navigate(`/libro/${bookOfTheDay.id}`)}
                    variant="primary"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>
      )}

      {/* Popular Books */}
      <section className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-accent-500" size={32} />
          <h2 className="text-3xl font-serif font-bold">Popular Books</h2>
        </div>
        {!loading && <BookCarousel books={popularBooks} />}
      </section>

      {/* Fiction Books */}
      <section className="container mx-auto px-4 py-16">
        <BookCarousel books={fictionBooks} title="Fiction" />
      </section>

      {/* Science Books */}
      <section className="container mx-auto px-4 py-16 bg-gray-50 dark:bg-gray-800/50">
        <BookCarousel books={scienceBooks} title="Science & Technology" />
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16">
        <Card className="text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Explore our vast collection of books, create your personal library, and track your reading progress.
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate('/explorar')} variant="primary">
              Explore Books
            </Button>
            <Button onClick={() => navigate('/mi-biblioteca')} variant="outline">
              My Library
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
