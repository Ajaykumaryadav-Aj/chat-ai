/**
 * strings.js — Application String Constants
 *
 * Why: Hardcoding strings inside components couples content to structure.
 * Centralising here enables:
 *  - Easy copy changes without touching component logic
 *  - Future i18n (just swap this file with a translation hook)
 *  - Consistency across the UI
 */

export const STRINGS = {
  // ─── App-wide ────────────────────────────────────────────────────────────────
  APP_NAME:         'AI Studio',
  APP_TAGLINE:      'Your AI-Powered Creative Suite',
  LOADING:          'Loading...',
  RETRY:            'Retry',
  CANCEL:           'Cancel',
  CONFIRM:          'Confirm',
  SAVE:             'Save',
  SHARE:            'Share',
  CLOSE:            'Close',
  BACK:             'Back',
  NEXT:             'Next',
  DONE:             'Done',
  SKIP:             'Skip',
  YES:              'Yes',
  NO:               'No',
  OK:               'OK',
  ERROR_TITLE:      'Something went wrong',
  NO_INTERNET:      'No internet connection',
  NO_INTERNET_MSG:  'Please check your connection and try again.',
  TIMEOUT_MSG:      'Request timed out. Please try again.',
  RATE_LIMIT_MSG:   'Too many requests. Please wait a moment.',
  UNKNOWN_ERROR:    'An unexpected error occurred.',

  // ─── Home Screen ──────────────────────────────────────────────────────────────
  HOME_GREETING:        'Hello, Explorer 👋',
  HOME_SUBTITLE:        'What would you like to create today?',
  HOME_CARD_CHAT_TITLE: 'AI ChatBot',
  HOME_CARD_CHAT_SUB:   'Chat with Gemini AI in real-time',
  HOME_CARD_IMAGE_TITLE:'AI Image Creator',
  HOME_CARD_IMAGE_SUB:  'Generate stunning visuals with AI',
  HOME_CARD_QUIZ_TITLE: 'Quiz Game',
  HOME_CARD_QUIZ_SUB:   'Test your knowledge with AI quizzes',

  // ─── ChatBot ──────────────────────────────────────────────────────────────────
  CHAT_PLACEHOLDER:     'Type a message...',
  CHAT_EMPTY_TITLE:     'Start a Conversation',
  CHAT_EMPTY_SUBTITLE:  'Ask me anything — I\'m powered by Gemini',
  CHAT_CLEAR:           'Clear Chat',
  CHAT_CLEAR_CONFIRM:   'Are you sure you want to clear the chat history?',
  CHAT_COPY:            'Copy',
  CHAT_COPY_SUCCESS:    'Copied to clipboard!',
  CHAT_REGENERATE:      'Regenerate',
  CHAT_ERROR:           'Failed to get response. Tap to retry.',
  CHAT_TYPING:          'Gemini is thinking...',

  // ─── Image Creator ────────────────────────────────────────────────────────────
  IMAGE_PLACEHOLDER:    'Describe the image you want to create...',
  IMAGE_GENERATE:       'Generate Image',
  IMAGE_GENERATING:     'Creating your image...',
  IMAGE_SAVE:           'Save to Gallery',
  IMAGE_SAVE_SUCCESS:   'Image saved!',
  IMAGE_SHARE:          'Share Image',
  IMAGE_RETRY:          'Try Again',
  IMAGE_EMPTY_TITLE:    'Create Anything',
  IMAGE_EMPTY_SUBTITLE: 'Describe an image and watch AI bring it to life',
  IMAGE_HISTORY:        'History',
  IMAGE_COMING_SOON:    'Image generation coming soon!',

  // ─── Quiz ─────────────────────────────────────────────────────────────────────
  QUIZ_CHOOSE_CATEGORY:  'Choose a Category',
  QUIZ_CHOOSE_DIFFICULTY:'Select Difficulty',
  QUIZ_START:            'Start Quiz',
  QUIZ_GENERATING:       'Generating your quiz...',
  QUIZ_QUESTION_OF:      'Question {current} of {total}',
  QUIZ_SUBMIT:           'Submit Quiz',
  QUIZ_NEXT:             'Next',
  QUIZ_PREV:             'Previous',
  QUIZ_TIME_UP:          "Time's Up!",
  QUIZ_SCORE_TITLE:      'Your Score',
  QUIZ_PERFECT:          '🎉 Perfect Score!',
  QUIZ_GREAT:            '🌟 Great Job!',
  QUIZ_GOOD:             '👍 Good Effort!',
  QUIZ_KEEP_TRYING:      '💪 Keep Practicing!',
  QUIZ_PLAY_AGAIN:       'Play Again',
  QUIZ_REVIEW:           'Review Answers',
  QUIZ_HOME:             'Back to Home',

  // ─── Quiz Categories ──────────────────────────────────────────────────────────
  QUIZ_CATEGORIES: [
    { id: 'general',     label: 'General Knowledge', emoji: '🧠' },
    { id: 'science',     label: 'Science',            emoji: '🔬' },
    { id: 'tech',        label: 'Technology',         emoji: '💻' },
    { id: 'history',     label: 'History',            emoji: '📜' },
    { id: 'sports',      label: 'Sports',             emoji: '⚽' },
    { id: 'movies',      label: 'Movies & TV',        emoji: '🎬' },
    { id: 'music',       label: 'Music',              emoji: '🎵' },
    { id: 'geography',   label: 'Geography',          emoji: '🌍' },
  ],

  // ─── Quiz Difficulties ────────────────────────────────────────────────────────
  QUIZ_DIFFICULTIES: [
    { id: 'easy',   label: 'Easy',   color: '#00CC77' },
    { id: 'medium', label: 'Medium', color: '#FF8800' },
    { id: 'hard',   label: 'Hard',   color: '#FF3B30' },
  ],
};

export default STRINGS;
