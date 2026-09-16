/**
 * RootNavigator.js — Root Navigation Entry Point
 *
 * Architecture Decision — Auth-Ready Design:
 * ─────────────────────────────────────────────
 * This is the ONLY navigator the user sees. It decides between:
 *   1. SplashScreen → shown during bootstrap (auth check, asset loading)
 *   2. AuthNavigator → login/register flow (NOT YET IMPLEMENTED)
 *   3. AppNavigator  → main app content (current state)
 *
 * When authentication is added:
 *  1. Import AuthNavigator (doesn't exist yet)
 *  2. Uncomment the auth check logic
 *  3. The rest of the app is UNTOUCHED
 *
 * Current flow:
 *   Splash (2s) → App
 *
 * Future flow:
 *   Splash → [if not authed] Auth → [on login] App
 *             [if authed]    App
 *
 * State is managed here via isReady + isAuthenticated.
 * isAuthenticated = false always for now (no auth).
 */
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ROUTES from '../constants/routes';
import SplashScreen  from '../screens/Splash/SplashScreen';
import AppNavigator  from './AppNavigator';

// Future: import AuthNavigator from './AuthNavigator';

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const [isReady, setIsReady]           = useState(false);
  // Future: pull this from AuthContext / SecureStore / Firebase
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    bootstrapApp();
  }, []);

  /**
   * bootstrapApp — runs during Splash screen.
   * Add: auth token check, asset preloading, remote config fetch, etc.
   * When done, setIsReady(true) to dismiss the splash and show the app.
   */
  const bootstrapApp = async () => {
    try {
      // TODO (Step 2): Preload fonts, check stored chat history, etc.
      // TODO (Auth): Check for valid auth token in SecureStore
      //   const token = await SecureStore.getItemAsync('authToken');
      //   setIsAuthenticated(!!token);

      // Minimum splash duration for visual polish
      await new Promise(resolve => setTimeout(resolve, 2200));
    } catch (error) {
      console.error('[RootNavigator] Bootstrap error:', error);
    } finally {
      setIsReady(true);
    }
  };

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      {!isReady ? (
        // Phase 1: Splash
        <RootStack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
      ) : (
        // Phase 2: App (or Auth when added)
        // Future condition:
        //   isAuthenticated
        //     ? <RootStack.Screen name={ROUTES.APP} component={AppNavigator} />
        //     : <RootStack.Screen name={ROUTES.AUTH} component={AuthNavigator} />
        <RootStack.Screen name={ROUTES.APP} component={AppNavigator} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
