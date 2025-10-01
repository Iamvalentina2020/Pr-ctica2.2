/**
 * Person Repository Interface
 * Define el contrato para operaciones CRUD sobre personas
 * Principio de Dependency Inversion (SOLID)
 */

import { Person } from '../models';

export interface IPersonRepository {
  /**
   * Obtiene todas las personas
   */
  getAll(): Promise<Person[]>;

  /**
   * Obtiene una persona por su ID
   */
  getById(id: string): Promise<Person | null>;

  /**
   * Crea una nueva persona
   */
  create(person: Omit<Person, 'id'>): Promise<Person>;

  /**
   * Actualiza una persona existente
   */
  update(id: string, person: Partial<Person>): Promise<Person>;

  /**
   * Elimina una persona
   */
  delete(id: string): Promise<boolean>;

  /**
   * Busca personas por nombre
   */
  searchByName(query: string): Promise<Person[]>;

  /**
   * Filtra personas por categoría
   */
  filterByCategory(category: string): Promise<Person[]>;

  /**
   * Filtra personas por compañía
   */
  filterByCompany(company: string): Promise<Person[]>;

  /**
   * Filtra personas por nivel de felicidad
   */
  filterByHappinessLevel(minLevel: number, maxLevel: number): Promise<Person[]>;
}
