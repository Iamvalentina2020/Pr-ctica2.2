import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Person } from '@/domain/models';
import { useAppDispatch, useAppSelector, toggleFavorite } from '@/presentation/store';
import { usePeopleCRUD } from '@/presentation/hooks';
import { NeomorphicCard } from '../NeomorphicCard';
import { NeomorphicButton } from '../NeomorphicButton';
import {
  NeomorphicColors,
  Spacing,
  Typography,
} from '@/constants/neomorphic-theme';

interface PeopleTableProps {
  onEdit: (person: Person) => void;
}

/**
 * PeopleTable Component
 * Muestra la lista de personas con opción de marcar como favorito
 * Principio de Single Responsibility (SOLID)
 */
export const PeopleTable: React.FC<PeopleTableProps> = ({ onEdit }) => {
  const dispatch = useAppDispatch();
  const filteredPeople = useAppSelector((state) => state.people.filteredPeople);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { deletePerson: deletePers } = usePeopleCRUD();

  /**
   * Verifica si una persona está en favoritos
   */
  const isFavorite = (person: Person): boolean => {
    return favorites.some((fav) => fav.id === person.id);
  };

  /**
   * Maneja el toggle de favorito
   */
  const handleToggleFavorite = (person: Person) => {
    dispatch(toggleFavorite(person));
  };

  /**
   * Maneja la eliminación de una persona
   */
  const handleDelete = async (person: Person) => {
    await deletePers(person.id, person.name);
  };

  /**
   * Maneja la edición de una persona
   */
  const handleEdit = (person: Person) => {
    onEdit(person);
  };

  /**
   * Obtiene el color según el nivel de felicidad
   */
  const getHappinessColor = (level: string): string => {
    const happiness = parseInt(level);
    if (happiness >= 70) return NeomorphicColors.secondary.main;
    if (happiness >= 40) return NeomorphicColors.primary.main;
    return NeomorphicColors.accent.main;
  };

  /**
   * Renderiza cada item de la lista
   */
  const renderItem = ({ item }: { item: Person }) => {
    const isExpanded = expandedId === item.id;

    return (
      <NeomorphicCard style={styles.card} padding="medium" elevation="small">
        <TouchableOpacity
          onPress={() => setExpandedId(isExpanded ? null : item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.cardHeader}>
            {/* Favorite Checkbox */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => handleToggleFavorite(item)}
            >
              <View style={[styles.checkbox, isFavorite(item) && styles.checkboxChecked]}>
                {isFavorite(item) && <Text style={styles.checkmark}>★</Text>}
              </View>
            </TouchableOpacity>

            {/* Name */}
            <View style={styles.nameContainer}>
              <Text style={styles.nameText} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>

            {/* Happiness Badge */}
            <View
              style={[
                styles.happinessBadge,
                { backgroundColor: getHappinessColor(item.levelOfHappiness) },
              ]}
            >
              <Text style={styles.happinessText}>{item.levelOfHappiness}</Text>
            </View>
          </View>

          {/* Expanded Details */}
          {isExpanded && (
            <View style={styles.expandedContent}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Company:</Text>
                <Text style={styles.detailValue}>{item.company}</Text>
              </View>

              <View style={styles.actionButtons}>
                <NeomorphicButton
                  title="Edit"
                  onPress={() => handleEdit(item)}
                  variant="secondary"
                  size="small"
                  style={styles.actionButton}
                />
                <NeomorphicButton
                  title="Delete"
                  onPress={() => handleDelete(item)}
                  variant="accent"
                  size="small"
                  style={styles.actionButton}
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </NeomorphicCard>
    );
  };

  /**
   * Renderiza mensaje vacío
   */
  const renderEmpty = () => (
    <NeomorphicCard style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No people found</Text>
      <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
    </NeomorphicCard>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredPeople}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: NeomorphicColors.neomorphic.background,
  },
  listContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  card: {
    marginBottom: Spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: Spacing.md,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderWidth: 2,
    borderColor: NeomorphicColors.border.main,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: NeomorphicColors.neomorphic.cardBackground,
  },
  checkboxChecked: {
    backgroundColor: NeomorphicColors.secondary.main,
    borderColor: NeomorphicColors.secondary.main,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  nameContainer: {
    flex: 1,
  },
  nameText: {
    ...Typography.body1,
    fontWeight: '600',
    color: NeomorphicColors.text.primary,
    marginBottom: 4,
  },
  categoryText: {
    ...Typography.caption,
    color: NeomorphicColors.text.hint,
    textTransform: 'capitalize',
  },
  happinessBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
    minWidth: 50,
    alignItems: 'center',
  },
  happinessText: {
    ...Typography.body2,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  expandedContent: {
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: NeomorphicColors.border.light,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  detailLabel: {
    ...Typography.body2,
    color: NeomorphicColors.text.secondary,
    fontWeight: '600',
    marginRight: Spacing.sm,
  },
  detailValue: {
    ...Typography.body2,
    color: NeomorphicColors.text.primary,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: Spacing.xxl,
    marginTop: Spacing.xxl,
  },
  emptyText: {
    ...Typography.h4,
    color: NeomorphicColors.text.secondary,
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    ...Typography.body2,
    color: NeomorphicColors.text.hint,
  },
});
