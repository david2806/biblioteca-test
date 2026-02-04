import { BookOpen, Github, Heart, Twitter, Mail, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800 border-t border-neutral-200 dark:border-neutral-700 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-primary-500 dark:text-primary-400" size={32} />
              <span className="text-2xl font-serif font-bold bg-gradient-primary bg-clip-text text-transparent">
                BiblioApp
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Tu biblioteca digital personal para descubrir, organizar y seguir tu viaje de lectura.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Github size={22} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Twitter size={22} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Facebook size={22} />
              </a>
              <a
                href="mailto:contacto@biblioapp.com"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Mail size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-700 dark:text-primary-300">Enlaces Rápidos</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:underline">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/explorar" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:underline">
                  Explorar Libros
                </Link>
              </li>
              <li>
                <Link to="/mi-biblioteca" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:underline">
                  Mi Biblioteca
                </Link>
              </li>
              <li>
                <Link to="/estadisticas" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:underline">
                  Estadísticas
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-700 dark:text-primary-300">Recursos</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:underline">
                  Cómo Usar
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:underline">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:underline">
                  Soporte
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:underline">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-700 dark:text-primary-300">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:underline">
                  Términos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:underline">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors hover:underline">
                  Cookies
                </a>
              </li>
              <li className="pt-2 text-gray-500 dark:text-gray-500 text-xs">
                Desarrollado con Google Books API
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-200 dark:border-neutral-700 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              Hecho con <Heart size={16} className="text-red-500 fill-red-500 animate-pulse-slow" /> para los amantes de los libros
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © {currentYear} BiblioApp. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
