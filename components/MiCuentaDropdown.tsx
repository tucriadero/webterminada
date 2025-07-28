'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '../lib/supabaseClient';

import UserIcon from '@heroicons/react/24/outline/UserIcon';
import ClipboardListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon';
import HeartIcon from '@heroicons/react/24/outline/HeartIcon';
import ChatIcon from '@heroicons/react/24/outline/ChatBubbleLeftEllipsisIcon';
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon';

export default function MiCuentaDropdown() {
  const router = useRouter();
  const user = useUser();
  const [open, setOpen] = useState(false);
  const [perfil, setPerfil] = useState<{ nombre: string | null; username: string | null } | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchPerfil = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('nombre, username')
          .eq('id', user.id)
          .single();

        if (!error && data) {
          setPerfil(data);
        }
      }
    };

    fetchPerfil();
  }, [user]);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (!user) return;
      const { data, error } = await supabase.rpc('count_unread_messages', { user_id: user.id });
      if (!error && typeof data === 'number') {
        setUnreadCount(data);
      }
    };
    fetchUnreadCount();
  }, [user]);

  const mostrarNombre = perfil?.username || perfil?.nombre || user?.email || 'Usuario';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 text-[#5cae97] font-semibold focus:outline-none"
      >
        <UserIcon className="h-6 w-6 text-[#5cae97]" />
        <span className="hidden md:inline truncate max-w-[8rem]">{mostrarNombre}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg z-50 text-sm">
          <div className="px-4 py-2 border-b text-gray-700 truncate">
            Hola, {mostrarNombre}
          </div>
          <Link
            href="/mi-perfil"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
            onClick={() => setOpen(false)}
          >
            <UserIcon className="h-5 w-5 text-[#5cae97]" /> Mi Perfil
          </Link>
          <Link
            href="/mis-anuncios"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
            onClick={() => setOpen(false)}
          >
            <ClipboardListIcon className="h-5 w-5 text-[#5cae97]" /> Mis Anuncios
          </Link>
          <Link
            href="/favoritos"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
            onClick={() => setOpen(false)}
          >
            <HeartIcon className="h-5 w-5 text-[#5cae97]" /> Favoritos
          </Link>
          <Link
            href="/chat"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700 relative"
            onClick={() => setOpen(false)}
          >
            <ChatIcon className="h-5 w-5 text-[#5cae97]" /> Chat
            {unreadCount > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              handleLogout();
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" /> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
