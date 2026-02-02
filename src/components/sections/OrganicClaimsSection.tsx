'use client';

import { Leaf, Sparkles, Wheat, Bean, Heart, Dna } from 'lucide-react';
import styles from './OrganicClaimsSection.module.css';

const claims = [
  { text: '100% Organic Ingredients', icon: Leaf },
  { text: 'No Added Sugar', icon: Sparkles },
  { text: 'Gluten Free', icon: Wheat },
  { text: 'Soy Free ', icon: Bean },
  { text: 'Vegan', icon: Heart },
  { text: 'GMO Free', icon: Dna },
];

export default function OrganicClaimsSection() {
  // Duplicate claims for seamless loop
  const duplicatedClaims = [...claims, ...claims];

  return (
    <section className={styles.section}>
      <div className={styles.marqueeWrapper}>
        <div className={styles.marquee}>
          {duplicatedClaims.map((claim, index) => (
            <div key={index} className={styles.claimItem}>
              <claim.icon size={20} className={styles.icon} />
              <span className={styles.text}>{claim.text}</span>
              <span className={styles.separator}>✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
