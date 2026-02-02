'use client';

import { Suspense, useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, LayoutList, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products } from '@/data/products';
import { useAppDispatch } from '@/store/hooks';
import { addToCart, openCart } from '@/store/cartSlice';
import { Product, ProductType } from '@/types';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

const categories = [
  { id: 'all', label: 'All Products', slug: '', description: 'Browse our complete collection' },
  { id: 'granola', label: 'Granola', slug: 'granola', description: 'Crunchy & nutritious' },
  { id: 'balls', label: 'Energy Balls', slug: 'balls', description: 'Perfect on-the-go snack' },
  { id: 'dessert', label: 'Sweet Treats', slug: 'dessert', description: 'Guilt-free indulgence' },
];

const sortOptions = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
  { id: 'name', label: 'Name: A to Z' },
];

function ShopContent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get('category') || '';
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(openCart());
  };

  const handleFilterChange = (slug: string) => {
    if (slug) {
      router.push(`/shop?category=${slug}`);
    } else {
      router.push('/shop');
    }
    setShowMobileFilters(false);
  };

  const filteredProducts = useMemo(() => {
    let result = currentCategory
      ? products.filter(p => p.type === currentCategory as ProductType)
      : [...products];

    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [currentCategory, sortBy]);

  const currentCategoryData = categories.find(c => c.slug === currentCategory) || categories[0];

  const getCategoryCount = (slug: string) => {
    if (!slug) return products.length;
    return products.filter(p => p.type === slug).length;
  };

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <motion.div 
        className={styles.hero}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {currentCategoryData.label}
        </motion.h1>
        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {currentCategoryData.description}
        </motion.p>
      </motion.div>

      <div className={styles.container}>
        {/* Mobile Filter Button */}
        <button 
          className={styles.mobileFilterButton}
          onClick={() => setShowMobileFilters(true)}
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>

        <div className={styles.content}>
          {/* Sidebar */}
          <aside className={`${styles.sidebar} ${showMobileFilters ? styles.sidebarOpen : ''}`}>
            <div className={styles.sidebarHeader}>
              <h3 className={styles.filterTitle}>Categories</h3>
              <button 
                className={styles.closeSidebar}
                onClick={() => setShowMobileFilters(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.filterList}>
              {categories.map((category) => {
                const count = getCategoryCount(category.slug);
                const isActive = currentCategory === category.slug;
                
                return (
                  <button
                    key={category.id}
                    className={`${styles.filterButton} ${isActive ? styles.filterButtonActive : ''}`}
                    onClick={() => handleFilterChange(category.slug)}
                  >
                    <span className={styles.filterLabel}>{category.label}</span>
                    <span className={styles.filterCount}>{count}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.sidebarDivider} />

            <div className={styles.sidebarInfo}>
              <h4>Why Choose UGO?</h4>
              <ul>
                <li>100% Organic Ingredients</li>
                <li>No Added Sugar</li>
                <li>Plant-Based & Vegan</li>
                <li>Recyclable Packaging</li>
              </ul>
            </div>
          </aside>

          {/* Mobile Overlay */}
          <AnimatePresence>
            {showMobileFilters && (
              <motion.div 
                className={styles.mobileOverlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowMobileFilters(false)}
              />
            )}
          </AnimatePresence>

          {/* Products Section */}
          <div className={styles.productsSection}>
            {/* Toolbar */}
            {/* <div className={styles.toolbar}>
              <p className={styles.resultsCount}>
                Showing <strong>{filteredProducts.length}</strong> products
              </p>

              <div className={styles.toolbarActions}>
             
                <div className={styles.sortWrapper}>
                  <button 
                    className={styles.sortButton}
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                  >
                    Sort by: {sortOptions.find(s => s.id === sortBy)?.label}
                    <ChevronDown size={16} className={showSortDropdown ? styles.rotated : ''} />
                  </button>
                  
                  <AnimatePresence>
                    {showSortDropdown && (
                      <motion.div 
                        className={styles.sortDropdown}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        {sortOptions.map(option => (
                          <button
                            key={option.id}
                            className={`${styles.sortOption} ${sortBy === option.id ? styles.sortOptionActive : ''}`}
                            onClick={() => {
                              setSortBy(option.id);
                              setShowSortDropdown(false);
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

  
                <div className={styles.viewToggle}>
                  <button
                    className={`${styles.viewButton} ${viewMode === 'grid' ? styles.viewButtonActive : ''}`}
                    onClick={() => setViewMode('grid')}
                    aria-label="Grid view"
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    className={`${styles.viewButton} ${viewMode === 'list' ? styles.viewButtonActive : ''}`}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                  >
                    <LayoutList size={18} />
                  </button>
                </div>
              </div>
            </div> */}

            {/* Products Grid */}
            <div className={`${styles.products} ${viewMode === 'list' ? styles.productsList : ''}`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showPrice
                  showActions
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className={styles.noProducts}>
                <p>No products found in this category.</p>
                <button onClick={() => handleFilterChange('')} className={styles.resetButton}>
                  View All Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className={styles.page}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner} />
          <p>Loading products...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
