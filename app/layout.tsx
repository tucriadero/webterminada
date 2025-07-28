import '../styles/globals.css';
import { Providers } from './providers';
import type { Metadata } from 'next';
import AuthRedirect from '@/components/AuthRedirect';
import CookieBanner from '@/components/CookieBanner';
import NotificationListener from '@/components/NotificationListener';
import NotificationSound from '@/components/NotificationSound';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tucriadero.es'),
  title: 'TuCriadero',
  description: 'Encuentra perros y gatos de criadores verificados.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'TuCriadero.es – Criadores de perros y gatos',
    description: 'Encuentra criaderos verificados y responsables cerca de ti. Contacto directo, sin intermediarios.',
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
    description: 'Descubre criaderos con núcleo zoológico, verificados y con animales disponibles.',
    images: ['https://www.tucriadero.es/logo-share.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <AuthRedirect />
          <NotificationListener />
          <NotificationSound />
          {children}
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
