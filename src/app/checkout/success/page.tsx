'use client';

import { useEffect, useState } from 'react';
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

export default function CheckoutSuccessPage() {
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
        ) : sessionId ? (
          <p className={styles.orderId}>
            Reference: <strong>{sessionId.slice(-8).toUpperCase()}</strong>
          </p>
        ) : null}

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
