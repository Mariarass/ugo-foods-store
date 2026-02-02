'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, Minus, Plus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { products } from '@/data/products';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, openCart } from '@/store/cartSlice';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.notFoundContainer}>
          <h1 className={styles.notFoundTitle}>Product not found</h1>
          <p className={styles.notFoundText}>The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop" className={styles.notFoundLink}>
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Gallery images - package + fruit/ingredient + lifestyle shots
  const productImages = [
    product.packageImage,
    product.image || '/images/image 4.png',
    '/images/balls.png',
    '/images/granola.png',
  ];

  // Get 4 random products (excluding current)
  const recommendedProducts = products
    .filter((p) => p.id !== product.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    dispatch(openCart());
  };

  const getCategoryName = (type: string) => {
    switch (type) {
      case 'granola': return 'Granola';
      case 'balls': return 'Energy Balls';
      case 'dessert': return 'Sweet Treats';
      default: return type;
    }
  };

  return (
    <div className={styles.page}>
      {/* Breadcrumbs */}
      <motion.div 
        className={styles.breadcrumbs}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <ChevronRight size={14} className={styles.breadcrumbSeparator} />
        <Link href="/shop" className={styles.breadcrumbLink}>Shop</Link>
        <ChevronRight size={14} className={styles.breadcrumbSeparator} />
        <Link href={`/shop?category=${product.type}`} className={styles.breadcrumbLink}>
          {getCategoryName(product.type)}
        </Link>
        <ChevronRight size={14} className={styles.breadcrumbSeparator} />
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </motion.div>

      <div className={styles.container}>
        {/* Image Section */}
        <motion.div 
          className={styles.imageSection}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={styles.mainImage}
            style={{ backgroundColor: product.bgColor }}
          >
            <Image
              src={productImages[selectedImage]}
              alt={product.name}
              width={500}
              height={500}
              className={styles.mainImageImg}
              priority
            />
          </div>
          
          {productImages.length > 1 && (
            <div className={styles.thumbnails}>
              {productImages.map((img, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.thumbnailActive : ''}`}
                  onClick={() => setSelectedImage(index)}
                  style={{ backgroundColor: product.bgColor }}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className={styles.thumbnailImg}
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info Section */}
        <motion.div 
          className={styles.infoSection}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link href={`/shop?category=${product.type}`} className={styles.category}>
            {getCategoryName(product.type)}
          </Link>
          
          <h1 className={styles.name}>{product.name}</h1>
          
          <div className={styles.priceRow}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <div 
              className={styles.proteinBadge}
              style={{ backgroundColor: product.badgeColor }}
            >
              {product.protein} protein
            </div>
          </div>

          <div className={styles.badges}>
            {product.noAddedSugar && (
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>✓</span>
                No added sugar
              </div>
            )}
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✓</span>
              100% organic
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✓</span>
              Vegan friendly
            </div>
          </div>

          <div className={styles.divider} />

          <p className={styles.description}>{product.description}</p>

          <div className={styles.ingredientsSection}>
            <h3 className={styles.ingredientsTitle}>Ingredients</h3>
            <div className={styles.ingredients}>
              {product.ingredients.map((ingredient, i) => (
                <span key={i} className={styles.ingredientTag}>
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.divider} />

          {/* Quantity & Add to Cart */}
          <div className={styles.purchaseSection}>
            <div className={styles.quantityWrapper}>
              <span className={styles.quantityLabel}>Quantity</span>
              <div className={styles.quantityControls}>
                <button
                  className={styles.quantityButton}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button
                  className={styles.quantityButton}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <button onClick={handleAddToCart} className={styles.addToCartButton}>
              <ShoppingBag size={20} />
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </button>
          </div>

          <button onClick={() => router.back()} className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to shopping
          </button>
        </motion.div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <motion.div 
          className={styles.recommendedSection}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.recommendedTitle}>Recommended for you</h2>
          <div className={styles.recommendedProducts}>
            {recommendedProducts.map((p, index) => (
              <ProductCard
                key={p.id}
                product={p}
                index={index}
                totalCount={recommendedProducts.length}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
