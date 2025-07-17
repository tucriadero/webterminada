'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
<<<<<<< HEAD

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid = () => {
    return (
      email.trim() !== '' &&
      /^\S+@\S+\.\S+$/.test(email) &&
      password.length >= 6
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMsg(error.message);
      } else {
        router.push('/inicio');
      }
    } catch {
      setErrorMsg('Error inesperado, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      console.error('Error al iniciar sesión con Google:', error.message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8F8F2] px-4 py-10">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-[#5cae97] mb-6 text-center">Acceder a TuCriadero</h1>

        <label htmlFor="email" className="block text-[#5cae97] font-medium mb-2">Correo electrónico</label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5cae97]"
          required
        />
        {!/^\S+@\S+\.\S+$/.test(email) && email.length > 0 && (
          <p className="text-red-600 text-sm mb-2">Introduce un correo válido.</p>
        )}

        <label htmlFor="password" className="block text-[#5cae97] font-medium mb-2">Contraseña</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          placeholder="Tu contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5cae97]"
          minLength={6}
          required
        />
        <div className="text-right mb-2">
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm text-[#5cae97] underline hover:text-[#4c9c85]"
          >
            {showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          </button>
        </div>

        {password.length > 0 && password.length < 6 && (
          <p className="text-red-600 text-sm mb-2">La contraseña debe tener al menos 6 caracteres.</p>
        )}

        <div className="flex items-center mb-4">
          <input
            id="rememberMe"
            type="checkbox"
            checked={rememberMe}
            onChange={e => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-[#5cae97] focus:ring-[#5cae97] border-gray-300 rounded"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-[#5cae97] select-none cursor-pointer">
            Mantener sesión iniciada
          </label>
        </div>

        {errorMsg && <p className="text-red-600 text-center mb-4">{errorMsg}</p>}

        <button
          type="submit"
          disabled={!isFormValid() || loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-colors duration-200 ${
            isFormValid() && !loading
              ? '!bg-[#5cae97] hover:!bg-[#4c9c85]'
              : 'bg-[#a0dbc7] cursor-not-allowed'
          }`}
        >
          {loading ? 'Cargando...' : 'Acceder'}
        </button>

        <p className="mt-6 text-center text-[#5cae97]">
          ¿No tienes cuenta?{' '}
          <Link href="/registro" className="underline font-semibold hover:text-[#4c9c85]">
            Regístrate aquí
          </Link>
        </p>

        <p className="mt-2 text-center text-sm text-gray-600">
          <Link href="/resetpassword" className="underline hover:text-[#4c9c85]">
            ¿Olvidaste tu contraseña?
=======
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setErrorMsg('Correo o contraseña incorrectos');
      return;
    }

    toast.success('Has iniciado sesión');
    router.push('/mi-cuenta'); // Cambia si prefieres otra ruta
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
>>>>>>> 293fc21 (Tu mensaje de commit)
          </Link>
        </p>
      </form>

<<<<<<< HEAD
      {/* Separador */}
      <div className="my-4 text-gray-500 text-sm">o</div>

      {/* Botón de Google */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-lg w-full max-w-md transition"
      >
        <img src="/google.svg" alt="Google" className="w-5 h-5" />
        Continuar con Google
      </button>

      {/* Botón de volver */}
      <Link
        href="/inicio"
        className="w-full max-w-md mt-4 inline-block text-white text-center font-semibold py-3 rounded-lg bg-[#5cae97] hover:bg-[#4c9c85] transition"
      >
        Volver al inicio
=======
      <Link
        href="/inicio"
        className="mt-6 inline-block bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] font-medium px-6 py-2 rounded-full transition duration-200 shadow-sm"
      >
        ← Volver al inicio
>>>>>>> 293fc21 (Tu mensaje de commit)
      </Link>
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> 293fc21 (Tu mensaje de commit)
