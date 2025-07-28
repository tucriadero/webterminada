'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type Perfil = {
  id: string
  username: string
  nombre: string | null
  telefono?: string | null
  provincia?: string | null
  afijo?: string | null
  nucleo_zoologico?: string | null
  tipo_animal?: string | null
  raza_criada?: string | null
  is_criadero?: boolean
  avatar_url?: string | null
}

export default function MiPerfil() {
  const user = useUser()
  const router = useRouter()
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchPerfil = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error || !data) {
        setPerfil(null)
      } else {
        setPerfil(data as Perfil)
      }

      setLoading(false)
    }

    fetchPerfil()
  }, [user])

  useEffect(() => {
    if (user === null && !loading) router.push('/login')
  }, [user, loading, router])

  if (loading) return <div className="p-10 text-center">Cargando perfil...</div>

  if (!perfil) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Usuario no encontrado.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#DFF6EA] flex flex-col items-center justify-center px-4 py-10">
      <img src="/logo-criador.png" alt="TuCriadero logo" className="w-20 h-20 mb-6 drop-shadow" />

      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center space-y-4">
        <div className="relative flex justify-center">
          <Image
            key={perfil?.avatar_url}
            src={
              perfil?.avatar_url
                ? `https://cinsudwupbiqqizvqwij.supabase.co/storage/v1/object/public/avatars/${perfil.avatar_url}`
                : '/default-avatar.png'
            }
            alt="Avatar"
            width={100}
            height={100}
            unoptimized
            priority
            className="rounded-full object-cover border hover:opacity-80 transition"
          />
        </div>

        <h2 className="text-2xl font-bold text-[#5cae97]">@{perfil.username}</h2>
        <p className="text-gray-700">{perfil.nombre}</p>
        <p className="text-sm text-gray-500">{perfil.provincia}</p>

        {perfil.telefono && (
          <p className="text-sm text-gray-600">
            📞 <span className="font-medium">{perfil.telefono}</span>
          </p>
        )}

        {perfil.is_criadero && (
          <>
            <div className="inline-block bg-[#e1f7ef] text-[#3e947d] text-xs font-medium px-3 py-1 rounded-full">
              🏅 Criador verificado
            </div>
            <p className="text-sm mt-2">
              🐾 Afijo: <strong>{perfil.afijo}</strong>
            </p>
            <p className="text-sm">
              📋 Núcleo zoológico: <strong>{perfil.nucleo_zoologico}</strong>
            </p>

            {perfil.provincia && (
              <p className="text-sm text-gray-700">
                📍 Provincia: <strong>{perfil.provincia}</strong>
              </p>
            )}

            {perfil.tipo_animal && perfil.raza_criada && (
              <p className="text-sm text-gray-700">
                🐶 Raza que cría: <strong>{perfil.raza_criada}</strong> ({perfil.tipo_animal})
              </p>
            )}
          </>
        )}

        <Link
          href="/editar-perfil"
          className="inline-block mt-4 bg-[#5cae97] hover:bg-[#4c9c85] text-white font-medium px-6 py-2 rounded-full transition"
        >
          Editar perfil
        </Link>
      </div>

      <Link
        href="/inicio"
        className="mt-6 inline-block bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] font-medium px-6 py-2 rounded-full transition duration-200 shadow-sm"
      >
        ← Volver al inicio
      </Link>
    </div>
  )
}
