'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AnunciosDeUsuario() {
  const { username } = useParams();
  const router = useRouter();

  const [anuncios, setAnuncios] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      const { data: perfil, error: perfilError } = await supabase
        .from('profiles')
        .select('id, username, nombre, avatar_url, afijo')
        .eq('username', username)
        .single();

      if (perfilError || !perfil) {
        router.push('/criadores');
        return;
      }

      setUser(perfil);

      const { data: anunciosData } = await supabase
        .from('anuncios')
        .select('*')
        .eq('usuario_id', perfil.id)
        .order('created_at', { ascending: false });

      setAnuncios(anunciosData || []);
      setLoading(false);
    };

    fetchData();
  }, [username, router]);

  if (loading) return <div className="p-10 text-center">Cargando anuncios…</div>;

  if (!user) return null;

  const avatar = user.avatar_url
    ? `https://cinsudwupbiqqizvqwij.supabase.co/storage/v1/object/public/avatars/${user.avatar_url}`
    : '/default-avatar.png';

  return (
    <div className="min-h-screen bg-[#DFF6EA] py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Info del criador */}
        <div className="bg-white rounded-3xl shadow p-6 flex flex-col items-center text-center">
          <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover border mb-2" />
          <h1 className="text-2xl font-bold text-[#5cae97]">@{user.username}</h1>
          {user.nombre && <p className="text-gray-600">{user.nombre}</p>}
          {user.afijo && <p className="text-sm text-gray-500">Afijo: {user.afijo}</p>}
          <Link
            href="/criadores"
            className="mt-4 inline-block bg-[#5cae97] text-white font-medium px-6 py-2 rounded-full hover:bg-[#4c9c85] transition"
          >
            ← Volver a criadores
          </Link>
        </div>

        {/* Anuncios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {anuncios.length === 0 ? (
            <div className="bg-white col-span-full p-6 text-center rounded-2xl shadow">
              Este criador aún no tiene anuncios publicados.
            </div>
          ) : (
            anuncios.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition flex flex-col"
              >
                <img
                  src={a.imagen_destacada || '/default-animal.jpg'}
                  alt={a.titulo}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="font-bold text-[#5cae97]">{a.titulo}</h3>
                <p className="text-sm text-gray-600">{a.raza} · {a.provincia}</p>
                <p className="text-sm font-semibold text-gray-800 mt-1">{a.precio} €</p>
                <Link
                  href={`/anuncio/${a.id}`}
                  className="mt-4 text-sm inline-block bg-[#5cae97] text-white text-center px-4 py-2 rounded-full hover:bg-[#4c9c85] transition"
                >
                  Ver más
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
