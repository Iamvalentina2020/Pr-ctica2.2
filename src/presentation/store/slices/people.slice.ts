import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Person, LocalStorageTypes } from '@/domain/models';
import { storageService } from '@/infrastructure/storage';

/**
 * Filtros de búsqueda
 */
export interface PeopleFilters {
  searchQuery: string;
  category: string;
  company: string;
  minHappiness: number;
  maxHappiness: number;
}

/**
 * People Slice State
 */
interface PeopleState {
  people: Person[];
  filteredPeople: Person[];
  filters: PeopleFilters;
  loading: boolean;
  error: string | null;
  selectedPerson: Person | null;
}

const initialState: PeopleState = {
  people: [],
  filteredPeople: [],
  filters: {
    searchQuery: '',
    category: '',
    company: '',
    minHappiness: 0,
    maxHappiness: 100,
  },
  loading: false,
  error: null,
  selectedPerson: null,
};

/**
 * Aplica los filtros a la lista de personas
 */
const applyFilters = (people: Person[], filters: PeopleFilters): Person[] => {
  return people.filter(person => {
    // Filtro de búsqueda por nombre
    const matchesSearch = !filters.searchQuery || 
      person.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    // Filtro de categoría
    const matchesCategory = !filters.category || 
      person.category.toLowerCase() === filters.category.toLowerCase();
    
    // Filtro de compañía
    const matchesCompany = !filters.company || 
      person.company.toLowerCase().includes(filters.company.toLowerCase());
    
    // Filtro de nivel de felicidad
    const happiness = parseInt(person.levelOfHappiness);
    const matchesHappiness = happiness >= filters.minHappiness && 
      happiness <= filters.maxHappiness;
    
    return matchesSearch && matchesCategory && matchesCompany && matchesHappiness;
  });
};

/**
 * People Slice
 * Gestiona el estado de las personas
 * Principio de Single Responsibility (SOLID)
 */
export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    /**
     * Establece la lista de personas
     */
    setPeople: (state, action: PayloadAction<Person[]>) => {
      state.people = action.payload;
      state.filteredPeople = applyFilters(action.payload, state.filters);
      state.loading = false;
      state.error = null;
      // Guardar en storage de forma asíncrona
      storageService.setItem(LocalStorageTypes.PEOPLE, action.payload);
    },
    
    /**
     * Agrega una nueva persona
     */
    addPerson: (state, action: PayloadAction<Person>) => {
      state.people.push(action.payload);
      state.filteredPeople = applyFilters(state.people, state.filters);
      storageService.setItem(LocalStorageTypes.PEOPLE, state.people);
    },
    
    /**
     * Actualiza una persona existente
     */
    updatePerson: (state, action: PayloadAction<Person>) => {
      const index = state.people.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.people[index] = action.payload;
        state.filteredPeople = applyFilters(state.people, state.filters);
        storageService.setItem(LocalStorageTypes.PEOPLE, state.people);
      }
    },
    
    /**
     * Elimina una persona
     */
    deletePerson: (state, action: PayloadAction<string>) => {
      state.people = state.people.filter(p => p.id !== action.payload);
      state.filteredPeople = applyFilters(state.people, state.filters);
      storageService.setItem(LocalStorageTypes.PEOPLE, state.people);
    },
    
    /**
     * Establece la persona seleccionada
     */
    setSelectedPerson: (state, action: PayloadAction<Person | null>) => {
      state.selectedPerson = action.payload;
    },
    
    /**
     * Actualiza los filtros
     */
    setFilters: (state, action: PayloadAction<Partial<PeopleFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredPeople = applyFilters(state.people, state.filters);
    },
    
    /**
     * Limpia los filtros
     */
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredPeople = state.people;
    },
    
    /**
     * Establece el estado de carga
     */
    setPeopleLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    /**
     * Establece un error
     */
    setPeopleError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    /**
     * Limpia el estado
     */
    clearPeople: (state) => {
      state.people = [];
      state.filteredPeople = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { 
  setPeople,
  addPerson,
  updatePerson,
  deletePerson,
  setSelectedPerson,
  setFilters,
  clearFilters,
  setPeopleLoading, 
  setPeopleError, 
  clearPeople 
} = peopleSlice.actions;

export default peopleSlice.reducer;
