'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
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
                Conectamos criadores verificados con amantes de los animales en toda España. Promovemos la cría y adopción responsable.
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
                  <Link href="/contacto" className="hover:underline">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/consejos" className="hover:underline">
                    Consejos
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-sm text-gray-600 text-center md:text-right">
              © {new Date().getFullYear()} TuCriadero.es<br />
              Todos los derechos reservados.
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
