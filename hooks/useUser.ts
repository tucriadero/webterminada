'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'

export interface Usuario {
  id: string
  email: string
  username: string
  avatar_url: string | null
  nombre_completo?: string
  telefono?: string
  provincia?: string
  afijo?: string
  nucleo_zoologico?: string
  [key: string]: any
}

export function useUser() {
  const [user, setUser] = useState<Usuario | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    setLoading(true)

    const {
      data: { session },
    } = await supabase.auth.getSession()

    const userId = session?.user?.id
    if (!userId) {
      setUser(null)
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error obteniendo usuario:', error.message)
      setUser(null)
    } else {
      setUser(data)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return {
    user,
    loading,
    updateUser: fetchUser,
  }
}
