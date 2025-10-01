import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector, setPeople, setFavorites } from '@/presentation/store';
import { PeopleDataSource } from '@/data/datasources';
import { PersonMapper } from '@/data/mappers';
import { storageService } from '@/infrastructure/storage';
import { LocalStorageTypes, Person } from '@/domain/models';

/**
 * usePeopleData Hook
 * Hook personalizado para cargar datos de personas
 * Principio de Single Responsibility (SOLID)
 * Principio DRY: Lógica de carga centralizada
 */
export const usePeopleData = () => {
  const dispatch = useAppDispatch();
  const people = useAppSelector((state) => state.people.people);
  const favorites = useAppSelector((state) => state.favorites.favorites);

  /**
   * Carga los datos de personas
   */
  const loadPeopleData = useCallback(async () => {
    try {
      // Intentar cargar desde storage
      const storedPeople = await storageService.getItem<Person[]>(LocalStorageTypes.PEOPLE);
      
      if (storedPeople && Array.isArray(storedPeople)) {
        dispatch(setPeople(storedPeople));
      } else {
        // Si no hay datos en storage, usar datasource
        const mappedPeople = PersonMapper.toDomainList(PeopleDataSource);
        dispatch(setPeople(mappedPeople));
      }
    } catch (error) {
      console.error('Error loading people data:', error);
      // En caso de error, usar datasource
      const mappedPeople = PersonMapper.toDomainList(PeopleDataSource);
      dispatch(setPeople(mappedPeople));
    }
  }, [dispatch]);

  /**
   * Carga los datos de favoritos
   */
  const loadFavoritesData = useCallback(async () => {
    try {
      const storedFavorites = await storageService.getItem<Person[]>(LocalStorageTypes.FAVORITES);
      
      if (storedFavorites && Array.isArray(storedFavorites)) {
        dispatch(setFavorites(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites data:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    // Solo ejecutar en el cliente (no en SSR)
    if (typeof window !== 'undefined') {
      loadPeopleData();
      loadFavoritesData();
    }
  }, [loadPeopleData, loadFavoritesData]);

  return {
    people,
    favorites,
    loadPeopleData,
    loadFavoritesData,
  };
};
