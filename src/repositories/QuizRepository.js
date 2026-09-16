/**
 * QuizRepository.js — Quiz Data Repository
 *
 * Communicates with Gemini AI to generate quizzes and manages local score persistence.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import GeminiService from '../services/api/geminiService';
import QuizQuestion, { FALLBACK_QUIZZES } from '../models/QuizModel';

const QUIZ_STATS_KEY = '@ai_studio_quiz_stats_v1';

export class QuizRepository {
  /**
   * Request AI-generated multiple-choice questions from Gemini
   */
  static async generateQuizQuestions({ topic = 'General Knowledge', difficulty = 'Medium', numQuestions = 5 }) {
    const prompt = `Generate exactly ${numQuestions} multiple-choice questions about "${topic}" suitable for ${difficulty} difficulty.
Format as a JSON array of objects where each object has exactly:
- "question": string
- "options": array of 4 distinct string choices
- "correctIndex": number (0, 1, 2, or 3) indicating which option is correct
- "explanation": brief 1-2 sentence explanation of why the correct answer is right

Ensure all 4 options are plausible and unique. Output valid JSON array only.`;

    try {
      const responseData = await GeminiService.generateJSON(
        prompt,
        'You are an expert trivia and quiz generator. Output valid JSON arrays only.'
      );

      if (Array.isArray(responseData) && responseData.length > 0) {
        // Validate each item
        const validQuestions = responseData
          .filter((item) => item.question && Array.isArray(item.options) && item.options.length >= 4)
          .map((item) =>
            QuizQuestion.fromJSON({
              question: item.question,
              options: item.options.slice(0, 4),
              correctIndex: typeof item.correctIndex === 'number' && item.correctIndex >= 0 && item.correctIndex < 4 ? item.correctIndex : 0,
              explanation: item.explanation || 'No explanation provided.',
            })
          );

        if (validQuestions.length > 0) {
          return validQuestions;
        }
      }

      // If parsing succeeded but array was invalid
      return this.getFallbackQuestions(topic, numQuestions);
    } catch (err) {
      console.warn('[QuizRepository] Gemini generation failed, falling back to local quiz bank:', err.message);
      return this.getFallbackQuestions(topic, numQuestions);
    }
  }

  /**
   * Get offline fallback questions if network or Gemini is unavailable
   */
  static getFallbackQuestions(topic = '', count = 5) {
    const lowerTopic = topic.toLowerCase();
    let pool = FALLBACK_QUIZZES.general;

    if (lowerTopic.includes('tech') || lowerTopic.includes('code') || lowerTopic.includes('computer')) {
      pool = FALLBACK_QUIZZES.tech;
    }

    return pool.slice(0, count).map((item) => QuizQuestion.fromJSON(item));
  }

  /**
   * Save completed quiz score stats
   */
  static async saveQuizResult({ topic, score, totalQuestions }) {
    try {
      const existing = await this.getQuizStats();
      const updated = {
        totalQuizzesPlayed: (existing.totalQuizzesPlayed || 0) + 1,
        totalCorrect: (existing.totalCorrect || 0) + score,
        totalQuestions: (existing.totalQuestions || 0) + totalQuestions,
        lastPlayed: Date.now(),
      };
      await AsyncStorage.setItem(QUIZ_STATS_KEY, JSON.stringify(updated));
      return updated;
    } catch (err) {
      console.error('[QuizRepository] Failed to save quiz stats:', err);
      return null;
    }
  }

  /**
   * Retrieve total quiz statistics
   */
  static async getQuizStats() {
    try {
      const data = await AsyncStorage.getItem(QUIZ_STATS_KEY);
      return data ? JSON.parse(data) : { totalQuizzesPlayed: 0, totalCorrect: 0, totalQuestions: 0 };
    } catch (err) {
      return { totalQuizzesPlayed: 0, totalCorrect: 0, totalQuestions: 0 };
    }
  }
}

export default QuizRepository;
