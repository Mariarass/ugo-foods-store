'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, ArrowRight, Loader2 } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/cartSlice';
import styles from './page.module.css';

interface OrderInfo {
  order_number: string;
  customer_name: string;
  total: number;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Clear the cart after successful payment
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    async function fetchOrder() {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/orders/by-session/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
        }
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [sessionId]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.iconWrapper}>
          <CheckCircle size={64} />
        </div>
        
        <h1 className={styles.title}>Thank You!</h1>
        <p className={styles.subtitle}>Your order has been placed successfully</p>
        
        <div className={styles.orderInfo}>
          <Package size={20} />
          <span>You will receive an email confirmation shortly</span>
        </div>

        {loading ? (
          <div className={styles.orderId}>
            <Loader2 size={16} className={styles.spinner} />
            <span>Loading order details...</span>
          </div>
        ) : order ? (
          <p className={styles.orderId}>
            Order number: <strong>{order.order_number}</strong>
          </p>
        ) : (
          <div className={styles.pendingOrder}>
            <p className={styles.pendingText}>
              Your payment was successful! Your order is being processed.
            </p>
            <p className={styles.pendingSubtext}>
              You will receive a confirmation email shortly with your order number.
            </p>
            <p className={styles.supportText}>
              If you don&apos;t receive an email within 10 minutes, please contact us at{' '}
              <a href="mailto:ugofoodshelp@gmail.com" className={styles.supportLink}>
                ugofoodshelp@gmail.com
              </a>
            </p>
          </div>
        )}

        <div className={styles.actions}>
          <Link href="/shop" className={styles.primaryButton}>
            Continue Shopping
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

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className={styles.page}>
        <div className={styles.container}>
          <Loader2 size={48} className={styles.spinner} />
          <p>Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
