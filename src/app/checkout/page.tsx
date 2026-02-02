'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import styles from './page.module.css';

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    email: '',
    shippingAddress: '',
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.shippingAddress) {
      // Payment processing would go here
      console.log('Order placed:', {
        email: formData.email,
        shippingAddress: formData.shippingAddress,
        items: cartItems,
        total,
      });
      alert('Order placed successfully! (This is a demo - no actual payment was processed)');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.title}>Checkout</h1>
          <div className={styles.empty}>
            <p>Your cart is empty</p>
            <button
              onClick={() => router.push('/shop')}
              className={styles.payButton}
              style={{ marginTop: '1rem', maxWidth: '300px' }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Checkout</h1>

        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Contact Information & Shipping</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="your@email.com"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="shippingAddress" className={styles.label}>
                Shipping Address
              </label>
              <textarea
                id="shippingAddress"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                className={styles.textarea}
                required
                placeholder="Enter your full shipping address"
              />
            </div>
            <button type="submit" className={styles.payButton}>
              Pay ${total.toFixed(2)}
            </button>
          </form>
        </div>

        <div className={styles.orderSection}>
          <h2 className={styles.orderTitle}>Order Summary</h2>
          <div className={styles.items}>
            {cartItems.map((item) => (
              <div key={item.product.id} className={styles.item}>
                <div className={styles.itemName}>{item.product.name}</div>
                <div className={styles.itemQuantity}>x{item.quantity}</div>
                <div className={styles.itemPrice}>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryRowTotal}`}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
