/**
 * QuizModel.js — AI Quiz Game Data Models & Fallbacks
 */

export class QuizQuestion {
  constructor({
    id = `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    question = '',
    options = [],
    correctIndex = 0,
    explanation = '',
    selectedOption = null,
  }) {
    this.id = id;
    this.question = question;
    this.options = options;
    this.correctIndex = correctIndex;
    this.explanation = explanation;
    this.selectedOption = selectedOption;
  }

  static fromJSON(json) {
    return new QuizQuestion({
      id: json.id || `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      question: json.question || '',
      options: Array.isArray(json.options) ? json.options : [],
      correctIndex: typeof json.correctIndex === 'number' ? json.correctIndex : 0,
      explanation: json.explanation || '',
      selectedOption: json.selectedOption ?? null,
    });
  }

  toJSON() {
    return {
      id: this.id,
      question: this.question,
      options: this.options,
      correctIndex: this.correctIndex,
      explanation: this.explanation,
      selectedOption: this.selectedOption,
    };
  }
}

// Built-in fallback questions for offline reliability
export const FALLBACK_QUIZZES = {
  general: [
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
      correctIndex: 1,
      explanation: 'Mars appears red because of iron oxide (rust) on its surface.',
    },
    {
      question: 'What is the largest ocean on Earth?',
      options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      correctIndex: 3,
      explanation: 'The Pacific Ocean is the largest ocean, covering more than 30% of the Earth’s surface.',
    },
    {
      question: 'Who painted the Mona Lisa?',
      options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
      correctIndex: 2,
      explanation: 'Leonardo da Vinci painted the Mona Lisa in the early 16th century.',
    },
    {
      question: 'What is the hardest natural substance on Earth?',
      options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
      correctIndex: 2,
      explanation: 'Diamond is the hardest known natural mineral on Earth on Mohs scale of hardness.',
    },
    {
      question: 'Which country is home to the Great Barrier Reef?',
      options: ['Brazil', 'Australia', 'Indonesia', 'South Africa'],
      correctIndex: 1,
      explanation: 'The Great Barrier Reef is located off the coast of Queensland, Australia.',
    },
  ],
  tech: [
    {
      question: 'What does "HTML" stand for?',
      options: [
        'HyperText Markup Language',
        'HighText Machine Language',
        'Hyperlink and Text Management Language',
        'Home Tool Markup Language',
      ],
      correctIndex: 0,
      explanation: 'HTML stands for HyperText Markup Language, the standard markup language for documents designed to be displayed in a web browser.',
    },
    {
      question: 'Which programming language was developed by Brendan Eich in 10 days?',
      options: ['Python', 'JavaScript', 'Ruby', 'Java'],
      correctIndex: 1,
      explanation: 'Brendan Eich created Mocha (later renamed JavaScript) in May 1995 while working at Netscape Communications.',
    },
    {
      question: 'What is the primary function of a GPU in computing?',
      options: [
        'Managing persistent disk storage',
        'Accelerating graphics and parallel computations',
        'Handling network packets',
        'Powering the cooling fans',
      ],
      correctIndex: 1,
      explanation: 'GPUs are specialized processors designed to rapidly manipulate memory and accelerate computer graphics and parallel workloads.',
    },
  ],
};

export default QuizQuestion;
