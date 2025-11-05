'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import Link from 'next/link';

const provincias: string[] = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
  'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria',
  'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Gerona', 'Granada',
  'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares',
  'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lérida',
  'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia',
  'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife', 'Segovia',
  'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia',
  'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
];

const razasPerro = [
  'Affenpinscher', 'Akita Inu', 'Alaskan Malamute', 'American Bully', 'American Pit Bull Terrier', 'Basenji',
  'Basset Hound', 'Beagle', 'Beauceron', 'Bedlington Terrier', 'Bichón Frisé', 'Bichón Maltés', 'Bobtail',
  'Border Collie', 'Bóxer', 'Braco Alemán', 'Braco de Weimar', 'Bulldog Francés', 'Bulldog Inglés',
  'Bullmastiff', 'Cairn Terrier', 'Cane Corso', 'Caniche', 'Carlino (Pug)', 'Cavalier King Charles Spaniel',
  'Chihuahua', 'Chow Chow', 'Cocker Spaniel Americano', 'Cocker Spaniel Inglés', 'Collie', 'Dálmata',
  'Dogo Alemán', 'Dogo Argentino', 'Dogo de Burdeos', 'Doberman', 'Epagneul Bretón', 'Fox Terrier',
  'Galgo Español', 'Golden Retriever', 'Gran Danés', 'Greyhound', 'Husky Siberiano', 'Jack Russell Terrier',
  'Keeshond', 'Labrador Retriever', 'Lhasa Apso', 'Mastín Español', 'Mastín Napolitano', 'Papillón',
  'Pastor Alemán', 'Pastor Australiano', 'Pastor Belga', 'Pastor Blanco Suizo', 'Pequinés', 'Perro de Agua Español',
  'Pinscher Miniatura', 'Pointer', 'Pomerania', 'Rottweiler', 'Salchicha (Teckel)', 'Samoyedo', 'San Bernardo',
  'Scottish Terrier', 'Setter Irlandés', 'Shar Pei', 'Shiba Inu', 'Shih Tzu', 'Staffordshire Bull Terrier',
  'Terranova', 'Vizsla', 'West Highland White Terrier', 'Whippet', 'Yorkshire Terrier'
];

const razasGato = [
  'Abisinio', 'American Curl', 'Angora Turco', 'Azul Ruso', 'Balines', 'Bengalí', 'Bobtail Japonés',
  'Bombay', 'Bosque de Noruega', 'Británico de Pelo Corto', 'Burmés', 'Cartujo (Chartreux)', 'Cornish Rex',
  'Devon Rex', 'Egipcio (Mau Egipcio)', 'Europeo Común', 'Exótico de Pelo Corto', 'Fold Escocés', 'Himalayo',
  'Korat', 'LaPerm', 'Maine Coon', 'Manx', 'Mau Egipcio', 'Munchkin', 'Nebelung', 'Ocicat', 'Oriental',
  'Persa', 'Peterbald', 'Ragdoll', 'Savannah', 'Scottish Fold', 'Selkirk Rex', 'Siamés', 'Siberiano',
  'Singapura', 'Snowshoe', 'Sphynx', 'Tonkinés', 'Toyger', 'Van Turco'
];

