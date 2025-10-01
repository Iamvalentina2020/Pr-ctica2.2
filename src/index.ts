/**
 * Main Index - Barrel Export
 * Exporta todas las capas de la arquitectura
 */

// Domain Layer
export * from './domain/models';

// Data Layer
export * from './data/datasources';
export * from './data/mappers';

// Infrastructure Layer
export * from './infrastructure/storage';

// Presentation Layer
export * from './presentation/components';
export * from './presentation/hooks';
export * from './presentation/store';
