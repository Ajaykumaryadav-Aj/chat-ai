/**
 * useChat.js — Custom React Hook for Chat Module
 *
 * Connects ChatController to React Component lifecycle and UI State.
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import ChatController from '../controllers/ChatController';
import { copyToClipboard } from '../utils/copyText';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState(null);
  const [inputText, setInputText] = useState('');
  
  const flatListRef = useRef(null);

  // Auto-scroll helper
  const scrollToBottom = useCallback((animated = true) => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated });
    }, 100);
  }, []);

  // Initialize and load chat history on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const history = await ChatController.loadChatHistory();
      if (isMounted) {
        setMessages(history);
        setIsInitializing(false);
        if (history.length > 0) {
          scrollToBottom(false);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [scrollToBottom]);

  // State update callback for ChatController
  const handleStateUpdate = useCallback(({ messages: newMsgs, isLoading: loading, error: err }) => {
    setMessages(newMsgs);
    setIsLoading(loading);
    setError(err || null);
    scrollToBottom(true);
  }, [scrollToBottom]);

  // Send message action
  const handleSendMessage = useCallback(async (overrideText) => {
    const textToSend = overrideText || inputText;
    if (!textToSend || !textToSend.trim() || isLoading) return;

    if (!overrideText) {
      setInputText('');
    }

    await ChatController.sendMessage({
      text: textToSend,
      currentMessages: messages,
      onStateUpdate: handleStateUpdate,
    });
  }, [inputText, isLoading, messages, handleStateUpdate]);

  // Retry last failed message action
  const handleRetry = useCallback(async () => {
    if (isLoading) return;
    await ChatController.retryLastMessage({
      currentMessages: messages,
      onStateUpdate: handleStateUpdate,
    });
  }, [isLoading, messages, handleStateUpdate]);

  // Clear all chats action
  const handleClearChat = useCallback(async () => {
    await ChatController.clearAllChats({
      onStateUpdate: handleStateUpdate,
    });
  }, [handleStateUpdate]);

  // Copy message text to clipboard
  const handleCopyMessage = useCallback(async (text) => {
    return await copyToClipboard(text);
  }, []);

  return {
    messages,
    isLoading,
    isInitializing,
    error,
    inputText,
    setInputText,
    sendMessage: handleSendMessage,
    retryMessage: handleRetry,
    clearChat: handleClearChat,
    copyMessage: handleCopyMessage,
    flatListRef,
    scrollToBottom,
  };
};

export default useChat;
