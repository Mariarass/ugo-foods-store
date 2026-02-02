'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf, Sparkles, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HeroSection.module.css';

const slides = [
  {
    id: 1,
    badge: 'Healthy Snacks for Active Life',
    badgeIcon: Leaf,
    headline1: 'Clean energy wherever',
    headline2: 'You Go',
    description: 'Organic nuts and dried fruits for clean energy anywhere — gym, trail, office, or even in space. No added sugar. No chemicals. Just real organic ingredients.',
    image1: '/images/bar-mango.png',
    image2: '/images/bar-fig.png',
  },
  {
    id: 2,
    badge: '100% Organic Ingredients',
    badgeIcon: Sparkles,
    headline1: 'Nature\'s best',
    headline2: 'In every bite',
    description: 'We source only the finest organic ingredients from trusted farmers. Every product is crafted with care to fuel your adventures naturally.',
    image1: '/images/granola.png',
    image2: '/images/balls.png',
  },
  {
    id: 3,
    badge: 'Made with Love',
    badgeIcon: Heart,
    headline1: 'Guilt-free',
    headline2: 'Indulgence',
    description: 'Satisfy your cravings without compromise. Our snacks are naturally sweetened with dates and fruits — zero added sugar, 100% delicious.',
    image1: '/images/sweet-treat.png',
    image2: '/images/bar-hazelnut.svg',
  },
];

export default function HeroSection() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];
  const BadgeIcon = slide.badgeIcon;

  return (
    <section className={styles.section}>
      <div className={styles.earthContainer}>
        <Image 
          src="/images/Layer_1.svg" 
          alt="Earth" 
          className={styles.earth}
          fill
          priority
        />
      </div>
      
      <div className={styles.container}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={slide.id}
            className={styles.content}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className={styles.badge}>
              <BadgeIcon size={14} />
              {slide.badge}
            </div>

            <h1 className={styles.headline}>
              <span className={styles.headlinePart1}>{slide.headline1}</span>
              <span className={styles.headlinePart2}>{slide.headline2}</span>
            </h1>

            <p className={styles.description}>{slide.description}</p>

            <div className={styles.actions}>
              <button
                className={styles.ctaButton}
                onClick={() => router.push('/shop')}
              >
                Shop Now
                <ArrowRight size={18} />
              </button>
              {/* <button
                className={styles.secondaryButton}
                onClick={() => router.push('/contact')}
              >
                Learn More
              </button> */}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div 
            key={slide.id}
            className={styles.imageSection}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className={styles.productShowcase}>
              <Image
                src={slide.image1}
                alt="UGO Product"
                width={280}
                height={400}
                className={styles.productImage}
                priority
              />
              <Image
                src={slide.image2}
                alt="UGO Product"
                width={240}
                height={340}
                className={styles.productImageSecond}
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Controls */}
      <div className={styles.sliderControls}>
        <button 
          className={styles.arrowButton} 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentSlide ? styles.dotActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button 
          className={styles.arrowButton} 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <motion.div 
          className={styles.progressFill}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
          key={currentSlide}
        />
      </div>
    </section>
  );
}
