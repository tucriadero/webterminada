import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CriadorPage({ params }) {
  const { id } = params;

  const { data: perfil, error: perfilError } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', id)
    .single();

  const { count: totalAnuncios } = await supabase
    .from('anuncios')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', id);

  if (perfilError || !perfil) {
    return (
      <main className="min-h-screen bg-[#DFF6EA] flex items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">Criador no encontrado.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#DFF6EA] flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl space-y-6 text-center">
        <h1 className="text-2xl font-bold text-[#5cae97]">Perfil del criador</h1>

        {perfil.avatar ? (
          <Image
            src={perfil.avatar}
            alt="Avatar del criador"
            width={96}
            height={96}
            className="rounded-full object-cover mx-auto"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto flex items-center justify-center text-gray-500">
            Sin avatar
          </div>
        )}

        <div className="text-left text-gray-700 space-y-2">
          {perfil.nombre && <p><strong>Nombre:</strong> {perfil.nombre}</p>}
          {perfil.provincia && <p><strong>Provincia:</strong> {perfil.provincia}</p>}
          {perfil.afijo && <p><strong>Afijo:</strong> {perfil.afijo}</p>}
          {perfil.nucleo && <p><strong>Núcleo zoológico:</strong> {perfil.nucleo}</p>}
        </div>

        <p className="text-sm text-gray-600 mt-2">
          📢 {totalAnuncios || 0} anuncio{totalAnuncios === 1 ? '' : 's'} publicados
        </p>

        {perfil.telefono && (
          <a
            href={`https://wa.me/${perfil.telefono}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#5cae97] hover:bg-[#4c9c85] text-white font-semibold px-6 py-2 rounded-lg mt-4"
          >
            Contactar por WhatsApp
          </a>
        )}

        <Link
          href={`/criador/${id}/anuncios`}
          className="block mt-6 text-sm text-[#5cae97] font-medium hover:underline"
        >
          Ver todos sus anuncios →
        </Link>

        <Link
          href="/"
          className="block text-sm text-[#5cae97] font-medium mt-2 hover:underline"
        >
          ← Volver al inicio
        </Link>
      </div>
    </main>
  );
}
