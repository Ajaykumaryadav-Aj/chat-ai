# AI Studio (Chat AI)

> A modern, high-performance mobile AI workspace built with React Native, Expo SDK 57, and Google Gemini 2.5.

[![Expo SDK](https://img.shields.io/badge/Expo-SDK%2057-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.86.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Gemini API](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📖 Overview

**AI Studio** is a multi-modal generative AI mobile client engineered for fluid, native performance on Android and iOS. It delivers real-time conversational chat, dynamic interactive trivia quiz generation, and a creative image generation studio in a cohesive, dark-glassmorphic user interface.

### What Problem It Solves
Many mobile AI interfaces suffer from sluggish web-view wrappers, poor keyboard handling, clunky code rendering, or fragile network layers that crash when rate limits or offline states occur. AI Studio solves this with:
- **True Native Architecture**: Clean separation between presentation, controller state machines, repositories, and network services.
- **Resilient Network Layer**: Dual-header Gemini authentication (`x-goog-api-key` and URI encoding), automated multi-model failover (`gemini-2.5-flash` → `gemini-3.6-flash`), and offline trivia fallbacks.
- **Developer-Grade Typography**: Custom native markdown parser with dedicated syntax-styled code containers, horizontal scrolling, and one-tap clipboard actions.
- **Local Persistence**: Zero-cloud-dependency conversation and history caching using asynchronous native storage.

**Target Audience:** Mobile engineers, students, and everyday users seeking a fast, aesthetic, and reliable mobile gateway to Google Gemini AI.

---

## ✨ Features

### Fully Implemented

- 🤖 **Google Gemini 2.5 Flash Integration**
  - Direct communication with Google's latest `gemini-2.5-flash` developer REST API.
  - Automatic model fallback chain to `gemini-3.6-flash` on transient errors or service loads.
  - System instructions for polite, structured, and informative responses.

- 💬 **Conversational Chat Interface**
  - Real-time conversational flow with user and assistant message bubbles.
  - Animated typing indicator with simulated multi-dot pulsation.
  - Dynamic `ChatLoader` and optimistic message rendering.
  - Auto-scroll to bottom on new incoming messages with manual scroll overrides.
  - Native keyboard avoiding behavior on both Android and iOS.

- 💻 **Syntax-Highlighted Markdown & Code Block Renderer**
  - Native markdown parser supporting Headings (`#`, `##`, `###`), Bold (`**text**`), Italics (`*text*`), and bullet/numbered lists.
  - Dark-themed code containers with language tags, horizontal scrolling for long code lines, and one-tap `📋 Copy` buttons with `✓ Copied` feedback.

- 💾 **Local Offline Persistence**
  - Chat conversations automatically persist to `@react-native-async-storage/async-storage`.
  - Stored history loads automatically upon opening the screen.
  - Quick-clear modal to wipe stored chat messages with confirmation safety.

- 🔄 **Error Handling & Retry Pipeline**
  - Dedicated retry button on failed message bubbles.
  - Error bubbles are cleanly excluded from subsequent conversation history so past errors never pollute prompt context.
  - Differentiated error diagnostics: offline status, 401/403 credentials, 404 model routing, 429 quota, and 500/503 server load.

- 📋 **One-Tap Clipboard Actions**
  - Copy full AI responses or individual code snippets directly to the system clipboard using `expo-clipboard`.

- 🎯 **AI Trivia Quiz Game**
  - On-demand quiz generator powered by Gemini structured JSON output (`GeminiService.generateJSON`).
  - Configurable categories, custom topic search, difficulty modes (*Easy*, *Medium*, *Hard*), and question count.
  - Real-time answer validation with instant visual feedback (green for correct, red for incorrect).
  - Detailed answer explanations revealed upon answer submission.
  - Score calculations, progress indicators, completion review, and persistent score stats.
  - Built-in offline fallback trivia bank when the device has no internet connection.

- 🎨 **Dark Glassmorphic Design System**
  - Deep obsidian and midnight palette (`#0A0A0F`, `#0F0F1A`, `#131322`).
  - Smooth multi-stop gradients powered by `expo-linear-gradient`.
  - Custom vector illustrations using `react-native-svg`.
  - Spring-physics press interactions with accessible active-opacity feedback.

- ⚡ **Fluid Micro-Animations**
  - Custom slide and fade transitions powered by `@react-navigation/stack` interpolators.
  - Ambient glowing orb animations on the Splash screen.
  - Staggered card entrance animations powered by `react-native-reanimated`.

---

### Partially Implemented / Simulated

- 🎨 **AI Image Creator (Curated Studio)**
  - **Status:** *Fully Functional Interactive Studio with Curated Mock Pipeline*
  - Interactive prompt composer with inspiration chips, style presets (*Photorealistic*, *Anime*, *Cyberpunk*, *3D Render*), and aspect ratio selectors (`1:1`, `16:9`, `9:16`).
  - Full image viewer with share capabilities (`Share` API), clipboard prompt copying, and local history management in AsyncStorage.
  - Uses high-fidelity generative visual assets and an artificial pipeline delay while direct cloud image generation (e.g. Google Imagen 3) is pending backend integration.

---

### Planned / Roadmap

- [ ] **User Authentication:** Firebase / Supabase auth integration (auth-ready navigation structure already wired in `RootNavigator.js`).
- [ ] **Cloud Image API:** Direct integration with Google Imagen 3 REST API for live text-to-image synthesis.
- [ ] **Voice Interaction:** Speech-to-text voice input and native text-to-speech audio playback.
- [ ] **Multi-Session Chat:** Management of multiple concurrent chat threads and custom conversation renaming.
- [ ] **Light Theme:** Dynamic light/dark theme switching (`ThemeContext.js` is already architected for plug-and-play theme switching).

---

## 📱 Screens & App Flow

```
                           ┌────────────────────────┐
                           │      SplashScreen      │
                           │   (Bootstrap & Glow)   │
                           └───────────┬────────────┘
                                       │
                                       ▼
                           ┌────────────────────────┐
                           │       HomeScreen       │
                           │  (Explorer Dashboard)  │
                           └─────┬──────┬──────┬────┘
                                 │      │      │
            ┌────────────────────┘      │      └────────────────────┐
            ▼                           ▼                           ▼
┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
│     ChatBotScreen      │  │   ImageCreatorScreen   │  │       QuizScreen       │
│  - Real-Time AI Chat   │  │  - Prompt Composer     │  │  - Category & Diff     │
│  - Markdown & Code     │  │  - Style & Ratio Select│  │  - Dynamic Generation  │
│  - Message Persistence │  │  - Artwork Viewer      │  │  - Real-Time Game Play │
│  - Copy & Retry Flow   │  │  - History & Share     │  │  - Review & Stats      │
└────────────────────────┘  └────────────────────────┘  └────────────────────────┘
```

| Screen | Route Name | Description | Status |
| :--- | :--- | :--- | :--- |
| **Splash** | `ROUTES.SPLASH` | Ambient branded loading screen with glowing orb and bootstrap checks. | Implemented |
| **Home** | `ROUTES.HOME` | Central dashboard featuring time-based greetings, feature cards, and app info modal. | Implemented |
| **AI Chat** | `ROUTES.CHAT_BOT` | Conversational interface with Gemini 2.5, markdown code formatting, and local history. | Implemented |
| **Image Creator** | `ROUTES.IMAGE_CREATOR` | Studio workspace with styles, ratios, artwork previews, prompt inspiration, and history. | Implemented *(Curated Studio)* |
| **Quiz Game** | `ROUTES.QUIZ` | 4-phase trivia game (Setup, Loading, Play, Result) with AI-generated questions. | Implemented |

---

## 🛠️ Tech Stack

### Core Framework & Runtime
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React Native** | `0.86.3` | Mobile app framework |
| **React** | `19.2.3` | UI library & hooks |
| **Expo** | `~57.0.23` | Application framework, tooling, and runtime |
| **JavaScript** | ES2023+ | Primary codebase language |

### Navigation & Routing
| Package | Version | Purpose |
| :--- | :--- | :--- |
| **@react-navigation/native** | `^7.3.13` | Root navigation container & theme binding |
| **@react-navigation/stack** | `^7.10.16` | Stack-based card transitions & custom interpolators |
| **react-native-screens** | `~4.26.0` | Native view management for navigation performance |
| **react-native-safe-area-context** | `~5.7.0` | Safe area insets management across notch/pill devices |

### AI & Networking
| Technology | Implementation | Purpose |
| :--- | :--- | :--- |
| **Google Gemini Developer API** | REST `v1beta` | Generative text, multi-turn chat, and structured JSON |
| **Fetch API (Native)** | Built-in | Mobile-optimized HTTP communication with AbortController timeout |

### Graphics, UI & Animations
| Package | Version | Purpose |
| :--- | :--- | :--- |
| **expo-linear-gradient** | `~57.0.2` | Multi-stop gradient backgrounds and cards |
| **react-native-svg** | `15.15.4` | Vector illustrations and decorative graphics |
| **react-native-reanimated** | `4.5.1` | High-performance 60fps micro-animations |
| **react-native-gesture-handler**| `~2.32.0` | Touch & gesture handling |
| **react-native-worklets** | `0.10.1` | Native worklet threading support |
| **expo-status-bar** | `~57.0.1` | Dynamic status bar styling |

### Storage & System Utilities
| Package | Version | Purpose |
| :--- | :--- | :--- |
| **@react-native-async-storage/async-storage** | `2.2.0` | Local offline key-value persistence |
| **expo-clipboard** | `~57.0.2` | System clipboard copy-to-paste integration |

---

## 📂 Project Structure

```
chat-ai/
├── App.js                         # Application entry point with providers
├── app.json                       # Expo configuration & app manifest
├── babel.config.js                # Babel preset configuration
├── package.json                   # Project dependencies & scripts
├── .env.example                   # Environment configuration template
├── .gitignore                     # Git ignore rules (secrets & builds)
├── assets/                        # App icons, splash screens, and adaptive assets
└── src/
    ├── animations/                # Custom animation sequences
    ├── components/                # Reusable UI component library
    │   ├── cards/                 # Feature cards & presentation wrappers
    │   ├── chat/                  # Bubbles, markdown, input bar, typing indicator
    │   ├── common/                # Badges, decorative circles, pill buttons
    │   ├── headers/               # Home and chat screen custom headers
    │   └── illustrations/         # Custom React Native SVG vector artwork
    ├── config/                    # Environment variable loader & API endpoints
    │   └── env.js                 # Safe process.env loader for Expo
    ├── constants/                 # Immutable application constants
    │   ├── chatConstants.js       # Roles, status types, and default AI configs
    │   ├── routes.js              # Centralized route name definitions
    │   └── strings.js             # UI text strings and accessibility labels
    ├── context/                   # React Context state providers
    │   └── ThemeContext.js        # Design system & theme provider
    ├── controllers/               # Business logic & state management controllers
    │   ├── ChatController.js      # Message dispatch, sending, retrying, clearing
    │   ├── HomeController.js      # Dashboard greeting & navigation actions
    │   ├── ImageCreatorController.js # Image parameters, selection & history
    │   └── QuizController.js      # Game state machine (setup, play, results)
    ├── data/                      # Static configurations & data arrays
    │   └── homeFeatures.js        # Feature cards catalog & metadata
    ├── hooks/                     # Custom React hooks
    │   └── useChat.js             # High-level chat lifecycle hook
    ├── models/                    # Data models & entity deserializers
    │   ├── ChatModel.js           # ChatMessage class & JSON serializers
    │   ├── ImageCreatorModel.js   # GeneratedImage entity definition
    │   └── QuizModel.js           # QuizQuestion class & offline question bank
    ├── navigation/                # Navigation navigators & route configuration
    │   ├── AppNavigator.js        # Authenticated feature stack
    │   └── RootNavigator.js       # Auth-ready root state machine
    ├── repositories/              # Data access abstraction layer
    │   ├── ChatRepository.js      # Bridges GeminiService & StorageService
    │   ├── ImageCreatorRepository.js # Image persistence & generative pipeline
    │   └── QuizRepository.js      # AI quiz generation & score stats
    ├── services/                  # External service adapters
    │   ├── api/
    │   │   └── geminiService.js   # Google Gemini REST client & fallback logic
    │   └── storage/
    │       └── storageService.js  # AsyncStorage persistence wrappers
    ├── theme/                     # Design system tokens
    │   ├── colors.js              # Palette tokens, glass borders, tints
    │   ├── gradients.js           # Gradient stop presets
    │   ├── radius.js              # Border radius constants
    │   ├── shadow.js              # Elevation & glass glow shadows
    │   ├── spacing.js             # Layout padding and margin scale
    │   └── typography.js          # Font sizes, line heights, and weights
    └── utils/                     # Pure utility helpers
        ├── copyText.js            # Clipboard copy helper with feedback
        └── dateFormatter.js       # Timestamp and friendly date formatting
```

### Architectural Layering

The codebase follows the **Clean MVC / Repository Architecture**:

1. **View Layer (`screens/`, `components/`)**: Pure presentation components driven by props and controller hooks. Zero direct API calls.
2. **Controller Layer (`controllers/`, `hooks/`)**: Manages screen state machines, validates user inputs, and coordinates user actions.
3. **Repository Layer (`repositories/`)**: Abstract data broker that harmonizes remote network calls with local caching mechanisms.
4. **Service Layer (`services/`)**: Isolated drivers that communicate directly with hardware/platform APIs (Google Gemini REST, AsyncStorage).

---

## 🚀 Getting Started

### Prerequisites

Ensure the following tools are installed on your workstation:
- **Node.js**: `v18.x` or `v20.x` LTS ([Download](https://nodejs.org/))
- **npm**: `v9.x` or higher (bundled with Node.js)
- **Expo CLI**: Bundled automatically via `npx expo`
- **Expo Go App**: Install on your physical Android ([Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)) or iOS device ([App Store](https://apps.apple.com/app/expo-go/id982107779))

---

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/chat-ai.git
   cd chat-ai
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the provided `.env.example` template to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Add your Gemini API Key:**
   Open `.env` and paste your key obtained from [Google AI Studio](https://aistudio.google.com/app/apikey):
   ```ini
   EXPO_PUBLIC_GEMINI_API_KEY=AIzaSyYourActualKeyHere
   GEMINI_API_KEY=AIzaSyYourActualKeyHere
   APP_ENV=development
   EXPO_PUBLIC_APP_ENV=development
   ```

---

### Running the App

1. **Start the Metro Bundler (Clear Cache):**
   ```bash
   npx expo start -c
   ```

2. **Testing on a Physical Device:**
   - **Local Wi-Fi:** Open the Expo Go app and scan the QR code displayed in your terminal (ensure phone and PC are on the same Wi-Fi).
   - **Different Networks / Mobile Data:** Launch Metro with the tunnel flag:
     ```bash
     npx expo start -c --tunnel
     ```

3. **Running on Emulators / Simulators:**
   - Press `a` in the terminal for **Android Emulator**.
   - Press `i` in the terminal for **iOS Simulator** (macOS required).
   - Press `r` to reload the bundle at any time.

---

### Verifying System Health

Run the automated Expo diagnostics checker to confirm dependencies, schema, and environment readiness:
```bash
npx expo-doctor
```
*Expected result: `21/21 checks passed. No issues detected!`*

---

## ⚙️ Environment Configuration

| Variable | Required | Default | Purpose |
| :--- | :--- | :--- | :--- |
| `EXPO_PUBLIC_GEMINI_API_KEY` | **Yes** | `""` | Primary Gemini API key inlined by Expo at bundle time |
| `GEMINI_API_KEY` | Optional | `""` | Fallback key identifier for Node/testing scripts |
| `EXPO_PUBLIC_APP_ENV` | Optional | `development` | Environment mode (`development` / `production`) |
| `EXPO_PUBLIC_GEMINI_MODEL` | Optional | `gemini-2.5-flash` | Primary Gemini model identifier |
| `EXPO_PUBLIC_GEMINI_BASE_URL`| Optional | `https://generativelanguage.googleapis.com/v1beta` | Google API Gateway base URL |

> [!TIP]
> Variables prefixed with `EXPO_PUBLIC_` are automatically made available to client-side code by Expo without requiring third-party Babel transforms.

---

## 🔒 Security Best Practices

- **Mobile Client-Side Secret Notice:**
  In standard React Native / Expo applications, variables prefixed with `EXPO_PUBLIC_` are inlined into the JavaScript bundle. While this enables rapid prototyping and standalone mobile apps without dedicated servers, any key distributed in a client bundle can theoretically be extracted by determined attackers.
- **Production Architecture Recommendation:**
  For public commercial app deployments, route Gemini API calls through an authenticated backend server or serverless proxy (e.g. Cloudflare Workers, Firebase Functions, or Express) to enforce user rate-limiting and protect secret credentials.
- **Safe Diagnostic Logging:**
  The `GeminiService` implementation included in this project contains defensive development logs that print HTTP status, model names, and key existence flags, but **never output the raw API key**.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve features or fix issues:

1. Fork the Project.
2. Create your Feature Branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your Changes:
   ```bash
   git commit -m "feat: Add AmazingFeature"
   ```
4. Push to the Branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.
