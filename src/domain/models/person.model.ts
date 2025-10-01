/**
 * Person Model - Domain Entity
 * Representa la entidad de dominio Person siguiendo principios SOLID
 */
export interface Person {
  id: string;
  name: string;
  category: string;
  categoryImage?: string;
  company: string;
  companyImage?: string;
  levelOfHappiness: string;
}

/**
 * Person DTO - Data Transfer Object
 * Usado para transferencia de datos entre capas
 */
export interface PersonDTO {
  id: string;
  name: string;
  category: string;
  'category-image'?: string;
  company: string;
  'company-image'?: string;
  levelOfHappiness: string;
}
