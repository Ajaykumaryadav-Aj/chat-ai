/**
 * routes.js — Route Name Constants
 *
 * Why: Using string literals for screen names is a bug magnet.
 * A typo in a navigate() call causes a silent runtime crash with no TS protection.
 * Centralizing route names here gives us:
 *  - Single source of truth (rename in one place)
 *  - IDE autocomplete support
 *  - Find-all-references for navigation calls
 *
 * Future: When auth is added, AUTH_ROUTES will be uncommented.
 */

// ─── App Routes (no auth required) ────────────────────────────────────────────
export const APP_ROUTES = {
  // Root
  ROOT:           'Root',
  APP:            'App',

  // Splash
  SPLASH:         'Splash',

  // Main Feature Screens
  HOME:           'Home',
  CHAT_BOT:       'ChatBot',
  IMAGE_CREATOR:  'ImageCreator',
  QUIZ:           'Quiz',

  // Future sub-screens (defined now to avoid refactoring later)
  QUIZ_CATEGORY:  'QuizCategory',
  QUIZ_PLAY:      'QuizPlay',
  QUIZ_RESULT:    'QuizResult',
  QUIZ_REVIEW:    'QuizReview',
  IMAGE_HISTORY:  'ImageHistory',
  CHAT_HISTORY:   'ChatHistory',
};

// ─── Auth Routes (reserved for future implementation) ─────────────────────────
// Uncomment and wire up in RootNavigator.js when auth module is added.
// No changes to existing APP_ROUTES will be needed.
export const AUTH_ROUTES = {
  // AUTH_LANDING:   'AuthLanding',
  // LOGIN:          'Login',
  // REGISTER:       'Register',
  // FORGOT_PASSWORD:'ForgotPassword',
  // OTP_VERIFY:     'OTPVerify',
  // ONBOARDING:     'Onboarding',
};

const ROUTES = { ...APP_ROUTES, ...AUTH_ROUTES };
export default ROUTES;
