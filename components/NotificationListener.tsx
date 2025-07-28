'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';

export default function NotificationListener() {
  const user = useUser();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('mensajes_nuevos')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`,
        },
        (payload) => {
          const nuevoMensaje = payload.new;

          // 🔔 Lanza el evento de sonido
          const bc = new BroadcastChannel('chat_channel');
          bc.postMessage('nuevo_mensaje');

          // Aquí puedes añadir más lógica si quieres (toast, badge, etc.)
          console.log('📩 Nuevo mensaje recibido:', nuevoMensaje);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return null;
}
