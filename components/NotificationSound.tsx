'use client';

import { useEffect, useRef } from 'react';

export default function NotificationSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Escucha por mensajes nuevos desde cualquier parte del sistema
    const channel = new BroadcastChannel('chat_channel');

    channel.onmessage = (event) => {
      if (event.data === 'nuevo_mensaje') {
        audioRef.current?.play().catch((err) => {
          console.warn('No se pudo reproducir el sonido:', err);
        });
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  return (
    <audio ref={audioRef} preload="auto">
      <source src="/sounds/notification.mp3" type="audio/mpeg" />
    </audio>
  );
}
