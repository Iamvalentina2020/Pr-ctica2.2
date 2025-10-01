import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage Service Interface
 * Define el contrato para servicios de almacenamiento
 * Principio de Dependency Inversion (SOLID)
 */
export interface IStorageService {
  setItem<T>(key: string, value: T): Promise<void>;
  getItem<T>(key: string): Promise<T | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

/**
 * AsyncStorage Service Implementation
 * Implementa el servicio de almacenamiento usando AsyncStorage
 * Principio de Single Responsibility (SOLID)
 */
export class AsyncStorageService implements IStorageService {
  /**
   * Guarda un valor en el almacenamiento
   * @param key - Clave de almacenamiento
   * @param value - Valor a guardar
   */
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene un valor del almacenamiento
   * @param key - Clave de almacenamiento
   * @returns Valor almacenado o null
   */
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  /**
   * Elimina un valor del almacenamiento
   * @param key - Clave de almacenamiento
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  }

  /**
   * Limpia todo el almacenamiento
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }
}

// Singleton instance
export const storageService = new AsyncStorageService();
