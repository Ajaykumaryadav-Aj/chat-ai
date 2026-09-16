import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { colors, gradients, typography } from '../../theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0.25)).current;
  const glowScale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    let isMounted = true;

    // Entrance animation
    Animated.parallel([
      Animated.spring(logoScale, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (!isMounted) return;
      Animated.timing(titleOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        if (!isMounted) return;
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    });

    // Gentle ambient pulse animation
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowOpacity, { toValue: 0.7, duration: 1400, useNativeDriver: true }),
          Animated.timing(glowScale, { toValue: 1.1, duration: 1400, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(glowOpacity, { toValue: 0.25, duration: 1400, useNativeDriver: true }),
          Animated.timing(glowScale, { toValue: 0.9, duration: 1400, useNativeDriver: true }),
        ]),
      ])
    );
    pulseLoop.start();

    return () => {
      isMounted = false;
      pulseLoop.stop();
    };
  }, [glowOpacity, glowScale, logoOpacity, logoScale, taglineOpacity, titleOpacity]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      {/* Background Gradient */}
      <LinearGradient
        colors={
          Array.isArray(gradients?.splash) && gradients.splash.length >= 2
            ? gradients.splash
            : ['#0A0A0F', '#0D0D2A', '#0F0F1A']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Glow orb */}
      <Animated.View
        style={[
          styles.glowOrb,
          {
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
          },
        ]}
      />

      {/* Logo container */}
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ scale: logoScale }], opacity: logoOpacity },
        ]}
      >
        <Text style={styles.logoEmoji}>✨</Text>
      </Animated.View>

      <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
        AI Studio
      </Animated.Text>

      <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
        Your AI-Powered Creative Suite
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.primary,
  },
  glowOrb: {
    position: 'absolute',
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    backgroundColor: 'rgba(26, 106, 255, 0.18)',
    top: height * 0.28,
    alignSelf: 'center',
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: colors.surface.glassBold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border.strong,
    marginBottom: 20,
    shadowColor: colors.imageCreator.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  logoEmoji: {
    fontSize: 44,
  },
  title: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  tagline: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 16,
    color: colors.text.secondary,
    letterSpacing: 0.3,
  },
});

export default SplashScreen;

