'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye, Leaf } from 'lucide-react';
import { Product } from '@/types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured';
  showPrice?: boolean;
  showActions?: boolean;
  index?: number;
  totalCount?: number;
  onAddToCart?: (e: React.MouseEvent, product: Product) => void;
}

export default function ProductCard({
  product,
  variant = 'default',
  showPrice = false,
  showActions = false,
  onAddToCart,
}: ProductCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    router.push(`/products/${product.id}`);
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/products/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(e, product);
  };

  return (
    <div
      className={`${styles.productCard} ${variant === 'featured' ? styles.productCardFeatured : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {product.noAddedSugar && (
        <div className={styles.badges}>
          <span className={styles.sugarBadge}>
            <Leaf size={12} />
            No Added Sugar
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className={styles.imageContainer}>
        <Image
          src={product.packageImage}
          alt={product.name}
          width={140}
          height={200}
          className={styles.productImage}
        />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <span className={styles.category}>{product.category}</span>
        <h3 className={styles.productName}>{product.name}</h3>
        
        {showPrice && (
          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
          </div>
        )}

        <div className={styles.ingredients}>
          {product.ingredients.map((ingredient, i) => (
            <span key={i} className={styles.ingredientTag}>
              {ingredient}
            </span>
          ))}
        </div>
      </div>

      {/* Hover State with Image */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={styles.hoverOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Image
              src="/images/image 4.png"
              alt={product.name}
              fill
              className={styles.hoverImage}
            />
            <motion.div
              className={styles.hoverActions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25, delay: 0.1 }}
            >
              {showActions ? (
                <>
                  <button
                    className={styles.actionButton}
                    onClick={handleViewClick}
                    aria-label="View product"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    className={styles.addToCartButton}
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                </>
              ) : (
                <button
                  className={styles.viewButton}
                  onClick={handleViewClick}
                >
                  <Eye size={18} />
                  View Product
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
