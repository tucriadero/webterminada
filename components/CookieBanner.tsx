'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted');
    if (!accepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#dff6ea] text-[#33695d] px-6 py-4 shadow-xl z-50">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          Utilizamos cookies para mejorar tu experiencia. Al continuar navegando aceptas nuestra{' '}
          <Link href="/cookies" className="underline text-[#5cae97] hover:text-[#4c9c85]">Política de Cookies</Link>.
        </p>
        <button
          onClick={handleAccept}
          className="bg-[#5cae97] hover:bg-[#4c9c85] text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}