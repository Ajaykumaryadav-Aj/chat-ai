/**
 * homeFeatures.js — Home Screen Feature Cards Data Configuration
 *
 * Single source of truth for home screen cards data following MVC architecture.
 */
import ChatBotIllustration from '../components/illustrations/ChatBotIllustration';
import ImageCreatorIllustration from '../components/illustrations/ImageCreatorIllustration';
import QuizIllustration from '../components/illustrations/QuizIllustration';
import ROUTES from '../constants/routes';

export const HOME_FEATURES = [
  {
    id: 'chatbot',
    title: 'AI ChatBot',
    subtitle: 'Chat with Gemini AI in real-time',
    badgeText: 'GEMINI 2.5',
    badgeVariant: 'green',
    route: ROUTES.CHAT_BOT,
    gradientColors: ['#004D33', '#002619', '#0B1410'],
    circleColors: ['rgba(0, 204, 119, 0.35)', 'rgba(0, 204, 119, 0.03)'],
    accentColor: '#00CC77',
    Illustration: ChatBotIllustration,
  },
  {
    id: 'imageCreator',
    title: 'AI Image Creator',
    subtitle: 'Generate stunning visuals with AI',
    badgeText: 'STUDIO',
    badgeVariant: 'blue',
    route: ROUTES.IMAGE_CREATOR,
    gradientColors: ['#002D77', '#00163E', '#0A0F1D'],
    circleColors: ['rgba(26, 106, 255, 0.35)', 'rgba(26, 106, 255, 0.03)'],
    accentColor: '#1A6AFF',
    Illustration: ImageCreatorIllustration,
  },
  {
    id: 'quiz',
    title: 'Quiz Game',
    subtitle: 'Test your knowledge with AI quizzes',
    badgeText: 'GAME',
    badgeVariant: 'orange',
    route: ROUTES.QUIZ,
    gradientColors: ['#552800', '#301600', '#170B00'],
    circleColors: ['rgba(255, 136, 0, 0.35)', 'rgba(255, 136, 0, 0.03)'],
    accentColor: '#FF8800',
    Illustration: QuizIllustration,
  },
];

export default HOME_FEATURES;
