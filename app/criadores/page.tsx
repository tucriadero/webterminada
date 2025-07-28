'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type Criador = {
  id: string;
  username: string;
  nombre: string | null;
  provincia: string | null;
  afijo: string | null;
  nucleo_zoologico: string | null;
  tipo_animal: string | null;  // 'perro' | 'gato'
  raza_criada: string | null;
  is_criadero: boolean;
  avatar_url: string | null;
};

const provincias: string[] = [
  'Álava','Albacete','Alicante','Almería','Asturias','Ávila','Badajoz','Barcelona','Burgos','Cáceres','Cádiz','Cantabria',
  'Castellón','Ciudad Real','Córdoba','Cuenca','Gerona','Granada','Guadalajara','Guipúzcoa','Huelva','Huesca','Islas Baleares',
  'Jaén','La Coruña','La Rioja','Las Palmas','León','Lérida','Lugo','Madrid','Málaga','Murcia','Navarra','Orense','Palencia',
  'Pontevedra','Salamanca','Santa Cruz de Tenerife','Segovia','Sevilla','Soria','Tarragona','Teruel','Toledo','Valencia',
  'Valladolid','Vizcaya','Zamora','Zaragoza'
];

const razasPerro = [
  'Affenpinscher','Akita Inu','Alaskan Malamute','American Bully','American Pit Bull Terrier','Basenji','Basset Hound','Beagle','Beauceron',
  'Bedlington Terrier','Bichón Frisé','Bichón Maltés','Bobtail','Border Collie','Bóxer','Braco Alemán','Braco de Weimar','Bulldog Francés',
  'Bulldog Inglés','Bullmastiff','Cairn Terrier','Cane Corso','Caniche','Carlino (Pug)','Cavalier King Charles Spaniel','Chihuahua',
  'Chow Chow','Cocker Spaniel Americano','Cocker Spaniel Inglés','Collie','Dálmata','Dogo Alemán','Dogo Argentino','Dogo de Burdeos',
  'Doberman','Epagneul Bretón','Fox Terrier','Galgo Español','Golden Retriever','Gran Danés','Greyhound','Husky Siberiano',
  'Jack Russell Terrier','Keeshond','Labrador Retriever','Lhasa Apso','Mastín Español','Mastín Napolitano','Papillón','Pastor Alemán',
  'Pastor Australiano','Pastor Belga','Pastor Blanco Suizo','Pequinés','Perro de Agua Español','Pinscher Miniatura','Pointer','Pomerania',
  'Rottweiler','Salchicha (Teckel)','Samoyedo','San Bernardo','Scottish Terrier','Setter Irlandés','Shar Pei','Shiba Inu','Shih Tzu',
  'Staffordshire Bull Terrier','Terranova','Vizsla','West Highland White Terrier','Whippet','Yorkshire Terrier'
];

const razasGato = [
  'Abisinio','American Curl','Angora Turco','Azul Ruso','Balines','Bengalí','Bobtail Japonés','Bombay','Bosque de Noruega',
  'Británico de Pelo Corto','Burmés','Cartujo (Chartreux)','Cornish Rex','Devon Rex','Egipcio (Mau Egipcio)','Europeo Común',
  'Exótico de Pelo Corto','Fold Escocés','Himalayo','Korat','LaPerm','Maine Coon','Manx','Mau Egipcio','Munchkin','Nebelung','Ocicat',
  'Oriental','Persa','Peterbald','Ragdoll','Savannah','Scottish Fold','Selkirk Rex','Siamés','Siberiano','Singapura','Snowshoe',
  'Sphynx','Tonkinés','Toyger','Van Turco'
];

