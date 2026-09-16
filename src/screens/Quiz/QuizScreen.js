/**
 * QuizScreen.js — Production-Ready AI Quiz Game
 *
 * Implements:
 * - Topic input & Category selector chips
 * - Difficulty & Question count selection
 * - Gemini AI dynamic question generation with offline fallback
 * - Interactive answer selection with instant visual feedback
 * - Explanation reveal after answer selection
 * - Score calculation & Performance breakdown
 * - Detailed Answer Review list
 * - Restart & Home navigation
 */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

import useQuizController from '../../controllers/QuizController';
import QuizIllustration from '../../components/illustrations/QuizIllustration';
import { colors, gradients, radius, spacing, typography } from '../../theme';
import STRINGS from '../../constants/strings';

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const QUESTION_COUNTS = [3, 5, 10];

const QuizScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const {
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
    currentQuestion,
    score,
    selectedOption,
    isAnswerRevealed,
    error,
    startQuiz,
    selectOption,
    nextQuestion,
    restartQuiz,
  } = useQuizController();

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <LinearGradient
        colors={
          Array.isArray(gradients?.appBackground) && gradients.appBackground.length >= 2
            ? gradients.appBackground
            : ['#0A0A0F', '#0F0F1A', '#131322']
        }
        style={StyleSheet.absoluteFillObject}
      />

      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + spacing.xs }]}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.7}
          onPress={() => {
            if (screenState === 'playing') {
              restartQuiz();
            } else {
              navigation.goBack();
            }
          }}
        >
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {screenState === 'playing'
            ? `Question ${currentIndex + 1} of ${questions.length}`
            : screenState === 'result'
            ? 'Quiz Results'
            : 'AI Quiz Challenge'}
        </Text>

        {screenState === 'playing' ? (
          <View style={styles.scorePill}>
            <Text style={styles.scorePillText}>Score: {score}</Text>
          </View>
        ) : (
          <View style={{ width: 44 }} />
        )}
      </View>

      {/* ─── State 1: Setup Screen ────────────────────────────────────────── */}
      {screenState === 'setup' && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + spacing.xl },
          ]}
        >
          {error ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          ) : null}

          {/* Banner */}
          <View style={styles.setupHero}>
            <View style={styles.illustrationWrapper}>
              <QuizIllustration width={90} height={90} />
            </View>
            <Text style={styles.heroTitle}>Challenge Your Mind</Text>
            <Text style={styles.heroSubtitle}>
              Choose a category or type your own custom topic for Gemini AI to generate a fresh quiz!
            </Text>
          </View>

          {/* Custom Topic Input */}
          <View style={styles.card}>
            <Text style={styles.sectionLabel}>CUSTOM TOPIC (OPTIONAL)</Text>
            <TextInput
              style={styles.topicInput}
              placeholder="e.g. World War II, Marvel Universe, Space..."
              placeholderTextColor={colors.text.disabled}
              value={topic}
              onChangeText={setTopic}
              maxLength={60}
            />
          </View>

          {/* Category Chips */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>OR SELECT A CATEGORY</Text>
            <View style={styles.categoryGrid}>
              {STRINGS.QUIZ_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.label && !topic.trim();
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
                    activeOpacity={0.8}
                    onPress={() => {
                      setSelectedCategory(cat.label);
                      setTopic('');
                    }}
                  >
                    <Text style={styles.catEmoji}>{cat.emoji}</Text>
                    <Text style={[styles.catLabel, isSelected && styles.catLabelActive]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Difficulty Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>DIFFICULTY LEVEL</Text>
            <View style={styles.rowSelector}>
              {DIFFICULTIES.map((diff) => {
                const isSelected = difficulty === diff;
                return (
                  <TouchableOpacity
                    key={diff}
                    style={[styles.selectorBtn, isSelected && styles.selectorBtnActive]}
                    activeOpacity={0.8}
                    onPress={() => setDifficulty(diff)}
                  >
                    <Text style={[styles.selectorText, isSelected && styles.selectorTextActive]}>
                      {diff}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Number of Questions */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>NUMBER OF QUESTIONS</Text>
            <View style={styles.rowSelector}>
              {QUESTION_COUNTS.map((count) => {
                const isSelected = numQuestions === count;
                return (
                  <TouchableOpacity
                    key={count}
                    style={[styles.selectorBtn, isSelected && styles.selectorBtnActive]}
                    activeOpacity={0.8}
                    onPress={() => setNumQuestions(count)}
                  >
                    <Text style={[styles.selectorText, isSelected && styles.selectorTextActive]}>
                      {count} Questions
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Start Quiz Button */}
          <TouchableOpacity
            style={styles.startButton}
            activeOpacity={0.8}
            onPress={startQuiz}
          >
            <LinearGradient
              colors={['#FF8800', '#CC5500']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.startGradient}
            >
              <Text style={styles.startButtonText}>⚡ Start AI Quiz</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* ─── State 2: Loading Screen ──────────────────────────────────────── */}
      {screenState === 'loading' && (
        <Animated.View entering={FadeIn.duration(400)} style={styles.loadingCenter}>
          <View style={styles.loadingPulse}>
            <Text style={styles.loadingEmoji}>🧠</Text>
          </View>
          <Text style={styles.loadingTitle}>Generating Your Quiz</Text>
          <Text style={styles.loadingSubtitle}>
            Gemini AI is crafting custom questions on "{topic.trim() || selectedCategory}"...
          </Text>
        </Animated.View>
      )}

      {/* ─── State 3: Playing Screen ──────────────────────────────────────── */}
      {screenState === 'playing' && currentQuestion && (
        <ScrollView
          contentContainerStyle={[
            styles.playContainer,
            { paddingBottom: insets.bottom + spacing.xl },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Progress Bar */}
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${((currentIndex + 1) / questions.length) * 100}%` },
              ]}
            />
          </View>

          {/* Question Meta Row */}
          <View style={styles.metaRow}>
            <View style={styles.metaBadge}>
              <Text style={styles.metaBadgeText}>{topic.trim() || selectedCategory}</Text>
            </View>
            <View style={[styles.metaBadge, styles.difficultyBadge]}>
              <Text style={styles.metaBadgeText}>{difficulty}</Text>
            </View>
          </View>

          {/* Question Card */}
          <Animated.View
            key={`q_${currentIndex}`}
            entering={FadeInDown.duration(400)}
            style={styles.questionCard}
          >
            <Text style={styles.questionText}>{currentQuestion.question}</Text>
          </Animated.View>

          {/* Multiple Choice Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, oIdx) => {
              const isSelected = selectedOption === oIdx;
              const isCorrect = oIdx === currentQuestion.correctIndex;
              let optionStyle = styles.optionNormal;
              let indicator = String.fromCharCode(65 + oIdx); // A, B, C, D

              if (isAnswerRevealed) {
                if (isCorrect) {
                  optionStyle = styles.optionCorrect;
                  indicator = '✓';
                } else if (isSelected && !isCorrect) {
                  optionStyle = styles.optionWrong;
                  indicator = '✕';
                }
              }

              return (
                <TouchableOpacity
                  key={`opt_${oIdx}`}
                  style={[styles.optionButton, optionStyle]}
                  activeOpacity={0.8}
                  onPress={() => selectOption(oIdx)}
                  disabled={isAnswerRevealed}
                >
                  <View style={styles.optionLetter}>
                    <Text style={styles.optionLetterText}>{indicator}</Text>
                  </View>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Explanation Card */}
          {isAnswerRevealed && (
            <Animated.View entering={FadeInDown.duration(300)} style={styles.explanationCard}>
              <Text style={styles.explanationTitle}>
                {selectedOption === currentQuestion.correctIndex ? '🎉 Correct!' : '💡 Explanation:'}
              </Text>
              <Text style={styles.explanationBody}>{currentQuestion.explanation}</Text>

              {/* Next Question Button */}
              <TouchableOpacity
                style={styles.nextBtn}
                activeOpacity={0.8}
                onPress={nextQuestion}
              >
                <Text style={styles.nextBtnText}>
                  {currentIndex + 1 === questions.length ? 'See Results ➔' : 'Next Question ➔'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </ScrollView>
      )}

      {/* ─── State 4: Result Screen ───────────────────────────────────────── */}
      {screenState === 'result' && (
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + spacing.xl },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.resultCard}>
            <Text style={styles.trophyEmoji}>
              {score === questions.length ? '🏆' : score >= questions.length / 2 ? '🌟' : '💪'}
            </Text>
            <Text style={styles.resultVerdict}>
              {score === questions.length
                ? 'Perfect Score!'
                : score >= questions.length / 2
                ? 'Great Job!'
                : 'Keep Practicing!'}
            </Text>

            <Text style={styles.scoreBig}>
              {score} / {questions.length}
            </Text>
            <Text style={styles.percentageText}>
              {Math.round((score / questions.length) * 100)}% Correct
            </Text>

            {/* Breakdown Pills */}
            <View style={styles.breakdownRow}>
              <View style={[styles.breakdownPill, styles.correctPill]}>
                <Text style={styles.breakdownLabel}>Correct</Text>
                <Text style={styles.breakdownVal}>{score}</Text>
              </View>
              <View style={[styles.breakdownPill, styles.wrongPill]}>
                <Text style={styles.breakdownLabel}>Incorrect</Text>
                <Text style={styles.breakdownVal}>{questions.length - score}</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.resultActionRow}>
              <TouchableOpacity
                style={[styles.resultActionBtn, styles.playAgainBtn]}
                activeOpacity={0.8}
                onPress={restartQuiz}
              >
                <Text style={styles.playAgainText}>Play Another Quiz</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.resultActionBtn, styles.homeBtn]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.homeBtnText}>Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Answer Review Section */}
          <View style={styles.reviewSection}>
            <Text style={styles.reviewHeader}>Question Review</Text>
            {questions.map((q, idx) => {
              const wasCorrect = q.selectedOption === q.correctIndex;
              return (
                <View key={q.id || idx} style={styles.reviewItem}>
                  <View style={styles.reviewTopRow}>
                    <Text style={styles.reviewQIndex}>Q{idx + 1}</Text>
                    <Text style={[styles.reviewBadge, wasCorrect ? styles.correctText : styles.wrongText]}>
                      {wasCorrect ? '✓ Correct' : '✕ Incorrect'}
                    </Text>
                  </View>
                  <Text style={styles.reviewQuestionText}>{q.question}</Text>
                  <Text style={styles.reviewAnswerText}>
                    <Text style={{ color: colors.text.tertiary }}>Your answer: </Text>
                    {q.options[q.selectedOption] || 'None'}
                  </Text>
                  {!wasCorrect && (
                    <Text style={styles.reviewAnswerCorrect}>
                      <Text style={{ color: colors.status.success }}>Correct: </Text>
                      {q.options[q.correctIndex]}
                    </Text>
                  )}
                  <Text style={styles.reviewExplanationText}>{q.explanation}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenH,
    paddingBottom: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  backBtn: {
    paddingVertical: spacing.xs,
  },
  backText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 16,
    color: colors.quiz.primary,
  },
  headerTitle: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 18,
    color: colors.text.primary,
  },
  scorePill: {
    backgroundColor: 'rgba(255, 136, 0, 0.20)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.badge,
    borderWidth: 1,
    borderColor: 'rgba(255, 136, 0, 0.40)',
  },
  scorePillText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 12,
    color: colors.quiz.primary,
  },
  scrollContent: {
    paddingHorizontal: spacing.screenH,
    paddingTop: spacing.base,
  },
  errorBanner: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    borderColor: 'rgba(255, 59, 48, 0.40)',
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.base,
  },
  errorText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 13,
    color: colors.status.error,
  },
  setupHero: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginBottom: spacing.base,
  },
  illustrationWrapper: {
    marginBottom: spacing.sm,
  },
  heroTitle: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 22,
    color: colors.text.primary,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: spacing.md,
  },
  card: {
    backgroundColor: colors.surface.glass,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing.base,
    marginBottom: spacing.base,
  },
  section: {
    marginBottom: spacing.base,
  },
  sectionLabel: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 11,
    color: colors.text.tertiary,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  topicInput: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 15,
    color: colors.text.primary,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.default,
    borderWidth: 1,
    borderRadius: radius.button,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
  },
  categoryChipActive: {
    backgroundColor: 'rgba(255, 136, 0, 0.25)',
    borderColor: colors.quiz.primary,
  },
  catEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  catLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 13,
    color: colors.text.secondary,
  },
  catLabelActive: {
    fontFamily: typography.fontFamily.semiBold,
    color: '#FFFFFF',
  },
  rowSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectorBtn: {
    flex: 1,
    backgroundColor: colors.surface.glass,
    borderColor: colors.border.default,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: 3,
  },
  selectorBtnActive: {
    backgroundColor: 'rgba(255, 136, 0, 0.25)',
    borderColor: colors.quiz.primary,
  },
  selectorText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 13,
    color: colors.text.secondary,
  },
  selectorTextActive: {
    fontFamily: typography.fontFamily.semiBold,
    color: colors.quiz.secondary,
  },
  startButton: {
    borderRadius: radius.button,
    overflow: 'hidden',
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  startGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  // Loading
  loadingCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  loadingPulse: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 136, 0, 0.20)',
    borderWidth: 2,
    borderColor: colors.quiz.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
  },
  loadingEmoji: {
    fontSize: 32,
  },
  loadingTitle: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 20,
    color: colors.text.primary,
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  // Play
  playContainer: {
    paddingHorizontal: spacing.screenH,
    paddingTop: spacing.base,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: spacing.base,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.quiz.primary,
    borderRadius: 3,
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  metaBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.xs,
    marginRight: 6,
  },
  difficultyBadge: {
    backgroundColor: 'rgba(255, 136, 0, 0.15)',
  },
  metaBadgeText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
  },
  questionCard: {
    backgroundColor: colors.surface.glass,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border.strong,
    padding: spacing.lg,
    marginBottom: spacing.base,
  },
  questionText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 18,
    color: colors.text.primary,
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: spacing.base,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface.glass,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 10,
  },
  optionNormal: {
    borderColor: colors.border.default,
  },
  optionCorrect: {
    borderColor: colors.status.success,
    backgroundColor: 'rgba(0, 204, 119, 0.18)',
  },
  optionWrong: {
    borderColor: colors.status.error,
    backgroundColor: 'rgba(255, 59, 48, 0.18)',
  },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 13,
    color: colors.text.primary,
  },
  optionText: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: 15,
    color: colors.text.primary,
    lineHeight: 20,
  },
  explanationCard: {
    backgroundColor: 'rgba(255, 136, 0, 0.10)',
    borderColor: 'rgba(255, 136, 0, 0.35)',
    borderWidth: 1,
    borderRadius: radius.card,
    padding: spacing.base,
    marginBottom: spacing.xl,
  },
  explanationTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 15,
    color: colors.quiz.secondary,
    marginBottom: 4,
  },
  explanationBody: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13,
    color: colors.text.primary,
    lineHeight: 19,
    marginBottom: spacing.md,
  },
  nextBtn: {
    backgroundColor: colors.quiz.primary,
    borderRadius: radius.button,
    paddingVertical: 12,
    alignItems: 'center',
  },
  nextBtnText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  // Result
  resultCard: {
    backgroundColor: colors.surface.glass,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border.strong,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.base,
  },
  trophyEmoji: {
    fontSize: 54,
    marginBottom: 8,
  },
  resultVerdict: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 24,
    color: colors.text.primary,
    marginBottom: 4,
  },
  scoreBig: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 36,
    color: colors.quiz.primary,
    marginVertical: 4,
  },
  percentageText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: spacing.base,
  },
  breakdownRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: spacing.base,
  },
  breakdownPill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radius.md,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  correctPill: {
    backgroundColor: 'rgba(0, 204, 119, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 204, 119, 0.35)',
  },
  wrongPill: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 59, 48, 0.35)',
  },
  breakdownLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
    color: colors.text.tertiary,
  },
  breakdownVal: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 18,
    color: colors.text.primary,
    marginTop: 2,
  },
  resultActionRow: {
    width: '100%',
    marginTop: spacing.xs,
  },
  resultActionBtn: {
    paddingVertical: 12,
    borderRadius: radius.button,
    alignItems: 'center',
    marginBottom: 8,
  },
  playAgainBtn: {
    backgroundColor: colors.quiz.primary,
  },
  playAgainText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  homeBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  homeBtnText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 14,
    color: colors.text.secondary,
  },
  // Review Section
  reviewSection: {
    marginBottom: spacing.xl,
  },
  reviewHeader: {
    fontFamily: typography.fontFamily.displayBold,
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  reviewItem: {
    backgroundColor: colors.surface.glass,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing.base,
    marginBottom: spacing.sm,
  },
  reviewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewQIndex: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 12,
    color: colors.quiz.secondary,
  },
  reviewBadge: {
    fontSize: 12,
    fontFamily: typography.fontFamily.semiBold,
  },
  correctText: {
    color: colors.status.success,
  },
  wrongText: {
    color: colors.status.error,
  },
  reviewQuestionText: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: 14,
    color: colors.text.primary,
    marginBottom: 6,
  },
  reviewAnswerText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 13,
    color: colors.text.primary,
    marginBottom: 2,
  },
  reviewAnswerCorrect: {
    fontFamily: typography.fontFamily.medium,
    fontSize: 13,
    color: colors.status.success,
    marginBottom: 4,
  },
  reviewExplanationText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: 12,
    color: colors.text.tertiary,
    fontStyle: 'italic',
    marginTop: 4,
  },
});

export default QuizScreen;
