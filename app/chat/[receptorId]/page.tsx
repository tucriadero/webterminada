'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function ChatPage() {
  const supabase = createClient();
  const params = useParams();
  const searchParams = useSearchParams();

  const receptorId = params.receptorId as string;
  const anuncioId = searchParams.get('anuncio');

  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [mensajes, setMensajes] = useState<any[]>([]);
  const [contenido, setContenido] = useState('');

  useEffect(() => {
    let canal: any;

    const cargar = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setUsuarioId(user.id);

      const { data } = await supabase
        .from('mensajes')
        .select('*')
        .order('creado_en', { ascending: true });

      const filtrados = data?.filter(
        (m) =>
          (m.emisor_id === user.id && m.receptor_id === receptorId) ||
          (m.receptor_id === user.id && m.emisor_id === receptorId)
      );

      setMensajes(filtrados || []);

      // ✅ Tiempo real
      canal = supabase
        .channel('chat-channel')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'mensajes',
          },
          (payload) => {
            const nuevo = payload.new;

            const esDeEstaConversacion =
              (nuevo.emisor_id === user.id && nuevo.receptor_id === receptorId) ||
              (nuevo.receptor_id === user.id && nuevo.emisor_id === receptorId);

            if (esDeEstaConversacion) {
              setMensajes((prev) => [...prev, nuevo]);
            }
          }
        )
        .subscribe();
    };

    cargar();

    return () => {
      if (canal) {
        supabase.removeChannel(canal);
      }
    };
  }, [receptorId]);

  const enviar = async () => {
    if (!contenido.trim()) return;

    await fetch('/api/mensajes/enviar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        receptor_id: receptorId,
        contenido,
        anuncio_id: anuncioId,
      }),
    });

    setContenido('');
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Conversación</h1>

      <div className="flex flex-col space-y-2 mb-4">
        {mensajes.map((m) => (
          <div
            key={m.id}
            className={`p-2 rounded-md max-w-[75%] ${
              m.emisor_id === usuarioId
                ? 'bg-green-100 self-end'
                : 'bg-gray-200 self-start'
            }`}
          >
            {m.contenido}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={enviar}
          className="bg-green-600 text-white px-4 rounded"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
