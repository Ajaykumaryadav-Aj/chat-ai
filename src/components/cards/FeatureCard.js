/**
 * FeatureCard.js — Reusable Animated Feature Card Component
 *
 * Implements:
 * - Linear Gradient background
 * - Glassmorphic border & decorative background circles
 * - Custom SVG AI Robot Illustration
 * - Badge (NEW / FREE / POPULAR)
 * - Title, Subtitle, Open Arrow button
 * - Reanimated spring press scale animation & touch feedback
 */
import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import Badge from '../common/Badge';
import DecorativeCircle from '../common/DecorativeCircle';
import { colors, radius, spacing, shadows, typography } from '../../theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 300,
  mass: 0.8,
};

const DEFAULT_GRADIENT = ['#004D33', '#002619', '#0B1410'];
const DEFAULT_CIRCLES = ['rgba(0, 204, 119, 0.35)', 'rgba(0, 204, 119, 0.03)'];

const FeatureCard = ({
  title,
  subtitle,
  badgeText,
  badgeVariant = 'green',
  gradientColors,
  circleColors,
  Illustration,
  onPress,
  accentColor = '#00CC77',
}) => {
  const safeGradient = Array.isArray(gradientColors) && gradientColors.length >= 2 ? gradientColors : DEFAULT_GRADIENT;
  const safeCircles = Array.isArray(circleColors) && circleColors.length >= 2 ? circleColors : DEFAULT_CIRCLES;

  // Reanimated press scale value
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, SPRING_CONFIG);
    opacity.value = withTiming(0.9, { duration: 100, easing: Easing.ease });
  }, [scale, opacity]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, SPRING_CONFIG);
    opacity.value = withTiming(1, { duration: 150, easing: Easing.ease });
  }, [scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.wrapper, animatedStyle]}
    >
      <View style={[styles.shadowContainer, shadows.card]}>
        <LinearGradient
          colors={safeGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          {/* Glass Border Layer */}
          <View style={styles.glassBorder} />

          {/* Decorative Circles */}
          <DecorativeCircle
            size={160}
            colors={safeCircles}
            style={styles.circleTopRight}
          />
          <DecorativeCircle
            size={100}
            colors={safeCircles}
            style={styles.circleBottomLeft}
          />

          {/* Card Main Content */}
          <View style={styles.contentRow}>
            {/* Left Section: Text Content */}
            <View style={styles.leftContent}>
              {badgeText ? (
                <View style={styles.badgeWrapper}>
                  <Badge label={badgeText} variant={badgeVariant} />
                </View>
              ) : null}

              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              
              <Text style={styles.subtitle} numberOfLines={2}>
                {subtitle}
              </Text>

              {/* Action Link Row */}
              <View style={styles.actionRow}>
                <Text style={[styles.actionText, { color: accentColor }]}>
                  Explore Feature
                </Text>
                <View style={[styles.arrowButton, { backgroundColor: `${accentColor}25`, borderColor: `${accentColor}50` }]}>
                  <Text style={[styles.arrowIcon, { color: accentColor }]}>›</Text>
                </View>
              </View>
            </View>

            {/* Right Section: AI Robot Illustration */}
            <View style={styles.illustrationContainer}>
              {Illustration ? <Illustration width={100} height={100} /> : null}
            </View>
          </View>
        </LinearGradient>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: spacing.screenH,
    marginBottom: spacing.lg,
  },
  shadowContainer: {
    borderRadius: radius.card,
    backgroundColor: colors.background.secondary,
  },
  cardGradient: {
    borderRadius: radius.card,
    padding: spacing.cardPaddingH,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 160,
  },
  glassBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  circleTopRight: {
    top: -40,
    right: -30,
  },
  circleBottomLeft: {
    bottom: -30,
    left: -20,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  leftContent: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  badgeWrapper: {
    marginBottom: spacing.xs + 2,
  },
  title: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: typography.fontSize.xl + 2,
    color: colors.text.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    marginRight: 6,
  },
  arrowButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '700',
    marginTop: -2,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
  },
});

export default React.memo(FeatureCard);
