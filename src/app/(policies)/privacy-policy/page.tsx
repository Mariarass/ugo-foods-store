import styles from '../policies.module.css';

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.policyContent}>
      <div className={styles.header}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lastUpdated}>Last updated: February 1, 2026</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Introduction</h2>
        <div className={styles.sectionText}>
          <p>
            At UGo, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Information We Collect</h2>
        <div className={styles.sectionText}>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, shipping address, billing address, phone number</li>
            <li><strong>Payment Information:</strong> Credit card details (processed securely through our payment provider)</li>
            <li><strong>Account Information:</strong> Username, password, purchase history</li>
            <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent on site, referring website</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>How We Use Your Information</h2>
        <div className={styles.sectionText}>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Send order confirmations and shipping updates</li>
            <li>Respond to your questions and customer service requests</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Improve our website and product offerings</li>
            <li>Prevent fraud and enhance security</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Information Sharing</h2>
        <div className={styles.sectionText}>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information with:
          </p>
          <ul>
            <li>Service providers who assist with order fulfillment, payment processing, and shipping</li>
            <li>Analytics providers to help us understand website usage</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Cookies</h2>
        <div className={styles.sectionText}>
          <p>
            We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Data Security</h2>
        <div className={styles.sectionText}>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Your Rights</h2>
        <div className={styles.sectionText}>
          <p>You have the right to:</p>
          <ul>
            <li>Access and receive a copy of your personal data</li>
            <li>Correct inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Changes to This Policy</h2>
        <div className={styles.sectionText}>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </div>
      </div>

      <div className={styles.contactBox}>
        <h4>Questions About Privacy?</h4>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@ugo.com">hello@ugo.com</a>
        </p>
      </div>
    </div>
  );
}
