import { BookOpen, Github, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-accent-500" size={24} />
              <span className="text-xl font-serif font-bold">BiblioApp</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your personal digital library for discovering, organizing, and tracking books.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="/" className="hover:text-accent-500 transition-colors">Home</a></li>
              <li><a href="/explorar" className="hover:text-accent-500 transition-colors">Explore Books</a></li>
              <li><a href="/mi-biblioteca" className="hover:text-accent-500 transition-colors">My Library</a></li>
              <li><a href="/estadisticas" className="hover:text-accent-500 transition-colors">Statistics</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Powered by Google Books API
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-accent-500 transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart size={16} className="text-red-500 fill-red-500" /> for book lovers
          </p>
          <p className="mt-2">© 2024 BiblioApp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
