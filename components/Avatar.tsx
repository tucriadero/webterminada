'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Avatar() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAvatar = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', session.user.id)
        .single();

      if (!error && data?.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
    };

    fetchAvatar();
  }, []);

  return (
    <div
      className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-[#5cae97]"
      onClick={() => router.push('/mi-perfil')}
    >
      <Image
        src={avatarUrl || '/avatar-placeholder.png'}
        alt="Avatar"
        width={40}
        height={40}
        className="object-cover w-full h-full"
      />
    </div>
  );
}

