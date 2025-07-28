'use client';

import React, { useState, useEffect, useRef } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function MiCuenta() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    // Escuchar cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Cerrar menú si clic fuera
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      listener.subscription.unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setMenuOpen(false);
  }

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setMenuOpen((open) => !open)}
        className="flex items-center gap-2 text-green-700 hover:text-green-900 font-medium"
        aria-haspopup="true"
        aria-expanded={menuOpen}
        aria-label="Menú de usuario"
      >
        {/* Icono usuario */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.953 9.953 0 0112 15c2.635 0 5.055 1.003 6.879 2.633M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="hidden sm:inline truncate max-w-[8rem]" title={user?.email ?? undefined}>
          {user?.email ?? 'Mi cuenta'}
        </span>
      </button>

      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50 ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}
        >
          {user ? (
            <>
              <p className="px-4 py-2 text-sm text-gray-700 truncate" title={user.email ?? undefined}>
                Hola, {user.email}
              </p>
              <Link href="/mi-perfil" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-green-700 hover:bg-green-50" role="menuitem" tabIndex={0}>
                Mi Perfil
              </Link>
              <Link href="/mis-anuncios" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-green-700 hover:bg-green-50" role="menuitem" tabIndex={0}>
                Mis Anuncios
              </Link>
              <Link href="/anuncios-favoritos" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-green-700 hover:bg-green-50" role="menuitem" tabIndex={0}>
                Anuncios Favoritos
              </Link>
              <Link href="/chat" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-green-700 hover:bg-green-50" role="menuitem" tabIndex={0}>
                Chat
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                role="menuitem"
                tabIndex={0}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-green-700 hover:bg-green-50" role="menuitem" tabIndex={0}>
                Acceder
              </Link>
              <Link href="/criador-usuario" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-green-700 hover:bg-green-50" role="menuitem" tabIndex={0}>
  Registrarse
</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
