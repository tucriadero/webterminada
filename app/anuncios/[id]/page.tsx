'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Contactar from '@/components/Contactar'; // Asegúrate de que esta ruta es correcta

export default function AnuncioDetalle() {
  const { id } = useParams();
  const [anuncio, setAnuncio] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const cargarAnuncio = async () => {
      const { data } = await supabase
        .from('anuncios')
        .select('*')
        .eq('id', id)
        .single();

      setAnuncio(data);
    };

    if (id) {
      cargarAnuncio();
    }
  }, [id]);

  if (!anuncio) return <p className="p-4">Cargando anuncio...</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{anuncio.titulo}</h1>
      <p className="text-gray-700">{anuncio.descripcion}</p>
      {/* Aquí insertamos el botón */}
      <Contactar
        usuarioIdDelCriador={anuncio.usuario_id}
        anuncioId={anuncio.id}
      />
    </div>
  );
}
