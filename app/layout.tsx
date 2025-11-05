import '../styles/globals.css';
import { Providers } from './providers';
import type { Metadata } from 'next';
import AuthRedirect from '@/components/AuthRedirect';
import CookieBanner from '@/components/CookieBanner';
import NotificationListener from '@/components/NotificationListener';
import NotificationSound from '@/components/NotificationSound';
import Header from '@/components/Header';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import LayoutWrapper from '@/components/LayoutWrapper';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tucriadero.es'),
  title: 'TuCriadero',
  description: 'Encuentra perros y gatos de criadores verificados.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'TuCriadero.es – Criadores de perros y gatos',
    description:
      'Encuentra criaderos verificados y responsables cerca de ti. Contacto directo, sin intermediarios.',
    url: 'https://www.tucriadero.es',
    siteName: 'TuCriadero',
    images: [
      {
        url: 'https://www.tucriadero.es/logo-share.jpg',
        width: 1200,
        height: 630,
        alt: 'TuCriadero.es',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TuCriadero.es – Criadores responsables de perros y gatos',
    description:
      'Descubre criaderos con núcleo zoológico, verificados y con animales disponibles.',
    images: ['https://www.tucriadero.es/logo-share.jpg'],
  },
};

// 🚀 Este componente es cliente y maneja la visibilidad del Header/Footer
// Guarda este archivo como /components/LayoutWrapper.tsx
'use client';
import { usePathname } from 'next/navigation';

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === '/'; // Oculta header/footer solo en la home

  return (
    <>
      {!hideLayout && <Header />}
      <main className="min-h-screen">{children}</main>
      {!hideLayout && (
        <footer className="bg-[#DFF6EA] text-[#5cae97] mt-10 border-t border-[#b6e8d3]">
          <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h3 className="font-semibold mb-3">TuCriadero.es</h3>
              <p className="text-sm text-gray-600">
                Conectamos criadores verificados con amantes de los animales en
                toda España. Promovemos la adopción y la cría responsable.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Enlaces útiles</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/sobre-nosotros" className="hover:underline">
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/cont
