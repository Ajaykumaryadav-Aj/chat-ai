/**
 * copyText.js — Copy to Clipboard Utility
 *
 * Uses expo-clipboard to safely copy message text.
 */
import * as Clipboard from 'expo-clipboard';

export const copyToClipboard = async (text) => {
  if (!text) return false;
  try {
    await Clipboard.setStringAsync(text);
    return true;
  } catch (error) {
    console.error('[copyToClipboard] Error copying text:', error);
    return false;
  }
};
