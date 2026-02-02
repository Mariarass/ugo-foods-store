'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, Package, Mail, HelpCircle, ArrowRight } from 'lucide-react';
import styles from '../policies.module.css';

const quickLinks = [
  { href: '/shop', label: 'Shop All', icon: ShoppingBag },
  { href: '/shop?category=granola', label: 'Granola', icon: Package },
  { href: '/shop?category=balls', label: 'Energy Balls', icon: Package },
  { href: '/shipping-returns', label: 'Shipping Info', icon: HelpCircle },
  { href: '/contact', label: 'Contact Us', icon: Mail },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className={styles.policyContent}>
      <div className={styles.searchPage}>
        <div className={styles.searchIcon}>
          <Search size={36} />
        </div>
        
        <h1 className={styles.title}>Search Our Store</h1>
        <p className={styles.sectionText} style={{ marginBottom: '2rem' }}>
          Find your favorite organic snacks, granola, and energy balls
        </p>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
            autoFocus
          />
        </form>
        
        <p className={styles.searchHint}>
          Try searching for &quot;granola&quot;, &quot;energy balls&quot;, or &quot;chocolate&quot;
        </p>

        <div className={styles.quickLinks}>
          {quickLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.quickLink}>
              <link.icon size={16} />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
