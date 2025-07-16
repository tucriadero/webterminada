'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const criadores = [
  {
    id: 1,
    nombre: 'Criadero La Casa Feliz',
    provincia: 'Madrid',
    raza: 'Golden Retriever',
    tipo: 'perro',
    verificado: true,
  },
  {
    id: 3,
    nombre: 'Mundo Can',
    provincia: 'Valencia',
    raza: 'Bulldog Francés',
    tipo: 'perro',
    verificado: false,
  },
];

const razasPerro = [
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
  "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres",
  "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Girona", "Granada", "Guadalajara",
  "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "A Coruña", "La Rioja", "Las Palmas", "León",
  "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca",
  "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora",
  "Zaragoza", "Ceuta", "Melilla"
];

export default function Perros() {
  const [provincia, setProvincia] = useState('');
  const [raza, setRaza] = useState('');

  const filtrados = criadores.filter((c) => {
    return (
      c.tipo === 'perro' &&
      (!provincia || c.provincia === provincia) &&
      (!raza || c.raza === raza)
    );
  });

  return (
    <main className="bg-[#E8F8F2] min-h-screen py-10 px-4">
      <Link href="/inicio" className="text-[#5cae97] hover:text-green-900 flex items-center gap-2 mb-6">
        <FaArrowLeft />
        <span>Volver a inicio</span>
      </Link>

      <h1 className="text-3xl font-bold text-[#5cae97] text-center mb-6">Anuncios de Perros</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Filtrar por raza</label>
          <select
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Todas las razas</option>
            {razasPerro.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Filtrar por provincia</label>
          <select
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Todas las provincias</option>
            {provincias.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filtrados.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition">
            <div className="w-full aspect-square bg-gray-100 rounded mb-2" />
            <h3 className="text-[#5cae97] font-semibold text-sm flex items-center justify-center gap-1">
              {c.nombre}
              {c.verificado && <FaCheckCircle className="text-green-500" title="Criador verificado" />}
            </h3>
            <p className="text-sm text-gray-600">{c.raza} - {c.provincia}</p>
          </div>
        ))}

        {filtrados.length === 0 && (
          <p className="text-center col-span-full text-gray-600">No hay anuncios disponibles con estos filtros.</p>
        )}
      </div>
    </main>
  );
}