export default function CriaderosPage() {
  const [criadores, setCriadores] = useState<Criador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filtros
  const [filtroTipo, setFiltroTipo] = useState<'perro' | 'gato' | ''>('');
  const [filtroProvincia, setFiltroProvincia] = useState('');
  const [filtroRaza, setFiltroRaza] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchCriadores = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, username, nombre, avatar_url, provincia, tipo_animal, raza_criada, afijo, nucleo_zoologico, is_criadero')
        .eq('is_criadero', true);

      if (error) {
        setError('No se han podido cargar los criaderos.');
        setCriadores([]);
      } else {
        setCriadores((data || []) as Criador[]);
      }
      setLoading(false);
    };
    fetchCriadores();
  }, []);

  const opcionesRaza = useMemo(() => {
    if (filtroTipo === 'perro') return razasPerro;
    if (filtroTipo === 'gato') return razasGato;
    // Si no hay tipo, juntamos ambas para permitir elegir cualquiera
    return Array.from(new Set([...razasPerro, ...razasGato]));
  }, [filtroTipo]);

  const filtrados = useMemo(() => {
    return criadores
      .filter(c => !filtroTipo || (c.tipo_animal || '').toLowerCase() === filtroTipo)
      .filter(c => !filtroProvincia || (c.provincia || '') === filtroProvincia)
      .filter(c => !filtroRaza || (c.raza_criada || '') === filtroRaza)
      .filter(c => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          (c.username || '').toLowerCase().includes(q) ||
          (c.nombre || '').toLowerCase().includes(q) ||
          (c.afijo || '').toLowerCase().includes(q) ||
          (c.provincia || '').toLowerCase().includes(q) ||
          (c.raza_criada || '').toLowerCase().includes(q)
        );
      });
  }, [criadores, filtroTipo, filtroProvincia, filtroRaza, query]);

  const resetFiltros = () => {
    setFiltroTipo('');
    setFiltroProvincia('');
    setFiltroRaza('');
    setQuery('');
  };

  return (
    <div className="min-h-screen bg-[#DFF6EA]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#5cae97]">Criaderos</h1>
            <p className="text-gray-600">Descubre criadores verificados por tipo, raza y provincia.</p>
          </div>
          <Link
            href="/inicio"
            className="inline-block bg-white border border-[#5cae97]/30 text-[#5cae97] hover:bg-[#5cae97] hover:text-white transition px-4 py-2 rounded-full shadow-sm"
          >
            ← Volver al inicio
          </Link>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow p-4 md:p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, usuario, afijo…"
              className="w-full border px-4 py-2 rounded-xl"
            />

            <select
              value={filtroTipo}
              onChange={(e) => {
                setFiltroTipo(e.target.value as 'perro' | 'gato' | '');
                setFiltroRaza('');
              }}
              className="w-full border px-4 py-2 rounded-xl"
            >
              <option value="">Tipo (todos)</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
            </select>

            <select
              value={filtroRaza}
              onChange={(e) => setFiltroRaza(e.target.value)}
              className="w-full border px-4 py-2 rounded-xl"
            >
              <option value="">Raza (todas)</option>
              {opcionesRaza.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select
              value={filtroProvincia}
              onChange={(e) => setFiltroProvincia(e.target.value)}
              className="w-full border px-4 py-2 rounded-xl"
            >
              <option value="">Provincia (todas)</option>
              {provincias.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <button
              onClick={resetFiltros}
              className="w-full bg-[#5cae97] text-white font-medium px-4 py-2 rounded-xl hover:bg-[#4c9c85] transition"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* Estado de carga / error */}
        {loading && (
          <div className="text-center text-gray-600 py-12">Cargando criaderos…</div>
        )}
        {error && (
          <div className="text-center text-red-500 py-12">{error}</div>
        )}

        {/* Resultados */}
        {!loading && !error && (
          <>
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-700">
                Mostrando <span className="font-semibold">{filtrados.length}</span> criadero{filtrados.length !== 1 ? 's' : ''}.
              </p>
            </div>

            {filtrados.length === 0 ? (
              <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-600">
                No hay resultados con los filtros seleccionados.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filtrados.map((c) => {
                  const avatarSrc = c.avatar_url
                    ? `https://cinsudwupbiqqizvqwij.supabase.co/storage/v1/object/public/avatars/${c.avatar_url}`
                    : '/default-avatar.png';

                  return (
                    <div key={c.id} className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-lg transition">
                      <img
                        src={avatarSrc}
                        alt={c.username}
                        className="w-20 h-20 rounded-full object-cover border mb-3"
                      />
                      <div className="inline-block bg-[#e1f7ef] text-[#3e947d] text-xs font-medium px-3 py-1 rounded-full mb-2">
                        🏅 Criadero
                      </div>
                      <h3 className="text-lg font-semibold text-[#5cae97]">@{c.username}</h3>
                      {c.nombre && <p className="text-sm text-gray-700">{c.nombre}</p>}
                      {c.afijo && <p className="text-xs text-gray-500">Afijo: {c.afijo}</p>}

                      <div className="mt-3 space-y-1 text-sm text-gray-700">
                        {c.provincia && <p>📍 {c.provincia}</p>}
                        {c.raza_criada && c.tipo_animal && <p>🐾 {c.raza_criada} ({c.tipo_animal})</p>}
                        {c.nucleo_zoologico && <p className="text-xs text-gray-500">Núcleo: {c.nucleo_zoologico}</p>}
                      </div>

                      <div className="mt-4 flex gap-2">
                       <Link
  href={`/anuncios-de/${encodeURIComponent(c.username)}`}
  className="px-4 py-2 rounded-full border border-[#5cae97] text-[#5cae97] hover:bg-[#5cae97] hover:text-white transition text-sm"
>
  Ver anuncios
</Link>
                        <Link
                          href={`/chat/${encodeURIComponent(c.username)}`}
                          className="px-4 py-2 rounded-full bg-[#5cae97] text-white hover:bg-[#4c9c85] transition text-sm"
                        >
                          Chatear
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
