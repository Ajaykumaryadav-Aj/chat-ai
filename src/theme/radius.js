/**
 * radius.js — Border Radius Tokens
 *
 * Centralized border radius standards for consistent UI curvature across cards, buttons, badges, and inputs.
 */

export const radius = {
  none:   0,
  xs:     4,
  sm:     8,
  md:     12,
  lg:     16,
  xl:     20,
  '2xl':  24,
  '3xl':  28,

  // Semantic UI Radius Tokens
  card:   22,     // Feature cards (20-24 requested)
  button: 14,     // Primary buttons
  input:  12,     // Input textboxes
  badge:  20,     // Pills and badges
  chip:   100,    // Pill shape
  full:   9999,   // Circle
};

export default radius;
