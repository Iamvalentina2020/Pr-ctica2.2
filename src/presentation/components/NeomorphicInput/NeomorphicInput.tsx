/**
 * Neomorphic Input Component
 * Input con estilo neuromórfico
 */

import React from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import {
  NeomorphicColors,
  NeomorphicShadows,
  NeomorphicInputStyles,
  Spacing,
  Typography,
} from '@/constants/neomorphic-theme';

interface NeomorphicInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const NeomorphicInput: React.FC<NeomorphicInputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.inputError]}>
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={NeomorphicColors.text.hint}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.body2,
    marginBottom: Spacing.xs,
    color: NeomorphicColors.text.primary,
    fontWeight: '600',
  },
  inputContainer: {
    ...NeomorphicInputStyles.base,
    ...NeomorphicShadows.inner,
  },
  input: {
    ...NeomorphicInputStyles.base,
    backgroundColor: 'transparent',
  },
  inputError: {
    borderWidth: 1,
    borderColor: NeomorphicColors.accent.main,
  },
  errorText: {
    ...Typography.caption,
    color: NeomorphicColors.accent.main,
    marginTop: Spacing.xs,
  },
});
