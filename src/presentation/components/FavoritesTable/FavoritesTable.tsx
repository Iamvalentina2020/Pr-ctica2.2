import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Person } from '@/domain/models';
import { useAppDispatch, useAppSelector } from '@/presentation/store';
import { removeFavorite } from '@/presentation/store';

/**
 * FavoritesTable Component
 * Muestra la lista de personas favoritas con opción de eliminar
 * Principio de Single Responsibility (SOLID)
 */
export const FavoritesTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);

  /**
   * Maneja la eliminación de un favorito
   */
  const handleRemoveFavorite = (person: Person) => {
    dispatch(removeFavorite(person));
  };

  /**
   * Renderiza cada item de la lista
   */
  const renderItem = ({ item }: { item: Person }) => (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleRemoveFavorite(item)}
      >
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
      
      <View style={styles.cellContainer}>
        <Text style={styles.cellText} numberOfLines={1}>{item.name}</Text>
      </View>
      
      <View style={styles.cellContainer}>
        <Text style={styles.cellText} numberOfLines={1}>{item.category}</Text>
      </View>
      
      <View style={styles.cellContainer}>
        <Text style={styles.cellText} numberOfLines={1}>{item.company}</Text>
      </View>
      
      <View style={styles.cellSmall}>
        <Text style={styles.cellText}>{item.levelOfHappiness}</Text>
      </View>
    </View>
  );

  /**
   * Renderiza el header de la tabla
   */
  const renderHeader = () => (
    <View style={[styles.row, styles.headerRow]}>
      <View style={styles.deleteButton}>
        <Text style={styles.headerText}></Text>
      </View>
      <View style={styles.cellContainer}>
        <Text style={styles.headerText}>Name</Text>
      </View>
      <View style={styles.cellContainer}>
        <Text style={styles.headerText}>Category</Text>
      </View>
      <View style={styles.cellContainer}>
        <Text style={styles.headerText}>Company</Text>
      </View>
      <View style={styles.cellSmall}>
        <Text style={styles.headerText}>Happiness</Text>
      </View>
    </View>
  );

  /**
   * Renderiza mensaje cuando no hay favoritos
   */
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No favorites yet</Text>
      <Text style={styles.emptySubtext}>Add some people to your favorites!</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      {favorites.length > 0 ? (
        <>
          {renderHeader()}
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />
        </>
      ) : (
        renderEmpty()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    color: '#333',
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerRow: {
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 2,
    borderBottomColor: '#d0d0d0',
  },
  deleteButton: {
    width: 40,
    alignItems: 'center',
  },
  deleteIcon: {
    fontSize: 20,
  },
  cellContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  cellSmall: {
    width: 80,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  cellText: {
    fontSize: 14,
    color: '#333',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
  },
});
