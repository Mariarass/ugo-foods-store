'use client';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.brandName}>UGo</div>
          <div className={styles.tagline}>Clean energy wherever you go</div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>FOLLOW</div>
          <div className={styles.links}>
            <a href="#" className={styles.link}>Instagram</a>
            <a href="#" className={styles.link}>TikTok</a>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionTitle}>CONTACT</div>
          <div className={styles.links}>
            <a href="mailto:hello@ugo.com" className={styles.link}>hello@ugo.com</a>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        © 2026 UGO. Made with ❤️ for adventurers everywhere.
      </div>
    </footer>
  );
}
