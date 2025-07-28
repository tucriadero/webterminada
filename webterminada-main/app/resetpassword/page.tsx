'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [tokenChecked, setTokenChecked] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  // Fase 2: si viene del email con tokens en la URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('access_token')) {
      const queryParams = new URLSearchParams(hash.replace('#', ''));
      const access_token = queryParams.get('access_token');
      const refresh_token = queryParams.get('refresh_token');
      if (access_token && refresh_token) {
        supabase.auth.setSession({ access_token, refresh_token }).then(() => {
          setIsResetting(true);
          setTokenChecked(true);
        });
      }
    } else {
      setTokenChecked(true);
    }
  }, []);

  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setErrorMsg(null);

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg('Introduce un correo electrónico válido.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/resetpassword`,
    });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setMessage('Te hemos enviado un correo para restablecer tu contraseña.');
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (newPassword.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);

    if (error) {
      setErrorMsg('Error al actualizar la contraseña.');
    } else {
      setMessage('Contraseña actualizada correctamente. Ya puedes iniciar sesión.');
      setTimeout(() => router.push('/login'), 3000);
    }
  };

  if (!tokenChecked) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8F8F2] px-4 py-10">
      <div className="mb-6">
        <img src="/logo-criador.png" alt="TuCriadero logo" className="w-20 h-20 drop-shadow" />
      </div>

      {!isResetting ? (
        <form onSubmit={handleSendResetEmail} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-[#5cae97] text-center">Recuperar contraseña</h1>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cae97] outline-none"
            required
          />

          {errorMsg && <p className="text-red-600 text-sm text-center">{errorMsg}</p>}
          {message && <p className="text-green-700 text-sm text-center">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-3 rounded-lg transition"
          >
            {loading ? 'Enviando...' : 'Enviar correo de recuperación'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-2">
            <Link href="/login" className="text-[#5cae97] font-medium underline hover:text-[#4c9c85]">
              Volver a iniciar sesión
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handlePasswordUpdate} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-[#5cae97] text-center">Nueva contraseña</h1>

          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cae97] outline-none"
            required
          />

          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cae97] outline-none"
            required
          />

          {errorMsg && <p className="text-red-600 text-sm text-center">{errorMsg}</p>}
          {message && <p className="text-green-700 text-sm text-center">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-3 rounded-lg transition"
          >
            {loading ? 'Actualizando...' : 'Guardar nueva contraseña'}
          </button>
        </form>
      )}

      <Link
        href="/inicio"
        className="mt-6 inline-block bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] font-medium px-6 py-2 rounded-full transition duration-200 shadow-sm"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}
