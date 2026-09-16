/**
 * QuizIllustration.js — Cute Orange AI Gaming/Quiz Robot Illustration
 *
 * Built with react-native-svg for crisp, resolution-independent rendering.
 */
import React from 'react';
import Svg, { Rect, Circle, Path, G, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

const QuizIllustration = ({ width = 90, height = 90 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100" fill="none">
      <Defs>
        <LinearGradient id="orangeHeadGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#FFAA33" />
          <Stop offset="100%" stopColor="#994E00" />
        </LinearGradient>
        <LinearGradient id="orangeScreenGrad" x1="0" y1="0" x2="0" y2="50" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#331A00" />
          <Stop offset="100%" stopColor="#1A0D00" />
        </LinearGradient>
        <LinearGradient id="orangeEyeGlow" x1="0" y1="0" x2="10" y2="10" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#FFCC77" />
          <Stop offset="100%" stopColor="#FF8800" />
        </LinearGradient>
      </Defs>

      {/* Outer Orange Glow */}
      <Circle cx="50" cy="52" r="42" fill="#FF8800" opacity="0.15" />

      {/* Crown / Trophy top ornament */}
      <Path d="M42 22 L50 12 L58 22 L50 26 Z" fill="#FFAA33" />
      <Circle cx="50" cy="11" r="3" fill="#FFFFFF" />

      {/* Ears */}
      <Rect x="16" y="42" width="8" height="18" rx="4" fill="#773C00" />
      <Rect x="76" y="42" width="8" height="18" rx="4" fill="#773C00" />

      {/* Head Frame */}
      <Rect x="22" y="26" width="56" height="52" rx="18" fill="url(#orangeHeadGrad)" />

      {/* Screen */}
      <Rect x="28" y="34" width="44" height="36" rx="12" fill="url(#orangeScreenGrad)" stroke="rgba(255, 170, 51, 0.4)" strokeWidth="1.5" />

      {/* Wink / Excited Eyes */}
      <Circle cx="40" cy="48" r="6" fill="url(#orangeEyeGlow)" />
      <Circle cx="40" cy="46" r="2" fill="#FFFFFF" />

      {/* Playful Wink for right eye */}
      <Path d="M54 48 Q60 42 66 48" stroke="#FFCC77" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Excited Big Smile */}
      <Path d="M42 56 Q50 64 58 56 Z" fill="#FF8800" />

      {/* Floating Question Mark Badge */}
      <G transform="translate(64, 16)">
        <Circle cx="10" cy="10" r="11" fill="#FF8800" stroke="#FFFFFF" strokeWidth="1.5" />
        <SvgText
          x="10"
          y="15"
          fill="#FFFFFF"
          fontSize="14"
          fontWeight="bold"
          textAnchor="middle"
        >
          ?
        </SvgText>
      </G>
    </Svg>
  );
};

export default QuizIllustration;
