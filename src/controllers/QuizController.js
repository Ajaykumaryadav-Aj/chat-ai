/**
 * QuizController.js — Controller for AI Quiz Game
 */
import { useState, useCallback } from 'react';
import QuizRepository from '../repositories/QuizRepository';

export const useQuizController = () => {
  const [screenState, setScreenState] = useState('setup'); // 'setup' | 'loading' | 'playing' | 'result'
  const [topic, setTopic] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('General Knowledge');
  const [difficulty, setDifficulty] = useState('Medium');
  const [numQuestions, setNumQuestions] = useState(5);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [error, setError] = useState(null);

  // Start Quiz
  const startQuiz = useCallback(async () => {
    const activeTopic = topic.trim() || selectedCategory;
    setScreenState('loading');
    setError(null);

    try {
      const generatedQuestions = await QuizRepository.generateQuizQuestions({
        topic: activeTopic,
        difficulty,
        numQuestions,
      });

      if (!generatedQuestions || generatedQuestions.length === 0) {
        throw new Error('Unable to create quiz questions. Please try again.');
      }

      setQuestions(generatedQuestions);
      setCurrentIndex(0);
      setScore(0);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
      setScreenState('playing');
    } catch (err) {
      console.error('[QuizController] Start quiz error:', err);
      setError(err.message || 'Failed to generate quiz. Please check your network and retry.');
      setScreenState('setup');
    }
  }, [difficulty, numQuestions, selectedCategory, topic]);

  // Select Option
  const selectOption = useCallback(
    (index) => {
      if (isAnswerRevealed || currentIndex >= questions.length) return;

      const currentQ = questions[currentIndex];
      setSelectedOption(index);
      setIsAnswerRevealed(true);

      const isCorrect = index === currentQ.correctIndex;
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }

      // Record answer in question object
      currentQ.selectedOption = index;
    },
    [currentIndex, isAnswerRevealed, questions]
  );

  // Next Question or Finish
  const nextQuestion = useCallback(async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      // Quiz finished
      const activeTopic = topic.trim() || selectedCategory;
      await QuizRepository.saveQuizResult({
        topic: activeTopic,
        score,
        totalQuestions: questions.length,
      });
      setScreenState('result');
    }
  }, [currentIndex, questions.length, score, selectedCategory, topic]);

  // Restart Quiz
  const restartQuiz = useCallback(() => {
    setScreenState('setup');
    setCurrentIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswerRevealed(false);
    setError(null);
  }, []);

  return {
    screenState,
    topic,
    setTopic,
    selectedCategory,
    setSelectedCategory,
    difficulty,
    setDifficulty,
    numQuestions,
    setNumQuestions,
    questions,
    currentIndex,
    currentQuestion: questions[currentIndex] || null,
    score,
    selectedOption,
    isAnswerRevealed,
    error,
    startQuiz,
    selectOption,
    nextQuestion,
    restartQuiz,
  };
};

export default useQuizController;
