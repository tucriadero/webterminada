// components/NotificationListener.tsx
'use client';

import { useEffect } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function NotificationListener() {
  const user = useUser();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`mensajes-${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `receiver_id=eq.${user.id}`,
        },
        (payload) => {
          toast.success('💬 Nuevo mensaje recibido');

          const audio = new Audio('/sounds/notification.mp3');
          audio.play().catch(() => {});
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return null;
}
