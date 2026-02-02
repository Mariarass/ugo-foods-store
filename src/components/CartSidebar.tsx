'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Minus, Plus, Trash2, ShoppingBag, Truck, ArrowRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { closeCart, removeFromCart, updateQuantity } from '@/store/cartSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './CartSidebar.module.css';

const FREE_SHIPPING_THRESHOLD = 50;

export default function CartSidebar() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isOpen = useAppSelector((state) => state.cart.isOpen);
  const items = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error('No checkout URL returned');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
    }
  };

  const handleContinueShopping = () => {
    dispatch(closeCart());
    router.push('/shop');
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.overlay}
            onClick={() => dispatch(closeCart())}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            suppressHydrationWarning
          />
          <motion.div 
            className={styles.sidebar}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            suppressHydrationWarning
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <ShoppingBag size={20} />
                <h2 className={styles.title}>Your Cart</h2>
                {totalItems > 0 && (
                  <span className={styles.itemCount}>{totalItems}</span>
                )}
              </div>
              <button
                className={styles.closeButton}
                onClick={() => dispatch(closeCart())}
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {items.length > 0 && (
              <div className={styles.shippingBanner}>
                <div className={styles.shippingText}>
                  <Truck size={16} />
                  {isFreeShipping ? (
                    <span className={styles.freeShippingText}>You&apos;ve unlocked free shipping!</span>
                  ) : (
                    <span>Add <strong>${amountToFreeShipping.toFixed(2)}</strong> for free shipping</span>
                  )}
                </div>
                <div className={styles.progressBar}>
                  <motion.div 
                    className={styles.progressFill}
                    initial={{ width: 0 }}
                    animate={{ width: `${shippingProgress}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            )}

            {/* Content */}
            <div className={styles.content}>
              {items.length === 0 ? (
                <motion.div 
                  className={styles.empty}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={styles.emptyIcon}>
                    <ShoppingBag size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.emptyTitle}>Your cart is empty</h3>
                  <p className={styles.emptyText}>Looks like you haven&apos;t added anything yet.</p>
                  <Link 
                    href="/shop" 
                    className={styles.shopLink}
                    onClick={() => dispatch(closeCart())}
                  >
                    Start Shopping
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ) : (
                <div className={styles.items}>
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div 
                        key={item.product.id} 
                        className={styles.item}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, height: 0 }}
                        transition={{ delay: index * 0.05 }}
                        layout
                      >
                        <Link 
                          href={`/products/${item.product.id}`}
                          className={styles.itemImage}
                          style={{ backgroundColor: item.product.bgColor }}
                          onClick={() => dispatch(closeCart())}
                        >
                          <Image
                            src={item.product.packageImage}
                            alt={item.product.name}
                            width={80}
                            height={80}
                            className={styles.itemImageImg}
                          />
                        </Link>
                        <div className={styles.itemDetails}>
                          <div className={styles.itemHeader}>
                            <Link 
                              href={`/products/${item.product.id}`}
                              className={styles.itemName}
                              onClick={() => dispatch(closeCart())}
                            >
                              {item.product.name}
                            </Link>
                            <button
                              className={styles.removeButton}
                              onClick={() => dispatch(removeFromCart(item.product.id))}
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className={styles.itemCategory}>{item.product.category}</div>
                          <div className={styles.itemFooter}>
                            <div className={styles.quantityControls}>
                              <button
                                className={styles.quantityButton}
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.product.id,
                                      quantity: item.quantity - 1,
                                    })
                                  )
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span className={styles.quantity}>{item.quantity}</span>
                              <button
                                className={styles.quantityButton}
                                onClick={() =>
                                  dispatch(
                                    updateQuantity({
                                      id: item.product.id,
                                      quantity: item.quantity + 1,
                                    })
                                  )
                                }
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <div className={styles.itemPrice}>
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span className={isFreeShipping ? styles.freeText : ''}>
                    {isFreeShipping ? 'FREE' : 'Calculated at checkout'}
                  </span>
                </div>
                <div className={styles.divider} />
                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <button
                  className={styles.checkoutButton}
                  onClick={handleCheckout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className={styles.spinner} />
                      Processing...
                    </>
                  ) : (
                    <>
                      Checkout
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                
                <button
                  className={styles.continueButton}
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
