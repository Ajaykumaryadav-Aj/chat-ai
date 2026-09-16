/**
 * chatConstants.js — ChatBot Module Constants
 *
 * Configurable parameters, storage keys, and status codes for the AI Chat module.
 */

export const CHAT_ROLES = {
  USER: 'user',
  MODEL: 'model', // Gemini API role for AI
  SYSTEM: 'system',
  ERROR: 'error',
};

export const MESSAGE_STATUS = {
  SENDING: 'sending',
  SENT: 'sent',
  ERROR: 'error',
};

export const STORAGE_KEYS = {
  CHAT_MESSAGES: '@ai_studio_chat_messages_v1',
  CHAT_SETTINGS: '@ai_studio_chat_settings_v1',
  LAST_CHAT_TIME: '@ai_studio_last_chat_time_v1',
};

export const DEFAULT_AI_CONFIG = {
  modelName: 'gemini-2.5-flash',
  temperature: 0.7,
  maxOutputTokens: 2048,
  systemPrompt:
    'You are Gemini AI, a helpful, intelligent, polite, and creative AI assistant inside the AI Studio app. Keep your formatting clean using Markdown where appropriate.',
  timeoutMs: 30000,
};

export const SUGGESTION_PROMPTS = [
  { id: '1', title: '💡 Explain a Concept', prompt: 'Explain Quantum Computing in simple terms.' },
  { id: '2', title: '💻 Write Code', prompt: 'Write a JavaScript function to reverse a string.' },
  { id: '3', title: '📝 Draft an Email', prompt: 'Draft a professional email asking for project feedback.' },
  { id: '4', title: '🧠 Brainstorm Ideas', prompt: 'Give me 5 unique app ideas for productivity.' },
];
