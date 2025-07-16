'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export default function PerfilPage() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<any>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        router.push('/inicio');
        return;
      }

      const userId = session.user.id;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error al obtener perfil:', error.message);
      } else {
        setPerfil(data);
      }

      setCargando(false);
    };

    fetchPerfil();
  }, [router]);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    router.push('/inicio');
  };

  if (cargando) {
    return (
      <div className="p-10 text-center text-[#5cae97]">
        Cargando perfil...
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="p-10 text-center text-red-500">
        No se pudo cargar tu perfil.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E8F8F2] p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

        {/* Botón volver */}
        <button
          onClick={() => router.push('/inicio')}
          className="mb-4 text-[#5cae97] hover:text-[#4c9c85] font-semibold underline"
        >
          ← Volver al inicio
        </button>

        {/* Avatar grande */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#5cae97]">
            <Image
              src={perfil.avatar_url || '/avatar-placeholder.png'}
              alt="Avatar"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#5cae97] mb-6 text-center">
          {perfil.nombre_completo || 'Sin nombre'}
        </h1>

        <div className="space-y-4 text-gray-700 mb-8 text-center">
          <p><strong>Email:</strong> {perfil.email || '—'}</p>
          <p><strong>Teléfono:</strong> {perfil.telefono || '—'}</p>
          <p><strong>Provincia:</strong> {perfil.provincia || '—'}</p>
          <p><strong>Afijo:</strong> {perfil.afijo || '—'}</p>
          <p><strong>Núcleo Zoológico:</strong> {perfil.nucleo || '—'}</p>
        </div>

        <div className="flex justify-center gap-6">
          <button
            className="bg-[#5cae97] hover:bg-[#4c9c85] text-white font-semibold py-3 px-8 rounded-lg transition"
            onClick={() => router.push('/editar-perfil')}
          >
            Editar perfil
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-lg transition"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
