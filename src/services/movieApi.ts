import type { Movie, MovieDetails, MovieResponse } from '../types/movie';

const API_KEY = '4e44d9029b1270a757cddc766a1bcb63'; // Demo API key - in production, use environment variables
const BASE_URL = 'https://api.themoviedb.org/3';

export class MovieApiService {
  private static instance: MovieApiService;

  public static getInstance(): MovieApiService {
    if (!MovieApiService.instance) {
      MovieApiService.instance = new MovieApiService();
    }
    return MovieApiService.instance;
  }

  private async fetchFromApi<T>(endpoint: string): Promise<T> {
    const url = `${BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}api_key=${API_KEY}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  async getPopularMovies(): Promise<Movie[]> {
    const response = await this.fetchFromApi<MovieResponse>('/movie/popular');
    return response.results;
  }

  async getTopRatedMovies(): Promise<Movie[]> {
    const response = await this.fetchFromApi<MovieResponse>('/movie/top_rated');
    return response.results;
  }

  async getUpcomingMovies(): Promise<Movie[]> {
    const response = await this.fetchFromApi<MovieResponse>('/movie/upcoming');
    return response.results;
  }

  async getMovieDetails(movieId: number): Promise<MovieDetails> {
    return await this.fetchFromApi<MovieDetails>(`/movie/${movieId}`);
  }

  async searchMovies(query: string): Promise<Movie[]> {
    const response = await this.fetchFromApi<MovieResponse>(`/search/movie?query=${encodeURIComponent(query)}`);
    return response.results;
  }

  static getImageUrl(path: string | null, size: string = 'w500'): string {
    if (!path) {
      // Return a placeholder image URL from a reliable service
      return `https://via.placeholder.com/500x750/333333/ffffff?text=No+Image`;
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }

  static getBackdropUrl(path: string | null): string {
    if (!path) {
      // Return a placeholder backdrop URL
      return `https://via.placeholder.com/1280x720/333333/ffffff?text=No+Backdrop`;
    }
    return `https://image.tmdb.org/t/p/w1280${path}`;
  }
}

export const movieApi = MovieApiService.getInstance();
