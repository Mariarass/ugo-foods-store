'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, openCart } from '@/store/cartSlice';
import { products } from '@/data/products';
import styles from './page.module.css';

export default function ProductPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === params.id);

  const bgColors: Record<string, string> = {
    'mango-tropical': '#FEF3C7',
    'fig-delight': '#F3E8FF',
    'hazelnut-cream': '#FDE68A',
    'date-energy': '#FFEDD5',
    'coconut-bliss': '#E0F2FE',
    'berry-mix': '#FCE7F3',
  };

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1 className={styles.notFoundTitle}>Product Not Found</h1>
            <p className={styles.notFoundText}>
              Sorry, we couldn&apos;t find the product you&apos;re looking for.
            </p>
            <Link href="/shop" className={styles.backToShopBtn}>
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    dispatch(openCart());
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/shop" className={styles.backLink}>
          <ArrowLeft size={18} />
          Back to Shop
        </Link>

        <div className={styles.productGrid}>
          <div
            className={styles.imageSection}
            style={{ backgroundColor: bgColors[product.id] || '#F5F5F5' }}
          >
            <Image
              src={product.packageImage}
              alt={product.name}
              width={400}
              height={200}
              className={styles.productImage}
            />
          </div>

          <div className={styles.infoSection}>
            <p className={styles.category}>{product.category}</p>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.price}>${product.price.toFixed(2)}</p>

            <div className={styles.proteinInfo}>
              <span>{product.protein} protein</span>
            </div>

            <p className={styles.description}>{product.description}</p>

            <h3 className={styles.sectionTitle}>INGREDIENTS</h3>
            <div className={styles.ingredientsList}>
              {product.ingredients.map((ing, i) => (
                <span key={i} className={styles.ingredient}>
                  {ing}
                </span>
              ))}
            </div>

            <div className={styles.quantitySection}>
              <span className={styles.quantityLabel}>Quantity:</span>
              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityBtn}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button
                  className={styles.quantityBtn}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
              ADD TO CART - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
