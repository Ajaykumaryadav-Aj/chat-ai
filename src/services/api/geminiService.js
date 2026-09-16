/**
 * geminiService.js — Google Gemini REST API Client Service
 *
 * Isolated service layer that communicates exclusively with Google Gemini Developer API.
 * Never import UI components or call Gemini directly from screens.
 */
import ENV from '../../config/env';
import { CHAT_ROLES, DEFAULT_AI_CONFIG, MESSAGE_STATUS } from '../../constants/chatConstants';

// Supported fallback models in order of priority
const SUPPORTED_MODELS = ['gemini-2.5-flash', 'gemini-3.6-flash'];

export class GeminiService {
  /**
   * Converts internal ChatMessage array to Gemini API `contents` format.
   * Strips out error bubbles and empty entries to prevent context corruption.
   */
  static formatHistoryForGemini(messages = []) {
    return messages
      .filter(
        (msg) =>
          msg &&
          msg.text &&
          msg.status !== MESSAGE_STATUS.ERROR &&
          !msg.text.startsWith('⚠️') &&
          (msg.role === CHAT_ROLES.USER || msg.role === CHAT_ROLES.MODEL)
      )
      .map((msg) => ({
        role: msg.role === CHAT_ROLES.USER ? 'user' : 'model',
        parts: [{ text: msg.text }],
      }));
  }

  /**
   * Send conversation to Gemini API and return text response.
   * Supports automatic model fallback (e.g. if one model is overloaded or deprecated).
   */
  static async generateContent(messages = [], customConfig = {}) {
    const apiKey = (ENV.gemini.apiKey || '').trim();

    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      console.warn('[GeminiService] API key is missing or empty.');
      throw new Error(
        'Gemini API key is missing. Please add your GEMINI_API_KEY inside the .env file.'
      );
    }

    // Safe diagnostic log (never logs the actual key)
    if (__DEV__) {
      console.log(`[GeminiService] Request initiated | Key exists: true | Key length: ${apiKey.length}`);
    }

    const preferredModel = customConfig.modelName || ENV.gemini.model || DEFAULT_AI_CONFIG.modelName;
    const modelsToTry = [preferredModel, ...SUPPORTED_MODELS.filter((m) => m !== preferredModel)];
    const baseUrl = ENV.gemini.baseUrl || 'https://generativelanguage.googleapis.com/v1beta';

    const formattedContents = this.formatHistoryForGemini(messages);
    if (formattedContents.length === 0) {
      throw new Error('Message contents cannot be empty.');
    }

    const payload = {
      contents: formattedContents,
      systemInstruction: {
        parts: [{ text: customConfig.systemPrompt || DEFAULT_AI_CONFIG.systemPrompt }],
      },
      generationConfig: {
        temperature: customConfig.temperature ?? DEFAULT_AI_CONFIG.temperature,
        maxOutputTokens: customConfig.maxOutputTokens ?? DEFAULT_AI_CONFIG.maxOutputTokens,
      },
    };

    let lastError = null;

    // Try primary model, fallback to alternative supported model if 404 or 503
    for (let i = 0; i < modelsToTry.length; i++) {
      const currentModel = modelsToTry[i];
      const url = `${baseUrl}/models/${currentModel}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), DEFAULT_AI_CONFIG.timeoutMs);

      try {
        if (__DEV__) {
          console.log(`[GeminiService] Calling model: ${currentModel}`);
        }

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const status = response.status;
          const errorMessage = errorData.error?.message || response.statusText || '';
          const errorCode = errorData.error?.code || status;
          const errorStatus = errorData.error?.status || '';

          // Safe diagnostic log
          if (__DEV__) {
            console.warn(
              `[GeminiService] HTTP ${status} from ${currentModel} | Code: ${errorCode} | Status: ${errorStatus} | Msg: ${errorMessage}`
            );
          }

          // If model is not found (404) or temporarily overloaded (503), try next model
          if ((status === 404 || status === 503) && i < modelsToTry.length - 1) {
            console.log(`[GeminiService] Switching from ${currentModel} to next fallback model...`);
            continue;
          }

          if (status === 401 || status === 403) {
            throw new Error(`API Key Error (${status}): Invalid or unauthorized Gemini API key.`);
          } else if (status === 404) {
            throw new Error(`Model Error (${status}): The requested Gemini model is not available.`);
          } else if (status === 429) {
            throw new Error('Rate limit exceeded. Please wait a moment before retrying.');
          } else if (status >= 500) {
            throw new Error(`Gemini Server Error (${status}): High traffic. Please retry in a moment.`);
          } else {
            throw new Error(`Gemini Error (${status}): ${errorMessage || 'Request failed.'}`);
          }
        }

        const data = await response.json();
        const candidate = data.candidates?.[0];

        if (!candidate) {
          if (data.promptFeedback?.blockReason) {
            throw new Error(`Response blocked by safety policy: ${data.promptFeedback.blockReason}`);
          }
          throw new Error('Received an empty response from Gemini AI.');
        }

        if (candidate.finishReason === 'SAFETY') {
          throw new Error('Response was blocked due to safety guidelines.');
        }

        // Join text from all content parts safely
        const textParts = candidate.content?.parts
          ?.map((p) => p.text)
          .filter((t) => typeof t === 'string' && t.length > 0)
          .join('');

        if (!textParts || !textParts.trim()) {
          throw new Error('Received empty text response from Gemini AI.');
        }

        if (__DEV__) {
          console.log(`[GeminiService] Success from ${currentModel} (${textParts.length} chars)`);
        }

        return textParts;
      } catch (error) {
        clearTimeout(timeoutId);
        lastError = error;

        // Abort / Network errors should fail immediately rather than looping through models
        if (error.name === 'AbortError') {
          throw new Error('Request timed out. Please check your connection and try again.');
        }

        const msg = (error.message || '').toLowerCase();
        if (
          msg.includes('network request failed') ||
          msg.includes('fetch failed') ||
          msg.includes('failed to fetch') ||
          msg.includes('enotfound') ||
          msg.includes('econnrefused')
        ) {
          throw new Error("You're offline. Check your internet connection and try again.");
        }

        // For auth errors (401/403), fail immediately since other models will also fail
        if (msg.includes('api key error') || msg.includes('unauthorized')) {
          throw error;
        }

        // If this was the last model in fallback chain, rethrow
        if (i === modelsToTry.length - 1) {
          throw error;
        }
      }
    }

    throw lastError || new Error('Failed to get a response from Gemini AI.');
  }

  /**
   * Request JSON generation from Gemini AI (used for Quiz & Structured Data)
   */
  static async generateJSON(prompt, systemPrompt = 'Respond strictly in JSON format.') {
    const rawResponse = await this.generateContent(
      [{ role: CHAT_ROLES.USER, text: prompt }],
      {
        systemPrompt: `${systemPrompt} Output raw JSON only. Do not wrap in markdown code blocks like \`\`\`json or \`\`\`.`,
        temperature: 0.3,
      }
    );

    // Clean any markdown formatting if present
    let cleaned = rawResponse.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    try {
      return JSON.parse(cleaned);
    } catch (parseErr) {
      // If direct parsing fails, attempt to extract JSON object or array via regex
      const jsonMatch = cleaned.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      throw new Error('AI returned an unreadable response format. Please try again.');
    }
  }
}

export default GeminiService;
