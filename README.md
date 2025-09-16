# MovieBrowser - Frontend Technical Challenge

A modern web application for browsing movies by categories with wishlist functionality. Built according to the technical requirements using React, TypeScript, and SCSS.

## ✅ Requirements Implementation

### Core Features
- **Homepage with 3 carousels** - Popular, Top Rated, and Upcoming movies
- **Movie detail pages** - Complete with image, description, and "add to wishlist" button
- **Wishlist section** - View and manage saved movies
- **Category-based styling** - Different fonts and buttons for each category
- **Responsive design** - Works on desktop, tablet, and mobile

### Technical Stack (As Required)
- ✅ **React with TypeScript** - Modern React 19 with full type safety
- ✅ **SCSS for styling** - Custom styles without external UI libraries
- ✅ **Vite for bundling** - Fast development and optimized builds
- ✅ **Handcrafted codebase** - No scaffolding tools, custom architecture
- ✅ **React Router** - Client-side routing
- ✅ **Zustand** - State management for wishlist
- ✅ **TheMovieDB API** - Real movie data integration

### Category Differentiation
Each movie category has unique styling as required:

- **Popular Movies**: Arial font + Primary red buttons
- **Top Rated Movies**: Georgia serif font + Secondary gray buttons  
- **Upcoming Movies**: Courier New monospace + Accent gold buttons

## 🚀 Running the Project

### Prerequisites
- Node.js (version 18.0 or higher)
- npm (comes with Node.js)

### Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open application**
   - Navigate to the URL shown in terminal (typically `http://localhost:5173`)
   - The application will automatically open with the homepage showing 3 movie carousels

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Features Overview

### Homepage
- Displays 3 horizontal carousels with different movie categories
- Each carousel shows movie cards with posters, titles, ratings, and descriptions
- Smooth scrolling navigation for each carousel
- Loading states while fetching data from API

### Movie Detail Pages
- Accessible by clicking any movie card
- Shows full movie information: poster, backdrop, title, overview, rating, runtime, genres
- "Add to Wishlist" button with different styling based on movie category
- Breadcrumb navigation
- Responsive layout

### Wishlist Management
- Persistent storage using localStorage
- Add/remove movies from wishlist
- Grouped by movie categories
- Shows when movies were added
- Clear all functionality

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

**Built with React, TypeScript, and SCSS**