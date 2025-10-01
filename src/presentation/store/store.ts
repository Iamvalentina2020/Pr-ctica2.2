import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import peopleReducer from './slices/people.slice';
import favoritesReducer from './slices/favorites.slice';

/**
 * Redux Store Configuration
 * Configuración centralizada del store
 * Principio de Single Responsibility (SOLID)
 */
export const store = configureStore({
  reducer: {
    people: peopleReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorar acciones que contienen valores no serializables
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

/**
 * Root State Type
 * Tipo inferido del store
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * App Dispatch Type
 * Tipo inferido del dispatch
 */
export type AppDispatch = typeof store.dispatch;

/**
 * Typed Hooks
 * Hooks tipados para usar en componentes
 * Principio DRY: Evita repetir tipos en cada componente
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
