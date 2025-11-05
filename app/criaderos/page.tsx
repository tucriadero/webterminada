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

const razasGatos = [
  "Abisinio", "American Curl", "American Shorthair", "Angora Turco", "Azul Ruso", "Balinés", "Bengalí",
  "Bobtail Japonés", "Bombay", "Bosque de Noruega", "Británico de Pelo Corto", "Burmes", "Chartreux",
  "Cornish Rex", "Devon Rex", "Europeo Común", "Exótico de Pelo Corto", "Himalayo", "Korat", "Maine Coon",
  "Manx", "Munchkin", "Oriental", "Persa", "Peterbald", "Ragdoll", "Scottish Fold", "Selkirk Rex", "Siamés",
  "Siberiano", "Somalí", "Sphynx", "Tonquinés", "Van Turco", "Mestizo"
];

const provincias = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
  'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
  'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León',
  'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Pontevedra', 'Salamanca',
  'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia',
  'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
];

export default function PaginaCriaderos() {
  const [criaderos, setCriaderos] = useState<any[]>([]);
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [razaFiltro, setRazaFiltro] = useState('');
  const [provinciaFiltro, setProvinciaFiltro] = useState('');

  useEffect(() => {
    const fetchCriaderos = async () => {
      let query = supabase
        .from('profiles')
        .select('id, username, nombre, avatar_url, afijo, provincia, tipo_animal, raza_principal, is_criadero')
        .eq('is_criadero', true);

      if (tipoFiltro) query = query.eq('tipo_animal', tipoFiltro);
      if (razaFiltro) query = query.ilike('raza_principal', `%${razaFiltro}%`);
      if (provinciaFiltro) query = query.ilike('provincia', `%${provinciaFiltro}%`);

      const { data, error } = await query;
      if (!error) setCriaderos(data);
    };
    fetchCriaderos();
  }, [tipoFiltro, razaFiltro, provinciaFiltro]);

  const razasDisponibles =
    tipoFiltro === 'perro' ? razasPerros : tipoFiltro === 'gato' ? razasGatos : [];

  return (
    <main className="min-h-screen bg-[#DFF6EA] px-4 py-8">
      <div className="flex justify-center mb-6">
        <img src="/logo-criador.png" alt="TuCriadero" className="h-16" />
      </div>

      <h1 className="text-2xl font-bold text-[#5cae97] text-center mb-6">
        Criaderos Registrados
      </h1>

      {/* FILTROS */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select
          value={tipoFiltro}
          onChange={(e) => {
            setTipoFiltro(e.target.value);
            setRazaFiltro('');
          }}
          className="px-4 py-3 rounded-xl border w-72 shadow-sm"
        >
          <option value="">🐾 Elegir tipo de animal</option>
          <option value="perro">🐶 Perros</option>
          <option value="gato">🐱 Gatos</option>
        </select>

        <select
          value={razaFiltro}
          onChange={(e) => setRazaFiltro(e.target.value)}
          disabled={!tipoFiltro}
          className="px-4 py-3 rounded-xl border w-72 shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
          <option value="">
            {tipoFiltro ? 'Filtrar por raza' : 'Selecciona tipo primero'}
          </option>
          {razasDisponibles.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <select
          value={provinciaFiltro}
          onChange={(e) => setProvinciaFiltro(e.target.value)}
          className="px-4 py-3 rounded-xl border w-72 shadow-sm"
        >
          <option value="">📍 Filtrar por provincia</option>
          {provincias.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* LISTADO DE CRIADEROS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {criaderos.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No se encontraron criaderos con esos filtros.
          </p>
        ) : (
          criaderos.map((c) => (
            <div key={c.id} className="bg-white rounded-xl shadow-md overflow-hidden p-4 text-center">
              <div className="flex justify-center mb-3">
                <Image
                  src={c.avatar_url || '/default-avatar.png'}
                  alt={c.nombre || 'Criador'}
                  width={120}
                  height={120}
                  className="rounded-full object-cover w-28 h-28"
                />
              </div>
              <h2 className="text-lg font-semibold text-[#5cae97]">
                {c.afijo || c.username}
              </h2>
              <p className="text-sm text-gray-600">{c.provincia}</p>
              <p className="text-sm text-gray-500 mb-2">{c.raza_principal}</p>
              <Link
                href={`/anuncios-de/${c.username}`}
                className="inline-block mt-3 text-sm bg-[#5cae97] hover:bg-[#4c9c85] text-white px-4 py-2 rounded-full"
              >
                Ver anuncios
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/inicio"
          className="inline-block bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] font-medium px-6 py-2 rounded-full shadow-sm"
        >
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}
