import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WishlistItem, Movie } from '../types/movie';

interface WishlistState {
  items: WishlistItem[];
  addToWishlist: (movie: Movie, category: string) => void;
  removeFromWishlist: (movieId: number) => void;
  isInWishlist: (movieId: number) => boolean;
  getWishlistCount: () => number;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addToWishlist: (movie: Movie, category: string) => {
        const { items, isInWishlist } = get();
        
        if (isInWishlist(movie.id)) {
          return; // Already in wishlist
        }
        
        const newItem: WishlistItem = {
          movie,
          category,
          addedAt: new Date(),
        };
        
        set({ items: [...items, newItem] });
      },
      
      removeFromWishlist: (movieId: number) => {
        const { items } = get();
        set({ items: items.filter(item => item.movie.id !== movieId) });
      },
      
      isInWishlist: (movieId: number) => {
        const { items } = get();
        return items.some(item => item.movie.id === movieId);
      },
      
      getWishlistCount: () => {
        const { items } = get();
        return items.length;
      },
      
      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'wishlist-storage', // unique name for localStorage
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          
          try {
            const parsed = JSON.parse(str);
            // Convert addedAt strings back to Date objects
            if (parsed.state && parsed.state.items) {
              parsed.state.items = parsed.state.items.map((item: any) => ({
                ...item,
                addedAt: new Date(item.addedAt)
              }));
            }
            return parsed;
          } catch (error) {
            console.error('Error parsing wishlist from localStorage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error('Error saving wishlist to localStorage:', error);
          }
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);
