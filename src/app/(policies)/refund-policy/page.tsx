import styles from '../policies.module.css';

export default function RefundPolicyPage() {
  return (
    <div className={styles.policyContent}>
      <div className={styles.header}>
        <h1 className={styles.title}>Refund Policy</h1>
        <p className={styles.lastUpdated}>Last updated: February 1, 2026</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Our Commitment</h2>
        <div className={styles.sectionText}>
          <p>
            At UGo, we stand behind the quality of our products. If you&apos;re not completely satisfied with your purchase, we&apos;re here to help.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Eligibility for Refunds</h2>
        <div className={styles.sectionText}>
          <p>You may be eligible for a refund if:</p>
          <ul>
            <li>Your order was damaged during shipping</li>
            <li>You received the wrong product</li>
            <li>The product is defective or of poor quality</li>
            <li>Your order never arrived</li>
            <li>You request a refund within 30 days of delivery (for unopened items)</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Non-Refundable Items</h2>
        <div className={styles.sectionText}>
          <p>The following items are not eligible for refunds:</p>
          <ul>
            <li>Opened or partially consumed products (unless defective)</li>
            <li>Products purchased more than 30 days ago</li>
            <li>Items marked as final sale or clearance</li>
            <li>Gift cards</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>How to Request a Refund</h2>
        <div className={styles.sectionText}>
          <p>To request a refund, please follow these steps:</p>
          <ul>
            <li>Contact us at <a href="mailto:hello@ugo.com">hello@ugo.com</a> within 30 days of delivery</li>
            <li>Include your order number and reason for the refund request</li>
            <li>If applicable, attach photos of damaged or defective products</li>
            <li>Our team will review your request within 2 business days</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Refund Process</h2>
        <div className={styles.sectionText}>
          <p>
            Once your refund is approved:
          </p>
          <ul>
            <li>Refunds will be issued to your original payment method</li>
            <li>Processing takes 5-7 business days</li>
            <li>Your bank may take additional time to post the refund to your account</li>
            <li>You will receive an email confirmation when the refund is processed</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Exchanges</h2>
        <div className={styles.sectionText}>
          <p>
            If you&apos;d like to exchange a product for a different flavor or variety, please contact us. We&apos;ll do our best to accommodate your request, subject to product availability.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Shipping Costs</h2>
        <div className={styles.sectionText}>
          <p>
            Original shipping costs are non-refundable unless the return is due to our error (wrong item, defective product, etc.). Return shipping costs are the responsibility of the customer for change-of-mind returns.
          </p>
        </div>
      </div>

      <div className={styles.contactBox}>
        <h4>Need a Refund?</h4>
        <p>
          Contact our customer service team at <a href="mailto:hello@ugo.com">hello@ugo.com</a> and we&apos;ll resolve your issue as quickly as possible.
        </p>
      </div>
    </div>
  );
}
