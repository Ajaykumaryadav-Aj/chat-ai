/**
 * colors.js — Design System Color Tokens
 *
 * Philosophy:
 * - HSL-tuned palette for perceptual harmony
 * - Semantic roles (background, surface, text, border) keep UI decoupled from raw values
 * - Gradient maps are used by LinearGradient components — never hardcoded inside screens
 * - Glass tokens enable the glassmorphism system across cards and modals
 */

// ─── Raw Palette ──────────────────────────────────────────────────────────────
const palette = {
  // Blacks & Neutrals
  black:        '#000000',
  neutral950:   '#0A0A0F',
  neutral900:   '#0F0F1A',
  neutral850:   '#13131F',
  neutral800:   '#1A1A2E',
  neutral700:   '#22223A',
  neutral600:   '#2D2D4A',
  neutral500:   '#3A3A5C',
  neutral400:   '#5A5A7A',
  neutral300:   '#8585A0',
  neutral200:   '#AEAEC0',
  neutral100:   '#D4D4E0',
  neutral50:    '#EEEEF4',
  white:        '#FFFFFF',

  // Greens (ChatBot)
  green900:     '#003322',
  green800:     '#004D33',
  green700:     '#006644',
  green600:     '#008855',
  green500:     '#00AA66',
  green400:     '#00CC77',
  green300:     '#33DD99',
  green200:     '#66EEBB',
  green100:     '#99F5D4',
  green50:      '#CCFAEB',

  // Blues (Image Creator)
  blue900:      '#001133',
  blue800:      '#001F55',
  blue700:      '#002D77',
  blue600:      '#003B99',
  blue500:      '#0050CC',
  blue400:      '#1A6AFF',
  blue300:      '#5594FF',
  blue200:      '#88B8FF',
  blue100:      '#BBDAFF',
  blue50:       '#E5F2FF',

  // Oranges (Quiz)
  orange900:    '#331A00',
  orange800:    '#552B00',
  orange700:    '#773C00',
  orange600:    '#994E00',
  orange500:    '#CC6800',
  orange400:    '#FF8800',
  orange300:    '#FFAA33',
  orange200:    '#FFCC77',
  orange100:    '#FFDDAA',
  orange50:     '#FFF2DD',

  // Purples (Accent)
  purple900:    '#1A0033',
  purple800:    '#2D0055',
  purple700:    '#440077',
  purple600:    '#5A0099',
  purple500:    '#7700CC',
  purple400:    '#9933FF',
  purple300:    '#BB66FF',
  purple200:    '#CC99FF',
  purple100:    '#DDBBFF',
  purple50:     '#F5EEFF',

  // Reds (Error)
  red500:       '#FF3B30',
  red400:       '#FF6961',
  red100:       '#FFD5D3',

  // Yellows (Warning)
  yellow500:    '#FFD60A',
  yellow400:    '#FFE066',
  yellow100:    '#FFF6CC',
};

// ─── Semantic Tokens ──────────────────────────────────────────────────────────
const colors = {
  // Backgrounds — layered depth system
  background: {
    primary:    palette.neutral950,   // Deepest — screen backgrounds
    secondary:  palette.neutral900,   // Cards, panels
    tertiary:   palette.neutral850,   // Nested elements
    elevated:   palette.neutral800,   // Modals, overlays
    input:      palette.neutral700,   // Text input fields
  },

  // Surface — for cards with gradient/glass treatment
  surface: {
    glass:      'rgba(255, 255, 255, 0.06)',
    glassBold:  'rgba(255, 255, 255, 0.12)',
    dark:       'rgba(0, 0, 0, 0.40)',
    darkBold:   'rgba(0, 0, 0, 0.65)',
  },

  // Text
  text: {
    primary:    palette.white,
    secondary:  palette.neutral200,
    tertiary:   palette.neutral300,
    disabled:   palette.neutral400,
    inverse:    palette.neutral950,
    link:       palette.blue300,
  },

  // Border
  border: {
    default:    'rgba(255, 255, 255, 0.08)',
    subtle:     'rgba(255, 255, 255, 0.04)',
    strong:     'rgba(255, 255, 255, 0.16)',
    glass:      'rgba(255, 255, 255, 0.10)',
  },

  // Status
  status: {
    success:    palette.green400,
    successBg:  'rgba(0, 204, 119, 0.12)',
    error:      palette.red500,
    errorBg:    'rgba(255, 59, 48, 0.12)',
    warning:    palette.yellow500,
    warningBg:  'rgba(255, 214, 10, 0.12)',
    info:       palette.blue300,
    infoBg:     'rgba(85, 148, 255, 0.12)',
  },

  // Feature Brand Colors (per module)
  chatBot: {
    primary:    palette.green400,
    secondary:  palette.green300,
    glow:       'rgba(0, 204, 119, 0.20)',
  },
  imageCreator: {
    primary:    palette.blue400,
    secondary:  palette.blue300,
    glow:       'rgba(26, 106, 255, 0.20)',
  },
  quiz: {
    primary:    palette.orange400,
    secondary:  palette.orange300,
    glow:       'rgba(255, 136, 0, 0.20)',
  },

  // Expose raw palette for one-off use in gradient arrays
  palette,
};

// ─── Gradient Maps ─────────────────────────────────────────────────────────────
// Used directly with expo-linear-gradient's `colors` prop.
// Arrays are ordered [start → end] for top-to-bottom by default.
export const gradients = {
  // Screen background gradient
  appBackground:    [palette.neutral950, palette.neutral900, '#0D0D1F'],

  // Home screen header area
  homeHeader:       ['#0D1033', palette.neutral950],

  // Card gradients
  chatBotCard:      ['#004D33', '#002D1F', '#001A12'],
  imageCreatorCard: ['#001F55', '#001133', '#000A22'],
  quizCard:         ['#552B00', '#331A00', '#1A0E00'],

  // Splash screen
  splash:           [palette.neutral950, '#0D0D2A', '#0F0F1A'],

  // Accent gradients
  greenGlow:        ['rgba(0,204,119,0.30)', 'rgba(0,204,119,0.00)'],
  blueGlow:         ['rgba(26,106,255,0.30)', 'rgba(26,106,255,0.00)'],
  orangeGlow:       ['rgba(255,136,0,0.30)',  'rgba(255,136,0,0.00)'],

  // Button gradients
  primaryButton:    ['#1A6AFF', '#0050CC'],
  successButton:    ['#00CC77', '#008855'],
  dangerButton:     ['#FF6961', '#FF3B30'],
};

export default colors;
