import { Email } from '../types';
import './FeedbackOverlay.css';

interface FeedbackOverlayProps {
  email: Email;
  isCorrect: boolean;
  userChoice: 'safe' | 'phishing';
  onNext: () => void;
}

export default function FeedbackOverlay({ email, isCorrect, userChoice, onNext }: FeedbackOverlayProps) {
  return (
    <div className="feedback-overlay">
      <div className="feedback-modal">
        <div className={`feedback-header ${isCorrect ? 'correct' : 'incorrect'}`}>
          <span className="feedback-icon">
            {isCorrect ? '✓' : '✗'}
          </span>
          <h2 className="feedback-title">
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </h2>
          <p className="feedback-subtitle">
            {isCorrect
              ? `You correctly identified this as ${email.isPhishing ? 'phishing' : 'safe'}`
              : `This email was actually ${email.isPhishing ? 'phishing' : 'safe'}`
            }
          </p>
        </div>

        <div className="feedback-content">
          <div className="explanation-section">
            <h3>Explanation</h3>
            <p>{email.explanation}</p>
          </div>

          {email.redFlags && email.redFlags.length > 0 && (
            <div className="red-flags-section">
              <h3>Red Flags to Watch For:</h3>
              <ul>
                {email.redFlags.map((flag, index) => (
                  <li key={index}>{flag}</li>
                ))}
              </ul>
            </div>
          )}

          {!isCorrect && (
            <div className="learning-tip">
              <strong>Tip:</strong> {userChoice === 'safe'
                ? 'Always verify sender addresses and hover over links before clicking.'
                : 'Legitimate companies rarely use urgent language or ask for sensitive information via email.'
              }
            </div>
          )}
        </div>

        <button className="next-button" onClick={onNext}>
          Next Email →
        </button>
      </div>
    </div>
  );
}
