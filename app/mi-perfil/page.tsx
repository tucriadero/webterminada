'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

type Perfil = {
  id: string;
  username: string;
  nombre: string | null;
  telefono?: string | null;
  provincia?: string | null;
  afijo?: string | null;
  nucleo_zoologico?: string | null;
  is_criadero?: boolean;
  avatar_url?: string | null;
};

export default function MiPerfil() {
  const user = useUser();
  const router = useRouter();
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [loading, setLoading] = useState(true);
  const [subiendoAvatar, setSubiendoAvatar] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchPerfil = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        setPerfil(null);
      } else {
        setPerfil(data as Perfil);
      }

      setLoading(false);
    };

    fetchPerfil();
  }, [user]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setSubiendoAvatar(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`; // Nombre único
    console.log('Subiendo archivo:', fileName);

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.log('Error al subir:', uploadError);
      toast.error('Error al subir el avatar');
      setSubiendoAvatar(false);
      return;
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
    const publicUrlConTimestamp = `${data.publicUrl}?t=${Date.now()}`;

    console.log('URL pública:', publicUrlConTimestamp);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrlConTimestamp })
      .eq('id', user.id);

    if (updateError) {
      console.log('Error al actualizar perfil:', updateError);
      toast.error('Error al actualizar el perfil');
    } else {
      toast.success('Avatar actualizado');
      setPerfil(prev => prev ? { ...prev, avatar_url: publicUrlConTimestamp } : prev);
    }

    setSubiendoAvatar(false);
  };

  // Botón para recargar perfil manualmente y forzar refresco
  const recargarPerfil = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (!error && data) setPerfil(data as Perfil);
    setLoading(false);
  };

  useEffect(() => {
    if (user === null) router.push('/login');
  }, [user]);

  if (!user) return null;
  if (loading) return <div className="p-10 text-center">Cargando perfil...</div>;
  if (!perfil) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Usuario no encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#DFF6EA] flex flex-col items-center justify-center px-4 py-10">
      <img src="/logo-criador.png" alt="TuCriadero logo" className="w-20 h-20 mb-6 drop-shadow" />

      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center space-y-4">
        <div className="relative flex justify-center">
          <label htmlFor="avatar-upload" className="cursor-pointer group relative">
            {subiendoAvatar ? (
              <div className="w-[100px] h-[100px] rounded-full bg-gray-100 flex items-center justify-center animate-pulse">
                <svg className="w-6 h-6 text-[#5cae97] animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
              </div>
            ) : (
              <Image
                key={perfil?.avatar_url}
                src={perfil?.avatar_url || '/default-avatar.png'}
                alt="Avatar"
                width={100}
                height={100}
                unoptimized
                priority
                className="rounded-full object-cover border hover:opacity-80 transition"
              />
            )}

            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            {!subiendoAvatar && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs text-[#5cae97] opacity-0 group-hover:opacity-100 transition">
                Cambiar foto
              </div>
            )}
          </label>
        </div>

        <button
          onClick={recargarPerfil}
          className="mt-2 px-3 py-1 bg-[#5cae97] text-white rounded"
        >
          Recargar perfil
        </button>

        <h2 className="text-2xl font-bold text-[#5cae97]">@{perfil.username}</h2>
        <p className="text-gray-700">{perfil.nombre}</p>
        <p className="text-sm text-gray-500">{perfil.provincia}</p>

        {perfil.telefono && (
          <p className="text-sm text-gray-600">
            📞 <span className="font-medium">{perfil.telefono}</span>
          </p>
        )}

        {perfil.is_criadero && (
          <>
            <div className="inline-block bg-[#e1f7ef] text-[#3e947d] text-xs font-medium px-3 py-1 rounded-full">
              🏅 Criador verificado
            </div>
            <p className="text-sm mt-2">
              🐾 Afijo: <strong>{perfil.afijo}</strong>
            </p>
            <p className="text-sm">
              📋 Núcleo zoológico: <strong>{perfil.nucleo_zoologico}</strong>
            </p>
          </>
        )}

        <Link
          href="/editar-perfil"
          className="inline-block mt-4 bg-[#5cae97] hover:bg-[#4c9c85] text-white font-medium px-6 py-2 rounded-full transition"
        >
          Editar perfil
        </Link>
      </div>

      <Link
        href="/inicio"
        className="mt-6 inline-block bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] font-medium px-6 py-2 rounded-full transition duration-200 shadow-sm"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}
