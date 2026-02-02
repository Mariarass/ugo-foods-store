import styles from '../policies.module.css';

export default function TermsOfServicePage() {
  return (
    <div className={styles.policyContent}>
      <div className={styles.header}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.lastUpdated}>Last updated: February 1, 2026</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Agreement to Terms</h2>
        <div className={styles.sectionText}>
          <p>
            By accessing and using the UGo website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Use of Our Services</h2>
        <div className={styles.sectionText}>
          <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Use our services in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to our systems or networks</li>
            <li>Interfere with or disrupt the integrity of our services</li>
            <li>Transmit any viruses, malware, or harmful code</li>
            <li>Collect or harvest personal information from other users</li>
            <li>Use our services for any commercial purpose without our consent</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Account Responsibilities</h2>
        <div className={styles.sectionText}>
          <p>
            If you create an account with us, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Products and Pricing</h2>
        <div className={styles.sectionText}>
          <p>
            We strive to provide accurate product descriptions and pricing. However, we reserve the right to correct any errors and to change prices without notice. All prices are displayed in USD unless otherwise stated.
          </p>
          <p>
            We reserve the right to limit quantities, refuse orders, and discontinue products at any time.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Orders and Payment</h2>
        <div className={styles.sectionText}>
          <p>
            By placing an order, you represent that you are authorized to use the payment method provided. We reserve the right to cancel orders if we suspect fraud or unauthorized payment.
          </p>
          <p>
            All orders are subject to acceptance and availability. We will notify you if your order cannot be fulfilled.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Intellectual Property</h2>
        <div className={styles.sectionText}>
          <p>
            All content on our website, including text, graphics, logos, images, and software, is the property of UGo and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our written permission.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Limitation of Liability</h2>
        <div className={styles.sectionText}>
          <p>
            To the maximum extent permitted by law, UGo shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or products.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Indemnification</h2>
        <div className={styles.sectionText}>
          <p>
            You agree to indemnify and hold harmless UGo and its affiliates from any claims, damages, or expenses arising from your violation of these Terms or your use of our services.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Governing Law</h2>
        <div className={styles.sectionText}>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to conflict of law provisions.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Changes to Terms</h2>
        <div className={styles.sectionText}>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of the revised Terms.
          </p>
        </div>
      </div>

      <div className={styles.contactBox}>
        <h4>Questions?</h4>
        <p>
          If you have any questions about these Terms of Service, please contact us at <a href="mailto:hello@ugo.com">hello@ugo.com</a>
        </p>
      </div>
    </div>
  );
}
