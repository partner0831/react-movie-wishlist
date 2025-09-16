import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlistStore';
import { MovieApiService } from '../services/movieApi';
import { MOVIE_CATEGORIES } from '../constants/movieCategories';
import './WishlistPage.scss';

const WishlistPage: React.FC = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();

  const handleRemoveItem = (movieId: number) => {
    removeFromWishlist(movieId);
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
    }
  };

  const formatDate = (date: Date | string): string => {
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      return dateObj.toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown date';
    }
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as { [key: string]: typeof items });

  if (items.length === 0) {
    return (
      <main className="wishlist-page">
        <div className="container">
          <h1 className="wishlist-page__title">My Wishlist</h1>
          <div className="wishlist-page__empty">
            <div className="wishlist-page__empty-icon">🎬</div>
            <h2>Your wishlist is empty</h2>
            <p>Start adding movies to your wishlist by browsing our collection!</p>
            <Link to="/" className="btn btn-primary">
              Discover Movies
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="wishlist-page">
      <div className="container">
        <div className="wishlist-page__header">
          <h1 className="wishlist-page__title">My Wishlist</h1>
          <div className="wishlist-page__actions">
            <span className="wishlist-page__count">
              {items.length} {items.length === 1 ? 'movie' : 'movies'}
            </span>
            <button 
              onClick={handleClearWishlist}
              className="btn btn-secondary wishlist-page__clear-btn"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="wishlist-page__content">
          {Object.entries(groupedItems).map(([categoryId, categoryItems]) => {
            const categoryConfig = MOVIE_CATEGORIES.find(cat => cat.id === categoryId);
            
            return (
              <section 
                key={categoryId} 
                className="wishlist-page__category"
                style={{ fontFamily: categoryConfig?.fontFamily }}
              >
                <h2 className="wishlist-page__category-title">
                  {categoryConfig?.name || 'Unknown Category'}
                  <span className="wishlist-page__category-count">
                    ({categoryItems.length})
                  </span>
                </h2>
                
                <div className="wishlist-page__items">
                  {categoryItems.map((item) => {
                    const imageUrl = MovieApiService.getImageUrl(item.movie.poster_path);
                    const year = item.movie.release_date 
                      ? new Date(item.movie.release_date).getFullYear() 
                      : 'TBA';
                    
                    return (
                      <div key={item.movie.id} className="wishlist-item">
                        <Link 
                          to={`/movie/${item.movie.id}`}
                          state={{ category: categoryId }}
                          className="wishlist-item__image-link"
                        >
                          <img 
                            src={imageUrl} 
                            alt={item.movie.title}
                            className="wishlist-item__image"
                          />
                        </Link>
                        
                        <div className="wishlist-item__content">
                          <Link 
                            to={`/movie/${item.movie.id}`}
                            state={{ category: categoryId }}
                            className="wishlist-item__title-link"
                          >
                            <h3 className="wishlist-item__title">{item.movie.title}</h3>
                          </Link>
                          
                          <div className="wishlist-item__meta">
                            <span className="wishlist-item__year">{year}</span>
                            <span className="wishlist-item__rating">
                              ⭐ {item.movie.vote_average.toFixed(1)}
                            </span>
                          </div>
                          
                          <p className="wishlist-item__overview">
                            {item.movie.overview.length > 200 
                              ? `${item.movie.overview.substring(0, 200)}...` 
                              : item.movie.overview
                            }
                          </p>
                          
                          <div className="wishlist-item__footer">
                            <span className="wishlist-item__added">
                              Added {formatDate(item.addedAt)}
                            </span>
                            <button
                              onClick={() => handleRemoveItem(item.movie.id)}
                              className="btn btn-secondary wishlist-item__remove-btn"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default WishlistPage;
