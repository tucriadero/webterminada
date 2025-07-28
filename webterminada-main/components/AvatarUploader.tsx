'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'

interface AvatarUsuarioProps {
  avatarPath: string | null
  size?: number
}

export default function AvatarUsuario({ avatarPath, size = 80 }: AvatarUsuarioProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    if (avatarPath) {
      const { data } = supabase.storage.from('avatars').getPublicUrl(avatarPath)
      setAvatarUrl(data.publicUrl)
    } else {
      setAvatarUrl('/default-avatar.png')
    }
  }, [avatarPath])

  return (
    <div className="rounded-full overflow-hidden w-fit h-fit border border-gray-300 shadow-sm">
      <Image
        src={avatarUrl || '/default-avatar.png'}
        alt="Avatar"
        width={size}
        height={size}
        className="object-cover rounded-full"
      />
    </div>
  )
}
