import { Subject } from 'rxjs';

/**
 * SubjectManager - Patrón Observer con RxJS
 * Implementa el principio de Single Responsibility (SOLID)
 * Gestiona la comunicación reactiva entre componentes
 */
export class SubjectManager<T> {
  private subject = new Subject<T>();

  /**
   * Obtiene el observable del subject
   * @returns Observable para suscribirse
   */
  get getSubject() {
    return this.subject.asObservable();
  }

  /**
   * Emite un nuevo valor al subject
   * @param value - Valor a emitir
   */
  set setSubject(value: T) {
    this.subject.next(value);
  }
}
