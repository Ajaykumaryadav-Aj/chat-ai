/**
 * AppNavigator.js — Main App Navigation Stack
 *
 * This navigator handles all authenticated app screens.
 * It lives inside RootNavigator, which controls whether the user
 * sees this (app content) or the auth stack (login/register).
 *
 * Stack navigator chosen over Tab navigator at the root level because:
 *  - Feature screens (ChatBot, Quiz, ImageCreator) feel better as full-screen pushes
 *  - Home is the hub; feature screens are destinations pushed on top
 *  - Tabs can be added within the Home screen itself if needed later
 *
 * Screen-level options:
 *  - headerShown: false on all — each screen manages its own header
 *    via the custom <AppHeader> component for full design control.
 *  - Custom animation config for smooth sliding transitions.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ROUTES from '../constants/routes';

// Screens
import HomeScreen         from '../screens/Home/HomeScreen';
import ChatBotScreen      from '../screens/ChatBot/ChatBotScreen';
import ImageCreatorScreen from '../screens/ImageCreator/ImageCreatorScreen';
import QuizScreen         from '../screens/Quiz/QuizScreen';

const Stack = createStackNavigator();

// ─── Shared screen options ─────────────────────────────────────────────────────
const screenOptions = {
  headerShown: false,

  // Smooth slide animation — feels premium on both platforms
  cardStyleInterpolator: ({ current, layouts }) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange:  [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
      ],
      opacity: current.progress.interpolate({
        inputRange:  [0, 0.5, 1],
        outputRange: [0, 0.8, 1],
      }),
    },
    overlayStyle: {
      opacity: current.progress.interpolate({
        inputRange:  [0, 1],
        outputRange: [0, 0.5],
      }),
    },
  }),

  // Transparent card background — lets our gradient screens show through
  cardStyle: { backgroundColor: 'transparent' },

  transitionSpec: {
    open: {
      animation: 'spring',
      config: { stiffness: 280, damping: 30, mass: 1, overshootClamping: false },
    },
    close: {
      animation: 'spring',
      config: { stiffness: 280, damping: 30, mass: 1, overshootClamping: false },
    },
  },
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={screenOptions}
    >
      <Stack.Screen name={ROUTES.HOME}          component={HomeScreen}         />
      <Stack.Screen name={ROUTES.CHAT_BOT}      component={ChatBotScreen}      />
      <Stack.Screen name={ROUTES.IMAGE_CREATOR} component={ImageCreatorScreen} />
      <Stack.Screen name={ROUTES.QUIZ}          component={QuizScreen}         />
    </Stack.Navigator>
  );
};

export default AppNavigator;
