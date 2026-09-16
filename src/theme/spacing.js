/**
 * spacing.js — 4pt Grid Spacing System
 *
 * Philosophy:
 * - All spacing values are multiples of 4 (4pt grid = industry standard)
 * - Named tokens (xs, sm, md, lg, xl…) keep intent readable over raw numbers
 * - border radius tokens follow the same naming convention for consistency
 * - Use these values everywhere: padding, margin, gap, width, height offsets
 */

const spacing = {
  // Base unit: 4px
  px:   1,
  '0':  0,
  '1':  4,
  '2':  8,
  '3':  12,
  '4':  16,
  '5':  20,
  '6':  24,
  '7':  28,
  '8':  32,
  '10': 40,
  '12': 48,
  '14': 56,
  '16': 64,
  '20': 80,
  '24': 96,
  '32': 128,

  // Semantic aliases (preferred usage in components)
  none:   0,
  xs:     4,
  sm:     8,
  md:     12,
  base:   16,
  lg:     20,
  xl:     24,
  '2xl':  32,
  '3xl':  48,
  '4xl':  64,
  '5xl':  80,
  '6xl':  96,

  // Screen-level padding
  screenH:  20,   // Horizontal screen padding
  screenV:  24,   // Vertical screen padding

  // Component-specific tokens
  cardPaddingH:   20,
  cardPaddingV:   20,
  inputPaddingH:  16,
  inputPaddingV:  14,
  buttonPaddingH: 24,
  buttonPaddingV: 14,
  headerHeight:   60,
  tabBarHeight:   80,
  iconSize:       24,
  iconSizeSm:     16,
  iconSizeLg:     32,
  avatarSm:       32,
  avatarMd:       44,
  avatarLg:       64,
};

// ─── Border Radius ─────────────────────────────────────────────────────────────
export const radius = {
  none:   0,
  xs:     4,
  sm:     8,
  md:     12,
  lg:     16,
  xl:     20,
  '2xl':  24,
  '3xl':  28,
  card:   20,
  button: 14,
  input:  12,
  chip:   100,    // Pill shape
  full:   9999,   // Circle
};

export default spacing;
