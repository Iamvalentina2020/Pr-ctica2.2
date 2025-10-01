/**
 * Search and Filter Component
 * Componente de búsqueda y filtros con estilo neuromórfico
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector, setFilters, clearFilters } from '@/presentation/store';
import { NeomorphicInput } from '../NeomorphicInput';
import { NeomorphicButton } from '../NeomorphicButton';
import { NeomorphicCard } from '../NeomorphicCard';
import {
  NeomorphicColors,
  Spacing,
  Typography,
} from '@/constants/neomorphic-theme';

export const SearchAndFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.people.filters);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (text: string) => {
    dispatch(setFilters({ searchQuery: text }));
  };

  const handleCategoryFilter = (category: string) => {
    dispatch(setFilters({ 
      category: filters.category === category ? '' : category 
    }));
  };

  const handleHappinessFilter = (min: string, max: string) => {
    const minValue = min ? parseInt(min) : 0;
    const maxValue = max ? parseInt(max) : 100;
    
    if (!isNaN(minValue) && !isNaN(maxValue)) {
      dispatch(setFilters({ 
        minHappiness: minValue,
        maxHappiness: maxValue
      }));
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = 
    filters.searchQuery !== '' ||
    filters.category !== '' ||
    filters.company !== '' ||
    filters.minHappiness !== 0 ||
    filters.maxHappiness !== 100;

  return (
    <NeomorphicCard style={styles.container}>
      {/* Search Bar */}
      <NeomorphicInput
        placeholder="🔍 Search by name..."
        value={filters.searchQuery}
        onChangeText={handleSearchChange}
        containerStyle={styles.searchContainer}
      />

      {/* Filter Toggle */}
      <View style={styles.filterHeader}>
        <TouchableOpacity
          onPress={() => setShowFilters(!showFilters)}
          style={styles.filterToggle}
        >
          <Text style={styles.filterToggleText}>
            {showFilters ? '▼' : '▶'} Filters
          </Text>
          {hasActiveFilters && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>●</Text>
            </View>
          )}
        </TouchableOpacity>

        {hasActiveFilters && (
          <NeomorphicButton
            title="Clear"
            onPress={handleClearFilters}
            variant="accent"
            size="small"
          />
        )}
      </View>

      {/* Filters Panel */}
      {showFilters && (
        <View style={styles.filtersPanel}>
          {/* Category Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Category</Text>
            <View style={styles.categoryButtons}>
              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  filters.category === 'manager' && styles.categoryButtonActive,
                ]}
                onPress={() => handleCategoryFilter('manager')}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    filters.category === 'manager' && styles.categoryButtonTextActive,
                  ]}
                >
                  Manager
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.categoryButton,
                  filters.category === 'employee' && styles.categoryButtonActive,
                ]}
                onPress={() => handleCategoryFilter('employee')}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    filters.category === 'employee' && styles.categoryButtonTextActive,
                  ]}
                >
                  Employee
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Company Filter */}
          <View style={styles.filterSection}>
            <NeomorphicInput
              label="Company"
              placeholder="Filter by company..."
              value={filters.company}
              onChangeText={(text) => dispatch(setFilters({ company: text }))}
            />
          </View>

          {/* Happiness Level Filter */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Happiness Level</Text>
            <View style={styles.happinessContainer}>
              <NeomorphicInput
                placeholder="Min"
                value={filters.minHappiness.toString()}
                onChangeText={(text) => handleHappinessFilter(text, filters.maxHappiness.toString())}
                keyboardType="numeric"
                containerStyle={styles.happinessInput}
              />
              <Text style={styles.happinessSeparator}>-</Text>
              <NeomorphicInput
                placeholder="Max"
                value={filters.maxHappiness.toString()}
                onChangeText={(text) => handleHappinessFilter(filters.minHappiness.toString(), text)}
                keyboardType="numeric"
                containerStyle={styles.happinessInput}
              />
            </View>
          </View>
        </View>
      )}
    </NeomorphicCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  searchContainer: {
    marginBottom: Spacing.sm,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  filterToggle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterToggleText: {
    ...Typography.body1,
    fontWeight: '600',
    color: NeomorphicColors.text.primary,
  },
  filterBadge: {
    marginLeft: Spacing.xs,
  },
  filterBadgeText: {
    color: NeomorphicColors.accent.main,
    fontSize: 20,
  },
  filtersPanel: {
    marginTop: Spacing.md,
  },
  filterSection: {
    marginBottom: Spacing.md,
  },
  filterLabel: {
    ...Typography.body2,
    fontWeight: '600',
    color: NeomorphicColors.text.primary,
    marginBottom: Spacing.xs,
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: NeomorphicColors.neomorphic.cardBackground,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: NeomorphicColors.border.light,
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: NeomorphicColors.primary.main,
    borderColor: NeomorphicColors.primary.main,
  },
  categoryButtonText: {
    ...Typography.body2,
    color: NeomorphicColors.text.primary,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  happinessContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  happinessInput: {
    flex: 1,
  },
  happinessSeparator: {
    ...Typography.body1,
    marginHorizontal: Spacing.sm,
    color: NeomorphicColors.text.secondary,
  },
});
