import React, { useEffect, useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Subscription } from 'rxjs';
import { SubjectManager } from '@/domain/models';

/**
 * Custom Modal Props
 */
interface CustomModalProps {
  children: React.ReactNode;
}

/**
 * Modal Subjects
 * Gestión reactiva de la apertura/cierre del modal
 * Patrón Observer con RxJS
 */
export const modalOpenSubject$ = new SubjectManager<boolean>();
export const modalCloseSubject$ = new SubjectManager<boolean>();

/**
 * Custom Modal Component
 * Modal reutilizable con gestión reactiva
 * Principio de Single Responsibility (SOLID)
 */
export const CustomModal: React.FC<CustomModalProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Suscripciones a los subjects
    const openSubscription: Subscription = modalOpenSubject$.getSubject.subscribe(() => {
      setVisible(true);
    });

    const closeSubscription: Subscription = modalCloseSubject$.getSubject.subscribe(() => {
      setVisible(false);
    });

    // Cleanup
    return () => {
      openSubscription.unsubscribe();
      closeSubscription.unsubscribe();
    };
  }, []);

  const handleClose = () => {
    modalCloseSubject$.setSubject = false;
    setVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleClose}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
});
