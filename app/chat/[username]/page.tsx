'use client';

import { useEffect, useRef, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Mensaje {
  id: string;
  content: string | null;
  image_url: string | null;
  sender_id: string;
  receiver_id: string;
  inserted_at: string;
  read: boolean;
  reacciones?: { emoji: string; user_id: string }[];
}

const emojis = ['👍', '❤️', '😂', '😮', '😢'];

export default function ChatPage() {
  const user = useUser();
  const { username } = useParams();
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [showPickerId, setShowPickerId] = useState<string | null>(null);
  const [escribiendoOtro, setEscribiendoOtro] = useState(false); // <-- Estado para indicador
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const destinatarioIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user || !username) return;

    const fetchMensajes = async () => {
      const { data: usuarioDestino } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .single();

      if (!usuarioDestino) return;
      destinatarioIdRef.current = usuarioDestino.id; // <-- Guardamos ID destinatario

      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .in('sender_id', [user.id, usuarioDestino.id])
        .in('receiver_id', [user.id, usuarioDestino.id])
        .order('inserted_at');

      if (data) {
        setMensajes(data);

        const mensajesNoLeidos = data.filter(m => m.receiver_id === user.id && !m.read);
        if (mensajesNoLeidos.length > 0) {
          const ids = mensajesNoLeidos.map(m => m.id);
          await supabase.from('messages').update({ read: true }).in('id', ids);
        }
      }
    };

    fetchMensajes();

    const channel = supabase
      .channel(`chat-${username}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMensajes((prev) => [...prev, payload.new as Mensaje]);
      })
      .subscribe();

    // Canal para escuchar typing status
    const typingChannel = supabase
      .channel(`typing-${username}`)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'typing_status',
        filter: `user_id=eq.${destinatarioIdRef.current}`,
      }, (payload) => {
        // Solo actualizamos si el typing es del interlocutor y el target soy yo
        if (payload.new.target_id === user.id) {
          setEscribiendoOtro(payload.new.typing);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(typingChannel);
    };
  }, [user, username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  // Nuevo onChange para input que envía el estado escribiendo
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoMensaje(e.target.value);

    if (!user || !destinatarioIdRef.current) return;

    supabase.from('typing_status').upsert({
      user_id: user.id,
      target_id: destinatarioIdRef.current,
      typing: true,
      updated_at: new Date().toISOString()
    });

    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      supabase.from('typing_status').upsert({
        user_id: user.id,
        target_id: destinatarioIdRef.current!,
        typing: false,
        updated_at: new Date().toISOString()
      });
    }, 2000);
  };

  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() && !imagen) return;

    if (!user || !destinatarioIdRef.current) return;

    let image_url = null;
    if (imagen) {
      const filePath = `${user.id}/${Date.now()}-${imagen.name}`;
      const { error } = await supabase.storage.from('chat').upload(filePath, imagen);
      if (!error) {
        image_url = filePath;
      }
    }

    await supabase.from('messages').insert({
      sender_id: user.id,
      receiver_id: destinatarioIdRef.current,
      content: nuevoMensaje || null,
      image_url,
      read: false,
      reacciones: [],
    });

    setNuevoMensaje('');
    setImagen(null);

    // Enviar typing = false tras enviar mensaje
    supabase.from('typing_status').upsert({
      user_id: user.id,
      target_id: destinatarioIdRef.current,
      typing: false,
      updated_at: new Date().toISOString()
    });
  };

  const manejarReaccion = async (mensajeId: string, emoji: string) => {
    const { data: mensajeActual } = await supabase
      .from('messages')
      .select('reacciones')
      .eq('id', mensajeId)
      .single();

    const filtradas = (mensajeActual?.reacciones || []).filter((r: any) => r.user_id !== user?.id);
    const nuevas = [...filtradas, { emoji, user_id: user!.id }];

    await supabase.from('messages').update({ reacciones: nuevas }).eq('id', mensajeId);
    setMensajes(prev => prev.map(m => m.id === mensajeId ? { ...m, reacciones: nuevas } : m));
    setShowPickerId(null);
  };

  return (
    <div className="min-h-screen bg-[#DFF6EA] p-4 max-w-2xl mx-auto flex flex-col">
      <h1 className="text-xl font-bold text-[#5cae97] mb-1">Conversación con @{username}</h1>

      {/* Indicador escribiendo */}
      {escribiendoOtro && (
        <p className="text-sm text-gray-500 mb-2 italic">Está escribiendo…</p>
      )}

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {mensajes.map((m) => (
          <div
            key={m.id}
            className={`relative max-w-xs px-4 py-2 rounded-2xl shadow text-sm break-words whitespace-pre-wrap cursor-pointer group ${
              m.sender_id === user?.id
                ? 'bg-[#5cae97] text-white self-end ml-auto'
                : 'bg-white text-gray-800 self-start mr-auto'
            }`}
            onContextMenu={(e) => {
              e.preventDefault();
              setShowPickerId(m.id);
            }}
          >
            {m.content && <p>{m.content}</p>}
            {m.image_url && (
              <img
                src={`https://cinsudwupbiqqizvqwij.supabase.co/storage/v1/object/public/chat/${m.image_url}`}
                alt="imagen"
                className="rounded-xl mt-2 max-w-[200px]"
              />
            )}
            <p className="text-xs text-gray-400 mt-1 text-right">
              {new Date(m.inserted_at).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>

            {/* Reacciones existentes */}
            {m.reacciones?.length > 0 && (
              <div className="mt-1 flex gap-1">
                {m.reacciones.map((r, i) => (
                  <span key={i} className="text-sm">{r.emoji}</span>
                ))}
              </div>
            )}

            {/* Picker */}
            {showPickerId === m.id && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white border rounded-full shadow p-1 flex gap-1 z-10">
                {emojis.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => manejarReaccion(m.id, emoji)}
                    className="text-xl hover:scale-110 transition"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white p-3 rounded-xl shadow flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files?.[0] || null)}
          className="text-sm"
        />
        <input
          value={nuevoMensaje}
          onChange={handleInputChange}  // <-- aquí usamos la función con typing status
          placeholder="Escribe un mensaje"
          className="flex-1 border rounded-full px-4 py-2 text-sm"
        />
        <button
          onClick={enviarMensaje}
          className="bg-[#5cae97] text-white rounded-full px-4 py-2 text-sm hover:bg-[#4c9c85]"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
