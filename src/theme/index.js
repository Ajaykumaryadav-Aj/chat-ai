/**
 * index.js — Centralized Theme System Export
 *
 * Exposes all design system tokens through a single entry point.
 */
import colors from './colors';
import spacing from './spacing';
import typography from './typography';
import radius from './radius';
import shadows from './shadow';
import gradients from './gradients';

export { colors, spacing, typography, radius, shadows, gradients };

const theme = {
  colors,
  spacing,
  typography,
  radius,
  shadows,
  gradients,
};

export default theme;
