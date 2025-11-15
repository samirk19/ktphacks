import './ActionButtons.css';

interface ActionButtonsProps {
  onSafe: () => void;
  onPhishing: () => void;
  disabled?: boolean;
}

export default function ActionButtons({ onSafe, onPhishing, disabled }: ActionButtonsProps) {
  return (
    <div className="action-buttons">
      <button
        className="action-button safe-button"
        onClick={onSafe}
        disabled={disabled}
      >
        <span className="button-icon">✓</span>
        <span className="button-text">Safe</span>
        <span className="button-description">This email is legitimate</span>
      </button>

      <button
        className="action-button phishing-button"
        onClick={onPhishing}
        disabled={disabled}
      >
        <span className="button-icon">⚠</span>
        <span className="button-text">Phishing</span>
        <span className="button-description">This email is suspicious</span>
      </button>
    </div>
  );
}