export default function EditarPerfil() {
  const user = useUser();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [provincia, setProvincia] = useState('');
  const [afijo, setAfijo] = useState('');
  const [nucleo, setNucleo] = useState('');
  const [tipoAnimal, setTipoAnimal] = useState('');
  const [raza, setRaza] = useState('');
  const [isCriadero, setIsCriadero] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPath, setAvatarPath] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchPerfil = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        toast.error('Error al cargar perfil');
        return;
      }

      setUsername(data.username || '');
      setNombre(data.nombre || '');
      setTelefono(data.telefono || '');
      setProvincia(data.provincia || '');
      setAfijo(data.afijo || '');
      setNucleo(data.nucleo_zoologico || '');
      setTipoAnimal(data.tipo_animal || '');
      setRaza(data.raza_criada || '');
      setIsCriadero(data.is_criadero || false);

   if (data.avatar_url) {
  setAvatarPath(data.avatar_url);
  const timestamp = data.avatar_updated_at
    ? new Date(data.avatar_updated_at).getTime()
    : Date.now();
  setAvatarPreview(`https://cinsudwupbiqqizvqwij.supabase.co/storage/v1/object/public/avatars/${data.avatar_url}?v=${timestamp}`);
}

    };

    fetchPerfil();
  }, [user]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!user) return;
  setLoading(true);

  try {
    let finalAvatarPath = avatarPath;
    let avatarUpdatedAt: string | undefined = undefined;

    if (avatarFile) {
      const ext = avatarFile.name.split('.').pop();
      const filePath = `${user.id}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, { upsert: true });

      if (uploadError) {
        toast.error('No se pudo subir el avatar');
        setLoading(false);
        return;
      }

      finalAvatarPath = filePath;
      avatarUpdatedAt = new Date().toISOString(); // ← forzamos la recarga
    }

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        username,
        nombre,
        telefono,
        provincia,
        afijo: isCriadero ? afijo : null,
        nucleo_zoologico: isCriadero ? nucleo : null,
        tipo_animal: isCriadero ? tipoAnimal : null,
        raza_criada: isCriadero ? raza : null,
        is_criadero: isCriadero,
        avatar_url: finalAvatarPath || null,
        avatar_updated_at: avatarUpdatedAt, // ← nuevo campo
      })
      .eq('id', user.id);

    if (updateError) {
      toast.error('No se pudieron guardar los cambios');
      setLoading(false);
      return;
    }

    toast.success('Perfil actualizado');
    router.push('/mi-perfil');
  } catch (err) {
    console.error(err);
    toast.error('Error inesperado');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-[#DFF6EA] flex flex-col items-center justify-center px-4 py-10">
      <img src="/logo-criador.png" alt="Logo" className="w-20 h-20 mb-6" />

      <form onSubmit={handleUpdate} className="bg-white w-full max-w-md p-6 rounded-3xl shadow-xl space-y-4">
        <h1 className="text-xl font-bold text-center text-[#5cae97]">Editar perfil</h1>

        <input type="file" accept="image/*" onChange={handleAvatarChange} />
        {avatarPreview && (
          <img
            src={avatarPreview}
            alt="Vista previa"
            className="w-[100px] h-[100px] rounded-full border object-cover mx-auto"
          />
        )}

        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" className="w-full border px-4 py-2 rounded-lg" />
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" className="w-full border px-4 py-2 rounded-lg" />
        <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono" className="w-full border px-4 py-2 rounded-lg" />

        <select value={provincia} onChange={(e) => setProvincia(e.target.value)} className="w-full border px-4 py-2 rounded-lg">
          <option value="">Selecciona tu provincia</option>
          {provincias.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isCriadero} onChange={(e) => setIsCriadero(e.target.checked)} />
          Soy criadero
        </label>

        {isCriadero && (
          <>
            <input value={afijo} onChange={(e) => setAfijo(e.target.value)} placeholder="Afijo" className="w-full border px-4 py-2 rounded-lg" />
            <input value={nucleo} onChange={(e) => setNucleo(e.target.value)} placeholder="Núcleo zoológico" className="w-full border px-4 py-2 rounded-lg" />

            <select value={tipoAnimal} onChange={(e) => { setTipoAnimal(e.target.value); setRaza(''); }} className="w-full border px-4 py-2 rounded-lg">
              <option value="">Selecciona tipo</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>

            {tipoAnimal && (
              <select value={raza} onChange={(e) => setRaza(e.target.value)} className="w-full border px-4 py-2 rounded-lg">
                <option value="">Selecciona raza</option>
                {(tipoAnimal === 'perro' ? razasPerro : razasGato).map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            )}
          </>
        )}

        <button type="submit" disabled={loading} className="w-full bg-[#5cae97] text-white font-semibold py-2 rounded-lg">
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </form>

      <Link href="/inicio" className="mt-6 inline-block text-[#5cae97] hover:underline">
        ← Volver al inicio
      </Link>
    </div>
  );
}
