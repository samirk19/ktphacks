export interface Email {
  id: number;
  from: string;
  subject: string;
  body: string;
  isPhishing: boolean;
  explanation: string;
  redFlags?: string[];
}

export type GameState = 'home' | 'playing' | 'feedback' | 'results';

export interface GameStats {
  score: number;
  correct: number;
  incorrect: number;
  totalAnswered: number;
}

export interface UserAnswer {
  emailId: number;
  isCorrect: boolean;
  userChoice: 'safe' | 'phishing';
}
