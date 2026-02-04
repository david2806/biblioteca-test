export const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getBookCover = (book) => {
  if (!book?.volumeInfo?.imageLinks) {
    return 'https://via.placeholder.com/300x450?text=No+Cover';
  }
  return book.volumeInfo.imageLinks.thumbnail || 
         book.volumeInfo.imageLinks.smallThumbnail || 
         'https://via.placeholder.com/300x450?text=No+Cover';
};

export const getAuthors = (book) => {
  if (!book?.volumeInfo?.authors) return 'Unknown Author';
  return book.volumeInfo.authors.join(', ');
};

export const getBookTitle = (book) => {
  return book?.volumeInfo?.title || 'Unknown Title';
};

export const getBookDescription = (book) => {
  return book?.volumeInfo?.description || 'No description available.';
};

export const getBookRating = (book) => {
  return book?.volumeInfo?.averageRating || 0;
};

export const getBookCategories = (book) => {
  return book?.volumeInfo?.categories || [];
};

export const getBookPageCount = (book) => {
  return book?.volumeInfo?.pageCount || 'N/A';
};

export const getBookPublisher = (book) => {
  return book?.volumeInfo?.publisher || 'Unknown Publisher';
};

export const getBookPublishedDate = (book) => {
  return book?.volumeInfo?.publishedDate || 'Unknown';
};

export const calculateReadingStats = (readBooks) => {
  if (!readBooks || readBooks.length === 0) {
    return {
      totalBooks: 0,
      totalPages: 0,
      genreDistribution: {},
      averageRating: 0,
    };
  }

  const totalPages = readBooks.reduce((sum, book) => {
    const pages = book.volumeInfo?.pageCount || 0;
    return sum + pages;
  }, 0);

  const genreDistribution = {};
  readBooks.forEach(book => {
    const categories = getBookCategories(book);
    categories.forEach(category => {
      genreDistribution[category] = (genreDistribution[category] || 0) + 1;
    });
  });

  const totalRating = readBooks.reduce((sum, book) => {
    return sum + getBookRating(book);
  }, 0);
  const averageRating = totalRating / readBooks.length;

  return {
    totalBooks: readBooks.length,
    totalPages,
    genreDistribution,
    averageRating: averageRating.toFixed(1),
  };
};

export const checkAchievements = (stats, readBooks, readingBooks, wantToReadBooks) => {
  const achievements = [];

  if (stats.totalBooks >= 1) {
    achievements.push({ id: 'first-book', name: 'First Book', description: 'Read your first book!', unlocked: true });
  }
  if (stats.totalBooks >= 5) {
    achievements.push({ id: 'bookworm', name: 'Bookworm', description: 'Read 5 books', unlocked: true });
  }
  if (stats.totalBooks >= 10) {
    achievements.push({ id: 'avid-reader', name: 'Avid Reader', description: 'Read 10 books', unlocked: true });
  }
  if (stats.totalBooks >= 25) {
    achievements.push({ id: 'book-master', name: 'Book Master', description: 'Read 25 books', unlocked: true });
  }
  if (stats.totalBooks >= 50) {
    achievements.push({ id: 'library-legend', name: 'Library Legend', description: 'Read 50 books!', unlocked: true });
  }
  
  const uniqueGenres = Object.keys(stats.genreDistribution).length;
  if (uniqueGenres >= 3) {
    achievements.push({ id: 'genre-explorer', name: 'Genre Explorer', description: 'Explored 3 different genres', unlocked: true });
  }
  if (uniqueGenres >= 5) {
    achievements.push({ id: 'diverse-reader', name: 'Diverse Reader', description: 'Explored 5 different genres', unlocked: true });
  }

  if (wantToReadBooks?.length >= 10) {
    achievements.push({ id: 'wishlist-curator', name: 'Wishlist Curator', description: 'Added 10 books to wishlist', unlocked: true });
  }

  return achievements;
};
