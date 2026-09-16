/**
 * HomeController.js — Home Controller Business Logic
 *
 * Implements MVC pattern:
 * - Separates screen navigation and state logic from UI views.
 * - Future authentication / user profile hooks connect here without modifying screens.
 */
import { useCallback, useState } from 'react';
import HOME_FEATURES from '../data/homeFeatures';

export class HomeController {
  static getFeatures() {
    return HOME_FEATURES;
  }

  static getGreeting() {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning, Explorer 👋';
    if (hours < 18) return 'Good Afternoon, Explorer 👋';
    return 'Hello, Explorer 👋';
  }
}

/**
 * Custom Hook: useHomeController
 * React Hook interface connecting the View to HomeController logic.
 */
export const useHomeController = (navigation) => {
  const [features] = useState(() => HomeController.getFeatures());
  const [greeting] = useState(() => HomeController.getGreeting());
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const handleFeaturePress = useCallback(
    (route) => {
      if (navigation && route) {
        navigation.navigate(route);
      }
    },
    [navigation]
  );

  const handleAvatarPress = useCallback(() => {
    setInfoModalVisible(true);
  }, []);

  const closeInfoModal = useCallback(() => {
    setInfoModalVisible(false);
  }, []);

  return {
    greeting,
    subtitle: 'What would you like to create today?',
    features,
    infoModalVisible,
    handleFeaturePress,
    handleAvatarPress,
    closeInfoModal,
  };
};

export default HomeController;
