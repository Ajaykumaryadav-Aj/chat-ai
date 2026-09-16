/**
 * storageService.js — Local Persistence Storage Service
 *
 * Encapsulates AsyncStorage for persistent chat history and user settings.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../constants/chatConstants';
import ChatMessage from '../../models/ChatModel';

export class StorageService {
  /**
   * Load stored chat history array
   */
  static async getChatHistory() {
    try {
      const jsonString = await AsyncStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES);
      if (!jsonString) return [];
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((item) => ChatMessage.fromJSON(item));
    } catch (error) {
      console.error('[StorageService] Error loading chat history:', error);
      return [];
    }
  }

  /**
   * Save chat history array
   */
  static async saveChatHistory(messages = []) {
    try {
      const serializable = messages.map((msg) =>
        msg instanceof ChatMessage ? msg.toJSON() : msg
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.CHAT_MESSAGES,
        JSON.stringify(serializable)
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.LAST_CHAT_TIME,
        String(Date.now())
      );
      return true;
    } catch (error) {
      console.error('[StorageService] Error saving chat history:', error);
      return false;
    }
  }

  /**
   * Clear stored chat history
   */
  static async clearChatHistory() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.CHAT_MESSAGES);
      await AsyncStorage.removeItem(STORAGE_KEYS.LAST_CHAT_TIME);
      return true;
    } catch (error) {
      console.error('[StorageService] Error clearing chat history:', error);
      return false;
    }
  }
}

export default StorageService;
