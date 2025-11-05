'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useUser } from '@/hooks/useUser'
import CardAnuncio from '@/components/CardAnuncio'

export default function MisAnuncios() {
  const { user } = useUser()
  const [anuncios, setAnuncios] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Filtros
  const [filtroTitulo, setFiltroTitulo] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [filtroProvincia, setFiltroProvincia] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('')

  useEffect(() => {
    if (!user) return
    const fetchAnuncios = async () => {
      const { data, error } = await supabase
        .from('anuncios')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) console.error(error)
      else setAnuncios(data)
      setLoading(false)
    }

    fetchAnuncios()
  }, [user])

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('¿Eliminar este anuncio? Esta acción no se puede deshacer.')
    if (!confirmDelete) return

    const { error } = await supabase.from('anuncios').delete().eq('id', id)
    if (error) {
      alert('Error al eliminar el anuncio')
      console.error(error)
    } else {
      setAnuncios(prev => prev.filter(a => a.id !== id))
    }
  }

  const anunciosFiltrados = anuncios.filter(a =>
    a.titulo.toLowerCase().includes(filtroTitulo.toLowerCase()) &&
    (filtroTipo ? a.tipo === filtroTipo : true) &&
    (filtroProvincia ? a.provincia === filtroProvincia : true) &&
    (filtroEstado ? a.estado === filtroEstado : true)
  )

  if (loading) return <p className="text-center mt-10">Cargando tus anuncios...</p>
  if (anuncios.length === 0) return <p className="text-center mt-10">No tienes ningún anuncio publicado aún.</p>

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Mis anuncios</h1>

      {/* Filtros */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Buscar por título..."
          value={filtroTitulo}
          onChange={e => setFiltroTitulo(e.target.value)}
          className="border rounded-md p-2 w-full sm:w-56"
        />
        <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)} className="border rounded-md p-2">
          <option value="">Tipo</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
        </select>
        <select value={filtroProvincia} onChange={e => setFiltroProvincia(e.target.value)} className="border rounded-md p-2">
          <option value="">Provincia</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Madrid">Madrid</option>
          {/* Puedes añadir más provincias aquí */}
        </select>
        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} className="border rounded-md p-2">
          <option value="">Estado</option>
          <option value="Publicado">Publicado</option>
          <option value="Reservado">Reservado</option>
          <option value="Vendido">Vendido</option>
        </select>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {anunciosFiltrados.map(anuncio => (
          <CardAnuncio key={anuncio.id} anuncio={anuncio} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
