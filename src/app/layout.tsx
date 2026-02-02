import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/providers/StoreProvider';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import CartSidebar from '@/components/CartSidebar';
import Footer from '@/components/sections/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'UGo - Clean Energy Wherever You Go',
  description: 'Organic nuts and organic dried fruits for clean energy anywhere - gym, trail, office, or even in space.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className} suppressHydrationWarning>
        <StoreProvider>
          <AnnouncementBar />
          <Header />
          <CartSidebar />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
