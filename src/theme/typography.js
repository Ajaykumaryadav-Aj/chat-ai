/**
 * typography.js — Type Scale & Font System
 *
 * Fonts used:
 *   - Inter        → Body text, UI labels, captions (neutral, highly legible)
 *   - SpaceGrotesk → Headings, titles (premium, modern, geometric)
 *
 * Note: Actual font loading is handled in App.js via expo-font (useFonts hook).
 * These constants reference the font family names AFTER they are loaded.
 *
 * Type scale follows a 1.25 Major Third ratio for harmonious size progression.
 */

import { Platform } from 'react-native';

// ─── Font Family ───────────────────────────────────────────────────────────────
export const fontFamily = {
  // Inter variants with system fallback
  regular: Platform.select({ ios: 'System', android: 'sans-serif' }),
  medium: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
  semiBold: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
  bold: Platform.select({ ios: 'System', android: 'sans-serif-bold' }),

  // Space Grotesk / Display variants with system fallback
  displayRegular: Platform.select({ ios: 'System', android: 'sans-serif' }),
  displayMedium: Platform.select({ ios: 'System', android: 'sans-serif-medium' }),
  displayBold: Platform.select({ ios: 'System', android: 'sans-serif-bold' }),

  // Monospace (for code blocks in ChatBot)
  mono: Platform.select({ ios: 'Courier', android: 'monospace' }),
};


// ─── Font Size Scale (Major Third: ×1.25) ─────────────────────────────────────
export const fontSize = {
  '2xs':  10,
  xs:     12,
  sm:     14,
  base:   16,
  md:     16,
  lg:     18,
  xl:     20,
  '2xl':  24,
  '3xl':  28,
  '4xl':  34,
  '5xl':  40,
  '6xl':  48,
  '7xl':  56,
};

// ─── Font Weight (string values for React Native) ──────────────────────────────
export const fontWeight = {
  light:    '300',
  regular:  '400',
  medium:   '500',
  semiBold: '600',
  bold:     '700',
  extraBold:'800',
  black:    '900',
};

// ─── Line Height ───────────────────────────────────────────────────────────────
// Line height = font size × multiplier for comfortable reading
export const lineHeight = {
  tight:    1.1,   // Headlines (multiplier, applied inline)
  snug:     1.25,
  normal:   1.5,   // Body text
  relaxed:  1.65,
  loose:    2.0,

  // Pixel values for specific use cases
  xs:     16,
  sm:     20,
  base:   24,
  lg:     28,
  xl:     32,
  '2xl':  36,
  '3xl':  40,
};

// ─── Letter Spacing ────────────────────────────────────────────────────────────
export const letterSpacing = {
  tighter:  -0.8,
  tight:    -0.4,
  normal:    0,
  wide:      0.4,
  wider:     0.8,
  widest:    1.6,
};

// ─── Semantic Text Styles ──────────────────────────────────────────────────────
// Pre-composed text style objects. Use these via the Text component's `variant` prop.
// Reduces boilerplate across the app.
export const textStyles = {
  // Display — Hero headings (home screen, splash)
  displayLg: {
    fontFamily:    fontFamily.displayBold,
    fontSize:      fontSize['5xl'],
    lineHeight:    lineHeight['2xl'] * 1.2,
    letterSpacing: letterSpacing.tight,
  },
  displayMd: {
    fontFamily:    fontFamily.displayBold,
    fontSize:      fontSize['4xl'],
    lineHeight:    lineHeight['2xl'],
    letterSpacing: letterSpacing.tight,
  },
  displaySm: {
    fontFamily:    fontFamily.displayMedium,
    fontSize:      fontSize['3xl'],
    lineHeight:    lineHeight['2xl'],
    letterSpacing: letterSpacing.tight,
  },

  // Heading
  h1: {
    fontFamily:    fontFamily.displayBold,
    fontSize:      fontSize['2xl'],
    lineHeight:    lineHeight['2xl'],
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily:    fontFamily.displayMedium,
    fontSize:      fontSize.xl,
    lineHeight:    lineHeight.xl,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily:    fontFamily.semiBold,
    fontSize:      fontSize.lg,
    lineHeight:    lineHeight.lg,
    letterSpacing: letterSpacing.normal,
  },

  // Body
  bodyLg: {
    fontFamily:  fontFamily.regular,
    fontSize:    fontSize.lg,
    lineHeight:  lineHeight.base,
    letterSpacing: letterSpacing.normal,
  },
  bodyMd: {
    fontFamily:  fontFamily.regular,
    fontSize:    fontSize.base,
    lineHeight:  lineHeight.base,
    letterSpacing: letterSpacing.normal,
  },
  bodySm: {
    fontFamily:  fontFamily.regular,
    fontSize:    fontSize.sm,
    lineHeight:  lineHeight.sm,
    letterSpacing: letterSpacing.normal,
  },

  // Label
  labelLg: {
    fontFamily:  fontFamily.semiBold,
    fontSize:    fontSize.base,
    lineHeight:  lineHeight.base,
    letterSpacing: letterSpacing.wide,
  },
  labelMd: {
    fontFamily:  fontFamily.semiBold,
    fontSize:    fontSize.sm,
    lineHeight:  lineHeight.sm,
    letterSpacing: letterSpacing.wide,
  },
  labelSm: {
    fontFamily:  fontFamily.medium,
    fontSize:    fontSize.xs,
    lineHeight:  lineHeight.xs,
    letterSpacing: letterSpacing.wider,
  },

  // Caption
  caption: {
    fontFamily:  fontFamily.regular,
    fontSize:    fontSize.xs,
    lineHeight:  lineHeight.xs,
    letterSpacing: letterSpacing.normal,
  },

  // Code (ChatBot markdown)
  code: {
    fontFamily:  fontFamily.mono,
    fontSize:    fontSize.sm,
    lineHeight:  lineHeight.base,
    letterSpacing: letterSpacing.normal,
  },
};

const typography = { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textStyles };
export default typography;
