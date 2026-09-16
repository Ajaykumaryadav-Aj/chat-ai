/**
 * ImageCreatorRepository.js — Image Creator Repository & Persistence
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import GeneratedImage from '../models/ImageCreatorModel';

const STORAGE_KEY = '@ai_studio_image_history_v1';

// High-fidelity curated visual representations matched by theme
const CURATED_GENERATIVE_ASSETS = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1000&q=80',
];

export class ImageCreatorRepository {
  /**
   * Load previously generated images from local storage
   */
  static async getHistory() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (!data) return [];
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      return parsed.map((item) => GeneratedImage.fromJSON(item));
    } catch (err) {
      console.error('[ImageCreatorRepository] Failed to load image history:', err);
      return [];
    }
  }

  /**
   * Save array of generated images
   */
  static async saveHistory(images = []) {
    try {
      const serializable = images.map((img) =>
        img instanceof GeneratedImage ? img.toJSON() : img
      );
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
      return true;
    } catch (err) {
      console.error('[ImageCreatorRepository] Failed to save image history:', err);
      return false;
    }
  }

  /**
   * Clear all image generation history
   */
  static async clearHistory() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (err) {
      console.error('[ImageCreatorRepository] Failed to clear image history:', err);
      return false;
    }
  }

  /**
   * Generate an image based on prompt and parameters.
   * Simulates AI synthesis when direct cloud image generation is not active.
   */
  static async generateImage({ prompt, style = 'Photorealistic', aspectRatio = '1:1' }) {
    // Artificial delay to simulate real GPU rendering pipeline
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Select deterministic visual based on prompt hash
    let hash = 0;
    for (let i = 0; i < prompt.length; i++) {
      hash = (hash << 5) - hash + prompt.charCodeAt(i);
      hash |= 0;
    }
    const index = Math.abs(hash) % CURATED_GENERATIVE_ASSETS.length;
    const selectedUrl = CURATED_GENERATIVE_ASSETS[index];

    const image = new GeneratedImage({
      prompt,
      style,
      aspectRatio,
      imageUrl: selectedUrl,
      timestamp: Date.now(),
      isMock: true,
    });

    return image;
  }
}

export default ImageCreatorRepository;
