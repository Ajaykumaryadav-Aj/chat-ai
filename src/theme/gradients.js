/**
 * gradients.js — Design System Gradient Configurations
 *
 * Array colors for expo-linear-gradient components.
 * Every gradient is guaranteed to be a valid non-empty array of color strings.
 */

export const gradients = {
  // Screen backgrounds
  appBackground: ['#0A0A0F', '#0F0F1A', '#131322'],

  // Splash screen
  splash: ['#0A0A0F', '#0D0D2A', '#0F0F1A'],

  // Home screen header area
  homeHeader: ['#0D1033', '#0A0A0F'],

  // Feature Card Gradients (Rich vibrant dark gradients)
  chatBotCard:      ['#004D33', '#002B1D', '#0A0A0F'],
  imageCreatorCard: ['#002D77', '#001845', '#0A0A0F'],
  quizCard:         ['#663300', '#3D1E00', '#0A0A0F'],

  // Card Borders / Glass Gradient
  glassBorder:  ['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.05)'],
  cardOverlay:  ['rgba(255,255,255,0.08)', 'rgba(0,0,0,0.30)'],

  // Badge Gradients
  badgeGreen:   ['#00CC77', '#008855'],
  badgeBlue:    ['#1A6AFF', '#0050CC'],
  badgeOrange:  ['#FF8800', '#CC5500'],
  badgePurple:  ['#9933FF', '#6600CC'],

  // Glow Circle Overlays
  circleGreen:  ['rgba(0, 204, 119, 0.25)', 'rgba(0, 204, 119, 0.02)'],
  circleBlue:   ['rgba(26, 106, 255, 0.25)', 'rgba(26, 106, 255, 0.02)'],
  circleOrange: ['rgba(255, 136, 0, 0.25)',  'rgba(255, 136, 0, 0.02)'],

  // Accent gradients
  greenGlow:    ['rgba(0,204,119,0.30)', 'rgba(0,204,119,0.00)'],
  blueGlow:     ['rgba(26,106,255,0.30)', 'rgba(26,106,255,0.00)'],
  orangeGlow:   ['rgba(255,136,0,0.30)',  'rgba(255,136,0,0.00)'],

  // Button gradients
  primaryButton: ['#1A6AFF', '#0050CC'],
  successButton: ['#00CC77', '#008855'],
  dangerButton:  ['#FF6961', '#FF3B30'],
};

export default gradients;
