import React, { useEffect, useState } from 'react';
import type { Movie } from '../types/movie';
import { movieApi } from '../services/movieApi';
import { MOVIE_CATEGORIES } from '../constants/movieCategories';
import MovieCarousel from '../components/MovieCarousel';
import './HomePage.scss';

interface CategoryMovies {
  [key: string]: {
    movies: Movie[];
    loading: boolean;
    error: string | null;
  };
}

const HomePage: React.FC = () => {
  const [categoryMovies, setCategoryMovies] = useState<CategoryMovies>({});

  useEffect(() => {
    const loadMovies = async () => {
      // Initialize loading states
      const initialState: CategoryMovies = {};
      MOVIE_CATEGORIES.forEach(category => {
        initialState[category.id] = {
          movies: [],
          loading: true,
          error: null
        };
      });
      setCategoryMovies(initialState);

      // Load movies for each category
      const promises = MOVIE_CATEGORIES.map(async (category) => {
        try {
          let movies: Movie[] = [];
          
          switch (category.endpoint) {
            case 'popular':
              movies = await movieApi.getPopularMovies();
              break;
            case 'top_rated':
              movies = await movieApi.getTopRatedMovies();
              break;
            case 'upcoming':
              movies = await movieApi.getUpcomingMovies();
              break;
            default:
              movies = await movieApi.getPopularMovies();
          }

          setCategoryMovies(prev => ({
            ...prev,
            [category.id]: {
              movies: movies.slice(0, 20), // Limit to 20 movies per category
              loading: false,
              error: null
            }
          }));
        } catch (error) {
          console.error(`Error loading ${category.name}:`, error);
          setCategoryMovies(prev => ({
            ...prev,
            [category.id]: {
              movies: [],
              loading: false,
              error: error instanceof Error ? error.message : 'Failed to load movies'
            }
          }));
        }
      });

      await Promise.all(promises);
    };

    loadMovies();
  }, []);

  return (
    <main className="home-page">
      <div className="home-page__hero">
        <div className="container">
          <h1 className="home-page__hero-title">Discover Amazing Movies</h1>
          <p className="home-page__hero-subtitle">
            Explore the latest, most popular, and highest-rated films from around the world
          </p>
        </div>
      </div>

      <div className="home-page__content">
        {MOVIE_CATEGORIES.map((category) => {
          const categoryData = categoryMovies[category.id];
          
          if (categoryData?.error) {
            return (
              <section key={category.id} className="home-page__error">
                <div className="container">
                  <h2>{category.name}</h2>
                  <p className="error-message">
                    Failed to load {category.name.toLowerCase()}: {categoryData.error}
                  </p>
                </div>
              </section>
            );
          }

          return (
            <MovieCarousel
              key={category.id}
              category={category}
              movies={categoryData?.movies || []}
              loading={categoryData?.loading || false}
            />
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
