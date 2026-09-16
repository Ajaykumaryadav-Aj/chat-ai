/**
 * DecorativeCircle.js — Decorative Glassmorphic Background Circle
 *
 * Adds depth, glow, and modern glass aesthetic behind illustrations on feature cards.
 */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DEFAULT_CIRCLE_COLORS = ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.01)'];

const DecorativeCircle = ({ size = 140, colors = DEFAULT_CIRCLE_COLORS, style }) => {
  const safeColors = Array.isArray(colors) && colors.length >= 2 ? colors : DEFAULT_CIRCLE_COLORS;

  return (
    <View style={[styles.wrapper, { width: size, height: size, borderRadius: size / 2 }, style]}>
      <LinearGradient
        colors={safeColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { borderRadius: size / 2 }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  gradient: {
    flex: 1,
  },
});

export default React.memo(DecorativeCircle);
