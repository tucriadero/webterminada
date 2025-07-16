"use client";

import Link from 'next/link';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function PublicarAnuncioPage() {
  const [tipo, setTipo] = useState<'perro' | 'gato' | ''>('');
  const [raza, setRaza] = useState('');
  const [provincia, setProvincia] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [cachorros, setCachorros] = useState('');
  const [edad, setEdad] = useState('');
  const [entrega, setEntrega] = useState('');
  const [imagenes, setImagenes] = useState<FileList | null>(null);
  const [cargandoIA, setCargandoIA] = useState(false);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');

  const provincias = [
    "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres",
    "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Girona", "Granada", "Guadalajara",
    "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "A Coruña", "La Rioja", "Las Palmas", "León",
    "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca",
    "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora",
    "Zaragoza", "Ceuta", "Melilla"
  ];

  const razasPerros = [
    "Affenpinscher", "Akita Inu", "Alaskan Malamute", "American Bully", "American Staffordshire Terrier",
    "Basenji", "Basset Hound", "Beagle", "Bearded Collie", "Bedlington Terrier", "Bichón Frisé", "Bichón Maltés",
    "Border Collie", "Boston Terrier", "Boxer", "Braco Alemán", "Bull Terrier", "Bulldog Francés", "Bulldog Inglés",
    "Cairn Terrier", "Caniche (Poodle)", "Carlino (Pug)", "Chihuahua", "Chow Chow", "Cocker Spaniel Inglés",
    "Collie", "Dálmata", "Dogo Alemán", "Dogo Argentino", "Doberman", "Fox Terrier", "Galgo Español", "Golden Retriever",
    "Gran Danés", "Husky Siberiano", "Jack Russell Terrier", "Labrador Retriever", "Lhasa Apso", "Mastín Español",
    "Papillón", "Pastor Alemán", "Pastor Australiano", "Pastor Belga", "Pequinés", "Perro de Agua Español",
    "Perro Lobo Checoslovaco", "Pitbull", "Pointer", "Pomerania", "Rottweiler", "Schnauzer Miniatura", "Setter Irlandés",
    "Shar Pei", "Shiba Inu", "Shih Tzu", "Staffordshire Bull Terrier", "Teckel (Dachshund)", "Terranova", "Vizsla",
    "Weimaraner", "West Highland White Terrier", "Whippet", "Yorkshire Terrier"
  ];

  const razasGatos = [
    "Ragdoll", "Sphynx", "Persa", "Maine Coon", "British Shorthair", "Siamés", "Bengalí", "Azul Ruso", "Abisinio",
    "Exótico de Pelo Corto", "Bombay", "Burmés", "Himalayo", "Korat", "Manx", "Oriental", "Scottish Fold",
    "Selkirk Rex", "Somalí", "Van Turco"
  ];

  const razasDisponibles = tipo === 'perro' ? razasPerros : tipo === 'gato' ? razasGatos : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo.trim() || !descripcion.trim() || !tipo || !raza || !provincia || !cachorros || !edad.trim() || !entrega || !precio.trim() || !imagenes || imagenes.length === 0) {
      alert('Por favor, completa todos los campos antes de publicar el anuncio.');
      return;
    }

    const urls: string[] = [];

    for (let i = 0; i < imagenes.length; i++) {
      const archivo = imagenes[i];
      const nombreArchivo = `anuncio-${Date.now()}-${archivo.name}`;

      const { data: subida, error: errorUpload } = await supabase.storage.from('anuncios').upload(nombreArchivo, archivo);
      if (errorUpload) return alert(`Error al subir imagen: ${errorUpload.message}`);

      const { data: urlData } = supabase.storage.from('anuncios').getPublicUrl(nombreArchivo);
      if (!urlData?.publicUrl) return alert('Error al obtener la URL pública.');

      urls.push(urlData.publicUrl);
    }

    const { error: insertError } = await supabase.from('anuncios').insert({
      titulo, descripcion, tipo, raza, provincia, cachorros, edad, entrega, precio, imagenes: urls,
    });

    if (insertError) return alert('Hubo un error al guardar el anuncio.');

    setMensajeConfirmacion('✅ Tu anuncio ha sido publicado correctamente. ¡Gracias por confiar en TuCriadero!');
  };

  return (
    <main className="bg-[#E8F8F2] min-h-screen px-4 py-10">
      <Link href="/inicio" className="text-[#5cae97] hover:underline text-sm mb-4 inline-block">
        ← Volver a inicio
      </Link>

      <h1 className="text-3xl font-bold text-[#5cae97] mb-6 text-center">
        Publicar un anuncio
      </h1>

      {mensajeConfirmacion && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 border border-green-300 rounded-lg text-center font-medium">
          {mensajeConfirmacion}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Título del anuncio</label>
          <input type="text" className="w-full border px-4 py-2 rounded-lg" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Descripción del animal</label>
          <textarea className="w-full border px-4 py-2 rounded-lg" rows={4} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Tipo de animal</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value as 'perro' | 'gato')} className="w-full border px-4 py-2 rounded-lg">
              <option value="">Seleccionar tipo</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Raza</label>
            <select value={raza} onChange={(e) => setRaza(e.target.value)} className="w-full border px-4 py-2 rounded-lg">
              <option value="">Seleccionar raza</option>
              {razasDisponibles.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Provincia</label>
            <select value={provincia} onChange={(e) => setProvincia(e.target.value)} className="w-full border px-4 py-2 rounded-lg">
              <option value="">Seleccionar provincia</option>
              {provincias.map((prov) => <option key={prov}>{prov}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Cachorros en la camada</label>
            <select value={cachorros} onChange={(e) => setCachorros(e.target.value)} className="w-full border px-4 py-2 rounded-lg">
              <option value="">Seleccionar cantidad</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={String(i + 1)}>{i + 1}</option>
              ))}
              <option value="más de 10">Más de 10</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Edad</label>
            <input type="text" className="w-full border px-4 py-2 rounded-lg" value={edad} onChange={(e) => setEdad(e.target.value)} placeholder="Ej: 2 meses" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Fecha de entrega</label>
            <input type="date" className="w-full border px-4 py-2 rounded-lg" value={entrega} onChange={(e) => setEntrega(e.target.value)} />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Precio (€)</label>
            <input type="text" className="w-full border px-4 py-2 rounded-lg" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Imágenes del animal (puedes subir varias)</label>
          <input type="file" accept="image/*" multiple onChange={(e) => setImagenes(e.target.files)} className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#4c9c85] file:text-white hover:file:bg-[#3b826f]" />
        </div>

        <button type="submit" className="w-full bg-[#4c9c85] hover:bg-[#3b826f] text-white font-semibold py-2 px-4 rounded-lg transition">
          Publicar anuncio
        </button>
      </form>
    </main>
  );
}