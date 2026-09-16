/**
 * env.js — Environment Variable Loader
 *
 * Current implementation uses process.env (Expo SDK 54 compatible).
 * When babel-plugin-dotenv-import is installed and babel.config.js is updated,
 * the @env import can be re-enabled. For now this is safe and works in Expo Go.
 *
 * To set GEMINI_API_KEY:
 *  - Add it to .env file (values are NOT automatically available without the babel plugin)
 *  - OR hardcode it temporarily here for testing only
 */

// ─── Exported Config Object ────────────────────────────────────────────────────
const ENV = {
  gemini: {
    apiKey:
      process.env.EXPO_PUBLIC_GEMINI_API_KEY ||
      process.env.GEMINI_API_KEY ||
      '',
    baseUrl:
      process.env.EXPO_PUBLIC_GEMINI_BASE_URL ||
      process.env.GEMINI_BASE_URL ||
      'https://generativelanguage.googleapis.com/v1beta',
    model:
      process.env.EXPO_PUBLIC_GEMINI_MODEL ||
      process.env.GEMINI_MODEL ||
      'gemini-2.5-flash',
    imageModel:
      process.env.EXPO_PUBLIC_GEMINI_IMAGE_MODEL ||
      process.env.GEMINI_IMAGE_MODEL ||
      'gemini-2.5-flash-image',
  },
  app: {
    env: process.env.EXPO_PUBLIC_APP_ENV || process.env.APP_ENV || 'development',
    isDev: (process.env.APP_ENV || 'development') === 'development',
  },
};


export default ENV;
