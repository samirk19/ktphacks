import { GameStats } from '../types';
import './ResultsScreen.css';

interface ResultsScreenProps {
  stats: GameStats;
  totalEmails: number;
  onPlayAgain: () => void;
}

export default function ResultsScreen({ stats, totalEmails, onPlayAgain }: ResultsScreenProps) {
  const percentage = Math.round((stats.correct / totalEmails) * 100);

  const getPerformanceMessage = () => {
    if (percentage === 100) return { title: 'Perfect Score!', message: 'You\'re a phishing detection expert!', emoji: '🏆' };
    if (percentage >= 80) return { title: 'Excellent Work!', message: 'You have great cybersecurity awareness!', emoji: '🌟' };
    if (percentage >= 60) return { title: 'Good Job!', message: 'You\'re getting better at spotting phishing!', emoji: '👍' };
    if (percentage >= 40) return { title: 'Keep Practicing!', message: 'You\'re learning the basics!', emoji: '📚' };
    return { title: 'Try Again!', message: 'Practice makes perfect!', emoji: '💪' };
  };

  const performance = getPerformanceMessage();

  const getTips = () => {
    const tips = [];
    if (percentage < 100) {
      tips.push('Always check the sender\'s email address carefully');
      tips.push('Hover over links to see the actual URL before clicking');
      tips.push('Be suspicious of urgent or threatening language');
      tips.push('Look for generic greetings like "Dear Customer"');
      tips.push('Never share sensitive information via email');
    }
    return tips;
  };

  const tips = getTips();

  return (
    <div className="results-screen">
      <div className="results-content">
        <div className="performance-header">
          <span className="performance-emoji">{performance.emoji}</span>
          <h1 className="performance-title">{performance.title}</h1>
          <p className="performance-message">{performance.message}</p>
        </div>

        <div className="score-summary">
          <div className="score-circle">
            <svg className="score-ring" viewBox="0 0 120 120">
              <circle
                className="score-ring-background"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                className="score-ring-progress"
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={percentage >= 60 ? '#10b981' : '#ef4444'}
                strokeWidth="8"
                strokeDasharray={`${(percentage / 100) * 339.292} 339.292`}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
            </svg>
            <div className="score-percentage">
              <span className="percentage-number">{percentage}</span>
              <span className="percentage-symbol">%</span>
            </div>
          </div>

          <div className="stats-breakdown">
            <div className="stat-box correct-box">
              <span className="stat-icon">✓</span>
              <div className="stat-info">
                <span className="stat-value">{stats.correct}</span>
                <span className="stat-label">Correct</span>
              </div>
            </div>

            <div className="stat-box incorrect-box">
              <span className="stat-icon">✗</span>
              <div className="stat-info">
                <span className="stat-value">{stats.incorrect}</span>
                <span className="stat-label">Incorrect</span>
              </div>
            </div>

            <div className="stat-box score-box">
              <span className="stat-icon">🎯</span>
              <div className="stat-info">
                <span className="stat-value">{stats.score}</span>
                <span className="stat-label">Final Score</span>
              </div>
            </div>
          </div>
        </div>

        {tips.length > 0 && (
          <div className="tips-section">
            <h3>Tips to Improve:</h3>
            <ul>
              {tips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        <button className="play-again-button" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}
