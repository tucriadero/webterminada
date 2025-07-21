'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useUser } from '@supabase/auth-helpers-react';

export default function Avatar() {
  const user = useUser();
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error cargando avatar:', error.message);
          } else {
            setAvatarUrl(data?.avatar_url || '');
          }
        });
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return avatarUrl ? (
    <Image
      src={avatarUrl}
      alt="Avatar usuario"
      width={32}
      height={32}
      className="rounded-full object-cover w-8 h-8"
    />
  ) : (
    <div className="w-8 h-8 rounded-full bg-[#5cae97] flex items-center justify-center text-white text-sm">
      👤
    </div>
  );
}
