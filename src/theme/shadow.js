/**
 * shadow.js — Cross-Platform Shadow System
 *
 * Provides shadow parameters for iOS and elevation for Android.
 */
import { Platform } from 'react-native';

const buildShadow = ({ color = '#000000', opacity = 0.3, offsetX = 0, offsetY = 4, blur = 8, elevation = 4 }) => {
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

export const shadows = {
  none: {},
  xs: buildShadow({ color: '#000000', opacity: 0.15, offsetX: 0, offsetY: 2, blur: 4, elevation: 2 }),
  sm: buildShadow({ color: '#000000', opacity: 0.25, offsetX: 0, offsetY: 4, blur: 8, elevation: 4 }),
  md: buildShadow({ color: '#000000', opacity: 0.35, offsetX: 0, offsetY: 6, blur: 12, elevation: 6 }),
  lg: buildShadow({ color: '#000000', opacity: 0.45, offsetX: 0, offsetY: 10, blur: 20, elevation: 10 }),
  card: buildShadow({ color: '#000000', opacity: 0.50, offsetX: 0, offsetY: 12, blur: 24, elevation: 8 }),
  glowGreen: buildShadow({ color: '#00CC77', opacity: 0.40, offsetX: 0, offsetY: 8, blur: 20, elevation: 8 }),
  glowBlue: buildShadow({ color: '#1A6AFF', opacity: 0.40, offsetX: 0, offsetY: 8, blur: 20, elevation: 8 }),
  glowOrange: buildShadow({ color: '#FF8800', opacity: 0.40, offsetX: 0, offsetY: 8, blur: 20, elevation: 8 }),
};

export default shadows;
