// pages/anuncios/perros.js
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import Image from 'next/image';
import Link from 'next/link';

export default function AnunciosPerros() {
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {
    async function fetchAnuncios() {
      const { data, error } = await supabase
        .from('anuncios')
        .select('*')
        .eq('categoria', 'perro')
        .order('created_at', { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setAnuncios(data);
      }
    }

    fetchAnuncios();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Anuncios de Perros</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {anuncios.map(anuncio => (
          <div key={anuncio.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <Link href={`/anuncio/${anuncio.id}`}>
              <Image
                src={anuncio.imagen_url}
                alt={anuncio.titulo}
                width={400}
                height={300}
                className="object-cover w-full h-56"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{anuncio.titulo}</h2>
                <p className="text-gray-500 mt-2">{anuncio.provincia}</p>
                <p className="text-gray-700 mt-2 line-clamp-2">{anuncio.descripcion}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
