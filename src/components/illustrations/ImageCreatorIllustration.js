/**
 * ImageCreatorIllustration.js — Cute Blue AI Artist Robot Illustration
 *
 * Built with react-native-svg for crisp, resolution-independent rendering.
 */
import React from 'react';
import Svg, { Rect, Circle, Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';

const ImageCreatorIllustration = ({ width = 90, height = 90 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100" fill="none">
      <Defs>
        <LinearGradient id="blueHeadGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#5594FF" />
          <Stop offset="100%" stopColor="#003B99" />
        </LinearGradient>
        <LinearGradient id="blueScreenGrad" x1="0" y1="0" x2="0" y2="50" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#081838" />
          <Stop offset="100%" stopColor="#030B1C" />
        </LinearGradient>
        <LinearGradient id="blueEyeGlow" x1="0" y1="0" x2="10" y2="10" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#88B8FF" />
          <Stop offset="100%" stopColor="#1A6AFF" />
        </LinearGradient>
      </Defs>

      {/* Outer Blue Glow */}
      <Circle cx="50" cy="52" r="42" fill="#1A6AFF" opacity="0.15" />

      {/* Artist Beret / Cap */}
      <Path d="M26 32 C30 18 70 18 74 32 Z" fill="#1A6AFF" />
      <Circle cx="50" cy="18" r="4" fill="#88B8FF" />

      {/* Ears */}
      <Rect x="16" y="42" width="8" height="18" rx="4" fill="#002D77" />
      <Rect x="76" y="42" width="8" height="18" rx="4" fill="#002D77" />

      {/* Head Frame */}
      <Rect x="22" y="28" width="56" height="50" rx="18" fill="url(#blueHeadGrad)" />

      {/* Screen */}
      <Rect x="28" y="34" width="44" height="36" rx="12" fill="url(#blueScreenGrad)" stroke="rgba(85, 148, 255, 0.4)" strokeWidth="1.5" />

      {/* Glowing Star/Creative Eyes */}
      <Path d="M38 48 L40 44 L42 48 L46 50 L42 52 L40 56 L38 52 L34 50 Z" fill="url(#blueEyeGlow)" />
      <Path d="M58 48 L60 44 L62 48 L66 50 L62 52 L60 56 L58 52 L54 50 Z" fill="url(#blueEyeGlow)" />

      {/* Smile */}
      <Path d="M44 58 Q50 64 56 58" stroke="#88B8FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Magic Sparkle Badge floating */}
      <G transform="translate(66, 16)">
        <Circle cx="10" cy="10" r="10" fill="#1A6AFF" />
        <Path d="M10 4 L11.5 8.5 L16 10 L11.5 11.5 L10 16 L8.5 11.5 L4 10 L8.5 8.5 Z" fill="#FFFFFF" />
      </G>
    </Svg>
  );
};

export default ImageCreatorIllustration;
