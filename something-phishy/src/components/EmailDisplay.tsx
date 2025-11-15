import { Email } from '../types';
import './EmailDisplay.css';

interface EmailDisplayProps {
  email: Email;
}

export default function EmailDisplay({ email }: EmailDisplayProps) {
  // Placeholder component - your teammates will enhance the email format
  return (
    <div className="email-display">
      <div className="email-container">
        <div className="email-header">
          <div className="email-field">
            <span className="field-label">From:</span>
            <span className="field-value">{email.from}</span>
          </div>
          <div className="email-field">
            <span className="field-label">Subject:</span>
            <span className="field-value subject">{email.subject}</span>
          </div>
        </div>

        <div className="email-body">
          {email.body}
        </div>

        <div className="email-note">
          <p>💡 <strong>Note to team:</strong> This is a placeholder. Your teammates are working on the detailed email format component.</p>
        </div>
      </div>
    </div>
  );
}
