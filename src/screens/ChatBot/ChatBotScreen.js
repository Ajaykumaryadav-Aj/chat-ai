/**
 * ChatBotScreen.js — Production-Ready AI ChatBot Screen
 *
 * Implements:
 * - Gemini API Integration via Clean Architecture (Screen -> Hook -> Controller -> Repo -> GeminiService)
 * - Real-time streaming response simulation & typing indicator
 * - Markdown Rendering (Code blocks, bold, lists, inline code)
 * - Copy message, retry failed message, clear chat history modal
 * - AsyncStorage persistent storage
 * - Keyboard avoiding view, auto scroll to bottom, optimized FlatList
 */
import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ChatHeader from '../../components/chat/ChatHeader';
import ChatBubble from '../../components/chat/ChatBubble';
import ChatInput from '../../components/chat/ChatInput';
import TypingIndicator from '../../components/chat/TypingIndicator';
import EmptyState from '../../components/chat/EmptyState';
import ChatLoader from '../../components/chat/ChatLoader';

import useChat from '../../hooks/useChat';
import { colors, gradients, spacing } from '../../theme';
import { MESSAGE_STATUS } from '../../constants/chatConstants';

const ChatBotScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const {
    messages,
    isLoading,
    isInitializing,
    inputText,
    setInputText,
    sendMessage,
    retryMessage,
    clearChat,
    copyMessage,
    flatListRef,
  } = useChat();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderMessageItem = useCallback(
    ({ item }) => {
      // Don't render loading placeholder as a bubble (TypingIndicator renders it)
      if (item.status === MESSAGE_STATUS.SENDING && !item.text) {
        return null;
      }

      return (
        <ChatBubble
          message={item}
          onCopy={copyMessage}
          onRetry={item.status === MESSAGE_STATUS.ERROR ? retryMessage : null}
        />
      );
    },
    [copyMessage, retryMessage]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />

      {/* Screen Background */}
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

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View style={{ paddingTop: Math.max(insets.top, 20) + spacing.xs }}>
          <ChatHeader onBackPress={handleBackPress} onClearChat={clearChat} />
        </View>

        {/* Chat Conversation Area */}
        <View style={styles.chatArea}>
          {isInitializing ? (
            <ChatLoader />
          ) : messages.length === 0 ? (
            <EmptyState onSelectSuggestion={(prompt) => sendMessage(prompt)} />
          ) : (
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessageItem}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
              ListFooterComponent={isLoading ? <TypingIndicator /> : null}
            />
          )}
        </View>

        {/* Bottom Input Area */}
        <View style={{ paddingBottom: Math.max(insets.bottom, 10) }}>
          <ChatInput
            value={inputText}
            onChangeText={setInputText}
            onSend={sendMessage}
            isLoading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  keyboardView: {
    flex: 1,
  },
  chatArea: {
    flex: 1,
  },
  listContent: {
    paddingVertical: spacing.md,
  },
});

export default ChatBotScreen;
