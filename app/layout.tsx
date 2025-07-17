import '../styles/globals.css';
import { Providers } from './providers';
import type { Metadata } from 'next';
<<<<<<< HEAD
import AuthRedirect from '@/components/AuthRedirect'; // <-- Importa aquí
=======
import AuthRedirect from '@/components/AuthRedirect';
import CookieBanner from '@/components/CookieBanner'; // ✅ Importamos el banner
>>>>>>> 293fc21 (Tu mensaje de commit)

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tucriadero.es'),
  title: 'TuCriadero',
  description: 'Encuentra perros y gatos de criadores verificados.',
<<<<<<< HEAD
=======
  icons: {
    icon: '/favicon.ico', // ✅ Favicon añadido
  },
>>>>>>> 293fc21 (Tu mensaje de commit)
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
<<<<<<< HEAD
          <AuthRedirect /> {/* <-- Añadido aquí */}
          {children}
=======
          <AuthRedirect />
          {children}
          <CookieBanner /> {/* ✅ Banner de cookies */}
>>>>>>> 293fc21 (Tu mensaje de commit)
        </Providers>
      </body>
    </html>
  );
}
<<<<<<< HEAD
=======

>>>>>>> 293fc21 (Tu mensaje de commit)
