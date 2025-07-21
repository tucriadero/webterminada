'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import MiCuenta from './MiCuenta';
import Avatar from './Avatar';
import { useUser } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import MiCuentaDropdown from './MiCuentaDropdown';

export default function Header() {
  const user = useUser();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Hubo un error al cerrar sesión.');
        console.error('Error al cerrar sesión:', error.message);
        return;
      }
      toast.success('Sesión cerrada correctamente');
      router.push('/inicio');
    } catch (err) {
      toast.error('Algo salió mal. Intenta de nuevo.');
      console.error('Error inesperado:', err);
    }
  };

  return (
    <>
      <header className="bg-[#DFF6EA] shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#5cae97' }}>
            TuCriadero
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-[#5cae97] font-light">
            <Link href="/inicio">Inicio</Link>
            <Link href="/perros">Perros</Link>
            <Link href="/gatos">Gatos</Link>
            {/* Botón Publicar anuncio aquí, visible en desktop */}
            <button
              onClick={() => (user ? router.push('/anuncio') : setShowPopup(true))}
              className="font-semibold text-left bg-[#5cae97] text-white px-3 py-1 rounded-lg hover:bg-[#4c9c85]"
            >
              Publicar un anuncio
            </button>
            <Link href="/blog">Blog</Link>
            <Link href="/sobre-nosotros">Sobre Nosotros</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>

          {/* Zona de usuario / login */}
          <div className="flex items-center gap-4">
            {!user && (
              <>
                <button
                  onClick={() => router.push('/registro')}
                  className="ml-2 bg-[#5cae97] hover:bg-[#4c9c85] text-white px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm rounded-lg font-medium"
                >
                  Registrarse
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="text-[#5cae97] border border-[#5cae97] px-3 py-1 text-xs md:px-4 md:py-2 md:text-sm rounded-lg font-medium hover:bg-[#e8f8f2]"
                >
                  Acceder
                </button>
              </>
            )}
            {user && <MiCuentaDropdown />}

            {/* Botón menú hamburguesa para móvil */}
            <button
              className="md:hidden text-[#5cae97] text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className="md:hidden bg-[#DFF6EA] px-6 pb-4 flex flex-col gap-4 text-[#5cae97] font-medium">
            <Link href="/inicio" onClick={() => setMenuOpen(false)}>
              Inicio
            </Link>
            <Link href="/perros" onClick={() => setMenuOpen(false)}>
              Perros
            </Link>
            <Link href="/gatos" onClick={() => setMenuOpen(false)}>
              Gatos
            </Link>

            {/* Botón publicar anuncio en móvil */}
            <button
              onClick={() => {
                setMenuOpen(false);
                user ? router.push('/anuncio') : setShowPopup(true);
              }}
              className="text-left"
            >
              Publicar un anuncio
            </button>

            <Link href="/blog" onClick={() => setMenuOpen(false)}>
              Blog
            </Link>
            <Link href="/sobre-nosotros" onClick={() => setMenuOpen(false)}>
              Sobre Nosotros
            </Link>
            <Link href="/contacto" onClick={() => setMenuOpen(false)}>
              Contacto
            </Link>

            {user && (
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="border border-[#5cae97] text-[#5cae97] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8f8f2]"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        )}

        {/* Popup acceso si no está logueado */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
              <h2 className="text-lg font-bold text-[#5cae97] mb-2">Accede para continuar</h2>
              <p className="text-gray-700 mb-4">
                Debes iniciar sesión con tu cuenta para poder publicar un anuncio.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowPopup(false);
                    router.push('/login');
                  }}
                  className="bg-[#5cae97] hover:bg-[#4c9c85] text-white px-4 py-2 rounded-xl"
                >
                  Iniciar sesión
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
