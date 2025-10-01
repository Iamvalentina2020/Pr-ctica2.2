import { Person, PersonDTO } from '@/domain/models';

/**
 * Person Mapper
 * Implementa el patrón Mapper para transformar DTOs a entidades de dominio
 * Principio de Single Responsibility (SOLID)
 */
export class PersonMapper {
  /**
   * Convierte un PersonDTO a Person
   * @param dto - PersonDTO a convertir
   * @returns Person - Entidad de dominio
   */
  static toDomain(dto: PersonDTO): Person {
    return {
      id: dto.id,
      name: dto.name,
      category: dto.category,
      categoryImage: dto['category-image'],
      company: dto.company,
      companyImage: dto['company-image'],
      levelOfHappiness: dto.levelOfHappiness,
    };
  }

  /**
   * Convierte un array de PersonDTO a array de Person
   * @param dtos - Array de PersonDTO
   * @returns Array de Person
   */
  static toDomainList(dtos: PersonDTO[]): Person[] {
    return dtos.map(dto => this.toDomain(dto));
  }

  /**
   * Convierte un Person a PersonDTO
   * @param person - Person a convertir
   * @returns PersonDTO
   */
  static toDTO(person: Person): PersonDTO {
    return {
      id: person.id,
      name: person.name,
      category: person.category,
      'category-image': person.categoryImage,
      company: person.company,
      'company-image': person.companyImage,
      levelOfHappiness: person.levelOfHappiness,
    };
  }
}
