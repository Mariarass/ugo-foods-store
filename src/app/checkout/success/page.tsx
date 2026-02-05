'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, ArrowRight, Loader2, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { clearCart } from '@/store/cartSlice';
import styles from './page.module.css';

interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface OrderInfo {
  order_number: string;
  customer_name: string;
  customer_email: string;
  total: number;
  subtotal: number;
  shipping: number;
  items: OrderItem[];
  shipping_address: Address | null;
  billing_address: Address | null;
}

function formatAddress(address: Address | null): string {
  if (!address) return '';
  const parts = [
    address.line1,
    address.line2,
    `${address.city}, ${address.state} ${address.postal_code}`,
    address.country
  ].filter(Boolean);
  return parts.join(', ');
}

function getEmailProviderUrl(email: string): string | null {
  const domain = email.split('@')[1]?.toLowerCase();
  const providers: Record<string, string> = {
    'gmail.com': 'https://mail.google.com',
    'googlemail.com': 'https://mail.google.com',
    'yahoo.com': 'https://mail.yahoo.com',
    'outlook.com': 'https://outlook.live.com',
    'hotmail.com': 'https://outlook.live.com',
    'icloud.com': 'https://www.icloud.com/mail',
    'mail.ru': 'https://e.mail.ru',
    'yandex.ru': 'https://mail.yandex.ru',
  };
  return providers[domain] || null;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const dispatch = useAppDispatch();
  const [order, setOrder] = useState<OrderInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const emailProviderUrl = order?.customer_email ? getEmailProviderUrl(order.customer_email) : null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Success Header */}
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <CheckCircle size={48} />
          </div>
          <h1 className={styles.title}>Thank You!</h1>
          <p className={styles.subtitle}>Your order has been placed successfully</p>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <Loader2 size={32} className={styles.spinner} />
            <p>Loading order details...</p>
          </div>
        ) : order ? (
          <>
            {/* Order Number */}
            <div className={styles.orderNumberBox}>
              <span className={styles.orderNumberLabel}>Order Number</span>
              <span className={styles.orderNumber}>{order.order_number}</span>
            </div>

            {/* Order Details Grid */}
            <div className={styles.detailsGrid}>
              {/* Email Confirmation */}
              <div className={styles.detailCard}>
                <div className={styles.detailIcon}>
                  <Mail size={20} />
                </div>
                <div className={styles.detailContent}>
                  <h3>Confirmation Email</h3>
                  <p>Sent to <strong>{order.customer_email}</strong></p>
                  {emailProviderUrl && (
                    <a 
                      href={emailProviderUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.emailLink}
                    >
                      Open Email
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              {order.shipping_address && (
                <div className={styles.detailCard}>
                  <div className={styles.detailIcon}>
                    <MapPin size={20} />
                  </div>
                  <div className={styles.detailContent}>
                    <h3>Shipping To</h3>
                    <p className={styles.address}>
                      {order.shipping_address.line1}
                      {order.shipping_address.line2 && <><br />{order.shipping_address.line2}</>}
                      <br />
                      {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}
                      <br />
                      {order.shipping_address.country}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className={styles.orderSummary}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>
              <div className={styles.itemsList}>
                {order.items.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <span className={styles.itemName}>{item.name} × {item.quantity}</span>
                    <span className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Shipping</span>
                  <span className={order.shipping === 0 ? styles.free : ''}>
                    {order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className={styles.infoBox}>
              <Package size={20} />
              <span>We&apos;ll send you shipping updates via email</span>
            </div>
          </>
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

        {/* Actions */}
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
