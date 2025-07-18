'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailFromURL = searchParams.get('email') || '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (emailFromURL) {
      setEmail(emailFromURL);
    }
  }, [emailFromURL]);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setErrorMsg('');

  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setErrorMsg('Introduce un correo válido');
    setLoading(false);
    return;
  }

  if (!password || password.length < 6) {
    setErrorMsg('Introduce una contraseña válida (mínimo 6 caracteres)');
    setLoading(false);
    return;
  }

  // Espera mínima para prevenir spam de intentos
  await new Promise(resolve => setTimeout(resolve, 500));

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  setLoading(false);

  if (error) {
    if (error.message.toLowerCase().includes('invalid')) {
      setErrorMsg('Correo o contraseña incorrectos');
    } else {
      setErrorMsg('Ha ocurrido un error. Intenta nuevamente');
    }
    return;
  }

  toast.success('Has iniciado sesión');
  router.push('/inicio');
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8F8F2] px-4 py-10">
      <div className="mb-6">
        <img src="/logo-criador.png" alt="TuCriadero logo" className="w-20 h-20 drop-shadow" />
      </div>

      <form
        onSubmit={handleLogin}
        className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-[#5cae97] text-center">
          Iniciar sesión
        </h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cae97] outline-none"
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cae97] outline-none"
          required
        />

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-3 rounded-lg transition"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
          <Link href="/registro" className="text-[#5cae97] font-medium underline hover:text-[#4c9c85]">
            ¿No tienes cuenta? Regístrate
          </Link>
        </p>

        <p className="text-center text-sm text-gray-600">
          <Link href="/resetpassword" className="text-[#5cae97] font-medium underline hover:text-[#4c9c85]">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </form>

      <Link
        href="/inicio"
        className="mt-6 inline-block bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] font-medium px-6 py-2 rounded-full transition duration-200 shadow-sm"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}
