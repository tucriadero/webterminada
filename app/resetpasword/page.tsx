'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setErrorMsg(null);

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg('Introduce un correo electrónico válido.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setMessage('Se ha enviado un email para restablecer tu contraseña. Revisa tu bandeja de entrada.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4">
      <form onSubmit={handleResetPassword} className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Recuperar contraseña</h1>

        <label htmlFor="email" className="block text-green-700 font-medium mb-2">
          Introduce tu correo electrónico
        </label>
        <input
          type="email"
          id="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />

        {errorMsg && <p className="text-red-600 text-center mb-4">{errorMsg}</p>}
        {message && <p className="text-green-700 text-center mb-4">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white ${
            !loading ? 'bg-green-600 hover:bg-green-700' : 'bg-green-300 cursor-not-allowed'
          } transition-colors duration-200`}
        >
          {loading ? 'Enviando...' : 'Enviar email de recuperación'}
        </button>

        <p className="mt-6 text-center text-green-700">
          <Link href="/login" className="underline hover:text-green-900">
            Volver a iniciar sesión
          </Link>
        </p>
        <p className="mt-2 text-center text-green-700">
          <Link href="/inicio" className="underline hover:text-green-900">
            Volver al inicio
          </Link>
        </p>
      </form>
    </div>
  );
}
