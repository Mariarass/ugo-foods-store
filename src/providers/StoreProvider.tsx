'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { initializeCart } from '@/store/cartSlice';

function CartInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(initializeCart());
  }, []);

  return <>{children}</>;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <CartInitializer>{children}</CartInitializer>
    </Provider>
  );
}
