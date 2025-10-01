/**
 * Person Repository Implementation
 * Implementa todas las operaciones CRUD sobre personas
 * Principio de Dependency Inversion (SOLID)
 */

import { Person, LocalStorageTypes } from '@/domain/models';
import { IPersonRepository } from '@/domain/interfaces';
import { PeopleDataSource } from '../datasources';
import { PersonMapper } from '../mappers';
import { storageService } from '@/infrastructure/storage';

export class PersonRepository implements IPersonRepository {
  private people: Person[] = [];
  private initialized: boolean = false;

  /**
   * Inicializa los datos desde el datasource
   */
  private async initializeData(): Promise<void> {
    if (this.initialized) return;
    
    try {
      // Intentar cargar desde storage primero
      const storedPeople = await storageService.getItem<Person[]>(LocalStorageTypes.PEOPLE);
      
      if (storedPeople && storedPeople.length > 0) {
        this.people = storedPeople;
      } else {
        // Si no hay datos guardados, usar el datasource
        this.people = PeopleDataSource.map(dto => PersonMapper.toDomain(dto));
        await this.saveToStorage();
      }
      
      this.initialized = true;
    } catch (error) {
      console.error('Error initializing data:', error);
      // Usar datasource como fallback
      this.people = PeopleDataSource.map(dto => PersonMapper.toDomain(dto));
      this.initialized = true;
    }
  }

  /**
   * Guarda los datos en storage
   */
  private async saveToStorage(): Promise<void> {
    try {
      await storageService.setItem(LocalStorageTypes.PEOPLE, this.people);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  }

  /**
   * Genera un nuevo ID único
   */
  private generateId(): string {
    const maxId = this.people.reduce((max, person) => {
      const id = parseInt(person.id);
      return id > max ? id : max;
    }, 0);
    return (maxId + 1).toString();
  }

  /**
   * Obtiene todas las personas
   */
  async getAll(): Promise<Person[]> {
    if (this.people.length === 0) {
      await this.initializeData();
    }
    return [...this.people];
  }

  /**
   * Obtiene una persona por su ID
   */
  async getById(id: string): Promise<Person | null> {
    if (this.people.length === 0) {
      await this.initializeData();
    }
    const person = this.people.find(p => p.id === id);
    return person ? { ...person } : null;
  }

  /**
   * Crea una nueva persona
   */
  async create(personData: Omit<Person, 'id'>): Promise<Person> {
    const newPerson: Person = {
      ...personData,
      id: this.generateId(),
    };

    this.people.push(newPerson);
    await this.saveToStorage();
    
    return { ...newPerson };
  }

  /**
   * Actualiza una persona existente
   */
  async update(id: string, personData: Partial<Person>): Promise<Person> {
    const index = this.people.findIndex(p => p.id === id);
    
    if (index === -1) {
      throw new Error(`Person with id ${id} not found`);
    }

    this.people[index] = {
      ...this.people[index],
      ...personData,
      id, // Asegurar que el ID no cambie
    };

    await this.saveToStorage();
    
    return { ...this.people[index] };
  }

  /**
   * Elimina una persona
   */
  async delete(id: string): Promise<boolean> {
    const index = this.people.findIndex(p => p.id === id);
    
    if (index === -1) {
      return false;
    }

    this.people.splice(index, 1);
    await this.saveToStorage();
    
    return true;
  }

  /**
   * Busca personas por nombre
   */
  async searchByName(query: string): Promise<Person[]> {
    if (this.people.length === 0) {
      await this.initializeData();
    }

    const lowerQuery = query.toLowerCase().trim();
    
    if (!lowerQuery) {
      return this.getAll();
    }

    return this.people.filter(person =>
      person.name.toLowerCase().includes(lowerQuery)
    );
  }

  /**
   * Filtra personas por categoría
   */
  async filterByCategory(category: string): Promise<Person[]> {
    if (this.people.length === 0) {
      await this.initializeData();
    }

    if (!category) {
      return this.getAll();
    }

    return this.people.filter(person =>
      person.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Filtra personas por compañía
   */
  async filterByCompany(company: string): Promise<Person[]> {
    if (this.people.length === 0) {
      await this.initializeData();
    }

    if (!company) {
      return this.getAll();
    }

    return this.people.filter(person =>
      person.company.toLowerCase().includes(company.toLowerCase())
    );
  }

  /**
   * Filtra personas por nivel de felicidad
   */
  async filterByHappinessLevel(minLevel: number, maxLevel: number): Promise<Person[]> {
    if (this.people.length === 0) {
      await this.initializeData();
    }

    return this.people.filter(person => {
      const happiness = parseInt(person.levelOfHappiness);
      return happiness >= minLevel && happiness <= maxLevel;
    });
  }
}

// Crear instancia singleton lazy-loaded
let _instance: PersonRepository | null = null;

export const personRepository = {
  getInstance(): PersonRepository {
    if (!_instance) {
      _instance = new PersonRepository();
    }
    return _instance;
  },
  
  // Métodos proxy para usar directamente
  async getAll() {
    return this.getInstance().getAll();
  },
  async getById(id: string) {
    return this.getInstance().getById(id);
  },
  async create(person: Omit<Person, 'id'>) {
    return this.getInstance().create(person);
  },
  async update(id: string, person: Partial<Person>) {
    return this.getInstance().update(id, person);
  },
  async delete(id: string) {
    return this.getInstance().delete(id);
  },
  async searchByName(query: string) {
    return this.getInstance().searchByName(query);
  },
  async filterByCategory(category: string) {
    return this.getInstance().filterByCategory(category);
  },
  async filterByCompany(company: string) {
    return this.getInstance().filterByCompany(company);
  },
  async filterByHappinessLevel(minLevel: number, maxLevel: number) {
    return this.getInstance().filterByHappinessLevel(minLevel, maxLevel);
  },
};
