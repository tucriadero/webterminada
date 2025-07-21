'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

type Mensaje = {
  id: string;
  emisor_id: string;
  receptor_id: string;
  contenido: string | null;
  imagen_url: string | null;
  leido: boolean;
  creado_en: string;
};

export default function ChatPage() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const cargarMensajes = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUsuarioId(user.id);

      const { data, error } = await supabase
        .from('mensajes')
        .select('*')
        .or(`emisor_id.eq.${user.id},receptor_id.eq.${user.id}`)
        .order('creado_en', { ascending: true });

      if (data) setMensajes(data);
    };

    cargarMensajes();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Tus mensajes</h1>
      <div className="space-y-2">
        {mensajes.map((m) => (
          <div
            key={m.id}
            className={`p-2 rounded-md max-w-[75%] ${
              m.emisor_id === usuarioId ? 'bg-green-100 self-end' : 'bg-gray-100 self-start'
            }`}
          >
            <p>{m.contenido}</p>
            <span className="text-xs text-gray-500 block">
              {new Date(m.creado_en).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
