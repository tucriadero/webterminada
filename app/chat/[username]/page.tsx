'use client';

import { useEffect, useRef, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Perfil = {
  id: string;
  username: string;
  avatar_url: string;
};

export default function ChatPage() {
  const user = useUser();
  const router = useRouter();
  const { username } = useParams();
  const [perfilDestino, setPerfilDestino] = useState<Perfil | null>(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [imagenFile, setImagenFile] = useState<File | null>(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (!user || !username) return;

    const fetchUsuarioDestino = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .eq('username', username)
        .single();

      if (error || !data) {
        toast.error('Usuario no encontrado');
        router.push('/chat');
        return;
      }

      setPerfilDestino(data);

      const { data: mensajesData, error: mensajesError } = await supabase
        .from('mensajes')
        .select('*')
        .or(`emisor_id.eq.${user.id},receptor_id.eq.${user.id}`)
        .order('created_at', { ascending: true });

      if (!mensajesError) {
        const filtrados = mensajesData.filter(
          (msg) =>
            (msg.emisor_id === user.id && msg.receptor_id === data.id) ||
            (msg.emisor_id === data.id && msg.receptor_id === user.id)
        );

        setMensajes(filtrados);

        const noLeidos = filtrados.filter(
          (msg) => msg.receptor_id === user.id && !msg.leido
        );

        if (noLeidos.length > 0) {
          const ids = noLeidos.map((m) => m.id);
          await supabase.from('mensajes').update({ leido: true }).in('id', ids);
        }
      }

      supabase
        .channel(`chat:${user.id}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'mensajes' },
          (payload) => {
            const nuevo = payload.new;
            if (
              (nuevo.emisor_id === user.id && nuevo.receptor_id === data.id) ||
              (nuevo.receptor_id === user.id && nuevo.emisor_id === data.id)
            ) {
              setMensajes((prev) => [...prev, nuevo]);
              if (nuevo.receptor_id === user.id) {
                supabase.from('mensajes').update({ leido: true }).eq('id', nuevo.id);
              }
            }
          }
        )
        .subscribe();
    };

    fetchUsuarioDestino();
  }, [user, username]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;

    const { error } = await supabase.from('mensajes').insert({
      emisor_id: user.id,
      receptor_id: perfilDestino.id,
      contenido: nuevoMensaje,
    });

    if (!error) setNuevoMensaje('');
    else toast.error('Error al enviar mensaje');
  };

  const enviarImagen = async () => {
    if (!imagenFile || !user) return;

    const ext = imagenFile.name.split('.').pop();
    const fileName = `${Date.now()}-${user.id}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('chat-media')
      .upload(fileName, imagenFile);

    if (uploadError) {
      toast.error('Error subiendo imagen');
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from('chat-media')
      .getPublicUrl(fileName);

    await supabase.from('mensajes').insert({
      emisor_id: user.id,
      receptor_id: perfilDestino.id,
      contenido: null,
      imagen_url: publicUrl.publicUrl,
      leido: false,
    });

    setImagenFile(null);
  };

  return (
    <div className="min-h-screen bg-[#DFF6EA] py-4 px-4">
      <div className="max-w-xl mx-auto">
        <img
          src="/logo-criador.png"
          alt="TuCriadero"
          className="w-16 h-16 mx-auto mb-4 drop-shadow"
        />

        <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center gap-4">
          <img
            src={perfilDestino?.avatar_url || '/avatar-default.png'}
            alt={perfilDestino?.username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <h2 className="text-[#5cae97] font-semibold text-lg">@{perfilDestino?.username}</h2>
        </div>

        <div
          ref={chatRef}
          className="bg-white rounded-xl shadow h-[400px] overflow-y-auto p-4 mb-4 space-y-2"
        >
          {mensajes.map((m) => (
            <div
              key={m.id}
              className={`max-w-[75%] px-4 py-2 rounded-xl text-sm shadow ${
                m.emisor_id === user.id
                  ? 'bg-[#d2eee2] ml-auto text-right'
                  : 'bg-gray-100'
              }`}
            >
              {m.imagen_url && (
                <img
                  src={m.imagen_url}
                  alt="Imagen"
                  className="rounded-lg max-w-full mb-1"
                />
              )}
              {m.contenido}
            </div>
          ))}
        </div>

        <form onSubmit={enviarMensaje} className="flex gap-2 mb-2">
          <input
            type="text"
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-grow px-4 py-2 border rounded-full"
          />
          <button
            type="submit"
            className="bg-[#5cae97] text-white px-4 py-2 rounded-full hover:bg-[#4c9c85]"
          >
            Enviar
          </button>
        </form>

        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImagenFile(file);
            }}
            className="w-full"
          />

          {imagenFile && (
            <button
              type="button"
              onClick={enviarImagen}
              className="w-full bg-[#5cae97] text-white px-4 py-2 rounded-lg mt-2 hover:bg-[#4c9c85]"
            >
              Enviar imagen
            </button>
          )}
        </div>

        <Link
          href="/chat"
          className="block mt-6 text-center bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] font-medium px-6 py-2 rounded-full shadow transition mx-auto w-fit"
        >
          ← Volver a conversaciones
        </Link>
      </div>
    </div>
  );
}
