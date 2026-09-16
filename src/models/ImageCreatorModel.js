/**
 * ImageCreatorModel.js — AI Image Creator Data Model
 */

export class GeneratedImage {
  constructor({
    id = `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    prompt = '',
    style = 'Photorealistic',
    aspectRatio = '1:1',
    imageUrl = '',
    timestamp = Date.now(),
    isMock = false,
  }) {
    this.id = id;
    this.prompt = prompt;
    this.style = style;
    this.aspectRatio = aspectRatio;
    this.imageUrl = imageUrl;
    this.timestamp = timestamp;
    this.isMock = isMock;
  }

  static fromJSON(json) {
    return new GeneratedImage({
      id: json.id,
      prompt: json.prompt,
      style: json.style,
      aspectRatio: json.aspectRatio,
      imageUrl: json.imageUrl,
      timestamp: json.timestamp || Date.now(),
      isMock: json.isMock || false,
    });
  }

  toJSON() {
    return {
      id: this.id,
      prompt: this.prompt,
      style: this.style,
      aspectRatio: this.aspectRatio,
      imageUrl: this.imageUrl,
      timestamp: this.timestamp,
      isMock: this.isMock,
    };
  }
}

export const IMAGE_STYLES = [
  { id: 'photorealistic', label: 'Photorealistic', icon: '📸' },
  { id: 'cyberpunk',      label: 'Cyberpunk',      icon: '🌆' },
  { id: 'anime',          label: 'Anime',          icon: '✨' },
  { id: '3d_render',      label: '3D Render',      icon: '🧊' },
  { id: 'fantasy',        label: 'Fantasy Art',    icon: '🔮' },
  { id: 'minimalist',     label: 'Minimalist',     icon: '🎨' },
];

export const ASPECT_RATIOS = [
  { id: '1:1',  label: '1:1',  ratio: 1,      description: 'Square' },
  { id: '16:9', label: '16:9', ratio: 16 / 9, description: 'Landscape' },
  { id: '9:16', label: '9:16', ratio: 9 / 16, description: 'Portrait' },
];

export const PROMPT_INSPIRATIONS = [
  'A neon-lit cyberpunk city in heavy rain, cinematic lighting, 8k resolution',
  'A lone astronaut meditating in a cosmic garden of glowing crystalline flowers',
  'A cute futuristic helper robot drinking coffee on a rainy balcony in Tokyo',
  'Mythical golden dragon perched atop a snowy mountain under aurora borealis',
  'Floating bioluminescent islands with waterfalls drifting in a nebula sky',
];

export default GeneratedImage;
