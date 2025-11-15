import './ScoreHeader.css';

interface ScoreHeaderProps {
  score: number;
  currentEmail: number;
  totalEmails: number;
}

export default function ScoreHeader({ score, currentEmail, totalEmails }: ScoreHeaderProps) {
  return (
    <div className="score-header">
      <div className="header-content">
        <div className="game-logo">
          <span className="logo-icon">🎣</span>
          <span className="logo-text">Something Phishy</span>
        </div>

        <div className="game-stats">
          <div className="progress-info">
            <span className="progress-label">Email</span>
            <span className="progress-value">{currentEmail} / {totalEmails}</span>
          </div>

          <div className="score-display">
            <span className="score-label">Score</span>
            <span className="score-value">{score}</span>
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(currentEmail / totalEmails) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}
