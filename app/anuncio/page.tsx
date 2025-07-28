'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function PublicarAnuncioPage() {
  const user = useUser();
  const router = useRouter();
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [tipo, setTipo] = useState('');
  const [raza, setRaza] = useState('');
  const [provincia, setProvincia] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cachorros, setCachorros] = useState('');
  const [edad, setEdad] = useState('');
  const [entrega, setEntrega] = useState('');
  const [estado, setEstado] = useState('Publicado');
  const [imagenes, setImagenes] = useState<FileList | null>(null);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');

  const provincias = [
    'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
    'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
    'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León',
    'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Pontevedra', 'Salamanca',
    'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia',
    'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
  ];

  const estados = ['Publicado', 'Reservado', 'Vendido', 'Archivado'];

  const razasPerros = ["Affenpinscher", "Akita Inu", "Alaskan Malamute", "American Bully", "American Staffordshire Terrier", "Basenji", "Basset Hound", "Beagle", "Bearded Collie", "Bedlington Terrier", "Bichón Frisé", "Bichón Maltés", "Border Collie", "Boston Terrier", "Boxer", "Braco Alemán", "Bull Terrier", "Bulldog Francés", "Bulldog Inglés", "Cairn Terrier", "Caniche (Poodle)", "Carlino (Pug)", "Chihuahua", "Chow Chow", "Cocker Spaniel Inglés", "Collie", "Dálmata", "Dogo Alemán", "Dogo Argentino", "Doberman", "Fox Terrier", "Galgo Español", "Golden Retriever", "Gran Danés", "Husky Siberiano", "Jack Russell Terrier", "Labrador Retriever", "Lhasa Apso", "Mastín Español", "Papillón", "Pastor Alemán", "Pastor Australiano", "Pastor Belga", "Pequinés", "Perro de Agua Español", "Perro Lobo Checoslovaco", "Pitbull", "Pointer", "Pomerania", "Rottweiler", "Schnauzer Miniatura", "Setter Irlandés", "Shar Pei", "Shiba Inu", "Shih Tzu", "Staffordshire Bull Terrier", "Teckel (Dachshund)", "Terranova", "Vizsla", "Weimaraner", "West Highland White Terrier", "Whippet", "Yorkshire Terrier"];

  const razasGatos = ["Ragdoll", "Sphynx", "Persa", "Maine Coon", "British Shorthair", "Siamés", "Bengalí", "Azul Ruso", "Abisinio", "Exótico de Pelo Corto", "Bombay", "Burmés", "Himalayo", "Korat", "Manx", "Oriental", "Scottish Fold", "Selkirk Rex", "Somalí", "Van Turco"];

  const razasDisponibles = tipo === 'perro' ? razasPerros : tipo === 'gato' ? razasGatos : [];

