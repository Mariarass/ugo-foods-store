'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, X, ArrowRight } from 'lucide-react';
import styles from './WhyUGoSection.module.css';

const comparisonData = [
  { feature: 'Organic Ingredients', ugo: '100%', others: '0-30%' },
  { feature: 'Added Sugar', ugo: '0g', others: '8-20g' },
  { feature: 'Ingredients Count', ugo: '4-6', others: '15-30' },
  { feature: 'Preservatives', ugo: 'None', others: 'Multiple' },
  { feature: 'Protein Source', ugo: 'Whole Nuts', others: 'Powders' },
];

export default function WhyUGoSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.label}>The Difference</span>
          <h2 className={styles.title}>
            Why choose <span className={styles.highlight}>UGo</span>?
          </h2>
        </div>

        {/* Main Comparison */}
        <div className={styles.comparison}>
          {/* UGo Side */}
          <div className={styles.ugoCard}>
            <div className={styles.cardBadge}>Our Promise</div>
            <div className={styles.cardLogo}>UGo</div>
            
            <div className={styles.productDisplay}>
              <Image
                src="/images/bar-mango.png"
                alt="UGo Product"
                width={180}
                height={240}
                className={styles.productImage}
              />
            </div>

            <ul className={styles.featureList}>
              <li><Check size={18} /> 100% Organic Ingredients</li>
              <li><Check size={18} /> Zero Added Sugar</li>
              <li><Check size={18} /> Own chocolate</li>
              <li><Check size={18} /> Whole Food Nutrition</li>
              <li><Check size={18} /> No Artificial Anything</li>
            </ul>

            <Link href="/shop" className={styles.cardButton}>
              Shop Now <ArrowRight size={16} />
            </Link>
          </div>

          {/* VS Divider */}
          <div className={styles.vsDivider}>
            <span>VS</span>
          </div>

          {/* Others Side */}
          <div className={styles.othersCard}>
            <div className={styles.cardBadgeGray}>Mass Produced</div>
            <div className={styles.cardLogoGray}>Other Brands</div>
            
            <div className={styles.ingredientsList}>
              <p className={styles.ingredientsLabel}>Common ingredients:</p>
              <div className={styles.ingredientTags}>
                <span>Sugar Syrup</span>
                <span>Whey Protein</span>
                <span>Palm Oil</span>
                <span>Maltodextrin</span>
                <span>Soy Lecithin</span>
                <span>Natural Flavors</span>
                <span>Preservatives</span>
                <span>+10 more...</span>
              </div>
            </div>

            <ul className={styles.featureListGray}>
              <li><X size={18} /> Often Non-Organic</li>
              <li><X size={18} /> 8-20g Added Sugar</li>
              <li><X size={18} /> 15-30 Ingredients</li>
              <li><X size={18} /> Processed Proteins</li>
              <li><X size={18} /> Artificial Additives</li>
            </ul>
          </div>
        </div>

        {/* Stats Bar */}
        <div className={styles.statsBar}>
          {comparisonData.map((item, index) => (
            <div key={index} className={styles.statItem}>
              <span className={styles.statLabel}>{item.feature}</span>
              <div className={styles.statComparison}>
                <span className={styles.statUgo}>{item.ugo}</span>
                <span className={styles.statVs}>vs</span>
                <span className={styles.statOthers}>{item.others}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.bottomCta}>
          <p>Simple ingredients. Real energy. That&apos;s it.</p>
        </div>
      </div>
    </section>
  );
}
