'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

export default function VistaAnuncio() {
  const { id } = useParams();
  const router = useRouter();
  const [anuncio, setAnuncio] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchAnuncio = async () => {
      const { data, error } = await supabase
        .from('anuncios')
        .select('*, profiles(username, nombre, avatar_url, afijo, nucleo_zoologico, is_criadero)')
        .eq('id', id)
        .single();

      if (error) return;
      setAnuncio(data);
    };

    fetchAnuncio();
  }, [id]);

  if (!anuncio) return <p className="text-center py-10">Cargando anuncio...</p>;

  return (
    <main className="min-h-screen bg-[#DFF6EA] px-4 py-6">
      <div className="flex justify-center mb-6">
        <img src="/logo-criador.png" alt="TuCriadero" className="h-16" />
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6">
        {anuncio.imagenes?.[0] && (
          <Image
            src={anuncio.imagenes[0]}
            alt={anuncio.titulo}
            width={800}
            height={500}
            className="w-full rounded-xl object-cover mb-4"
          />
        )}

        <h1 className="text-2xl font-bold text-[#5cae97] mb-2">{anuncio.titulo}</h1>
        <p className="text-sm text-gray-600 mb-1">📍 {anuncio.provincia} · 🐾 {anuncio.raza}</p>
        <p className="text-sm text-gray-600 mb-1">🍼 Edad: {anuncio.edad} · 🐶 Cachorros: {anuncio.numero_cachorros}</p>
        <p className="text-sm text-gray-600 mb-1">💰 Precio: {anuncio.precio}€</p>
        <p className="text-sm text-gray-600 mb-1">📦 Fecha de entrega: {anuncio.entrega}</p>
        <p className="text-sm text-gray-600 mb-1">🗓 Publicado: {format(new Date(anuncio.created_at), 'PPP', { locale: es })}</p>
        <p className="text-sm text-gray-600 mb-4">📌 Estado: <strong>{anuncio.estado}</strong></p>

        <div className="flex items-center gap-4 mb-6">
          {anuncio.profiles?.avatar_url && (
            <Image
              src={anuncio.profiles.avatar_url}
              alt={anuncio.profiles.username}
              width={50}
              height={50}
              className="rounded-full object-cover border"
            />
          )}
          <div>
            <p className="font-semibold">{anuncio.profiles?.username}</p>
            {anuncio.profiles?.is_criadero && (
              <>
                <p className="text-sm text-gray-600">🏅 Criador verificado</p>
                <p className="text-sm">🐾 Afijo: <strong>{anuncio.profiles.afijo}</strong></p>
                <p className="text-sm">📋 Núcleo zoológico: <strong>{anuncio.profiles.nucleo_zoologico}</strong></p>
              </>
            )}
          </div>
        </div>

        <button
          onClick={() => router.push(`/chat/${anuncio.profiles?.username}`)}
          className="bg-[#5cae97] hover:bg-[#4c9c85] text-white px-6 py-2 rounded-full font-medium mb-6"
        >
          Contactar
        </button>

        <div className="text-center">
          <Link
            href="/inicio"
            className="inline-block bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] font-medium px-6 py-2 rounded-full shadow-sm"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
