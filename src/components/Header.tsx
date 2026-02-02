'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleCart } from '@/store/cartSlice';
import styles from './Header.module.css';
import Image from 'next/image';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.leftSection}>
          <Link href="/" className={styles.logo}>
           <Image src="/images/logo.png" alt="logo" width={100} height={100} />
          </Link>
         
          </div>

          <div className={styles.rightSection}>
            <Link href="/shop" className={styles.link}>
              Shop
            </Link>
            <Link href="/contact" className={styles.link}>
              Contact us
            </Link>
            <div className={styles.icons}>
              {/* <button className={styles.iconButton}>
                <User size={22} />
              </button> */}
              <button 
                onClick={() => dispatch(toggleCart())}
                className={`${styles.iconButton} ${styles.cartButton}`}
              >
                <ShoppingCart size={22} />
                {mounted && totalItems > 0 && (
                  <span className={styles.badge}>
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
