'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Eye, Edit, Trash2 } from 'lucide-react'

export default function CardAnuncio({ anuncio, onDelete }: {
  anuncio: any,
  onDelete: (id: string) => void
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden border border-[#d3f3e6]">
      <div className="aspect-square relative bg-gray-100">
        <Image
          src={anuncio.imagenes?.[0] || '/placeholder.jpg'}
          alt={anuncio.titulo}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{anuncio.titulo}</h2>
        <p className="text-sm text-gray-600">{anuncio.provincia} · {anuncio.tipo}</p>

        <span
          className={`inline-block mt-2 px-2 py-1 text-xs rounded-full font-medium ${
            anuncio.estado === 'Reservado'
              ? 'bg-yellow-200 text-yellow-800'
              : anuncio.estado === 'Vendido'
              ? 'bg-red-200 text-red-800'
              : 'bg-[#9ee0c6] text-gray-800'
          }`}
        >
          {anuncio.estado || 'Publicado'}
        </span>

        <p className="text-xs text-gray-400 mt-2">
          Publicado el {new Date(anuncio.created_at).toLocaleDateString()}
        </p>

        {anuncio.updated_at && (
          <p className="text-xs text-gray-400">
            Actualizado el {new Date(anuncio.updated_at).toLocaleDateString()}
          </p>
        )}

        <div className="flex justify-between items-center mt-4 text-sm text-[#2e7d61] font-medium">
          <Link href={`/anuncio/${anuncio.id}`} className="flex items-center gap-1 hover:underline">
            <Eye className="w-4 h-4" /> Ver
          </Link>
          <Link href={`/editar-anuncio/${anuncio.id}`} className="flex items-center gap-1 hover:underline">
            <Edit className="w-4 h-4" /> Editar
          </Link>
          <button
            onClick={() => onDelete(anuncio.id)}
            className="flex items-center gap-1 text-red-500 hover:underline"
          >
            <Trash2 className="w-4 h-4" /> Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
