/**
 * Store Index
 * Exporta el store y sus tipos
 */
export * from './store';
export * from './slices';

// Re-exportar acciones específicas para facilitar imports
export {
  setPeople,
  addPerson,
  updatePerson,
  deletePerson,
  setSelectedPerson,
  setFilters,
  clearFilters,
  setPeopleLoading,
  setPeopleError,
  clearPeople,
} from './slices/people.slice';

export {
  addFavorite,
  removeFavorite,
  toggleFavorite,
  clearFavorites,
} from './slices/favorites.slice';
