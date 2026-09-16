/**
 * ImageCreatorScreen.js — Production-Ready AI Image Creator
 *
 * Implements:
 * - Text prompt input with character count & prompt inspirations
 * - Style presets (Photorealistic, Anime, Cyberpunk, 3D Render, etc.)
 * - Aspect ratio selector (1:1, 16:9, 9:16)
 * - Shimmering loading state with animated pulse
 * - High-resolution artwork display with aspect ratio framing
 * - Share action (React Native Share API)
 * - Copy prompt action with clipboard feedback
 * - Save image simulation with toast feedback
 * - AsyncStorage history management modal
 */
import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Share,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import useImageCreatorController from '../../controllers/ImageCreatorController';
import ImageCreatorIllustration from '../../components/illustrations/ImageCreatorIllustration';
import { colors, gradients, radius, spacing, typography } from '../../theme';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width - spacing.screenH * 2;

const ImageCreatorScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
    prompt,
    setPrompt,
    selectedStyle,
    setSelectedStyle,
    selectedRatio,
    setSelectedRatio,
    isGenerating,
    currentImage,
    setCurrentImage,
    history,
    error,
    copyFeedback,
    saveFeedback,
    showHistoryModal,
    setShowHistoryModal,
    generate,
    copyPromptText,
    saveImage,
    clearAllHistory,
    selectInspiration,
    styles: stylePresets,
    ratios: aspectRatios,
    inspirations,
  } = useImageCreatorController();

  const handleShare = useCallback(async () => {
    if (!currentImage) return;
    try {
      await Share.share({
        message: `Created with AI Studio:\n"${currentImage.prompt}"\nStyle: ${currentImage.style}`,
        url: currentImage.imageUrl,
      });
    } catch (err) {
      console.error('[ImageCreator] Share error:', err);
    }
  }, [currentImage]);

  // Compute preview height based on aspect ratio
  const activeRatioObj = aspectRatios.find((r) => r.id === selectedRatio) || aspectRatios[0];
  const previewHeight = Math.min(IMAGE_WIDTH / activeRatioObj.ratio, 420);

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={
          Array.isArray(gradients?.appBackground) && gradients.appBackground.length >= 2
            ? gradients.appBackground
            : ['#0A0A0F', '#0F0F1A', '#131322']
        }
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + spacing.xs }]}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>AI Image Creator</Text>

        <TouchableOpacity
          style={styles.historyBtn}
          activeOpacity={0.7}
          onPress={() => setShowHistoryModal(true)}
        >
          <Text style={styles.historyIcon}>🕒</Text>
          {history.length > 0 && (
            <View style={styles.historyBadge}>
              <Text style={styles.historyBadgeText}>{history.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
      >
        {/* Error Notification */}
        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>⚠️ {error}</Text>
          </View>
        ) : null}

        {/* Prompt Input Section */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.sectionLabel}>PROMPT DESCRIPTION</Text>
            <Text style={styles.charCount}>{prompt.length} / 500</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Describe the image you want to create..."
              placeholderTextColor={colors.text.disabled}
              value={prompt}
              onChangeText={setPrompt}
              multiline
              maxLength={500}
              editable={!isGenerating}
            />
            {prompt.length > 0 && !isGenerating && (
              <TouchableOpacity
                style={styles.clearBtn}
                onPress={() => setPrompt('')}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Text style={styles.clearBtnText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Quick Inspirations */}
          <Text style={styles.subLabel}>💡 Quick Inspirations</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
            {inspirations.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.inspirationChip}
                activeOpacity={0.7}
                onPress={() => selectInspiration(item)}
              >
                <Text style={styles.inspirationText} numberOfLines={1}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Style Presets */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ARTISTIC STYLE</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
            {stylePresets.map((style) => {
              const isSelected = selectedStyle === style.label;
              return (
                <TouchableOpacity
                  key={style.id}
                  style={[styles.styleChip, isSelected && styles.styleChipActive]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedStyle(style.label)}
                >
                  <Text style={styles.styleIcon}>{style.icon}</Text>
                  <Text style={[styles.styleLabel, isSelected && styles.styleLabelActive]}>
                    {style.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Aspect Ratio */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ASPECT RATIO</Text>
          <View style={styles.ratioRow}>
            {aspectRatios.map((ratio) => {
              const isSelected = selectedRatio === ratio.id;
              return (
                <TouchableOpacity
                  key={ratio.id}
                  style={[styles.ratioCard, isSelected && styles.ratioCardActive]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedRatio(ratio.id)}
                >
                  <Text style={[styles.ratioTitle, isSelected && styles.ratioTitleActive]}>
                    {ratio.label}
                  </Text>
                  <Text style={styles.ratioDesc}>{ratio.description}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Generate Button */}
        <TouchableOpacity
          style={[styles.generateButton, (!prompt.trim() || isGenerating) && styles.buttonDisabled]}
          activeOpacity={0.8}
          onPress={() => generate()}
          disabled={!prompt.trim() || isGenerating}
        >
          <LinearGradient
            colors={
              !prompt.trim() || isGenerating
                ? ['#2A2A3E', '#1D1D2C']
                : ['#1A6AFF', '#0044CC']
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {isGenerating ? 'Synthesizing Artwork...' : '✨ Generate Artwork'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Loading Preview */}
        {isGenerating ? (
          <Animated.View entering={FadeIn.duration(400)} style={styles.loadingContainer}>
            <View style={[styles.loadingBox, { height: previewHeight }]}>
              <View style={styles.loadingOrb} />
              <Text style={styles.loadingTitle}>Synthesizing Pixels</Text>
              <Text style={styles.loadingSubtitle}>
                Applying "{selectedStyle}" style • {selectedRatio} ratio
              </Text>
            </View>
          </Animated.View>
        ) : null}

        {/* Result Area */}
        {currentImage && !isGenerating ? (
          <Animated.View entering={FadeInDown.duration(500)} style={styles.resultCard}>
            <View style={styles.resultHeader}>
              <View style={styles.badgeRow}>
                <View style={styles.styleBadge}>
                  <Text style={styles.styleBadgeText}>{currentImage.style}</Text>
                </View>
                <View style={styles.ratioBadge}>
                  <Text style={styles.ratioBadgeText}>{currentImage.aspectRatio}</Text>
                </View>
              </View>
              <Text style={styles.resultTime}>Just now</Text>
            </View>

            {/* Generated Image */}
            <View style={[styles.imageFrame, { height: previewHeight }]}>
              <Image
                source={{ uri: currentImage.imageUrl }}
                style={styles.artworkImage}
                resizeMode="cover"
              />
            </View>

            {/* Backend Disclaimer Note */}
            <View style={styles.disclaimerBox}>
              <Text style={styles.disclaimerText}>
                ℹ️ Studio Preview Mode — Connect Imagen 3 / Vertex AI backend for custom real-time GPU synthesis.
              </Text>
            </View>

            {/* Prompt Text Display */}
            <Text style={styles.imagePromptText}>"{currentImage.prompt}"</Text>

            {/* Action Buttons */}
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.7}
                onPress={() => copyPromptText()}
              >
                <Text style={styles.actionBtnText}>
                  {copyFeedback ? '✓ Copied' : '📋 Copy'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.7}
                onPress={() => saveImage()}
              >
                <Text style={styles.actionBtnText}>
                  {saveFeedback ? '✓ Saved' : '💾 Save'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.7}
                onPress={handleShare}
              >
                <Text style={styles.actionBtnText}>📤 Share</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.regenerateBtn]}
                activeOpacity={0.7}
                onPress={() => generate(currentImage.prompt)}
              >
                <Text style={styles.actionBtnText}>🔄 Retry</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : null}

        {/* Empty State when no image exists and not generating */}
        {!currentImage && !isGenerating ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIllustration}>
              <ImageCreatorIllustration width={100} height={100} />
            </View>
            <Text style={styles.emptyTitle}>Create Anything Imaginable</Text>
            <Text style={styles.emptySubtitle}>
              Type a creative prompt or pick one above, select a style, and generate your artwork.
            </Text>
          </View>
        ) : null}
      </ScrollView>

      {/* History Modal */}
      <Modal
        visible={showHistoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowHistoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Generation History</Text>
              <TouchableOpacity onPress={() => setShowHistoryModal(false)}>
                <Text style={styles.modalCloseText}>Done</Text>
              </TouchableOpacity>
            </View>

            {history.length === 0 ? (
              <View style={styles.emptyHistoryBox}>
                <Text style={styles.emptyHistoryText}>No creations saved yet.</Text>
              </View>
            ) : (
              <ScrollView style={styles.historyList}>
                {history.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.historyItem}
                    activeOpacity={0.8}
                    onPress={() => {
                      setCurrentImage(item);
                      setPrompt(item.prompt);
                      setSelectedStyle(item.style);
                      setShowHistoryModal(false);
                    }}
                  >
                    <Image source={{ uri: item.imageUrl }} style={styles.historyThumb} />
                    <View style={styles.historyInfo}>
                      <Text style={styles.historyPrompt} numberOfLines={2}>
                        {item.prompt}
                      </Text>
                      <Text style={styles.historyMeta}>
                        {item.style} • {item.aspectRatio}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  style={styles.clearHistoryButton}
                  onPress={clearAllHistory}
                >
                  <Text style={styles.clearHistoryText}>Clear History</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenH,
    paddingBottom: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  backBtn: {
    paddingVertical: spacing.xs,
  },
  backText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 16,
    color: colors.imageCreator.primary,
  },
  headerTitle: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 18,
    color: colors.text.primary,
  },
  historyBtn: {
    position: 'relative',
    padding: spacing.xs,
  },
  historyIcon: {
    fontSize: 20,
  },
  historyBadge: {
    position: 'absolute',
    top: 2,
    right: 0,
    backgroundColor: colors.imageCreator.primary,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  historyBadgeText: {
    fontSize: 9,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: spacing.screenH,
    paddingTop: spacing.base,
  },
  errorBanner: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    borderColor: 'rgba(255, 59, 48, 0.40)',
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.base,
  },
  errorText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 13,
    color: colors.status.error,
  },
  card: {
    backgroundColor: colors.surface.glass,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing.base,
    marginBottom: spacing.base,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  sectionLabel: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 11,
    color: colors.text.tertiary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  charCount: {
    fontFamily: typography.fontFamily.mono,
    fontSize: 11,
    color: colors.text.disabled,
  },
  inputContainer: {
    position: 'relative',
    minHeight: 80,
    marginBottom: spacing.sm,
  },
  textInput: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 15,
    color: colors.text.primary,
    lineHeight: 22,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 24,
  },
  clearBtn: {
    position: 'absolute',
    right: 0,
    top: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearBtnText: {
    fontSize: 10,
    color: colors.text.secondary,
  },
  subLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 8,
    marginTop: 4,
  },
  chipScroll: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  inspirationChip: {
    backgroundColor: 'rgba(26, 106, 255, 0.12)',
    borderColor: 'rgba(26, 106, 255, 0.30)',
    borderWidth: 1,
    borderRadius: radius.badge,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    maxWidth: 240,
  },
  inspirationText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
    color: colors.imageCreator.secondary,
  },
  section: {
    marginBottom: spacing.base,
  },
  styleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.default,
    borderWidth: 1,
    borderRadius: radius.button,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
    marginTop: spacing.xs,
  },
  styleChipActive: {
    backgroundColor: 'rgba(26, 106, 255, 0.25)',
    borderColor: colors.imageCreator.primary,
  },
  styleIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  styleLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 13,
    color: colors.text.secondary,
  },
  styleLabelActive: {
    fontFamily: typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
  ratioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  ratioCard: {
    flex: 1,
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.default,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  ratioCardActive: {
    backgroundColor: 'rgba(26, 106, 255, 0.25)',
    borderColor: colors.imageCreator.primary,
  },
  ratioTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  ratioTitleActive: {
    color: colors.imageCreator.secondary,
  },
  ratioDesc: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 11,
    color: colors.text.disabled,
  },
  generateButton: {
    borderRadius: radius.button,
    overflow: 'hidden',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  loadingContainer: {
    marginBottom: spacing.xl,
  },
  loadingBox: {
    width: '100%',
    backgroundColor: 'rgba(15, 20, 35, 0.70)',
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: 'rgba(26, 106, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  loadingOrb: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(26, 106, 255, 0.30)',
    borderWidth: 2,
    borderColor: colors.imageCreator.primary,
    marginBottom: spacing.md,
  },
  loadingTitle: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 4,
  },
  loadingSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13,
    color: colors.text.secondary,
  },
  resultCard: {
    backgroundColor: colors.surface.glass,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border.strong,
    padding: spacing.base,
    marginBottom: spacing.xl,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
  },
  styleBadge: {
    backgroundColor: 'rgba(26, 106, 255, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
    marginRight: 6,
  },
  styleBadgeText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.medium,
    color: colors.imageCreator.secondary,
  },
  ratioBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.xs,
  },
  ratioBadgeText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
  },
  resultTime: {
    fontSize: 11,
    color: colors.text.disabled,
  },
  imageFrame: {
    width: '100%',
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: '#000000',
    marginBottom: spacing.sm,
  },
  artworkImage: {
    width: '100%',
    height: '100%',
  },
  disclaimerBox: {
    backgroundColor: 'rgba(26, 106, 255, 0.10)',
    borderColor: 'rgba(26, 106, 255, 0.25)',
    borderWidth: 1,
    borderRadius: radius.xs,
    padding: 8,
    marginBottom: spacing.sm,
  },
  disclaimerText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 11,
    color: colors.imageCreator.secondary,
    lineHeight: 16,
  },
  imagePromptText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 14,
    color: colors.text.primary,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: radius.button,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  regenerateBtn: {
    backgroundColor: 'rgba(26, 106, 255, 0.20)',
  },
  actionBtnText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 12,
    color: colors.text.primary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  emptyIllustration: {
    marginBottom: spacing.base,
    opacity: 0.8,
  },
  emptyTitle: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 20,
    color: colors.text.primary,
    marginBottom: 6,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.secondary,
    borderTopLeftRadius: radius.card,
    borderTopRightRadius: radius.card,
    padding: spacing.base,
    maxHeight: '75%',
    borderWidth: 1,
    borderColor: colors.border.strong,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  modalTitle: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 18,
    color: colors.text.primary,
  },
  modalCloseText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 15,
    color: colors.imageCreator.primary,
  },
  historyList: {
    paddingVertical: spacing.sm,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.subtle,
  },
  historyThumb: {
    width: 52,
    height: 52,
    borderRadius: radius.xs,
    backgroundColor: '#000000',
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyPrompt: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 13,
    color: colors.text.primary,
    marginBottom: 2,
  },
  historyMeta: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 11,
    color: colors.text.tertiary,
  },
  emptyHistoryBox: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  emptyHistoryText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14,
    color: colors.text.secondary,
  },
  clearHistoryButton: {
    alignSelf: 'center',
    marginTop: spacing.md,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  clearHistoryText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 13,
    color: colors.status.error,
  },
});

export default ImageCreatorScreen;
