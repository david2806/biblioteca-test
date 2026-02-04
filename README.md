# BiblioApp - Modern Book Discovery & Library Management

A beautiful, modern web application built with **Vite + React** that allows users to discover, search, and organize books. BiblioApp integrates with the Google Books API to provide a rich catalog of millions of books with features for personal library management, reading statistics, and achievements.

![BiblioApp](https://img.shields.io/badge/React-19.2-blue)
![Vite](https://img.shields.io/badge/Vite-7.2-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 🔍 Smart Search
- Search books by title, author, or ISBN
- Filter by genre, category, and sort options
- Real-time search with autocomplete
- Integration with Google Books API

### 📖 Visual Book Exploration
- Responsive grid layout for book displays
- Elegant hover effects on book cards
- Carousel view for featured collections
- Smooth animations powered by Framer Motion

### 📚 Categories & Genres
- Browse by genre: Fiction, Non-fiction, Science, History, Fantasy, Romance, and more
- Category-based navigation
- Visual tags for each book

### ⭐ Rating System
- 5-star rating display
- Google Books average ratings
- Personal rating system stored locally

### 📋 Personal Lists (LocalStorage Persistence)
- **Want to Read** - Your wishlist
- **Currently Reading** - Books you're reading now
- **Read** - Your completed books
- Easy management between lists
- Book count badges

### 🎲 Book Discovery
- **Book of the Day** featured on homepage
- **Surprise Me** button for random book discovery
- Popular/Trending books section
- "Similar Books" recommendations

### 📊 Reading Statistics
- Visual dashboard with key metrics
- Total books read counter
- Genre distribution charts
- Total pages read tracker

### 🏆 Gamification
- Unlockable achievements
- Visual achievement badges
- Progress tracking toward reading goals

## 🛠️ Tech Stack

- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[React](https://react.dev/)** - UI framework (v19.2)
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[React Router](https://reactrouter.com/)** - SPA routing
- **[Lucide React](https://lucide.dev/)** - Beautiful icons
- **[Google Books API](https://developers.google.com/books)** - Book data source
- **LocalStorage** - Client-side data persistence

## 📄 Pages

1. **Home (/)** - Hero section with search, Book of the Day, and featured carousels
2. **Explore (/explorar)** - Advanced search with filters and "Surprise Me" feature
3. **Book Detail (/libro/:id)** - Complete book information with similar books
4. **My Library (/mi-biblioteca)** - Personal book lists and management
5. **Statistics (/estadisticas)** - Reading stats, achievements, and goals

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/david2806/biblioteca-test.git
cd biblioteca-test
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open your browser to \`http://localhost:5173\`

### Building for Production

\`\`\`bash
npm run build
\`\`\`

The built files will be in the \`dist/\` directory.

## 🌐 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages. The GitHub Actions workflow automatically deploys when you push to the main branch.

The app will be available at: \`https://david2806.github.io/biblioteca-test/\`

## 📱 Responsive Design

BiblioApp is fully responsive and works perfectly on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1280px+)

---

Made with ❤️ for book lovers everywhere
