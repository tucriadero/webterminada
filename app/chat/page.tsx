'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function Chat() {
  const supabase = createClient();
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [conversaciones, setConversaciones] = useState<
    { usuario_id: string; ultimoMensaje: string; anuncio_id: string | null }[]
  >([]);

  useEffect(() => {
    const cargar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUsuarioId(user.id);

      const { data } = await supabase
        .from('mensajes')
        .select('*')
        .order('creado_en', { ascending: false });

      if (!data) return;

      const mapa = new Map();

      data.forEach((m) => {
        const otro = m.emisor_id === user.id ? m.receptor_id : m.emisor_id;

        if (!mapa.has(otro)) {
          mapa.set(otro, {
            usuario_id: otro,
            ultimoMensaje: m.contenido,
            anuncio_id: m.anuncio_id,
          });
        }
      });

      setConversaciones(Array.from(mapa.values()));
    };

    cargar();
  }, []);

  if (!usuarioId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
        <p className="text-gray-600">Inicia sesión para ver tus conversaciones.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Tus conversaciones</h1>

      {conversaciones.length === 0 ? (
        <p className="text-gray-600">No tienes mensajes aún.</p>
      ) : (
        <div className="space-y-4">
          {conversaciones.map((c) => (
            <Link
              key={c.usuario_id}
              href={`/chat/${c.usuario_id}?anuncio=${c.anuncio_id}`}
              className="block p-4 bg-white rounded shadow hover:bg-green-100"
            >
              <div className="font-semibold text-green-800">
                Conversación con: {c.usuario_id.slice(0, 6)}…
              </div>
              <div className="text-gray-600 text-sm truncate">{c.ultimoMensaje}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
