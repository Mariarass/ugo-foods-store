import Link from 'next/link';
import styles from './Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Image src="/images/logo.png" alt="logo" width={100} height={100} />
            <p className={styles.tagline}>Clean energy wherever you go</p>
          </div>
          
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>SHOP</h4>
            <div className={styles.links}>
              <Link href="/shop" className={styles.link}>All Products</Link>
              <Link href="/shop?category=granola" className={styles.link}>Granola</Link>
              <Link href="/shop?category=balls" className={styles.link}>Energy Balls</Link>
              <Link href="/shop?category=dessert" className={styles.link}>Sweet Treats</Link>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>HELP</h4>
            <div className={styles.links}>
              <Link href="/search" className={styles.link}>Search</Link>
              <Link href="/shipping-returns" className={styles.link}>Shipping & Returns</Link>
              <Link href="/refund-policy" className={styles.link}>Refund Policy</Link>
              <Link href="/contact" className={styles.link}>Contact Us</Link>
            </div>
          </div>
          
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>FOLLOW</h4>
            <div className={styles.links}>
              <a href="https://instagram.com" className={styles.link} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="https://tiktok.com" className={styles.link} target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className={styles.policyLinks}>
          <Link href="/privacy-policy" className={styles.policyLink}>Privacy Policy</Link>
          <span className={styles.divider}>·</span>
          <Link href="/terms-of-service" className={styles.policyLink}>Terms of Service</Link>
          <span className={styles.divider}>·</span>
          <Link href="/refund-policy" className={styles.policyLink}>Refund Policy</Link>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2026 UGO. Made with <span className={styles.heart}>♥</span> for adventurers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
