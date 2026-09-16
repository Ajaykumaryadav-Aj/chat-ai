/**
 * HomeScreen.js — Main Explorer Dashboard View
 *
 * Implements:
 * - Premium Dark Glassmorphic Design System
 * - Dynamic Header Greeting Section
 * - 3 Animated Feature Cards (AI ChatBot, AI Image Creator, Quiz Game)
 * - Clean Separation of Concerns via useHomeController
 * - Reanimated staggered entrance animations
 */
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

import HomeHeader from '../../components/headers/HomeHeader';
import FeatureCard from '../../components/cards/FeatureCard';
import { useHomeController } from '../../controllers/HomeController';
import { colors, gradients, radius, spacing, typography } from '../../theme';
import { Modal, TouchableOpacity, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    greeting,
    subtitle,
    features,
    infoModalVisible,
    handleFeaturePress,
    handleAvatarPress,
    closeInfoModal,
  } = useHomeController(navigation);

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      {/* Screen Background Gradient */}
      <LinearGradient
        colors={
          Array.isArray(gradients?.appBackground) && gradients.appBackground.length >= 2
            ? gradients.appBackground
            : ['#0A0A0F', '#0F0F1A', '#131322']
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top, 20) + spacing.xs, paddingBottom: insets.bottom + spacing.xl },
        ]}
      >
        {/* Header Section */}
        <Animated.View entering={FadeInDown.duration(600).springify()}>
          <HomeHeader
            greeting={greeting}
            subtitle={subtitle}
            onAvatarPress={handleAvatarPress}
          />
        </Animated.View>

        {/* Feature Cards List */}
        <View style={styles.cardsContainer}>
          {features.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(150 * (index + 1))
                .duration(600)
                .springify()}
            >
              <FeatureCard
                title={item.title}
                subtitle={item.subtitle}
                badgeText={item.badgeText}
                badgeVariant={item.badgeVariant}
                gradientColors={item.gradientColors}
                circleColors={item.circleColors}
                accentColor={item.accentColor}
                Illustration={item.Illustration}
                onPress={() => handleFeaturePress(item.route)}
              />
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      {/* App Info Modal */}
      <Modal
        visible={infoModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeInfoModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <View style={styles.modalBadge}>
                <Text style={styles.modalBadgeText}>AI Studio v1.0</Text>
              </View>
              <TouchableOpacity onPress={closeInfoModal} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Text style={styles.modalCloseIcon}>✕</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>About AI Studio</Text>
            <Text style={styles.modalTagline}>Your AI-Powered Creative & Intelligence Suite</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>AI Intelligence Engine</Text>
              <Text style={styles.infoValue}>Google Gemini</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Features Active</Text>
              <Text style={styles.infoValue}>AI Chat • Image Studio • Quiz Challenge</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Privacy & Storage</Text>
              <Text style={styles.infoValue}>Local Device (AsyncStorage)</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Runtime Stack</Text>
              <Text style={styles.infoValue}>Expo SDK 54 • React Native 0.81</Text>
            </View>

            <TouchableOpacity style={styles.modalActionBtn} activeOpacity={0.8} onPress={closeInfoModal}>
              <Text style={styles.modalActionBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  cardsContainer: {
    marginTop: spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenH,
  },
  modalCard: {
    width: '100%',
    backgroundColor: colors.background.secondary,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border.strong,
    padding: spacing.xl,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  modalBadge: {
    backgroundColor: 'rgba(26, 106, 255, 0.20)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.badge,
    borderWidth: 1,
    borderColor: 'rgba(26, 106, 255, 0.40)',
  },
  modalBadgeText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 11,
    color: colors.imageCreator.primary,
  },
  modalCloseIcon: {
    fontSize: 16,
    color: colors.text.tertiary,
    padding: 4,
  },
  modalTitle: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 22,
    color: colors.text.primary,
    marginBottom: 4,
  },
  modalTagline: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  infoRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  infoLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 11,
    color: colors.text.tertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 14,
    color: colors.text.primary,
  },
  modalActionBtn: {
    backgroundColor: colors.surface.glassBold,
    borderWidth: 1,
    borderColor: colors.border.default,
    borderRadius: radius.button,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  modalActionBtnText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 14,
    color: colors.text.primary,
  },
});

export default HomeScreen;

