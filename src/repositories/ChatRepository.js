/**
 * ChatRepository.js — Chat Repository Data Layer
 *
 * Coordinates StorageService (local caching) and GeminiService (API).
 * Implements Clean Architecture repository pattern.
 */
import GeminiService from '../services/api/geminiService';
import StorageService from '../services/storage/storageService';
import ChatMessage from '../models/ChatModel';

export class ChatRepository {
  /**
   * Load history from local storage
   */
  static async getHistory() {
    return await StorageService.getChatHistory();
  }

  /**
   * Save history array to local storage
   */
  static async saveHistory(messages) {
    return await StorageService.saveChatHistory(messages);
  }

  /**
   * Clear all stored history
   */
  static async clearHistory() {
    return await StorageService.clearChatHistory();
  }

  /**
   * Send messages to Gemini API
   */
  static async fetchGeminiResponse(messages, config = {}) {
    return await GeminiService.generateContent(messages, config);
  }
}

export default ChatRepository;
