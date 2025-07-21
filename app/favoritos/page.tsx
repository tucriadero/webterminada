'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoritos = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/login';
        return;
      }

      const { data, error } = await supabase
        .from('favoritos')
        .select('anuncio_id, anuncios(*)')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setFavoritos(data.map(f => f.anuncios));
      }

      setLoading(false);
    };

    fetchFavoritos();
  }, []);

  const quitarFavorito = async (anuncioId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { error } = await supabase
      .from('favoritos')
      .delete()
      .match({ user_id: session.user.id, anuncio_id: anuncioId });

    if (!error) {
      setFavoritos((prev) => prev.filter((a) => a.id !== anuncioId));
    }
  };

  return (
    <main className="min-h-screen bg-[#DFF6EA] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-[#5cae97] mb-8">Mis favoritos</h1>

        {loading ? (
          <p className="text-center text-[#5cae97]">Cargando favoritos...</p>
        ) : favoritos.length === 0 ? (
          <p className="text-center text-gray-600">
            Aún no has marcado ningún anuncio como favorito.<br />
            <Link href="/" className="text-[#5cae97] hover:underline mt-2 inline-block">
              ← Volver al inicio
            </Link>
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritos.map((anuncio) => (
              <div key={anuncio.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                {anuncio.imagenes?.[0] && (
                  <Image
                    src={anuncio.imagenes[0]}
                    alt={anuncio.titulo}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#5cae97]">{anuncio.titulo}</h3>
                  <p className="text-sm text-gray-600">{anuncio.descripcion?.slice(0, 90)}...</p>
                  <div className="flex justify-between items-center mt-3">
                    <Link
                      href={`/anuncio/${anuncio.id}`}
                      className="text-sm text-white bg-[#5cae97] hover:bg-[#4a9b86] py-1 px-3 rounded-lg"
                    >
                      Ver
                    </Link>
                    <button
                      onClick={() => quitarFavorito(anuncio.id)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/mi-cuenta" className="text-[#5cae97] hover:underline">
            ← Volver a mi cuenta
          </Link>
        </div>
      </div>
    </main>
  );
}
