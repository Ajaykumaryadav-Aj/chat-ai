/**
 * ThemeContext.js — Theme Provider
 *
 * Why: Even though we start with a dark-only theme, wrapping early prevents
 * a future "add light mode" feature from requiring global refactoring.
 * Components consume `useTheme()` — when we add light mode, only this
 * context changes. Zero component rewrites needed.
 *
 * What it provides:
 *  - colors, spacing, typography, shadows — the full design system
 *  - isDark boolean (always true for now)
 *  - toggleTheme() function (no-op for now, ready for future)
 */
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import colors, { gradients }   from '../theme/colors';
import spacing, { radius }      from '../theme/spacing';
import typography               from '../theme/typography';
import shadowsExport, { shadows, glowShadows } from '../theme/shadows';

// ─── Context Creation ──────────────────────────────────────────────────────────
const ThemeContext = createContext(null);

// ─── Theme Provider ────────────────────────────────────────────────────────────
export const ThemeProvider = ({ children }) => {
  // Future: 'light' mode will be a state toggle here.
  // For now, we only support 'dark'.
  const [themeMode] = useState('dark');

  const isDark = themeMode === 'dark';

  // toggleTheme is a no-op now, but exported so any component can already
  // hook into it — when light mode is implemented, it just works.
  const toggleTheme = useCallback(() => {
    // setThemeMode(prev => prev === 'dark' ? 'light' : 'dark');
    console.log('[Theme] Light mode not yet implemented.');
  }, []);

  // Memoize to prevent unnecessary re-renders of all consumers
  const value = useMemo(() => ({
    isDark,
    themeMode,
    toggleTheme,
    colors,
    gradients,
    spacing,
    radius,
    typography,
    shadows,
    glowShadows,
  }), [isDark, themeMode, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// ─── Hook ──────────────────────────────────────────────────────────────────────
/**
 * useTheme() — Access the full design system from any component.
 *
 * Usage:
 *   const { colors, spacing, shadows, isDark } = useTheme();
 *
 * Throws if used outside <ThemeProvider>. This is intentional —
 * fail fast in development rather than silently returning undefined tokens.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('[useTheme] Must be used within a <ThemeProvider>. Check your App.js providers.');
  }
  return context;
};

export default ThemeContext;
