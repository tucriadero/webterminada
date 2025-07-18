'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';

export default function Registro() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error('Introduce un nombre de usuario.');
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      toast.error('El nombre de usuario solo puede contener letras, números y guiones bajos.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      setLoading(false);
      toast.error(error.message || 'Error al crear la cuenta');
      return;
    }

    // Intentar login directo (si no hay confirmación activada)
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (loginError) {
      toast.error(loginError.message || 'No se pudo iniciar sesión');
      return;
    }

    toast.success('Cuenta creada correctamente');
    router.push('/inicio');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DFF6EA] px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Crear una cuenta</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Correo electrónico</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium">Nombre de usuario</label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">Contraseña</label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#9ee0c6] hover:bg-[#80c9ae] transition-colors text-white font-semibold py-2 px-4 rounded"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-[#4AA785] font-medium hover:underline">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}
