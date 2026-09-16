/**
 * EmptyState.js — Chat Empty Conversation State Component
 *
 * Displays friendly welcome message & suggestion prompt chips.
 */
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ChatBotIllustration from '../illustrations/ChatBotIllustration';
import { SUGGESTION_PROMPTS } from '../../constants/chatConstants';
import { colors, radius, spacing, typography } from '../../theme';

export const EmptyState = ({ onSelectSuggestion }) => {
  return (
    <View style={styles.container}>
      <View style={styles.illustrationWrapper}>
        <ChatBotIllustration width={110} height={110} />
      </View>

      <Text style={styles.title}>Start a Conversation</Text>
      <Text style={styles.subtitle}>
        Ask me anything — I am powered by Gemini AI. Choose a prompt below or type your own question!
      </Text>

      {/* Suggestion Chips */}
      <View style={styles.suggestionsContainer}>
        {SUGGESTION_PROMPTS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.suggestionChip}
            activeOpacity={0.75}
            onPress={() => onSelectSuggestion && onSelectSuggestion(item.prompt)}
          >
            <Text style={styles.chipTitle}>{item.title}</Text>
            <Text style={styles.chipPrompt} numberOfLines={1}>
              {item.prompt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.screenH,
    paddingVertical: spacing.xl,
  },
  illustrationWrapper: {
    marginBottom: spacing.base,
  },
  title: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: typography.fontSize['2xl'],
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.base - 1,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  suggestionsContainer: {
    width: '100%',
  },
  suggestionChip: {
    backgroundColor: 'rgba(0, 77, 51, 0.25)',
    borderColor: 'rgba(0, 204, 119, 0.30)',
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm + 2,
  },
  chipTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    color: colors.chatBot.primary,
    marginBottom: 2,
  },
  chipPrompt: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.xs + 1,
    color: colors.text.tertiary,
  },
});

export default React.memo(EmptyState);
