'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';

const provincias = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
  'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria',
  'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Gerona', 'Granada',
  'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén',
  'La Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lérida', 'Lugo', 'Madrid',
  'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Pontevedra', 'Salamanca',
  'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria', 'Tarragona',
  'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
];

export default function EditarPerfil() {
  const user = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [provincia, setProvincia] = useState('');
  const [afijo, setAfijo] = useState('');
  const [nucleo, setNucleo] = useState('');
  const [isCriadero, setIsCriadero] = useState(false);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [anunciosCount, setAnunciosCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchPerfil = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        toast.error('Error al cargar perfil');
        return;
      }

      setUsername(data.username || '');
      setNombre(data.nombre || '');
      setTelefono(data.telefono || '');
      setProvincia(data.provincia || '');
      setAfijo(data.afijo || '');
      setNucleo(data.nucleo_zoologico || '');
      setIsCriadero(data.is_criadero || false);
      setAvatarPreview(data.avatar_url || null);
    };

    const fetchAnunciosCount = async () => {
      const { count } = await supabase
        .from('anuncios')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      setAnunciosCount(count || 0);
    };

    fetchPerfil();
    fetchAnunciosCount();
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const eliminarAvatar = async () => {
    if (!user || !avatarPreview) return;

    const ext = avatarPreview.split('.').pop()?.split('?')[0];
    const fileName = `${user.id}.${ext}`;

    const { error: deleteError } = await supabase
      .storage
      .from('avatars')
      .remove([fileName]);

    if (deleteError) {
      toast.error('Error al eliminar avatar');
      return;
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: null })
      .eq('id', user.id);

    if (updateError) {
      toast.error('Error al actualizar perfil');
      return;
    }

    toast.success('Avatar eliminado');
    setAvatarPreview(null);
    setAvatarFile(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .neq('id', user?.id)
      .single();

    if (existing) {
      toast.error('Este nombre de usuario ya está en uso.');
      setLoading(false);
      return;
    }

    let avatar_url = avatarPreview;

    if (avatarFile) {
      const ext = avatarFile.name.split('.').pop();
      const fileName = `${user?.id}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, avatarFile, { upsert: true });

      if (uploadError) {
        toast.error('Error subiendo el avatar');
        setLoading(false);
        return;
      }

      const { data: publicUrl } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      avatar_url = publicUrl.publicUrl;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        username,
        nombre,
        telefono,
        provincia,
        afijo: isCriadero ? afijo : null,
        nucleo_zoologico: isCriadero ? nucleo : null,
        is_criadero: isCriadero,
        avatar_url
      })
      .eq('id', user?.id);

    setLoading(false);

    if (error) {
      toast.error('Error al guardar los cambios');
    } else {
      toast.success('Perfil actualizado correctamente');
      router.push('/inicio');
    }
  };

  return (
    <div className="min-h-screen bg-[#DFF6EA] flex flex-col items-center justify-center px-4 py-10">
      <img src="/logo-criador.png" alt="TuCriadero logo" className="w-20 h-20 mb-6 drop-shadow" />

      {avatarPreview && (
        <div className="relative mb-4">
          <Image
            src={avatarPreview}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full border object-cover mx-auto"
          />
          <button
            onClick={eliminarAvatar}
            type="button"
            className="block text-red-500 text-xs mt-2 mx-auto hover:underline"
          >
            Eliminar avatar
          </button>
        </div>
      )}

      <form
        onSubmit={handleUpdate}
        className="bg-white w-full max-w-lg p-8 rounded-3xl shadow-xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-[#5cae97] text-center">Editar perfil</h1>

        <input type="file" accept="image/*" onChange={handleAvatarChange} className="w-full" />
        <input type="text" placeholder="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#5cae97]" />
        <input type="text" placeholder="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#5cae97]" />
        <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#5cae97]" />
        <select value={provincia} onChange={(e) => setProvincia(e.target.value)} required className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#5cae97]">
          <option value="">Selecciona tu provincia</option>
          {provincias.map((prov) => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isCriadero} onChange={(e) => setIsCriadero(e.target.checked)} />
          Soy criadero
        </label>

        {isCriadero && (
          <>
            <input type="text" placeholder="Afijo" value={afijo} onChange={(e) => setAfijo(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#5cae97]" required />
            <input type="text" placeholder="Núcleo zoológico" value={nucleo} onChange={(e) => setNucleo(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#5cae97]" required />
          </>
        )}

        <button type="submit" disabled={loading} className="w-full bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-3 rounded-lg transition">
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>

      <div className="mt-10 p-4 rounded-2xl border border-[#d6f2e8] shadow bg-[#f5fcfa] text-center max-w-xs w-full">
        <h2 className="text-sm text-gray-500 mb-4">Vista previa pública</h2>

        <div className="flex flex-col items-center">
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt="Avatar preview"
              width={120}
              height={120}
              className="rounded-xl object-cover w-[120px] h-[120px] border"
            />
          ) : (
            <div className="w-[120px] h-[120px] bg-gray-200 rounded-xl flex items-center justify-center text-sm text-gray-500">
              Sin foto
            </div>
          )}

          <p className="mt-4 text-[#5cae97] font-semibold">@{username}</p>
          <p className="text-sm text-gray-600">{nombre}</p>
          {provincia && <p className="text-sm text-gray-500">{provincia}</p>}

          {isCriadero && (
            <>
              <div className="text-xs text-[#3e947d] bg-[#e1f7ef] mt-2 px-3 py-1 rounded-full inline-block">
                🏅 Criador verificado
              </div>
              <p className="text-sm mt-2">🐾 Afijo: <strong>{afijo}</strong></p>
              <p className="text-sm">📋 Núcleo zoológico: <strong>{nucleo}</strong></p>
            </>
          )}

          <p className="mt-2 text-sm text-gray-600">📢 Anuncios publicados: <strong>{anunciosCount}</strong></p>

          <Link
            href={`/perfil/${username}`}
            className="mt-4 bg-[#5cae97] hover:bg-[#4c9c85] text-white text-sm font-medium px-4 py-2 rounded-full transition"
          >
            Ver perfil público
          </Link>

          <Link
            href={`/chat/${username}`}
            className="mt-2 bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] text-sm font-medium px-4 py-2 rounded-full transition"
          >
            Contactar ahora
          </Link>
        </div>
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
