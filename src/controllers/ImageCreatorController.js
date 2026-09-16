/**
 * ImageCreatorController.js — Controller for AI Image Creator
 */
import { useState, useEffect, useCallback } from 'react';
import ImageCreatorRepository from '../repositories/ImageCreatorRepository';
import { copyToClipboard } from '../utils/copyText';
import { IMAGE_STYLES, ASPECT_RATIOS, PROMPT_INSPIRATIONS } from '../models/ImageCreatorModel';

export const useImageCreatorController = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState(IMAGE_STYLES[0].label);
  const [selectedRatio, setSelectedRatio] = useState(ASPECT_RATIOS[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Load history on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      const stored = await ImageCreatorRepository.getHistory();
      if (isMounted) {
        setHistory(stored);
        if (stored.length > 0) {
          setCurrentImage(stored[0]);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Generate Image
  const generate = useCallback(async (customPrompt) => {
    const activePrompt = (customPrompt || prompt).trim();
    if (!activePrompt || isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      const generated = await ImageCreatorRepository.generateImage({
        prompt: activePrompt,
        style: selectedStyle,
        aspectRatio: selectedRatio,
      });

      setCurrentImage(generated);
      const updatedHistory = [generated, ...history.filter((h) => h.id !== generated.id)];
      setHistory(updatedHistory);
      await ImageCreatorRepository.saveHistory(updatedHistory);
    } catch (err) {
      setError(err.message || 'Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [history, isGenerating, prompt, selectedRatio, selectedStyle]);

  // Copy Prompt
  const copyPromptText = useCallback(async (textToCopy) => {
    const text = textToCopy || currentImage?.prompt || prompt;
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  }, [currentImage?.prompt, prompt]);

  // Save Image (Feedback simulation)
  const saveImage = useCallback(() => {
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2000);
  }, []);

  // Clear all history
  const clearAllHistory = useCallback(async () => {
    await ImageCreatorRepository.clearHistory();
    setHistory([]);
    setCurrentImage(null);
    setShowHistoryModal(false);
  }, []);

  // Use prompt inspiration
  const selectInspiration = useCallback((text) => {
    setPrompt(text);
  }, []);

  return {
    prompt,
    setPrompt,
    selectedStyle,
    setSelectedStyle,
    selectedRatio,
    setSelectedRatio,
    isGenerating,
    currentImage,
    setCurrentImage,
    history,
    error,
    copyFeedback,
    saveFeedback,
    showHistoryModal,
    setShowHistoryModal,
    generate,
    copyPromptText,
    saveImage,
    clearAllHistory,
    selectInspiration,
    styles: IMAGE_STYLES,
    ratios: ASPECT_RATIOS,
    inspirations: PROMPT_INSPIRATIONS,
  };
};

export default useImageCreatorController;
