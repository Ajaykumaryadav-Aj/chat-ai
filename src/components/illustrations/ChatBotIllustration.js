/**
 * ChatBotIllustration.js — Cute Green AI Robot Illustration
 *
 * Built with react-native-svg for crisp, resolution-independent rendering.
 */
import React from 'react';
import Svg, { Rect, Circle, Path, G, Defs, LinearGradient, Stop } from 'react-native-svg';

const ChatBotIllustration = ({ width = 90, height = 90 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 100 100" fill="none">
      <Defs>
        <LinearGradient id="botHeadGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#00FF99" />
          <Stop offset="100%" stopColor="#008855" />
        </LinearGradient>
        <LinearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="50" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#051C12" />
          <Stop offset="100%" stopColor="#020B07" />
        </LinearGradient>
        <LinearGradient id="eyeGlow" x1="0" y1="0" x2="10" y2="10" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#66FFCC" />
          <Stop offset="100%" stopColor="#00CC77" />
        </LinearGradient>
      </Defs>

      {/* Outer Glow */}
      <Circle cx="50" cy="52" r="42" fill="#00CC77" opacity="0.15" />

      {/* Antenna */}
      <Path d="M50 14 V26" stroke="#00CC77" strokeWidth="4" strokeLinecap="round" />
      <Circle cx="50" cy="11" r="5" fill="#66FFCC" />
      <Circle cx="50" cy="11" r="2" fill="#FFFFFF" />

      {/* Ears / Headset */}
      <Rect x="16" y="42" width="8" height="18" rx="4" fill="#008855" />
      <Rect x="76" y="42" width="8" height="18" rx="4" fill="#008855" />

      {/* Head Outer Frame */}
      <Rect x="22" y="24" width="56" height="54" rx="18" fill="url(#botHeadGrad)" />
      
      {/* Head Glass Screen */}
      <Rect x="28" y="32" width="44" height="38" rx="12" fill="url(#screenGrad)" stroke="rgba(0, 255, 153, 0.4)" strokeWidth="1.5" />

      {/* Glowing Eyes */}
      <Circle cx="40" cy="48" r="6.5" fill="url(#eyeGlow)" />
      <Circle cx="40" cy="46" r="2" fill="#FFFFFF" />
      
      <Circle cx="60" cy="48" r="6.5" fill="url(#eyeGlow)" />
      <Circle cx="60" cy="46" r="2" fill="#FFFFFF" />

      {/* Happy Cute Smile */}
      <Path d="M42 58 Q50 64 58 58" stroke="#00FF99" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* Cheeks */}
      <Circle cx="34" cy="55" r="3" fill="#00FF99" opacity="0.35" />
      <Circle cx="66" cy="55" r="3" fill="#00FF99" opacity="0.35" />

      {/* Floating Sparkle / Chat Bubble Pill */}
      <G transform="translate(64, 18)">
        <Circle cx="10" cy="10" r="10" fill="#00CC77" />
        <Path d="M6 10 H14 M10 6 V14" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      </G>
    </Svg>
  );
};

export default ChatBotIllustration;
