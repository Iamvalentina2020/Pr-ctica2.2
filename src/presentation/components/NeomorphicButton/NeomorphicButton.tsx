/**
 * Neomorphic Button Component
 * Botón con estilo neuromórfico
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import {
  NeomorphicColors,
  NeomorphicShadows,
} from '@/constants/neomorphic-theme';

interface NeomorphicButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary' | 'accent' | 'default';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const NeomorphicButton: React.FC<NeomorphicButtonProps> = ({
  title,
  onPress,
  variant = 'default',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {

  const getTextColor = () => {
    if (variant === 'default') {
      return NeomorphicColors.text.primary;
    }
    return '#FFFFFF';
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          fontSize: 14,
        };
      case 'large':
        return {
          paddingVertical: 16,
          paddingHorizontal: 32,
          fontSize: 18,
        };
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 24,
          fontSize: 16,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const getBackgroundColor = () => {
    if (variant === 'default') {
      return NeomorphicColors.neomorphic.cardBackground;
    }
    switch (variant) {
      case 'primary':
        return NeomorphicColors.primary.main;
      case 'secondary':
        return NeomorphicColors.secondary.main;
      case 'accent':
        return NeomorphicColors.accent.main;
      default:
        return NeomorphicColors.neomorphic.cardBackground;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.container,
        styles.button,
        variant === 'default' ? styles.neomorphic : null,
        {
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          backgroundColor: getBackgroundColor(),
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            { fontSize: sizeStyles.fontSize, color: getTextColor() },
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  neomorphic: {
    backgroundColor: NeomorphicColors.neomorphic.cardBackground,
    ...NeomorphicShadows.medium,
  },
  text: {
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
});
