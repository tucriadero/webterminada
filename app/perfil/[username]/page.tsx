'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import toast from 'react-hot-toast';

export default function PerfilPublico() {
  const { username } = useParams();
  const router = useRouter();
  const user = useUser();

  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const fetchPerfil = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        setPerfil(null);
        setLoading(false);
      } else {
        setPerfil(data);
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [user, username, router]);

  if (loading) return <div className="p-10 text-center">Cargando perfil...</div>;

  if (!perfil) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Usuario no encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DFF6EA] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center space-y-4">
        <div className="flex justify-center">
          {perfil.avatar_url ? (
            <Image
              src={perfil.avatar_url}
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-full object-cover border"
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              Sin foto
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-[#5cae97]">@{perfil.username}</h2>

        {perfil.nombre && <p className="text-gray-700">{perfil.nombre}</p>}
        {perfil.provincia && <p className="text-sm text-gray-500">{perfil.provincia}</p>}

        {perfil.telefono && (
          <p className="text-sm text-gray-600">
            📞 <span className="font-medium">{perfil.telefono}</span>
          </p>
        )}

        {perfil.is_criadero && (
          <>
            <div className="inline-block bg-[#e1f7ef] text-[#3e947d] text-xs font-medium px-3 py-1 rounded-full">
              🏅 Criador verificado
            </div>
            <p className="text-sm mt-2">🐾 Afijo: <strong>{perfil.afijo}</strong></p>
            <p className="text-sm">📋 Núcleo zoológico: <strong>{perfil.nucleo_zoologico}</strong></p>
<Link
  href={`/anuncios?criador=${perfil.username}`}
  className="inline-block mt-4 bg-[#5cae97] hover:bg-[#4c9c85] text-white font-medium px-6 py-2 rounded-full transition"
>
  Ver anuncios publicados
</Link>

          </>
        )}
      </div>
    </div>
  );
}
