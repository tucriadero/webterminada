'use client';

import { useEffect, useState, useMemo } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function ChatInbox() {
  const user = useUser();
  const [conversaciones, setConversaciones] = useState<any[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchInbox = async () => {
      const { data } = await supabase.rpc('get_user_conversations', { user_id: user.id });
      setConversaciones(data || []);
    };

    fetchInbox();
  }, [user]);

  const conversacionesFiltradas = useMemo(() => {
    const q = query.toLowerCase();
    return conversaciones.filter((conv) =>
      conv.username?.toLowerCase().includes(q) ||
      conv.nombre?.toLowerCase().includes(q) ||
      conv.last_message?.toLowerCase().includes(q)
    );
  }, [conversaciones, query]);

  return (
    <div className="min-h-screen bg-[#DFF6EA] p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#5cae97] mb-4">Bandeja de entrada</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por usuario, nombre o mensaje..."
        className="w-full mb-6 px-4 py-2 border rounded-xl shadow-sm"
      />

      {conversacionesFiltradas.length === 0 ? (
        <p className="text-gray-500">No tienes conversaciones activas.</p>
      ) : (
        <div className="space-y-4">
          {conversacionesFiltradas.map((conv) => (
            <Link
              key={conv.username}
              href={`/chat/${conv.username}`}
              className="flex items-center justify-between bg-white rounded-xl shadow p-4 hover:bg-gray-50"
            >
              <div>
                <p className="text-sm text-gray-700 font-medium">@{conv.username}</p>
                {conv.nombre && (
                  <p className="text-xs text-gray-500">{conv.nombre}</p>
                )}
                <p className="text-xs text-gray-400">{conv.last_message}</p>
              </div>
              {conv.unread_count > 0 && (
                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {conv.unread_count}
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
