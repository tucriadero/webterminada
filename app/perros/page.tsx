'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

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

const provincias = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
  'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
  'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León',
  'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Pontevedra', 'Salamanca',
  'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia',
  'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
];

export default function PaginaPerros() {
  const [anuncios, setAnuncios] = useState<any[]>([]);
  const [razaFiltro, setRazaFiltro] = useState('');
  const [provinciaFiltro, setProvinciaFiltro] = useState('');

  useEffect(() => {
    const fetchAnuncios = async () => {
      const { data, error } = await supabase
        .from('anuncios')
        .select('*, profiles(username, nombre, is_criadero, afijo, nucleo_zoologico, avatar_url)')
        .eq('tipo', 'perro')
        .eq('estado', 'Publicado')
        .order('created_at', { ascending: false });

      if (!error) {
        setAnuncios(data);
      }
    };
    fetchAnuncios();
  }, []);

  const anunciosFiltrados = anuncios.filter((anuncio) => {
    return (
      (!razaFiltro || anuncio.raza === razaFiltro) &&
      (!provinciaFiltro || anuncio.provincia === provinciaFiltro)
    );
  });

  return (
    <main className="min-h-screen bg-[#DFF6EA] px-4 py-8">
      <div className="flex justify-center mb-6">
        <img src="/logo-criador.png" alt="TuCriadero" className="h-16" />
      </div>

      <h1 className="text-2xl font-bold text-[#5cae97] text-center mb-6">Anuncios de Perros</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select value={razaFiltro} onChange={(e) => setRazaFiltro(e.target.value)} className="px-4 py-3 rounded-xl border w-72 shadow-sm">
          <option value="">🐾 Filtrar por raza</option>
          {razasPerros.map((r) => <option key={r}>{r}</option>)}
        </select>
        <select value={provinciaFiltro} onChange={(e) => setProvinciaFiltro(e.target.value)} className="px-4 py-3 rounded-xl border w-72 shadow-sm">
          <option value="">📍 Filtrar por provincia</option>
          {provincias.map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {anunciosFiltrados.map((anuncio) => (
          <div key={anuncio.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            {anuncio.imagenes?.[0] && (
              <Image
                src={anuncio.imagenes[0]}
                alt={anuncio.titulo}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-[#5cae97]">{anuncio.titulo}</h2>
              <p className="text-sm text-gray-600">{anuncio.raza} · {anuncio.provincia}</p>
              <p className="text-sm mt-2">
                Criador: <strong>{anuncio.profiles?.username}</strong>
                {anuncio.profiles?.is_criadero && <span className="ml-1 text-blue-500">✔️</span>}
              </p>
              <Link
                href={`/anuncio/${anuncio.id}`}
                className="inline-block mt-3 text-sm bg-[#5cae97] hover:bg-[#4c9c85] text-white px-4 py-2 rounded-full"
              >
                Ver más
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href="/inicio" className="inline-block bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] font-medium px-6 py-2 rounded-full shadow-sm">
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}
