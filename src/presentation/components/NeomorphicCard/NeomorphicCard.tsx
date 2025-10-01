/**
 * Neomorphic Card Component
 * Tarjeta con estilo neuromórfico
 */

import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {
  NeomorphicColors,
  NeomorphicShadows,
  NeomorphicCardStyles,
  Spacing,
} from '@/constants/neomorphic-theme';

interface NeomorphicCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'none' | 'small' | 'medium' | 'large';
  elevation?: 'small' | 'medium' | 'large';
}

export const NeomorphicCard: React.FC<NeomorphicCardProps> = ({
  children,
  style,
  padding = 'medium',
  elevation = 'medium',
}) => {
  const getPaddingStyle = () => {
    switch (padding) {
      case 'none':
        return 0;
      case 'small':
        return Spacing.sm;
      case 'large':
        return Spacing.lg;
      default:
        return Spacing.md;
    }
  };

  const getElevationStyle = () => {
    switch (elevation) {
      case 'small':
        return NeomorphicShadows.small;
      case 'large':
        return NeomorphicShadows.large;
      default:
        return NeomorphicShadows.medium;
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          padding: getPaddingStyle(),
          ...getElevationStyle(),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    ...NeomorphicCardStyles.base,
    backgroundColor: NeomorphicColors.neomorphic.cardBackground,
  },
});
