import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LibraryProvider } from './context/LibraryContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import BookPage from './pages/BookPage';
import MyLibrary from './pages/MyLibrary';
import Statistics from './pages/Statistics';

function App() {
  return (
    <ThemeProvider>
      <LibraryProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="explorar" element={<Explore />} />
              <Route path="libro/:id" element={<BookPage />} />
              <Route path="mi-biblioteca" element={<MyLibrary />} />
              <Route path="estadisticas" element={<Statistics />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LibraryProvider>
    </ThemeProvider>
  );
}

export default App;
