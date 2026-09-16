/**
 * App.js — Application Root
 *
 * Provider hierarchy:
 *   GestureHandlerRootView  ← react-native-gesture-handler
 *     SafeAreaProvider       ← react-native-safe-area-context
 *       ThemeProvider        ← our design system context
 *         NavigationContainer ← react-navigation
 *           RootNavigator    ← Splash → App
 */
import 'react-native-gesture-handler'; // Must be FIRST import
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/context/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';

const NAV_THEME = {
  dark: true,
  colors: {
    primary:      '#1A6AFF',
    background:   '#0A0A0F',
    card:         '#0F0F1A',
    text:         '#FFFFFF',
    border:       'rgba(255,255,255,0.08)',
    notification: '#FF3B30',
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <ThemeProvider>
          <NavigationContainer theme={NAV_THEME}>
            <RootNavigator />
          </NavigationContainer>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
});
