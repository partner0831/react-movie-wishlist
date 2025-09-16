import React, { useRef } from 'react';
import type { Movie, MovieCategory } from '../types/movie';
import MovieCard from './MovieCard';
import './MovieCarousel.scss';

interface MovieCarouselProps {
  category: MovieCategory;
  movies: Movie[];
  loading?: boolean;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ category, movies, loading }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Width of card + gap
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <section className="movie-carousel" style={{ fontFamily: category.fontFamily }}>
        <div className="container">
          <h2 className="movie-carousel__title">{category.name}</h2>
          <div className="loading">
            <div className="spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <section className="movie-carousel" style={{ fontFamily: category.fontFamily }}>
        <div className="container">
          <h2 className="movie-carousel__title">{category.name}</h2>
          <p className="movie-carousel__empty">No movies available in this category.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="movie-carousel" style={{ fontFamily: category.fontFamily }}>
      <div className="container">
        <h2 className="movie-carousel__title">{category.name}</h2>
        
        <div className="movie-carousel__wrapper">
          <button 
            className="movie-carousel__nav movie-carousel__nav--left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            &#8249;
          </button>
          
          <div 
            className="movie-carousel__container"
            ref={scrollContainerRef}
          >
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                category={category.id}
              />
            ))}
          </div>
          
          <button 
            className="movie-carousel__nav movie-carousel__nav--right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
};

export default MovieCarousel;
