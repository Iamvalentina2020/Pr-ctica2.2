import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import { 
  PeopleTable, 
  CustomModal, 
  FavoritesTable, 
  SearchAndFilter,
  PersonForm,
  NeomorphicButton 
} from '@/presentation/components';
import { usePeopleData, usePeopleCRUD } from '@/presentation/hooks';
import { modalOpenSubject$ } from '@/presentation/components/CustomModal/CustomModal';
import { Person } from '@/domain/models';
import {
  NeomorphicColors,
  Spacing,
  Typography,
} from '@/constants/neomorphic-theme';

/**
 * Home Screen
 * Pantalla principal que muestra la lista de personas con CRUD completo
 * Arquitectura limpia: Presentation Layer
 */
export default function HomeScreen() {
  const [showPersonForm, setShowPersonForm] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  // Hooks personalizados
  usePeopleData();
  const { createPerson, updatePerson } = usePeopleCRUD();

  /**
   * Abre el modal de favoritos
   */
  const handleOpenFavorites = () => {
    modalOpenSubject$.setSubject = true;
  };

  /**
   * Abre el formulario para agregar una nueva persona
   */
  const handleAddPerson = () => {
    setSelectedPerson(null);
    setShowPersonForm(true);
  };

  /**
   * Abre el formulario para editar una persona
   */
  const handleEditPerson = (person: Person) => {
    setSelectedPerson(person);
    setShowPersonForm(true);
  };

  /**
   * Maneja el envío del formulario
   */
  const handleFormSubmit = async (personData: Omit<Person, 'id'> | Person) => {
    if ('id' in personData && personData.id) {
      // Actualizar persona existente
      await updatePerson(personData.id, personData);
    } else {
      // Crear nueva persona
      await createPerson(personData);
    }
    setShowPersonForm(false);
    setSelectedPerson(null);
  };

  /**
   * Cancela la edición/creación
   */
  const handleFormCancel = () => {
    setShowPersonForm(false);
    setSelectedPerson(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Modal de Favoritos */}
        <CustomModal>
          <FavoritesTable />
        </CustomModal>

        {/* Formulario de Persona */}
        <PersonForm
          visible={showPersonForm}
          person={selectedPerson}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.title}>People Manager</Text>
            <Text style={styles.subtitle}>Clean Architecture & CRUD</Text>
          </View>
          
          <View style={styles.headerActions}>
            <NeomorphicButton
              title="❤️ Favorites"
              onPress={handleOpenFavorites}
              variant="secondary"
              size="small"
              style={styles.headerButton}
            />
            <NeomorphicButton
              title="+ Add Person"
              onPress={handleAddPerson}
              variant="primary"
              size="small"
              style={styles.headerButton}
            />
          </View>
        </View>

        {/* Content */}
        <ScrollView 
          style={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Búsqueda y Filtros */}
          <SearchAndFilter />

          {/* Tabla de Personas */}
          <PeopleTable onEdit={handleEditPerson} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: NeomorphicColors.neomorphic.background,
  },
  container: {
    flex: 1,
    backgroundColor: NeomorphicColors.neomorphic.background,
  },
  header: {
    backgroundColor: NeomorphicColors.neomorphic.cardBackground,
    padding: Spacing.lg,
    paddingTop: Spacing.md,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: NeomorphicColors.neomorphic.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  headerTop: {
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.h2,
    color: NeomorphicColors.primary.main,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body2,
    color: NeomorphicColors.text.hint,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerButton: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
});
