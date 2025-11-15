import { Email } from '../types';

// Sample email dataset - your content creator can expand this
export const emailData: Email[] = [
  // Phishing emails
  {
    id: 1,
    from: 'security@bankofamer1ca.com',
    subject: 'URGENT: Suspicious Activity Detected',
    body: `Dear Customer,

We have detected unusual activity on your account. Your account will be suspended within 24 hours unless you verify your identity immediately.

Click here to confirm your information: http://verify-account-now.com/bankofamerica

Failure to verify will result in permanent account closure.

Bank of America Security Team`,
    isPhishing: true,
    explanation: 'This is a phishing email attempting to steal your banking credentials through urgency and fear tactics.',
    redFlags: [
      'Misspelled domain: "bankofamer1ca.com" instead of "bankofamerica.com"',
      'Generic greeting: "Dear Customer" instead of your name',
      'Creates urgency with 24-hour threat',
      'Suspicious external link to non-bank domain',
      'Threatening language about account closure'
    ]
  },
  {
    id: 2,
    from: 'no-reply@paypa1-security.com',
    subject: 'Your PayPal Account Has Been Limited',
    body: `Hello,

Your PayPal account has been limited due to security concerns. To restore full access, please log in and verify your account information within 48 hours.

Click here: http://paypal-verify-secure.com

If you do not complete this verification, your account will be permanently suspended.

PayPal Security`,
    isPhishing: true,
    explanation: 'This email uses fear and urgency to trick you into clicking a malicious link and entering your PayPal credentials.',
    redFlags: [
      'Fake domain: "paypa1-security.com" (notice the number 1 instead of letter l)',
      'No personalization - doesn\'t use your name',
      'Suspicious external URL not going to paypal.com',
      'Urgent deadline to pressure you into acting quickly',
      'Threats of account suspension'
    ]
  },
  {
    id: 3,
    from: 'admin@your-company-hr.biz',
    subject: 'Mandatory: Update Your W-2 Information',
    body: `Dear Employee,

The HR department requires all employees to update their W-2 tax information by end of day today.

Please click the link below and enter your:
- Social Security Number
- Date of Birth
- Home Address
- Bank Account Information

Update here: http://hr-portal-update.biz/w2form

This is mandatory for all employees.

HR Department`,
    isPhishing: true,
    explanation: 'This is a sophisticated phishing attack targeting employee tax and banking information.',
    redFlags: [
      'Suspicious domain: ".biz" instead of your company\'s actual domain',
      'Requests highly sensitive information (SSN, bank account)',
      'Creates false urgency with "end of day" deadline',
      'Legitimate HR would never ask for this information via email',
      'Link doesn\'t go to your company\'s official portal'
    ]
  },
  {
    id: 4,
    from: 'prize@amazon-winner.net',
    subject: 'Congratulations! You\'ve Won a $1000 Amazon Gift Card',
    body: `Dear Valued Customer,

Congratulations! Your email has been randomly selected to receive a $1000 Amazon Gift Card!

To claim your prize, click here and enter your Amazon login credentials: http://amazon-prizes.net/claim

This offer expires in 24 hours. Claim now!

Amazon Rewards Team`,
    isPhishing: true,
    explanation: 'This is a classic prize scam designed to steal your Amazon account credentials.',
    redFlags: [
      'Domain "amazon-winner.net" is not affiliated with Amazon',
      'You can\'t win a prize you didn\'t enter',
      'Asks for login credentials (Amazon would never do this)',
      'Creates urgency with 24-hour expiration',
      'Poor grammar: "email has been randomly selected"'
    ]
  },
  {
    id: 5,
    from: 'support@microsoft-security-team.com',
    subject: 'Your Windows License Has Expired',
    body: `Dear User,

Your Windows operating system license has expired. Your computer will be locked in 48 hours if you don't renew.

Renew your license now: http://windows-renewal.com

Cost: $99.99

Enter your credit card information to complete the renewal.

Microsoft Support Team`,
    isPhishing: true,
    explanation: 'This scam tries to trick you into paying for a fake Windows license renewal and stealing your credit card.',
    redFlags: [
      'Fake Microsoft domain',
      'Windows licenses don\'t expire this way',
      'Threats of computer being locked',
      'Asks for credit card information via email',
      'Urgent 48-hour deadline'
    ]
  },

  // Legitimate emails
  {
    id: 6,
    from: 'orders@amazon.com',
    subject: 'Your Amazon.com order #123-4567890-1234567',
    body: `Hello John Smith,

Thank you for your order!

Order Number: #123-4567890-1234567
Estimated Delivery: November 18, 2025

Items:
- Wireless Mouse (Qty: 1) - $29.99

Track your package: https://amazon.com/track/123-4567890-1234567

If you have any questions, visit our Help Center at https://amazon.com/help

Thank you for shopping with Amazon!

Amazon.com`,
    isPhishing: false,
    explanation: 'This is a legitimate order confirmation from Amazon with all the proper indicators of authenticity.',
    redFlags: []
  },
  {
    id: 7,
    from: 'notifications@github.com',
    subject: '[GitHub] Security alert: new login from Chrome on Windows',
    body: `Hi developer123,

A new login to your account was detected:

Device: Chrome on Windows 10
Location: San Francisco, CA
IP Address: 192.168.1.1
Time: November 15, 2025 at 2:30 PM PST

If this was you, you can disregard this email. If this wasn't you, please secure your account immediately at:
https://github.com/settings/security

GitHub Security`,
    isPhishing: false,
    explanation: 'This is a legitimate security notification from GitHub alerting you to a new login on your account.',
    redFlags: []
  },
  {
    id: 8,
    from: 'team@slack.com',
    subject: 'Password change confirmation',
    body: `Hi there,

This email confirms that your Slack password was successfully changed on November 15, 2025 at 3:45 PM.

If you made this change, no action is needed.

If you did not make this change, please contact us immediately at:
https://slack.com/help/requests/new

The Slack Team`,
    isPhishing: false,
    explanation: 'This is a standard password change confirmation from Slack, using their official domain and providing legitimate support contact.',
    redFlags: []
  },
  {
    id: 9,
    from: 'noreply@company.com',
    subject: 'Team Meeting Reminder - Tomorrow at 2 PM',
    body: `Hi Team,

This is a reminder about our weekly team meeting scheduled for tomorrow:

Date: November 16, 2025
Time: 2:00 PM - 3:00 PM EST
Location: Conference Room B / Zoom Link: https://zoom.us/j/123456789

Agenda:
- Project updates
- Q4 planning
- Team announcements

Please review the attached documents before the meeting.

See you there!
Sarah Johnson
Project Manager`,
    isPhishing: false,
    explanation: 'This is a normal internal meeting reminder from a colleague with specific details and official company domain.',
    redFlags: []
  },
  {
    id: 10,
    from: 'receipts@uber.com',
    subject: 'Your trip with Uber',
    body: `Thanks for riding with Uber, Michael!

Trip Details:
Date: November 15, 2025 at 5:30 PM
From: 123 Main Street
To: 456 Market Avenue
Fare: $15.42

Driver: David (4.9 ★)

View receipt: https://uber.com/receipts/trip-abc123

Questions? Visit https://help.uber.com

Uber`,
    isPhishing: false,
    explanation: 'This is a legitimate Uber receipt with proper personalization, specific trip details, and official Uber domain links.',
    redFlags: []
  }
];
