import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Sparkles, BookOpen, Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/search/SearchBar';
import BookCarousel from '../components/books/BookCarousel';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import * as api from '../services/googleBooksApi';
import { getBookCover, getBookTitle, getAuthors, truncateText, getBookDescription } from '../utils/helpers';
import { featuredBooks, getRandomFeaturedBook } from '../data/featuredBooks';

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
        // Use featured books as the initial content
        setBookOfTheDay(getRandomFeaturedBook());
        setPopularBooks(featuredBooks.slice(0, 12));
        
        // Load additional books from API in the background
        const [fiction, science] = await Promise.all([
          api.getBooksByCategory('fiction', 12),
          api.getBooksByCategory('science', 12),
        ]);
        
        setFictionBooks(fiction);
        setScienceBooks(science);
      } catch (error) {
        console.error('Error loading books:', error);
        // Fallback to featured books if API fails
        setFictionBooks(featuredBooks.slice(0, 6));
        setScienceBooks(featuredBooks.slice(6, 12));
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
      <section className="relative bg-gradient-hero dark:bg-gradient-to-br dark:from-neutral-800 dark:to-neutral-900 py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <BookOpen className="w-16 h-16 text-secondary-400" />
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-white drop-shadow-lg">
              Descubre Tu Próxima
              <span className="block bg-gradient-secondary bg-clip-text text-transparent">
                Gran Lectura
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light">
              Explora miles de libros, construye tu biblioteca personal y sigue tu progreso de lectura
            </p>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-8 mb-10 text-white/80"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-300">12+</div>
                <div className="text-sm">Libros Destacados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-300">∞</div>
                <div className="text-sm">Para Explorar</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-300">100%</div>
                <div className="text-sm">Gratuito</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <div className="card-glass rounded-2xl p-2">
                <SearchBar onSearch={handleSearch} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Book of the Day */}
      {bookOfTheDay && (
        <section className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Sparkles className="text-secondary-500" size={40} />
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-primary bg-clip-text text-transparent">
                Libro del Día
              </h2>
            </div>
            
            <Card className="p-0 overflow-hidden shadow-elegant-lg hover:shadow-elegant-dark-lg">
              <div className="grid md:grid-cols-5 gap-0">
                <div className="relative md:col-span-2 h-96 md:h-auto">
                  <img
                    src={getBookCover(bookOfTheDay)}
                    alt={getBookTitle(bookOfTheDay)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white">
                      <Star className="fill-secondary-400 text-secondary-400" size={20} />
                      <span className="font-bold text-lg">{bookOfTheDay.volumeInfo?.averageRating?.toFixed(1) || 'N/A'}</span>
                      <span className="text-sm opacity-80">
                        ({bookOfTheDay.volumeInfo?.ratingsCount?.toLocaleString() || '0'} reseñas)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900">
                  <div className="inline-block mb-3">
                    <span className="px-4 py-1.5 bg-gradient-accent text-white text-sm font-semibold rounded-full">
                      {bookOfTheDay.volumeInfo?.categories?.[0] || 'Destacado'}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold mb-3 text-primary-700 dark:text-white">
                    {getBookTitle(bookOfTheDay)}
                  </h3>
                  <p className="text-xl text-primary-600 dark:text-primary-300 mb-6 font-medium">
                    por {getAuthors(bookOfTheDay)}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-lg">
                    {truncateText(getBookDescription(bookOfTheDay), 300)}
                  </p>
                  <div className="flex gap-4">
                    <Button
                      onClick={() => navigate(`/libro/${bookOfTheDay.id}`)}
                      className="btn-primary"
                    >
                      Ver Detalles
                    </Button>
                    <Button
                      onClick={() => navigate('/explorar')}
                      className="btn-outline"
                    >
                      Explorar Más
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>
      )}

      {/* Popular Books */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <TrendingUp className="text-accent-500" size={40} />
            <h2 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-accent bg-clip-text text-transparent">
              Libros Populares
            </h2>
          </motion.div>
          {!loading && <BookCarousel books={popularBooks} />}
        </div>
      </section>

      {/* Fiction Books */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <BookCarousel books={fictionBooks} title="Ficción" />
        </div>
      </section>

      {/* Science Books */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
        <div className="container mx-auto px-4">
          <BookCarousel books={scienceBooks} title="Ciencia y Tecnología" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="text-center p-12 md:p-16 relative overflow-hidden">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 opacity-50"></div>
              
              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="inline-block mb-6"
                >
                  <Heart className="w-16 h-16 text-accent-500" />
                </motion.div>
                
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                  ¿Listo para Comenzar tu Viaje de Lectura?
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Explora nuestra vasta colección de libros, crea tu biblioteca personal y sigue tu progreso de lectura.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigate('/explorar')} className="btn-primary text-lg px-8 py-4">
                    Explorar Libros
                  </Button>
                  <Button onClick={() => navigate('/mi-biblioteca')} className="btn-outline text-lg px-8 py-4">
                    Mi Biblioteca
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
