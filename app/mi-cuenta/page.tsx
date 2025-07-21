'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

type Perfil = {
  id: string;
  username: string;
  nombre: string | null;
  email?: string | null;
  avatar_url?: string | null;
};

export default function MiCuentaPage() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cargarPerfil = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

     const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', session.user.id)
  .single();

const perfil: Perfil | null = data;

      if (!error) setPerfil(data);
      setLoading(false);
    };

    cargarPerfil();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#DFF6EA] flex items-center justify-center">
        <p className="text-[#5cae97]">Cargando perfil...</p>
      </main>
    );
  }

  if (!perfil) {
    return (
      <main className="min-h-screen bg-[#DFF6EA] flex items-center justify-center">
        <p className="text-red-600">Usuario no encontrado</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#DFF6EA] px-4 py-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg text-center space-y-4">
        <Image
          src={
            typeof perfil.avatar_url === 'string' && perfil.avatar_url !== ''
              ? perfil.avatar_url
              : '/default-avatar.png'
          }
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-full mx-auto object-cover"
          unoptimized
        />
        <h1 className="text-2xl font-bold text-[#5cae97]">
          {perfil.nombre || perfil.username}
        </h1>
        <p>{perfil.email}</p>

        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          <Link href="/editar-perfil" className="text-sm bg-[#5cae97] text-white px-4 py-2 rounded-lg">Editar perfil</Link>
          <Link href="/mis-anuncios" className="text-sm bg-[#5cae97] text-white px-4 py-2 rounded-lg">Mis anuncios</Link>
          <Link href="/anuncio" className="text-sm bg-[#5cae97] text-white px-4 py-2 rounded-lg">Publicar anuncio</Link>
        </div>
      </div>
    </main>
  );
}
