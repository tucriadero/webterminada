'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function AnuncioPage() {
  const { id } = useParams();
  const router = useRouter();
  const [anuncio, setAnuncio] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnuncio = async () => {
      const { data, error } = await supabase
        .from('anuncios')
        .select('*, profiles(username, nombre, afijo, avatar_url)')
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
        return;
      }
      setAnuncio(data);
      setLoading(false);
    };

    fetchAnuncio();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Cargando anuncio...</div>;
  if (!anuncio) return <div className="p-10 text-center text-red-500">Anuncio no encontrado</div>;

  const {
    titulo,
    descripcion,
    tipo,
    raza,
    provincia,
    precio,
    estado,
    created_at,
    profiles,
    imagen_destacada,
  } = anuncio;

  const fechaPublicacion = new Date(created_at).toLocaleDateString('es-ES');

  const avatarUrl = profiles?.avatar_url
    ? `https://cinsudwupbiqqizvqwij.supabase.co/storage/v1/object/public/avatars/${profiles.avatar_url}`
    : '/default-avatar.png';

  return (
    <div className="min-h-screen bg-[#DFF6EA] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-6 space-y-6">
        <img
          src={imagen_destacada || '/default-animal.jpg'}
          alt={titulo}
          className="w-full h-64 object-cover rounded-2xl"
        />

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#5cae97]">{titulo}</h1>
          <span className="bg-[#e1f7ef] text-[#3e947d] text-sm font-medium px-3 py-1 rounded-full">{estado}</span>
        </div>

        <p className="text-gray-600 whitespace-pre-line">{descripcion}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
          <p><strong>Tipo:</strong> {tipo}</p>
          <p><strong>Raza:</strong> {raza}</p>
          <p><strong>Provincia:</strong> {provincia}</p>
          <p><strong>Precio:</strong> {precio} €</p>
          <p><strong>Publicado el:</strong> {fechaPublicacion}</p>
        </div>

        <div className="border-t pt-4 mt-4 flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={profiles?.username}
            className="w-14 h-14 rounded-full object-cover border"
          />
          <div>
            <p className="text-sm text-gray-600">Criador:</p>
            <p className="font-semibold text-[#5cae97]">@{profiles?.username}</p>
            {profiles?.afijo && <p className="text-xs text-gray-500">Afijo: {profiles.afijo}</p>}
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <Link
            href={`/chat/${profiles?.username}`}
            className="bg-[#5cae97] text-white px-5 py-2 rounded-full font-medium hover:bg-[#4c9c85] transition"
          >
            Chatear
          </Link>

          <button
            className="bg-white text-[#5cae97] border border-[#5cae97] px-5 py-2 rounded-full font-medium hover:bg-[#e8f8f2] transition"
            onClick={() => alert('Añadido a favoritos (próximamente funcional)')}
          >
            ❤️ Guardar
          </button>
        </div>

        <div className="pt-6">
          <Link href="/inicio" className="text-[#5cae97] hover:underline text-sm">← Volver a resultados</Link>
        </div>
      </div>
    </div>
  );
}
