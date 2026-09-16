/**
 * ChatInput.js — Reanimated Bottom Message Input Component
 *
 * Multiline input textbox, send button with press feedback, disabled loading state.
 */
import React, { useCallback } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors, radius, spacing, typography } from '../../theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const ChatInput = ({ value, onChangeText, onSend, isLoading }) => {
  const scale = useSharedValue(1);

  const canSend = Boolean(value && value.trim() && !isLoading);

  const handlePressIn = useCallback(() => {
    if (!canSend) return;
    scale.value = withSpring(0.9, { damping: 15, stiffness: 300 });
  }, [canSend, scale]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  }, [scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder="Ask Gemini anything..."
          placeholderTextColor={colors.text.disabled}
          multiline
          maxLength={2000}
          editable={!isLoading}
        />

        <AnimatedTouchable
          style={[
            styles.sendButton,
            canSend ? styles.sendButtonActive : styles.sendButtonDisabled,
            animatedStyle,
          ]}
          activeOpacity={0.8}
          onPress={canSend ? () => onSend() : null}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={!canSend}
        >
          <Text style={[styles.sendIcon, canSend && styles.sendIconActive]}>
            {isLoading ? '⏳' : '➔'}
          </Text>
        </AnimatedTouchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.screenH,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background.primary,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderRadius: radius.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    minHeight: 52,
  },
  textInput: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base - 1,
    color: colors.text.primary,
    maxHeight: 120,
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: spacing.sm,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  sendButtonActive: {
    backgroundColor: colors.chatBot.primary,
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  sendIcon: {
    fontSize: 18,
    color: colors.text.disabled,
    fontWeight: '700',
  },
  sendIconActive: {
    color: '#000000',
  },
});

export default React.memo(ChatInput);
