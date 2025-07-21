'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const provincias = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'Barcelona', 'Burgos', 'Cáceres',
  'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara',
  'Guipúzcoa', 'Huelva', 'Huesca', 'Islas Baleares', 'Jaén', 'La Coruña', 'La Rioja', 'Las Palmas', 'León',
  'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Pontevedra', 'Salamanca',
  'Santa Cruz de Tenerife', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia',
  'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'
];

const estados = ['Publicado', 'Reservado', 'Vendido', 'Archivado'];

export default function MisAnunciosPage() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroProvincia, setFiltroProvincia] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [isCriadero, setIsCriadero] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchAnuncios = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }

      const { data, error } = await supabase
        .from('anuncios')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      const { data: perfil } = await supabase
        .from('profiles')
        .select('is_criadero')
        .eq('id', session.user.id)
        .single();

      if (perfil?.is_criadero) setIsCriadero(true);
      if (!error) setAnuncios(data);
      setLoading(false);
    };

    fetchAnuncios();
  }, [router]);

  const eliminarAnuncio = async (id) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este anuncio?')) return;
    const { error } = await supabase.from('anuncios').delete().eq('id', id);
    if (!error) setAnuncios((prev) => prev.filter((a) => a.id !== id));
  };

  const anunciosFiltrados = anuncios.filter((a) => {
    const coincideTitulo = a.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const coincideTipo = filtroTipo ? a.tipo === filtroTipo : true;
    const coincideProvincia = filtroProvincia ? a.provincia === filtroProvincia : true;
    const coincideEstado = filtroEstado ? a.estado === filtroEstado : true;
    return coincideTitulo && coincideTipo && coincideProvincia && coincideEstado;
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-[#DFF6EA] flex items-center justify-center">
        <p className="text-[#5cae97] font-medium text-lg">Cargando tus anuncios...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#DFF6EA] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-[#5cae97] text-center">Mis anuncios publicados</h1>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Buscar por título"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5cae97]"
          />
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5cae97]">
            <option value="">Todos los tipos</option>
            <option value="perro">Perros</option>
            <option value="gato">Gatos</option>
          </select>
          <select value={filtroProvincia} onChange={(e) => setFiltroProvincia(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5cae97]">
            <option value="">Todas las provincias</option>
            {provincias.map((prov) => <option key={prov} value={prov}>{prov}</option>)}
          </select>
          <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#5cae97]">
            <option value="">Todos los estados</option>
            {estados.map((estado) => <option key={estado} value={estado}>{estado}</option>)}
          </select>
        </div>

        {anunciosFiltrados.length === 0 ? (
<p className="text-center text-gray-600 mt-6">
  No hay anuncios con los filtros actuales.<br />
  <Link
    href="/anuncio"
    className="inline-block mt-4 bg-[#5cae97] hover:bg-[#4c9c85] text-white text-sm font-medium px-6 py-2 rounded-full transition duration-200 shadow-sm"
  >
    🐾 Publicar ahora
  </Link>
</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {anunciosFiltrados.map((anuncio) => (
              <div key={anuncio.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {anuncio.imagenes?.[0] && (
                  <Image
                    src={anuncio.imagenes[0]}
                    alt="Imagen del anuncio"
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-bold text-[#5cae97]">{anuncio.titulo}</h3>
                  <p className="text-sm text-gray-600">{anuncio.descripcion?.slice(0, 90)}...</p>
                  <p className="text-sm text-gray-500">Estado: <strong>{anuncio.estado}</strong></p>
                  <p className="text-xs text-gray-400">
                    Publicado: {new Date(anuncio.created_at).toLocaleDateString()}<br />
                    {anuncio.updated_at && <>Actualizado: {new Date(anuncio.updated_at).toLocaleDateString()}</>}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Link href={`/anuncio/${anuncio.id}`} className="flex-1 text-sm text-center bg-[#5cae97] hover:bg-[#4a9b86] text-white py-1.5 rounded-lg font-medium">Ver</Link>
                    <Link href={`/editar-anuncio/${anuncio.id}`} className="flex-1 text-sm text-center bg-yellow-400 hover:bg-yellow-500 text-black py-1.5 rounded-lg font-medium">Editar</Link>
                    <button onClick={() => eliminarAnuncio(anuncio.id)} className="flex-1 text-sm text-center bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-lg font-medium">Eliminar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isCriadero && anunciosFiltrados.length > 0 && (
          <div className="text-center mt-10">
            <Link
              href="/anuncio"
              className="inline-block bg-[#5cae97] hover:bg-[#4c9c85] text-white font-semibold px-8 py-3 rounded-full transition duration-200 shadow-md"
            >
              🐾 Publicar nuevo anuncio
            </Link>
          </div>
        )}

        <div className="text-center mt-10">
          <Link href="/mi-perfil" className="inline-block text-[#5cae97] font-medium hover:underline">
            ← Volver a mi perfil
          </Link>
        </div>
      </div>
    </main>
  );
}
