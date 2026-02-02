'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Truck, X } from 'lucide-react';
import styles from './AnnouncementBar.module.css';

const announcements = [
  {
    id: 1,
    icon: Truck,
    text: 'FREE Shipping on orders over $50',
    linkText: 'Shop All',
    linkHref: '/shop',
  },
  // Add more announcements here in the future
  // {
  //   id: 2,
  //   icon: Gift,
  //   text: 'New: Chocolate Collection Coming Soon!',
  //   linkText: 'Learn More',
  //   linkHref: '/shop?category=chocolate',
  // },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const nextAnnouncement = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  }, []);

  const prevAnnouncement = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  useEffect(() => {
    if (announcements.length <= 1) return;
    const interval = setInterval(nextAnnouncement, 5000);
    return () => clearInterval(interval);
  }, [nextAnnouncement]);

  useEffect(() => {
    // Update CSS variable when visibility changes
    document.documentElement.style.setProperty(
      '--announcement-height', 
      isVisible ? '34px' : '0px'
    );
  }, [isVisible]);

  if (!isVisible) return null;

  const current = announcements[currentIndex];
  const IconComponent = current.icon;

  return (
    <div className={styles.bar}>
      <div className={styles.container}>
        {announcements.length > 1 && (
          <button 
            className={styles.navButton} 
            onClick={prevAnnouncement}
            aria-label="Previous announcement"
          >
            <ChevronLeft size={14} />
          </button>
        )}

        <div className={styles.content}>
          <IconComponent size={16} className={styles.icon} />
          <span className={styles.text}>{current.text}</span>
          <Link href={current.linkHref} className={styles.link}>
            {current.linkText}
          </Link>
        </div>

        {announcements.length > 1 && (
          <button 
            className={styles.navButton} 
            onClick={nextAnnouncement}
            aria-label="Next announcement"
          >
            <ChevronRight size={14} />
          </button>
        )}

        {/* <button 
          className={styles.closeButton}
          onClick={() => setIsVisible(false)}
          aria-label="Close announcement"
        >
          <X size={14} />
        </button> */}
      </div>
    </div>
  );
}
