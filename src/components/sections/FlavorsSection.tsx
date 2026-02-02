'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Clock } from 'lucide-react';
import { products } from '@/data/products';
import styles from './FlavorsSection.module.css';

const categories = [
  {
    id: 'granola',
    name: 'Granola',
    description: 'Crunchy clusters of organic oats, nuts, and dried fruits',
    slug: 'granola',
    noAddedSugar: true,
    image: '/images/granola.png',
    hoverImage: '/images/image 4.png',
    comingSoon: false,
  },
  {
    id: 'balls',
    name: 'Energy Balls',
    description: 'Bite-sized energy packed with nuts and natural sweetness',
    slug: 'balls',
    noAddedSugar: true,
    image: '/images/balls.png',
    hoverImage: '/images/image 4.png',
    comingSoon: false,
  },
  {
    id: 'dessert',
    name: 'Sweet Treats',
    description: 'Guilt-free desserts made with wholesome ingredients',
    slug: 'dessert',
    noAddedSugar: true,
    image: '/images/sweet-treat.png',
    hoverImage: '/images/image 4.png',
    comingSoon: false,
  },
  {
    id: 'chocolate',
    name: 'Chocolate',
    description: 'Rich, velvety chocolate crafted with premium organic cocoa and without added sugar',
    slug: 'chocolate',
    noAddedSugar: true,
    image: '/images/chocolate.png',
    hoverImage: '/images/image 4.png',
    comingSoon: true,
  },
];

export default function FlavorsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Our Products</span>
          <h2 className={styles.title}>Explore Our Collection</h2>
          <p className={styles.subtitle}>
            Healthy and delicious snacks made with only organic ingredients
          </p>
        </div>
        
        <div className={styles.grid}>
          {categories.map((category) => {
            const count = products.filter(p => p.type === category.slug).length;
            const isHovered = hoveredId === category.id;

            const cardContent = (
              <>
                <div className={styles.cardImage}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={200}
                    height={180}
                    className={`${styles.image} ${isHovered ? styles.imageHidden : ''}`}
                  />
                  {category.noAddedSugar && !category.comingSoon && (
                    <span className={`${styles.badge} ${isHovered ? styles.badgeHidden : ''}`}>
                      <Leaf size={12} />
                      No Added Sugar
                    </span>
                  )}
                  
                  {/* Coming Soon Overlay */}
                  {category.comingSoon && (
                    <div className={styles.comingSoonOverlay}>
                      <div className={styles.comingSoonContent}>
                        <Clock size={24} />
                        <span>Coming Soon</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Hover Image */}
                  {!category.comingSoon && (
                    <div className={`${styles.hoverImageWrapper} ${isHovered ? styles.hoverImageVisible : ''}`}>
                      <Image
                        src={category.hoverImage}
                        alt={category.name}
                        fill
                        className={styles.hoverImage}
                      />
                    </div>
                  )}
                </div>
                
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.cardTitle}>{category.name}</h3>
                    {category.comingSoon ? (
                      <span className={styles.comingSoonBadge}>Coming Soon</span>
                    ) : (
                      <span className={styles.count}>{count} items</span>
                    )}
                  </div>
                  <p className={styles.cardDescription}>{category.description}</p>
                  {category.comingSoon ? (
                    <span className={styles.cardLinkDisabled}>
                      Stay Tuned <Clock size={16} />
                    </span>
                  ) : (
                    <span className={styles.cardLink}>
                      Shop {category.name} <ArrowRight size={16} />
                    </span>
                  )}
                </div>
              </>
            );

            if (category.comingSoon) {
              return (
                <div 
                  key={category.id}
                  className={`${styles.card} ${styles.cardComingSoon}`}
                >
                  {cardContent}
                </div>
              );
            }

            return (
              <Link 
                key={category.id}
                href={`/shop?category=${category.slug}`}
                className={styles.card}
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {cardContent}
              </Link>
            );
          })}
        </div>

        <div className={styles.cta}>
          <Link href="/shop" className={styles.ctaButton}>
            View All Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
