import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function AnunciosCriadorPage({ params, searchParams }) {
  const { id } = params;
  const tipoFiltro = searchParams?.tipo || null;
  const page = parseInt(searchParams?.page || '1');
  const perPage = 6;
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data: perfil } = await supabase
    .from('perfiles')
    .select('nombre')
    .eq('id', id)
    .single();

  let query = supabase
    .from('anuncios')
    .select('*', { count: 'exact' })
    .eq('user_id', id)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (tipoFiltro) {
    query = query.eq('tipo', tipoFiltro);
  }

  const { data: anuncios, count, error } = await query;

  if (error || !anuncios) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#DFF6EA]">
        <p className="text-red-600 text-lg font-semibold">No se pudieron cargar los anuncios.</p>
      </main>
    );
  }

  const totalPages = Math.ceil((count || 0) / perPage);

  return (
    <main className="min-h-screen bg-[#DFF6EA] px-4 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-[#5cae97] text-center">
          Anuncios publicados por {perfil?.nombre || 'criador'}
        </h1>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href={`/criador/${id}/anuncios`}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${!tipoFiltro ? 'bg-[#5cae97] text-white' : 'bg-white text-[#5cae97] border border-[#5cae97]'}`}
          >
            Todos
          </Link>
          <Link
            href={`/criador/${id}/anuncios?tipo=perro`}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${tipoFiltro === 'perro' ? 'bg-[#5cae97] text-white' : 'bg-white text-[#5cae97] border border-[#5cae97]'}`}
          >
            Perros
          </Link>
          <Link
            href={`/criador/${id}/anuncios?tipo=gato`}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${tipoFiltro === 'gato' ? 'bg-[#5cae97] text-white' : 'bg-white text-[#5cae97] border border-[#5cae97]'}`}
          >
            Gatos
          </Link>
        </div>

        <p className="text-center text-sm text-gray-600">
          Mostrando {anuncios.length} de {count} anuncio{count === 1 ? '' : 's'} publicados
          {tipoFiltro ? ` de ${tipoFiltro === 'perro' ? 'perros' : 'gatos'}` : ''}.
        </p>

        {anuncios.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">Este criador aún no ha publicado ningún anuncio.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {anuncios.map((anuncio) => (
              <div key={anuncio.id} className="bg-white rounded-xl shadow p-4">
                {anuncio.imagenes?.[0] && (
                  <Image
                    src={anuncio.imagenes[0]}
                    alt="Imagen del anuncio"
                    width={400}
                    height={250}
                    className="rounded-lg object-cover w-full h-48"
                  />
                )}
                <h3 className="text-lg font-bold text-[#5cae97] mt-2">{anuncio.titulo}</h3>
                <p className="text-sm text-gray-600">{anuncio.descripcion?.slice(0, 80)}...</p>
                <Link
                  href={`/anuncio/${anuncio.id}`}
                  className="inline-block text-[#5cae97] font-medium mt-2 hover:underline"
                >
                  Ver más
                </Link>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const href = `/criador/${id}/anuncios?${tipoFiltro ? `tipo=${tipoFiltro}&` : ''}page=${pageNum}`;
              return (
                <Link
                  key={pageNum}
                  href={href}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    page === pageNum
                      ? 'bg-[#5cae97] text-white'
                      : 'bg-white text-[#5cae97] border border-[#5cae97]'
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href={`/criador/${id}`}
            className="text-[#5cae97] font-medium hover:underline"
          >
            ← Volver al perfil del criador
          </Link>
        </div>
      </div>
    </main>
  );
}
