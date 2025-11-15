import './HomeScreen.css';

interface HomeScreenProps {
  onStartGame: () => void;
}

export default function HomeScreen({ onStartGame }: HomeScreenProps) {
  return (
    <div className="home-screen">
      <div className="home-content">
        <h1 className="game-title">Something Phishy</h1>
        <p className="game-subtitle">Learn to spot phishing emails before they catch you!</p>

        <div className="game-info">
          <div className="info-card">
            <h3>How to Play</h3>
            <ul>
              <li>Review each email carefully</li>
              <li>Decide if it's Safe or Phishing</li>
              <li>Learn from instant feedback</li>
              <li>Improve your cybersecurity skills!</li>
            </ul>
          </div>

          <div className="stats-preview">
            <div className="stat-item">
              <span className="stat-number">90%</span>
              <span className="stat-label">of data breaches start with phishing</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">$billions</span>
              <span className="stat-label">lost to phishing annually</span>
            </div>
          </div>
        </div>

        <button className="start-button" onClick={onStartGame}>
          Start Game
        </button>
      </div>
    </div>
  );
}
