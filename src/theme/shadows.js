/**
 * shadows.js — Cross-Platform Shadow & Elevation System
 *
 * Problem: React Native shadow props only work on iOS. Android uses `elevation`.
 * Solution: Each shadow token is an object with BOTH sets of props merged.
 *           On iOS, shadow* props are active. On Android, elevation is active.
 *
 * Usage:
 *   import { shadows } from '../theme/shadows';
 *   <View style={[styles.card, shadows.card]} />
 *
 * Glow shadows use colored shadowColor — only visible on iOS.
 * On Android, use the `glow` background/border technique instead.
 */
import { Platform } from 'react-native';

// Helper: builds a shadow object safe for both platforms
const buildShadow = ({ color = '#000', opacity, offsetX, offsetY, blur, elevation }) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor:   color,
      shadowOffset:  { width: offsetX, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius:  blur,
    };
  }
  return { elevation };
};

// ─── Semantic Shadow Tokens ────────────────────────────────────────────────────
export const shadows = {
  none: {},

  // Subtle lift — for small chips, tags
  xs: buildShadow({
    color: '#000', opacity: 0.20, offsetX: 0, offsetY: 2,  blur: 4,  elevation: 2,
  }),

  // Default card shadow
  sm: buildShadow({
    color: '#000', opacity: 0.30, offsetX: 0, offsetY: 4,  blur: 8,  elevation: 4,
  }),

  // Primary card/panel shadow
  md: buildShadow({
    color: '#000', opacity: 0.35, offsetX: 0, offsetY: 8,  blur: 16, elevation: 8,
  }),

  // Modals, bottom sheets
  lg: buildShadow({
    color: '#000', opacity: 0.40, offsetX: 0, offsetY: 12, blur: 24, elevation: 12,
  }),

  // Feature card shadow (strong)
  card: buildShadow({
    color: '#000', opacity: 0.45, offsetX: 0, offsetY: 16, blur: 32, elevation: 16,
  }),

  // Full-overlay shadow (FAB, floating buttons)
  xl: buildShadow({
    color: '#000', opacity: 0.50, offsetX: 0, offsetY: 20, blur: 40, elevation: 20,
  }),
};

// ─── Colored Glow Shadows (Feature Cards) ────────────────────────────────────
// These make the cards appear to emit a soft colored light.
// iOS: actual colored shadow. Android: best approximated with elevation + border.
export const glowShadows = {
  green: buildShadow({
    color: '#00CC77', opacity: 0.35, offsetX: 0, offsetY: 8, blur: 24, elevation: 12,
  }),
  blue: buildShadow({
    color: '#1A6AFF', opacity: 0.35, offsetX: 0, offsetY: 8, blur: 24, elevation: 12,
  }),
  orange: buildShadow({
    color: '#FF8800', opacity: 0.35, offsetX: 0, offsetY: 8, blur: 24, elevation: 12,
  }),
  purple: buildShadow({
    color: '#9933FF', opacity: 0.35, offsetX: 0, offsetY: 8, blur: 24, elevation: 12,
  }),
};

const shadowsExport = { shadows, glowShadows };
export default shadowsExport;
