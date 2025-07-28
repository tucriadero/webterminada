'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert('Error al iniciar sesión: ' + error.message);
  } else {
    console.log('✅ Login correcto:', data);
    window.location.href = '/inicio'; // redirección forzada
  }

  setLoading(false);
};

  return (
    <main className="min-h-screen bg-[#DFF6EA] flex flex-col items-center justify-center px-4 py-10">
      <Link href="/" className="mb-6">
        <Image src="/logo-criador.png" alt="TuCriadero Logo" width={80} height={80} priority />
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-[#5cae97] text-center">Inicia sesión en TuCriadero</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-2 rounded-lg w-full"
          >
            {loading ? 'Accediendo...' : 'Acceder'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="text-[#5cae97] font-semibold hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-6 text-sm text-[#5cae97] font-medium hover:underline"
      >
        ← Volver al inicio
      </Link>
    </main>
  );
}
