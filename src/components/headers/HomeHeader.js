/**
 * HomeHeader.js — Home Screen Greeting Header Component
 *
 * Displays greeting title, explorer subtitle, avatar icon, and status badge.
 */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme';

const HomeHeader = ({ greeting = 'Hello, Explorer 👋', subtitle = 'What would you like to create today?', onAvatarPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.badgeRow}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>AI Studio Online</Text>
        </View>
        <Text style={styles.greeting}>{greeting}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <TouchableOpacity
        style={styles.avatarButton}
        activeOpacity={0.8}
        onPress={onAvatarPress}
      >
        <View style={styles.avatarInner}>
          <Text style={styles.avatarEmoji}>🚀</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenH,
    paddingTop: spacing.base,
    paddingBottom: spacing.lg,
  },
  textContainer: {
    flex: 1,
    paddingRight: spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.status.success,
    marginRight: 6,
  },
  onlineText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.status.success,
    letterSpacing: typography.letterSpacing.wider,
    textTransform: 'uppercase',
  },
  greeting: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: typography.fontSize['3xl'],
    color: colors.text.primary,
    letterSpacing: typography.letterSpacing.tight,
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  avatarButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  avatarInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(26, 106, 255, 0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
});

export default React.memo(HomeHeader);
