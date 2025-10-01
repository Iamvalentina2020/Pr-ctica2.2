/**
 * Use People CRUD Hook
 * Hook personalizado para operaciones CRUD sobre personas
 */

import { useCallback } from 'react';
import { useAppDispatch } from '../store';
import { addPerson, updatePerson, deletePerson } from '../store';
import { personRepository } from '@/data/repositories';
import { Person } from '@/domain/models';
import { Alert } from 'react-native';

export const usePeopleCRUD = () => {
  const dispatch = useAppDispatch();

  /**
   * Crea una nueva persona
   */
  const createPerson = useCallback(
    async (personData: Omit<Person, 'id'>) => {
      try {
        const created = await personRepository.create(personData);
        dispatch(addPerson(created));
        return { success: true, data: created };
      } catch (error) {
        console.error('Error creating person:', error);
        Alert.alert('Error', 'Failed to create person');
        return { success: false, error };
      }
    },
    [dispatch]
  );

  /**
   * Actualiza una persona existente
   */
  const updatePersonData = useCallback(
    async (id: string, personData: Partial<Person>) => {
      try {
        const updated = await personRepository.update(id, personData);
        dispatch(updatePerson(updated));
        return { success: true, data: updated };
      } catch (error) {
        console.error('Error updating person:', error);
        Alert.alert('Error', 'Failed to update person');
        return { success: false, error };
      }
    },
    [dispatch]
  );

  /**
   * Elimina una persona
   */
  const deletePersonData = useCallback(
    async (id: string, personName: string) => {
      return new Promise<{ success: boolean }>((resolve) => {
        Alert.alert(
          'Delete Person',
          `Are you sure you want to delete ${personName}?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => resolve({ success: false }),
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: async () => {
                try {
                  await personRepository.delete(id);
                  dispatch(deletePerson(id));
                  resolve({ success: true });
                } catch (error) {
                  console.error('Error deleting person:', error);
                  Alert.alert('Error', 'Failed to delete person');
                  resolve({ success: false });
                }
              },
            },
          ]
        );
      });
    },
    [dispatch]
  );

  return {
    createPerson,
    updatePerson: updatePersonData,
    deletePerson: deletePersonData,
  };
};
