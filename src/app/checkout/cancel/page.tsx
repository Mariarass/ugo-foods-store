'use client';

import Link from 'next/link';
import { XCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export default function CheckoutCancelPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <XCircle size={64} />
        </div>
        
        <h1 className={styles.title}>Payment Cancelled</h1>
        <p className={styles.subtitle}>
          Your payment was cancelled. Don&apos;t worry, your cart items are still saved.
        </p>
        
        <div className={styles.info}>
          <ShoppingBag size={20} />
          <span>Your items are waiting in your cart</span>
        </div>

        <div className={styles.actions}>
          <Link href="/shop" className={styles.primaryButton}>
            Return to Shop
            <ArrowRight size={18} />
          </Link>
          <Link href="/" className={styles.secondaryButton}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
