'use client';

import Image from 'next/image';
import { Leaf } from 'lucide-react';
import styles from './IngredientsSection.module.css';

const ingredients = [
  {
    id: 'dates',
    name: 'Organic Dates',
    description: 'Nature\'s caramel — naturally sweet, rich in fiber and potassium',
    image: '/images/ingredients/dates.png',
    color: '#8B4513',
  },
  {
    id: 'almonds',
    name: 'Organic Almonds',
    description: 'Crunchy protein powerhouse with healthy fats and vitamin E',
    image: '/images/ingredients/almonds.png',
    color: '#D2691E',
  },
  {
    id: 'cashews',
    name: 'Organic Cashews',
    description: 'Creamy and buttery, packed with minerals and antioxidants',
    image: '/images/ingredients/cashews.png',
    color: '#F5DEB3',
  },
  {
    id: 'coconut',
    name: 'Organic Coconut',
    description: 'Tropical goodness with MCTs for sustained energy',
    image: '/images/ingredients/coconut.png',
    color: '#FAEBD7',
  },
  {
    id: 'cacao',
    name: 'Raw Cacao',
    description: 'Rich in antioxidants and natural mood boosters',
    image: '/images/ingredients/cacao.png',
    color: '#3D2314',
  },
  {
    id: 'figs',
    name: 'Organic Figs',
    description: 'Ancient superfruit with natural sweetness and fiber',
    image: '/images/ingredients/figs.png',
    color: '#722F37',
  },
];

export default function IngredientsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.label}>Pure & Simple</span>
          <h2 className={styles.title}>Our Ingredients</h2>
          <p className={styles.subtitle}>
            We use only 100% organic, whole food ingredients. 
            Nothing artificial, nothing processed — just nature&apos;s best.
          </p>
        </div>

        <div className={styles.grid}>
          {ingredients.map((ingredient) => (
            <div key={ingredient.id} className={styles.card}>
              <div 
                className={styles.cardImage}
                style={{ background: `linear-gradient(135deg, ${ingredient.color}15 0%, ${ingredient.color}08 100%)` }}
              >
                <div className={styles.imagePlaceholder}>
                  <Leaf size={32} style={{ color: ingredient.color }} />
                </div>
                {/* Uncomment when images are ready */}
                {/* <Image
                  src={ingredient.image}
                  alt={ingredient.name}
                  width={100}
                  height={100}
                  className={styles.image}
                /> */}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{ingredient.name}</h3>
                <p className={styles.cardDescription}>{ingredient.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.badge}>
          <Leaf size={18} />
          <span>All ingredients are certified organic and sustainably sourced</span>
        </div>
      </div>
    </section>
  );
}
