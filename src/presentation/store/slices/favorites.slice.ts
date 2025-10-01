import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person, LocalStorageTypes } from '@/domain/models';
import { storageService } from '@/infrastructure/storage';

/**
 * Favorites Slice State
 */
interface FavoritesState {
  favorites: Person[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
  error: null,
};

/**
 * Favorites Slice
 * Gestiona el estado de los favoritos
 * Principio de Single Responsibility (SOLID)
 */
export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    /**
     * Agrega una persona a favoritos
     */
    addFavorite: (state, action: PayloadAction<Person>) => {
      const exists = state.favorites.find(p => p.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
        // Guardar en storage de forma asíncrona
        storageService.setItem(LocalStorageTypes.FAVORITES, state.favorites);
      }
    },
    
    /**
     * Elimina una persona de favoritos
     */
    removeFavorite: (state, action: PayloadAction<Person>) => {
      state.favorites = state.favorites.filter(p => p.id !== action.payload.id);
      // Guardar en storage de forma asíncrona
      storageService.setItem(LocalStorageTypes.FAVORITES, state.favorites);
    },
    
    /**
     * Establece la lista completa de favoritos
     */
    setFavorites: (state, action: PayloadAction<Person[]>) => {
      state.favorites = action.payload;
      state.loading = false;
      state.error = null;
      // Guardar en storage de forma asíncrona
      storageService.setItem(LocalStorageTypes.FAVORITES, action.payload);
    },
    
    /**
     * Alterna el estado de favorito de una persona
     */
    toggleFavorite: (state, action: PayloadAction<Person>) => {
      const index = state.favorites.findIndex(p => p.id === action.payload.id);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }
      // Guardar en storage de forma asíncrona
      storageService.setItem(LocalStorageTypes.FAVORITES, state.favorites);
    },
    
    /**
     * Establece el estado de carga
     */
    setFavoritesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    /**
     * Establece un error
     */
    setFavoritesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    /**
     * Limpia los favoritos
     */
    clearFavorites: (state) => {
      state.favorites = [];
      state.loading = false;
      state.error = null;
      storageService.removeItem(LocalStorageTypes.FAVORITES);
    },
  },
});

export const { 
  addFavorite, 
  removeFavorite, 
  setFavorites, 
  toggleFavorite,
  setFavoritesLoading, 
  setFavoritesError, 
  clearFavorites 
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
