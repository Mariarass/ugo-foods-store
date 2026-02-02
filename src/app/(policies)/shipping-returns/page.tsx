import styles from '../policies.module.css';

export default function ShippingReturnsPage() {
  return (
    <div className={styles.policyContent}>
      <div className={styles.header}>
        <h1 className={styles.title}>Shipping & Returns</h1>
        <p className={styles.lastUpdated}>Last updated: February 1, 2026</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Shipping Information</h2>
        <div className={styles.sectionText}>
          <p>
            We ship all orders from our facility in [City, Country]. We strive to process and ship all orders within 1-2 business days.
          </p>
          <ul>
            <li><strong>Standard Shipping:</strong> 5-7 business days — Free on orders over $50</li>
            <li><strong>Express Shipping:</strong> 2-3 business days — $9.99</li>
            <li><strong>Next Day Delivery:</strong> 1 business day — $19.99</li>
          </ul>
          <p>
            Shipping times are estimates and may vary depending on your location and carrier delays. You will receive a tracking number via email once your order ships.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>International Shipping</h2>
        <div className={styles.sectionText}>
          <p>
            We currently ship to select international destinations. International shipping rates and delivery times vary by location. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Order Tracking</h2>
        <div className={styles.sectionText}>
          <p>
            Once your order has shipped, you will receive an email with your tracking information. You can also track your order by logging into your account or contacting our customer service team.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Returns Policy</h2>
        <div className={styles.sectionText}>
          <p>
            We want you to be completely satisfied with your purchase. If you&apos;re not happy with your order, we offer returns within 30 days of delivery.
          </p>
          <ul>
            <li>Products must be unopened and in original packaging</li>
            <li>Perishable items cannot be returned for food safety reasons</li>
            <li>Return shipping costs are the responsibility of the customer unless the item is defective</li>
            <li>Refunds will be processed within 5-7 business days after we receive the return</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Damaged or Defective Items</h2>
        <div className={styles.sectionText}>
          <p>
            If your order arrives damaged or defective, please contact us within 48 hours of delivery with photos of the damage. We will arrange a replacement or full refund at no additional cost to you.
          </p>
        </div>
      </div>

      <div className={styles.contactBox}>
        <h4>Need Help?</h4>
        <p>
          Contact our customer service team at <a href="mailto:hello@ugo.com">hello@ugo.com</a> and we&apos;ll be happy to assist you.
        </p>
      </div>
    </div>
  );
}