useEffect(() => {
  if (!user) return;

  const fetchPerfil = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('nombre, username, afijo, nucleo_zoologico, is_criadero')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error al obtener el perfil:', error);
    }

    setPerfil(data);
    setLoading(false);
  };

  fetchPerfil();
}, [user]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagenes || imagenes.length === 0) return alert('Debes subir al menos una imagen.');

    const urls: string[] = [];
    for (let i = 0; i < imagenes.length; i++) {
      const archivo = imagenes[i];
      const nombreArchivo = `anuncio-${Date.now()}-${archivo.name}`;
      const { error: errorUpload } = await supabase.storage.from('anuncios').upload(nombreArchivo, archivo);
      if (errorUpload) return alert(`Error al subir imagen: ${errorUpload.message}`);
      const { data: urlData } = supabase.storage.from('anuncios').getPublicUrl(nombreArchivo);
      if (!urlData?.publicUrl) return alert('Error al obtener la URL pública.');
      urls.push(urlData.publicUrl);
    }

    const { error: insertError } = await supabase.from('anuncios').insert({
      titulo,
      descripcion,
      tipo,
      raza,
      provincia,
      cachorros,
      edad,
      entrega,
      precio,
      estado,
      imagenes: urls,
      user_id: user?.id,
      afijo: perfil?.afijo || null,
      nucleo_zoologico: perfil?.nucleo_zoologico || null,
    });

    if (insertError) return alert('Hubo un error al guardar el anuncio.');
    setMensajeConfirmacion('✅ Tu anuncio ha sido publicado correctamente. ¡Gracias por confiar en TuCriadero!');
  };

  if (loading) return <div className="p-10 text-center text-[#5cae97]">Cargando...</div>;

  if (!perfil?.is_criadero) {
    return (
      <main className="min-h-screen bg-[#E8F8F2] px-4 py-10 text-center">
        <img src="/logo-criador.png" alt="TuCriadero logo" className="w-16 h-16 mx-auto mb-6" />
        <h2 className="text-xl font-semibold text-[#5cae97]">
  Solo los criadores verificados pueden publicar anuncios.
</h2>
<p className="mt-2 text-[#5cae97] text-sm max-w-md mx-auto">
  Para publicar un anuncio, debes editar tu perfil y activar la opción <strong>"Soy criador"</strong>. 
  Ve a <Link href="/editar-perfil" className="underline text-[#4c9c85] hover:text-[#3a8773]">Editar perfil</Link>, marca la casilla correspondiente y guarda los cambios.
</p>
        <Link href="/inicio" className="mt-6 inline-block text-[#5cae97] underline">
          ← Volver a inicio
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#E8F8F2] px-4 py-10">
      <img src="/logo-criador.png" alt="TuCriadero logo" className="w-16 h-16 mx-auto mb-6" />

      <h1 className="text-3xl font-bold text-[#5cae97] mb-6 text-center">Publicar un anuncio</h1>

      {mensajeConfirmacion && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-lg text-center font-medium">
          {mensajeConfirmacion}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
        <input type="text" placeholder="Título del anuncio" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required />
        <textarea placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required />

        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required>
          <option value="">Selecciona tipo</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
        </select>

        <select value={raza} onChange={(e) => setRaza(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required>
          <option value="">Selecciona la raza</option>
          {razasDisponibles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

<select value={provincia} onChange={(e) => setProvincia(e.target.value)} className="w-full px-4 py-3 border rounded-lg" required>
  <option value="">Selecciona provincia</option>
  {provincias.map((prov) => <option key={prov} value={prov}>{prov}</option>)}
</select>

<div className="mb-4">
  <label htmlFor="edad" className="block text-sm font-medium text-gray-700 mb-1">
    Edad (opcional)
  </label>
  <input
    type="text"
    id="edad"
    name="edad"
    placeholder="Ej: 8 semanas, 2 meses, recién nacidos..."
    value={edad}
    onChange={(e) => setEdad(e.target.value)}
    className="w-full px-4 py-3 border rounded-lg text-gray-700"
  />
</div>


<select
  value={cachorros}
  onChange={(e) => setCachorros(e.target.value)}
  className="w-full px-4 py-3 border rounded-lg"
  required
>
  <option value="">Número de cachorros</option>
  {[...Array(10)].map((_, i) => (
    <option key={i + 1} value={i + 1}>{i + 1}</option>
  ))}
</select>

<div className="mb-4">
  <label htmlFor="fechaEntrega" className="block text-sm font-medium text-gray-700 mb-1">
    Fecha de entrega
  </label>
  <input
    type="date"
    id="fechaEntrega"
    name="fechaEntrega"
    value={entrega}
    onChange={(e) => setEntrega(e.target.value)}
    className="w-full px-4 py-3 border rounded-lg text-gray-700"
    required
  />
</div>


<input
  type="number"
  placeholder="Precio (€)"
  value={precio}
  onChange={(e) => setPrecio(e.target.value)}
  className="w-full px-4 py-3 border rounded-lg"
  required
/>

<select value={estado} onChange={(e) => setEstado(e.target.value)} className="w-full px-4 py-3 border rounded-lg">
  {estados.map((e) => <option key={e}>{e}</option>)}
</select>

<input
  type="file"
  accept="image/*"
  multiple
  onChange={(e) => setImagenes(e.target.files)}
  className="w-full"
  required
/>

<button type="submit" className="w-full bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-3 rounded-lg transition">
  Publicar anuncio
</button>


      </form>

      <div className="flex justify-center mt-6">
        <Link href="/inicio" className="inline-block bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] font-medium px-6 py-2 rounded-full transition duration-200 shadow-sm">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}
