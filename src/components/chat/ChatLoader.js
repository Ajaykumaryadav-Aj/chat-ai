/**
 * ChatLoader.js — Skeleton Loader for Initial Chat History Fetch
 */
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, radius, spacing } from '../../theme';

const SkeletonItem = ({ width, alignSelf }) => {
  const opacity = useSharedValue(0.2);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.6, { duration: 800, easing: Easing.ease }),
      -1,
      true
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.skeleton,
        { width, alignSelf: alignSelf === 'right' ? 'flex-end' : 'flex-start' },
        animatedStyle,
      ]}
    />
  );
};

export const ChatLoader = () => {
  return (
    <View style={styles.container}>
      <SkeletonItem width="65%" alignSelf="right" />
      <SkeletonItem width="80%" alignSelf="left" />
      <SkeletonItem width="50%" alignSelf="right" />
      <SkeletonItem width="75%" alignSelf="left" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenH,
    paddingVertical: spacing.xl,
  },
  skeleton: {
    height: 48,
    borderRadius: radius.card - 4,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    marginBottom: spacing.md,
  },
});

export default React.memo(ChatLoader);
