/**
 * ChatBubble.js — Individual Chat Message Bubble Component
 *
 * Supports User Messages, AI Messages, Error State, Copy to Clipboard, and Retry.
 */
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import MarkdownRenderer from './MarkdownRenderer';
import { CHAT_ROLES, MESSAGE_STATUS } from '../../constants/chatConstants';
import { formatMessageTime } from '../../utils/dateFormatter';
import { colors, radius, spacing, typography } from '../../theme';

export const ChatBubble = ({ message, onCopy, onRetry }) => {
  const [copied, setCopied] = useState(false);

  const isUser = message.role === CHAT_ROLES.USER;
  const isError = message.status === MESSAGE_STATUS.ERROR;

  const handleCopy = useCallback(async () => {
    if (onCopy) {
      const ok = await onCopy(message.text);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  }, [message.text, onCopy]);

  return (
    <Animated.View
      entering={FadeInUp.duration(300).springify()}
      style={[
        styles.rowContainer,
        isUser ? styles.userRow : styles.aiRow,
      ]}
    >
      {!isUser && (
        <View style={styles.aiAvatar}>
          <Text style={styles.aiAvatarEmoji}>🤖</Text>
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.aiBubble,
          isError && styles.errorBubble,
        ]}
      >
        {isError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{message.text}</Text>
            {onRetry && (
              <TouchableOpacity style={styles.retryButton} activeOpacity={0.7} onPress={onRetry}>
                <Text style={styles.retryText}>🔄 Retry Request</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <MarkdownRenderer content={message.text} isUser={isUser} />
        )}

        {/* Footer: Timestamp & Actions */}
        <View style={styles.footerRow}>
          <Text style={[styles.timestamp, isUser && styles.userTimestamp]}>
            {formatMessageTime(message.timestamp)}
          </Text>

          {!isUser && !isError && (
            <TouchableOpacity style={styles.copyBtn} activeOpacity={0.7} onPress={handleCopy}>
              <Text style={styles.copyText}>{copied ? '✓ Copied' : '📋 Copy'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.screenH,
    marginVertical: spacing.xs + 2,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 204, 119, 0.20)',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 119, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.xs,
    marginTop: 2,
  },
  aiAvatarEmoji: {
    fontSize: 15,
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: radius.card - 2,
    paddingHorizontal: spacing.md + 2,
    paddingVertical: spacing.md,
  },
  userBubble: {
    backgroundColor: '#005533',
    borderWidth: 1,
    borderColor: 'rgba(0, 254, 150, 0.35)',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: 'rgba(15, 25, 20, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 119, 0.25)',
    borderBottomLeftRadius: 4,
  },
  errorBubble: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    borderColor: 'rgba(255, 59, 48, 0.40)',
  },
  errorContainer: {
    width: '100%',
  },
  errorText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    color: colors.status.error,
    lineHeight: 20,
    marginBottom: spacing.xs,
  },
  retryButton: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 59, 48, 0.20)',
    borderColor: colors.status.error,
    borderWidth: 1,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 4,
    borderRadius: radius.button,
    marginTop: 4,
  },
  retryText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 12,
    color: '#FF6961',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timestamp: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 10,
    color: colors.text.tertiary,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.65)',
  },
  copyBtn: {
    paddingLeft: spacing.md,
  },
  copyText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 11,
    color: colors.chatBot.primary,
  },
});

export default React.memo(ChatBubble);
