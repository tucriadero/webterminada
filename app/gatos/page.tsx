'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const criadores = [
  { id: 1, nombre: 'Gatitos Premium', provincia: 'Barcelona', raza: 'Ragdoll', tipo: 'gato', verificado: true },
  { id: 2, nombre: 'Felines de Ensueño', provincia: 'Sevilla', raza: 'Persa', tipo: 'gato', verificado: true },
  { id: 3, nombre: 'Mininos Royal', provincia: 'Madrid', raza: 'Siamés', tipo: 'gato', verificado: false },
  { id: 4, nombre: 'Peluditos Top', provincia: 'Valencia', raza: 'British Shorthair', tipo: 'gato', verificado: true },
];

const razasGato = [
  "Ragdoll", "Sphynx", "Persa", "Maine Coon", "British Shorthair", "Siamés", "Bengalí", "Azul Ruso", "Abisinio",
  "Exótico de Pelo Corto", "Bombay", "Burmés", "Himalayo", "Korat", "Manx", "Oriental", "Scottish Fold",
  "Selkirk Rex", "Somalí", "Van Turco"
];

const provincias = [
  "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres",
  "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Girona", "Granada", "Guadalajara",
  "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "A Coruña", "La Rioja", "Las Palmas", "León",
  "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca",
  "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora",
  "Zaragoza", "Ceuta", "Melilla"
];

export default function Gatos() {
  const [raza, setRaza] = useState('');
  const [provincia, setProvincia] = useState('');

  const filtrados = criadores.filter(c =>
    c.tipo === 'gato' &&
    (!raza || c.raza === raza) &&
    (!provincia || c.provincia === provincia)
  );

  return (
    <main className="bg-[#E8F8F2] min-h-screen py-10 px-4">
      <Link href="/inicio" className="text-[#5cae97] hover:text-green-900 flex items-center gap-2 mb-6">
        <FaArrowLeft />
        <span>Volver a inicio</span>
      </Link>

      <h1 className="text-3xl font-bold text-[#5cae97] text-center mb-6">Anuncios de Gatos</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <div>
          <label className="block text-sm mb-1">Filtrar por raza</label>
          <select value={raza} onChange={e => setRaza(e.target.value)} className="border rounded-lg px-4 py-2">
            <option value="">Todas las razas</option>
            {razasGato.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Filtrar por provincia</label>
          <select value={provincia} onChange={e => setProvincia(e.target.value)} className="border rounded-lg px-4 py-2">
            <option value="">Todas las provincias</option>
            {provincias.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      {filtrados.length === 0 ? (
        <p className="text-center text-gray-600">No hay anuncios disponibles con estos filtros.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filtrados.map(c => (
            <div key={c.id} className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition">
              <div className="w-full aspect-square bg-gray-100 rounded mb-2" />
              <h3 className="text-[#5cae97] font-semibold text-sm flex items-center justify-center gap-1">
                {c.nombre} {c.verificado && <FaCheckCircle className="text-green-500" title="Criador verificado" />}
              </h3>
              <p className="text-sm text-gray-600">{c.raza} - {c.provincia}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}