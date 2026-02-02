'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './BannerSection.module.css';

export default function BannerSection() {
  const router = useRouter();

  return (
    <section className={styles.section}>
      {/* Background Image - uncomment when ready */}
      {/* <Image
        src="/images/banner-bg.jpg"
        alt="Natural ingredients"
        fill
        className={styles.bgImage}
        priority
      /> */}
      
      <div className={styles.overlay} />
      
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.label}>Our Philosophy</span>
          
          <h2 className={styles.headline}>
            <span className={styles.line}>The Earth created the ingredients.</span>
            <span className={styles.line}>We created the bar.</span>
            <span className={styles.lineAccent}>Now you go.</span>
          </h2>
          
          <p className={styles.subtext}>
            Pure organic ingredients, crafted with purpose, designed for your journey.
          </p>
          
          <button
            className={styles.ctaButton}
            onClick={() => router.push('/shop')}
          >
            Try UGo
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={styles.decorLeft} />
      <div className={styles.decorRight} />
    </section>
  );
}
