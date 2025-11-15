import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import ScoreHeader from './components/ScoreHeader';
import EmailDisplay from './components/EmailDisplay';
import ActionButtons from './components/ActionButtons';
import FeedbackOverlay from './components/FeedbackOverlay';
import ResultsScreen from './components/ResultsScreen';
import { GameState, GameStats, Email } from './types';
import { emailData } from './data/emails';
import './App.css';

function App() {
  const [gameState, setGameState] = useState<GameState>('home');
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [shuffledEmails, setShuffledEmails] = useState<Email[]>([]);
  const [stats, setStats] = useState<GameStats>({
    score: 0,
    correct: 0,
    incorrect: 0,
    totalAnswered: 0
  });
  const [userChoice, setUserChoice] = useState<'safe' | 'phishing' | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  // Shuffle emails when game starts
  const shuffleEmails = (emails: Email[]) => {
    const shuffled = [...emails];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startGame = () => {
    setShuffledEmails(shuffleEmails(emailData));
    setCurrentEmailIndex(0);
    setStats({
      score: 0,
      correct: 0,
      incorrect: 0,
      totalAnswered: 0
    });
    setGameState('playing');
  };

  const handleAnswer = (choice: 'safe' | 'phishing') => {
    const currentEmail = shuffledEmails[currentEmailIndex];
    const correctAnswer = currentEmail.isPhishing ? 'phishing' : 'safe';
    const correct = choice === correctAnswer;

    setUserChoice(choice);
    setIsCorrect(correct);

    // Update stats
    setStats(prev => ({
      score: prev.score + (correct ? 10 : -5),
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
      totalAnswered: prev.totalAnswered + 1
    }));

    setGameState('feedback');
  };

  const handleNext = () => {
    if (currentEmailIndex < shuffledEmails.length - 1) {
      setCurrentEmailIndex(prev => prev + 1);
      setUserChoice(null);
      setGameState('playing');
    } else {
      setGameState('results');
    }
  };

  const handlePlayAgain = () => {
    startGame();
  };

  const currentEmail = shuffledEmails[currentEmailIndex];

  return (
    <div className="app">
      {gameState === 'home' && (
        <HomeScreen onStartGame={startGame} />
      )}

      {(gameState === 'playing' || gameState === 'feedback') && currentEmail && (
        <div className="game-screen">
          <ScoreHeader
            score={stats.score}
            currentEmail={currentEmailIndex + 1}
            totalEmails={shuffledEmails.length}
          />

          <EmailDisplay email={currentEmail} />

          <ActionButtons
            onSafe={() => handleAnswer('safe')}
            onPhishing={() => handleAnswer('phishing')}
            disabled={gameState === 'feedback'}
          />

          {gameState === 'feedback' && userChoice && (
            <FeedbackOverlay
              email={currentEmail}
              isCorrect={isCorrect}
              userChoice={userChoice}
              onNext={handleNext}
            />
          )}
        </div>
      )}

      {gameState === 'results' && (
        <ResultsScreen
          stats={stats}
          totalEmails={shuffledEmails.length}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
}

export default App;
