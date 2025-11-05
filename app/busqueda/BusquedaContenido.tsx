'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const provincias = [
  "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres",
  "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Girona", "Granada", "Guadalajara",
  "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "A Coruña", "La Rioja", "Las Palmas", "León",
  "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca",
  "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora",
  "Zaragoza", "Ceuta", "Melilla"
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

const razasGato = [
  "Ragdoll", "Sphynx", "Persa", "Maine Coon", "British Shorthair", "Siamés", "Bengalí", "Azul Ruso", "Abisinio",
  "Exótico de Pelo Corto", "Bombay", "Burmés", "Himalayo", "Korat", "Manx", "Oriental", "Scottish Fold",
  "Selkirk Rex", "Somalí", "Van Turco"
];
export default function Busqueda() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tipo, setTipo] = useState<'perro' | 'gato'>('perro');
  const [provincia, setProvincia] = useState('');
  const [raza, setRaza] = useState('');
  const [anuncios, setAnuncios] = useState<any[]>([]);

  useEffect(() => {
    const t = searchParams.get('tipo') as 'perro' | 'gato' | null;
    const p = searchParams.get('provincia') || '';
    const r = searchParams.get('raza') || '';
    if (t) setTipo(t);
    setProvincia(p);
    setRaza(r);

    // Simulación temporal de datos
    const datosSimulados = [
      { id: 1, tipo: 'perro', raza: 'Labrador', provincia: 'Madrid', descripcion: 'Ejemplo 1' },
      { id: 2, tipo: 'perro', raza: 'Beagle', provincia: 'Valencia', descripcion: 'Ejemplo 2' },
      { id: 3, tipo: 'gato', raza: 'Siamés', provincia: 'Barcelona', descripcion: 'Ejemplo 3' }
    ];

    const filtrados = datosSimulados.filter(anuncio => {
      return (
        anuncio.tipo === (t || 'perro') &&
        (p === '' || anuncio.provincia === p) &&
        (r === '' || anuncio.raza === r)
      );
    });

    setAnuncios(filtrados);
  }, [searchParams]);

  const handleFiltrar = () => {
    const query = new URLSearchParams();
    query.set('tipo', tipo);
    if (provincia) query.set('provincia', provincia);
    if (raza) query.set('raza', raza);
    router.push(`/busqueda?${query.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#DFF6EA] py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Filtros */}
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-xl p-4 shadow-md">
          <div className="flex gap-2 rounded-full overflow-hidden border border-gray-300">
            <button
              className={`px-4 py-1 text-sm font-medium ${tipo === 'perro' ? 'bg-[#5cae97] text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setTipo('perro')}
            >
              Perros
            </button>
            <button
              className={`px-4 py-1 text-sm font-medium ${tipo === 'gato' ? 'bg-[#5cae97] text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setTipo('gato')}
            >
              Gatos
            </button>
          </div>

          <select
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full md:w-auto"
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
          >
            <option value="">Todas las razas</option>
            {(tipo === 'perro' ? razasPerro : razasGato).map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <select
            className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full md:w-auto"
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
          >
            <option value="">Toda España</option>
            {provincias.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <button
            onClick={handleFiltrar}
            className="bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-2 px-4 rounded-lg"
          >
            Filtrar
          </button>
        </div>

        {/* Resultados */}
        {anuncios.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {anuncios.map((anuncio) => (
                <div key={anuncio.id} className="bg-white rounded-xl shadow p-4">
                  <div className="aspect-[4/3] bg-gray-200 mb-3 rounded-lg" />
                  <h3 className="text-lg font-bold text-[#5cae97]">{anuncio.raza}</h3>
                  <p className="text-gray-600 text-sm">{anuncio.descripcion}</p>
                  <p className="text-xs text-gray-500 mt-1">{anuncio.provincia}</p>
                </div>
              ))}
            </div>

            {/* Botón al final */}
            <div className="text-center mt-10">
              <Link
                href="/inicio"
                className="inline-block bg-[#5cae97] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#4c9c85]"
              >
                Volver al inicio
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-4">No se encontraron anuncios con los filtros seleccionados.</p>
            <Link
              href="/inicio"
              className="bg-[#5cae97] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#4c9c85]"
            >
              Volver al inicio
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
