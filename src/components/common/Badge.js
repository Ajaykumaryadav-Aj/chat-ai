/**
 * Badge.js — Feature Tag / Status Pill Component
 *
 * Renders badges like "NEW", "FREE", "POPULAR" with custom color variants.
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius, typography } from '../../theme';

const Badge = ({ label, variant = 'green' }) => {
  let gradientColors = ['rgba(0, 204, 119, 0.35)', 'rgba(0, 204, 119, 0.15)'];
  let borderColor = 'rgba(0, 204, 119, 0.50)';
  let textColor = '#66EEBB';

  if (variant === 'blue') {
    gradientColors = ['rgba(26, 106, 255, 0.35)', 'rgba(26, 106, 255, 0.15)'];
    borderColor = 'rgba(26, 106, 255, 0.50)';
    textColor = '#88B8FF';
  } else if (variant === 'orange') {
    gradientColors = ['rgba(255, 136, 0, 0.35)', 'rgba(255, 136, 0, 0.15)'];
    borderColor = 'rgba(255, 136, 0, 0.50)';
    textColor = '#FFCC77';
  } else if (variant === 'purple') {
    gradientColors = ['rgba(153, 51, 255, 0.35)', 'rgba(153, 51, 255, 0.15)'];
    borderColor = 'rgba(153, 51, 255, 0.50)';
    textColor = '#CC99FF';
  }

  const safeColors =
    Array.isArray(gradientColors) && gradientColors.length >= 2
      ? gradientColors
      : ['rgba(0, 204, 119, 0.35)', 'rgba(0, 204, 119, 0.15)'];

  return (
    <LinearGradient
      colors={safeColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { borderColor }]}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.badge,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 10,
    letterSpacing: 0.8,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});

export default React.memo(Badge);
