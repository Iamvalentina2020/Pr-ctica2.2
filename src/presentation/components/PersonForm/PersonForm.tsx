/**
 * Person Form Component
 * Formulario para agregar/editar personas con estilo neuromórfico
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Person } from '@/domain/models';
import { NeomorphicInput } from '../NeomorphicInput';
import { NeomorphicButton } from '../NeomorphicButton';
import { NeomorphicCard } from '../NeomorphicCard';
import {
  NeomorphicColors,
  Spacing,
  Typography,
} from '@/constants/neomorphic-theme';

interface PersonFormProps {
  visible: boolean;
  person?: Person | null;
  onSubmit: (person: Omit<Person, 'id'> | Person) => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  category: string;
  company: string;
  levelOfHappiness: string;
}

interface FormErrors {
  name?: string;
  category?: string;
  company?: string;
  levelOfHappiness?: string;
}

export const PersonForm: React.FC<PersonFormProps> = ({
  visible,
  person,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: 'employee',
    company: '',
    levelOfHappiness: '50',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (person) {
      setFormData({
        name: person.name,
        category: person.category,
        company: person.company,
        levelOfHappiness: person.levelOfHappiness,
      });
    } else {
      setFormData({
        name: '',
        category: 'employee',
        company: '',
        levelOfHappiness: '50',
      });
    }
    setErrors({});
  }, [person, visible]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }

    const happiness = parseInt(formData.levelOfHappiness);
    if (isNaN(happiness) || happiness < 0 || happiness > 100) {
      newErrors.levelOfHappiness = 'Happiness must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const personData = {
        ...(person && { id: person.id }),
        name: formData.name.trim(),
        category: formData.category,
        company: formData.company.trim(),
        levelOfHappiness: formData.levelOfHappiness,
      };

      onSubmit(personData as any);
    }
  };

  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.overlay}>
          <NeomorphicCard style={styles.formCard} padding="large">
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>
                  {person ? 'Edit Person' : 'Add New Person'}
                </Text>
                <TouchableOpacity onPress={onCancel}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>

              {/* Form Fields */}
              <NeomorphicInput
                label="Name *"
                placeholder="Enter name"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                error={errors.name}
              />

              {/* Category Selection */}
              <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Category *</Text>
                <View style={styles.categoryButtons}>
                  <TouchableOpacity
                    style={[
                      styles.categoryButton,
                      formData.category === 'manager' && styles.categoryButtonActive,
                    ]}
                    onPress={() => handleCategorySelect('manager')}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        formData.category === 'manager' && styles.categoryButtonTextActive,
                      ]}
                    >
                      Manager
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.categoryButton,
                      formData.category === 'employee' && styles.categoryButtonActive,
                    ]}
                    onPress={() => handleCategorySelect('employee')}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        formData.category === 'employee' && styles.categoryButtonTextActive,
                      ]}
                    >
                      Employee
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <NeomorphicInput
                label="Company *"
                placeholder="Enter company"
                value={formData.company}
                onChangeText={(text) => setFormData({ ...formData, company: text })}
                error={errors.company}
              />

              <NeomorphicInput
                label="Happiness Level (0-100) *"
                placeholder="50"
                value={formData.levelOfHappiness}
                onChangeText={(text) => setFormData({ ...formData, levelOfHappiness: text })}
                keyboardType="numeric"
                error={errors.levelOfHappiness}
              />

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <NeomorphicButton
                  title="Cancel"
                  onPress={onCancel}
                  variant="default"
                  style={styles.button}
                />
                <NeomorphicButton
                  title={person ? 'Update' : 'Create'}
                  onPress={handleSubmit}
                  variant="primary"
                  style={styles.button}
                />
              </View>
            </ScrollView>
          </NeomorphicCard>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: Spacing.md,
  },
  formCard: {
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h3,
  },
  closeButton: {
    fontSize: 24,
    color: NeomorphicColors.text.secondary,
    fontWeight: 'bold',
  },
  fieldContainer: {
    marginBottom: Spacing.md,
  },
  fieldLabel: {
    ...Typography.body2,
    marginBottom: Spacing.xs,
    color: NeomorphicColors.text.primary,
    fontWeight: '600',
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  categoryButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
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
  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  button: {
    flex: 1,
  },
});
