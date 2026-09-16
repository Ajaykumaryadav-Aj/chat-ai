/**
 * ChatHeader.js — Chat Screen Top Navigation Bar
 *
 * Back button, Gemini AI Avatar, online status, title, clear chat history button.
 */
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

export const ChatHeader = ({ onBackPress, onClearChat }) => {
  const [showClearModal, setShowClearModal] = useState(false);

  const handleConfirmClear = () => {
    setShowClearModal(false);
    if (onClearChat) {
      onClearChat();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftRow}>
        <TouchableOpacity style={styles.backButton} activeOpacity={0.7} onPress={onBackPress}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>

        <View style={styles.avatarWrapper}>
          <View style={styles.avatarInner}>
            <Text style={styles.avatarEmoji}>🤖</Text>
          </View>
          <View style={styles.onlineDot} />
        </View>

        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Gemini AI</Text>
          <Text style={styles.statusText}>Online • Always Ready</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.clearButton}
        activeOpacity={0.7}
        onPress={() => setShowClearModal(true)}
      >
        <Text style={styles.clearIcon}>🗑️</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        visible={showClearModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowClearModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Clear Conversation?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to delete all messages in this chat? This action cannot be undone.
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setShowClearModal(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.deleteBtn]}
                onPress={handleConfirmClear}
              >
                <Text style={styles.deleteBtnText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenH,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingRight: spacing.sm,
    paddingVertical: spacing.xs,
  },
  backIcon: {
    fontSize: 28,
    color: colors.chatBot.primary,
    fontWeight: '300',
    lineHeight: 30,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: spacing.sm + 2,
  },
  avatarInner: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 204, 119, 0.20)',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 119, 0.40)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 18,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.status.success,
    borderWidth: 2,
    borderColor: colors.background.primary,
  },
  titleWrapper: {},
  title: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
  },
  statusText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs,
    color: colors.chatBot.primary,
  },
  clearButton: {
    padding: spacing.xs + 2,
  },
  clearIcon: {
    fontSize: 18,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.screenH,
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.background.secondary,
    borderRadius: radius.card,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border.strong,
  },
  modalTitle: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: typography.fontSize.xl,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  modalText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base - 1,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.button,
    marginLeft: spacing.sm,
  },
  cancelBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  cancelBtnText: {
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text.secondary,
  },
  deleteBtn: {
    backgroundColor: colors.status.error,
  },
  deleteBtnText: {
    fontFamily: typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
});

export default React.memo(ChatHeader);
