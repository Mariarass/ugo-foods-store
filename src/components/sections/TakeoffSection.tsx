'use client';

import { useRouter } from 'next/navigation';
import styles from './TakeoffSection.module.css';

export default function TakeoffSection() {
  const router = useRouter();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.backgroundPattern} />
          <div className={styles.productsGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={styles.productCard}>
                <div className={styles.productBrand}>STAGA</div>
                <div className={styles.productName}>STABHIN PAR</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.stars} />
          <div className={styles.moonSurface} />
          <div className={styles.content}>
            <div className={styles.brand}>UGO</div>
            <div className={styles.text}>
              READY FOR<br />
              TAKEOFF?
            </div>
            <button
              className={styles.ctaButton}
              onClick={() => router.push('/shop')}
            >
              ORDER NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
