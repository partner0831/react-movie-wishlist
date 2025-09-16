import React from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';
import { MovieApiService } from '../services/movieApi';
import './MovieCard.scss';

interface MovieCardProps {
  movie: Movie;
  category: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, category }) => {
  const imageUrl = MovieApiService.getImageUrl(movie.poster_path);
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA';

  return (
    <Link 
      to={`/movie/${movie.id}`} 
      state={{ category }}
      className="movie-card"
    >
      <div className="movie-card__image-container">
        <img 
          src={imageUrl} 
          alt={movie.title}
          className="movie-card__image"
          loading="lazy"
        />
        <div className="movie-card__overlay">
          <div className="movie-card__rating">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
      
      <div className="movie-card__content">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">{year}</p>
        <p className="movie-card__overview">
          {movie.overview.length > 100 
            ? `${movie.overview.substring(0, 100)}...` 
            : movie.overview
          }
        </p>
      </div>
    </Link>
  );
};

export default MovieCard;
