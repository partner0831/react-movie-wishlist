import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import type { MovieDetails } from '../types/movie';
import { movieApi, MovieApiService } from '../services/movieApi';
import { useWishlistStore } from '../store/wishlistStore';
import { MOVIE_CATEGORIES } from '../constants/movieCategories';
import './MovieDetailPage.scss';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  
  // Get category from navigation state or default to 'popular'
  const category = location.state?.category || 'popular';
  const categoryConfig = MOVIE_CATEGORIES.find(cat => cat.id === category) || MOVIE_CATEGORIES[0];
  
  const movieId = parseInt(id || '0');
  const inWishlist = isInWishlist(movieId);

  useEffect(() => {
    const loadMovieDetails = async () => {
      if (!id) {
        setError('Movie ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const movieDetails = await movieApi.getMovieDetails(parseInt(id));
        setMovie(movieDetails);
      } catch (error) {
        console.error('Error loading movie details:', error);
        setError(error instanceof Error ? error.message : 'Failed to load movie details');
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  const handleWishlistToggle = () => {
    if (!movie) return;

    if (inWishlist) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie, category);
    }
  };

  const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <main className="movie-detail loading">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="movie-detail">
        <div className="container">
          <div className="error-state">
            <h1>Oops! Something went wrong</h1>
            <p>{error || 'Movie not found'}</p>
            <Link to="/" className="btn btn-primary">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const backdropUrl = MovieApiService.getBackdropUrl(movie.backdrop_path);
  const posterUrl = MovieApiService.getImageUrl(movie.poster_path);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA';

  return (
    <main 
      className={`movie-detail movie-detail--${category}`}
      style={{ fontFamily: categoryConfig.fontFamily }}
    >
      <div 
        className="movie-detail__backdrop"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="movie-detail__backdrop-overlay"></div>
      </div>

      <div className="container">
        <nav className="movie-detail__breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{categoryConfig.name}</span>
          <span>/</span>
          <span>{movie.title}</span>
        </nav>

        <div className="movie-detail__content">
          <div className="movie-detail__poster">
            <img src={posterUrl} alt={movie.title} />
          </div>

          <div className="movie-detail__info">
            <h1 className="movie-detail__title">{movie.title}</h1>
            
            {movie.tagline && (
              <p className="movie-detail__tagline">"{movie.tagline}"</p>
            )}

            <div className="movie-detail__meta">
              <span className="movie-detail__year">{year}</span>
              <span className="movie-detail__runtime">{formatRuntime(movie.runtime)}</span>
              <span className="movie-detail__rating">⭐ {movie.vote_average.toFixed(1)}</span>
              <span className="movie-detail__votes">({movie.vote_count.toLocaleString()} votes)</span>
            </div>

            <div className="movie-detail__genres">
              {movie.genres.map(genre => (
                <span key={genre.id} className="movie-detail__genre">
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="movie-detail__description">
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>

            <button
              onClick={handleWishlistToggle}
              className={`btn btn-${categoryConfig.buttonStyle} movie-detail__wishlist-btn`}
            >
              {inWishlist ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
            </button>

            {movie.budget > 0 && (
              <div className="movie-detail__additional-info">
                <div className="movie-detail__info-item">
                  <strong>Budget:</strong> {formatCurrency(movie.budget)}
                </div>
                {movie.revenue > 0 && (
                  <div className="movie-detail__info-item">
                    <strong>Revenue:</strong> {formatCurrency(movie.revenue)}
                  </div>
                )}
                <div className="movie-detail__info-item">
                  <strong>Status:</strong> {movie.status}
                </div>
                {movie.production_companies.length > 0 && (
                  <div className="movie-detail__info-item">
                    <strong>Production:</strong> {movie.production_companies.map(company => company.name).join(', ')}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetailPage;
