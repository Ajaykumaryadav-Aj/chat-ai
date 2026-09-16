/**
 * ChatController.js — Chat Controller Business Logic
 *
 * Implements MVC Controller:
 * Pure state transformations & asynchronous message orchestration.
 */
import ChatRepository from '../repositories/ChatRepository';
import ChatMessage from '../models/ChatModel';
import { CHAT_ROLES, MESSAGE_STATUS } from '../constants/chatConstants';

export class ChatController {
  /**
   * Initialize and load persisted chat history
   */
  static async loadChatHistory() {
    try {
      return await ChatRepository.getHistory();
    } catch (error) {
      console.error('[ChatController] Failed to load chat history:', error);
      return [];
    }
  }

  /**
   * Process sending a new user message and requesting Gemini AI response
   */
  static async sendMessage({ text, currentMessages = [], onStateUpdate }) {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    // 1. Create User Message
    const userMsg = ChatMessage.create(trimmedText, CHAT_ROLES.USER, MESSAGE_STATUS.SENT);
    
    // 2. Create Loading Placeholder for AI
    const loadingMsg = ChatMessage.create('', CHAT_ROLES.MODEL, MESSAGE_STATUS.SENDING);

    const updatedMessages = [...currentMessages, userMsg, loadingMsg];
    
    // Notify View of User Message & Loading State
    onStateUpdate({
      messages: updatedMessages,
      isLoading: true,
      error: null,
    });

    try {
      // 3. Request Response from Gemini Repository
      const conversationContext = [...currentMessages, userMsg];
      const aiResponseText = await ChatRepository.fetchGeminiResponse(conversationContext);

      // 4. Replace Loading Placeholder with Actual AI Response
      const aiMsg = new ChatMessage({
        id: loadingMsg.id,
        text: aiResponseText,
        role: CHAT_ROLES.MODEL,
        timestamp: Date.now(),
        status: MESSAGE_STATUS.SENT,
      });

      const finalMessages = [...currentMessages, userMsg, aiMsg];
      await ChatRepository.saveHistory(finalMessages);

      onStateUpdate({
        messages: finalMessages,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      const errorMessageText = err.message || 'Failed to receive response from Gemini AI.';
      
      const errorMsg = new ChatMessage({
        id: loadingMsg.id,
        text: `⚠️ ${errorMessageText}`,
        role: CHAT_ROLES.MODEL,
        timestamp: Date.now(),
        status: MESSAGE_STATUS.ERROR,
        error: errorMessageText,
      });

      const failedMessages = [...currentMessages, userMsg, errorMsg];
      await ChatRepository.saveHistory(failedMessages);

      onStateUpdate({
        messages: failedMessages,
        isLoading: false,
        error: errorMessageText,
      });
    }
  }

  /**
   * Retry a failed message response
   */
  static async retryLastMessage({ currentMessages = [], onStateUpdate }) {
    if (currentMessages.length === 0) return;

    // Find the last user message
    const lastUserIndex = [...currentMessages].reverse().findIndex((m) => m.role === CHAT_ROLES.USER);
    if (lastUserIndex === -1) return;

    const actualIndex = currentMessages.length - 1 - lastUserIndex;
    const userMsg = currentMessages[actualIndex];

    // Remove any trailing error message
    const trimmedContext = currentMessages.slice(0, actualIndex + 1);
    
    const loadingMsg = ChatMessage.create('', CHAT_ROLES.MODEL, MESSAGE_STATUS.SENDING);
    onStateUpdate({
      messages: [...trimmedContext, loadingMsg],
      isLoading: true,
      error: null,
    });

    try {
      const aiResponseText = await ChatRepository.fetchGeminiResponse(trimmedContext);
      const aiMsg = new ChatMessage({
        id: loadingMsg.id,
        text: aiResponseText,
        role: CHAT_ROLES.MODEL,
        timestamp: Date.now(),
        status: MESSAGE_STATUS.SENT,
      });

      const finalMessages = [...trimmedContext, aiMsg];
      await ChatRepository.saveHistory(finalMessages);

      onStateUpdate({
        messages: finalMessages,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      const errorMessageText = err.message || 'Retry failed.';
      const errorMsg = new ChatMessage({
        id: loadingMsg.id,
        text: `⚠️ ${errorMessageText}`,
        role: CHAT_ROLES.MODEL,
        timestamp: Date.now(),
        status: MESSAGE_STATUS.ERROR,
        error: errorMessageText,
      });

      const failedMessages = [...trimmedContext, errorMsg];
      await ChatRepository.saveHistory(failedMessages);

      onStateUpdate({
        messages: failedMessages,
        isLoading: false,
        error: errorMessageText,
      });
    }
  }

  /**
   * Clear all chat history
   */
  static async clearAllChats({ onStateUpdate }) {
    await ChatRepository.clearHistory();
    onStateUpdate({
      messages: [],
      isLoading: false,
      error: null,
    });
  }
}

export default ChatController;
