const API_BASE = 'https://www.googleapis.com/books/v1/volumes';

export const searchBooks = async (query, startIndex = 0, maxResults = 12) => {
  try {
    const response = await fetch(
      `${API_BASE}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error searching books:', error);
    return [];
  }
};

export const getBookById = async (volumeId) => {
  try {
    const response = await fetch(`${API_BASE}/${volumeId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching book:', error);
    return null;
  }
};

export const getBooksByCategory = async (category, maxResults = 12) => {
  return searchBooks(`subject:${category}`, 0, maxResults);
};

export const getPopularBooks = async (maxResults = 12) => {
  return searchBooks('bestseller', 0, maxResults);
};

export const getBookOfTheDay = async () => {
  const categories = ['fiction', 'science', 'history', 'technology', 'fantasy'];
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const books = await searchBooks(randomCategory, 0, 20);
  return books[Math.floor(Math.random() * books.length)];
};

export const getRandomBook = async () => {
  const queries = ['bestseller', 'classic', 'award winner', 'popular', 'trending'];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];
  const books = await searchBooks(randomQuery, 0, 40);
  return books[Math.floor(Math.random() * books.length)];
};

export const getSimilarBooks = async (bookTitle, maxResults = 6) => {
  return searchBooks(bookTitle, 0, maxResults);
};
