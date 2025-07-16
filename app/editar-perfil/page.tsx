'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function EditarPerfilPage() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<any>(null);
  const [cargando, setCargando] = useState(true);
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [subiendoAvatar, setSubiendoAvatar] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fetchPerfil = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user) {
        router.push('/inicio');
        return;
      }

      const userId = session.user.id;

      const { data, error } = await supabase
        .from('profiles')
        .select('nombre_completo, avatar_url, id')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error al obtener perfil:', error.message);
      } else {
        setPerfil(data);
        setNombreCompleto(data.nombre_completo || '');
      }

      setCargando(false);
    };

    fetchPerfil();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const subirAvatar = async (file: File, userId: string) => {
    try {
      setSubiendoAvatar(true);
      setErrorMsg('');

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (error: any) {
      setErrorMsg('Error al subir la imagen de perfil: ' + error.message);
      return null;
    } finally {
      setSubiendoAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!perfil) return;

    let avatarUrl = perfil.avatar_url || '';

    if (avatarFile) {
      const newAvatarUrl = await subirAvatar(avatarFile, perfil.id);
      if (!newAvatarUrl) return; // error subiendo
      avatarUrl = newAvatarUrl;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        nombre_completo: nombreCompleto,
        avatar_url: avatarUrl,
      })
      .eq('id', perfil.id);

    if (error) {
      setErrorMsg('Error al actualizar perfil: ' + error.message);
    } else {
      router.push('/mi-perfil');
    }
  };

  if (cargando) {
    return <div className="p-10 text-center text-[#5cae97]">Cargando perfil...</div>;
  }

  return (
    <div className="min-h-screen bg-[#E8F8F2] p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-[#5cae97] mb-6">Editar Perfil</h1>

        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          <div>
            <label className="block font-semibold mb-1">Nombre completo</label>
            <input
              type="text"
              value={nombreCompleto}
              onChange={e => setNombreCompleto(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Avatar</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full" />
          </div>

          {errorMsg && <p className="text-red-600 text-center">{errorMsg}</p>}

          <button
            type="submit"
            disabled={subiendoAvatar}
            className="bg-[#5cae97] hover:bg-[#4c9c85] text-white font-semibold py-2 px-6 rounded-lg transition disabled:opacity-50"
          >
            {subiendoAvatar ? 'Subiendo avatar...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  );
}
