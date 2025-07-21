'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import es from 'date-fns/locale/es';

export default function ChatInbox() {
  const user = useUser();
  const [conversaciones, setConversaciones] = useState([]);

  useEffect(() => {
    if (!user) return;

    const cargarConversaciones = async () => {
      const { data: mensajes } = await supabase
        .from('mensajes')
        .select('*')
        .or(`emisor_id.eq.${user.id},receptor_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      const usuariosMap = new Map();

      mensajes.forEach((m) => {
        const otroId = m.emisor_id === user.id ? m.receptor_id : m.emisor_id;
        if (!usuariosMap.has(otroId)) {
          usuariosMap.set(otroId, []);
        }
        usuariosMap.get(otroId).push(m);
      });

      const perfiles = [];

      for (const [id, mensajesUsuario] of usuariosMap.entries()) {
        const ultimo = mensajesUsuario[0];

        const { data: perfil } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', id)
          .single();

        const noLeidos = mensajesUsuario.filter(
          (m) => m.receptor_id === user.id && !m.leido
        ).length;

        perfiles.push({
          id,
          username: perfil?.username || 'usuario',
          avatar: perfil?.avatar_url || '/avatar-default.png',
          ultimoMensaje: ultimo,
          noLeidos,
        });
      }

      setConversaciones(perfiles);
    };

    cargarConversaciones();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#DFF6EA] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <img
          src="/logo-criador.png"
          alt="TuCriadero"
          className="w-16 h-16 mx-auto mb-6 drop-shadow"
        />

        <h1 className="text-2xl font-bold text-[#5cae97] mb-4 text-center">
          Tus conversaciones
        </h1>

        <div className="space-y-4">
          {conversaciones.map((c) => (
            <Link
              key={c.id}
              href={`/chat/${c.username}`}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:bg-gray-50 transition"
            >
              <img
                src={c.avatar}
                alt={c.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h2 className="text-[#5cae97] font-semibold">@{c.username}</h2>
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(c.ultimoMensaje.created_at), {
                      locale: es,
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-700 truncate">
                  {c.ultimoMensaje.contenido}
                  {c.ultimoMensaje.emisor_id === user.id && (
                    <span className="ml-2 text-gray-400">✔️</span>
                  )}
                </p>
              </div>
              {c.noLeidos > 0 && (
                <div className="bg-[#5cae97] text-white text-xs rounded-full px-2 py-1">
                  {c.noLeidos}
                </div>
              )}
            </Link>
          ))}
        </div>

        <Link
          href="/inicio"
          className="block mt-10 text-center bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] font-medium px-6 py-2 rounded-full shadow transition mx-auto w-fit"
        >
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}
