/**
 * ChatModel.js — Chat Message Model & Data Structure
 *
 * Defines the canonical chat message entity and serialization helpers.
 */
import { CHAT_ROLES, MESSAGE_STATUS } from '../constants/chatConstants';

export class ChatMessage {
  constructor({
    id = String(Date.now() + Math.random()),
    text = '',
    role = CHAT_ROLES.USER,
    timestamp = Date.now(),
    status = MESSAGE_STATUS.SENT,
    error = null,
  }) {
    this.id = id;
    this.text = text;
    this.role = role;
    this.timestamp = timestamp;
    this.status = status;
    this.error = error;
  }

  static create(text, role = CHAT_ROLES.USER, status = MESSAGE_STATUS.SENT, error = null) {
    return new ChatMessage({
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text,
      role,
      timestamp: Date.now(),
      status,
      error,
    });
  }

  static fromJSON(json) {
    return new ChatMessage({
      id: json.id,
      text: json.text,
      role: json.role,
      timestamp: json.timestamp || Date.now(),
      status: json.status || MESSAGE_STATUS.SENT,
      error: json.error || null,
    });
  }

  toJSON() {
    return {
      id: this.id,
      text: this.text,
      role: this.role,
      timestamp: this.timestamp,
      status: this.status,
      error: this.error,
    };
  }
}

export default ChatMessage;
