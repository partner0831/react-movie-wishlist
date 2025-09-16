import type { MovieCategory } from '../types/movie';

export const MOVIE_CATEGORIES: MovieCategory[] = [
  {
    id: 'popular',
    name: 'Popular Movies',
    endpoint: 'popular',
    fontFamily: 'Arial, sans-serif',
    buttonStyle: 'primary'
  },
  {
    id: 'top-rated',
    name: 'Top Rated Movies',
    endpoint: 'top_rated',
    fontFamily: 'Georgia, serif',
    buttonStyle: 'secondary'
  },
  {
    id: 'upcoming',
    name: 'Upcoming Movies',
    endpoint: 'upcoming',
    fontFamily: 'Courier New, monospace',
    buttonStyle: 'accent'
  }
];
