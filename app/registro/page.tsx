'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
<<<<<<< HEAD

export default function Registro() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid = () => {
    return (
      username.trim() !== '' &&
      email.trim() !== '' &&
      /^\S+@\S+\.\S+$/.test(email) &&
      password.length >= 6 &&
      password === confirmPassword
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, username }]);

        if (profileError) {
          setErrorMsg('Error al guardar el perfil: ' + profileError.message);
          setLoading(false);
          return;
        }
      }

      router.push('/login');
    } catch {
      setErrorMsg('Error inesperado, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8F8F2] px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-[#5cae97] mb-6 text-center">
          Crear una cuenta en TuCriadero
        </h1>

        <label htmlFor="username" className="block text-green-700 font-medium mb-2">
          Nombre de usuario
        </label>
        <input
          type="text"
          id="username"
          placeholder="Tu nombre de usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5cae97]"
          required
        />
        {username.trim() === '' && (
          <p className="text-red-600 text-sm mb-2">El nombre de usuario es obligatorio.</p>
        )}

        <label htmlFor="email" className="block text-green-700 font-medium mb-2">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          placeholder="ejemplo@correo.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5cae97]"
          required
        />
        {!/^\S+@\S+\.\S+$/.test(email) && email.length > 0 && (
          <p className="text-red-600 text-sm mb-2">Introduce un correo válido.</p>
        )}

        <label htmlFor="password" className="block text-green-700 font-medium mb-2">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          placeholder="Tu contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5cae97]"
          minLength={6}
          required
        />
        {password.length > 0 && password.length < 6 && (
          <p className="text-red-600 text-sm mb-2">La contraseña debe tener al menos 6 caracteres.</p>
        )}

        <label htmlFor="confirmPassword" className="block text-green-700 font-medium mb-2">
          Confirmar contraseña
        </label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="Repite tu contraseña"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#5cae97]"
          minLength={6}
          required
        />
        {confirmPassword.length > 0 && confirmPassword !== password && (
          <p className="text-red-600 text-sm mb-2">Las contraseñas no coinciden.</p>
        )}

        {errorMsg && (
          <p className="text-red-600 text-center mb-4">{errorMsg}</p>
        )}

        <button
          type="submit"
          className="w-full bg-[#5cae97] hover:bg-[#4c9c85] text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Registrarse
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          <Link href="/recuperarcontraseña" className="underline hover:text-green-900">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </form>

      {/* Separador */}
      <div className="my-4 text-gray-500 text-sm">o</div>

      {/* Botón Google */}
      <button
        type="button"
        onClick={async () => {
          const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
          if (error) {
            console.error('Error al iniciar sesión con Google:', error.message);
          }
        }}
        className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 py-2 px-4 rounded-lg w-full max-w-md transition"
      >
        <img src="/google.svg" alt="Google" className="w-5 h-5" />
        Continuar con Google
      </button>

  <Link
  href="/inicio"
  className="w-full bg-[#5cae97] hover:bg-[#4c9c85] text-white font-semibold py-2 px-4 rounded-lg transition text-center mt-4 max-w-md"
>
  Volver al inicio
=======
import toast from 'react-hot-toast';

export default function RegistroPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (password !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    toast.success('Revisa tu correo para verificar la cuenta');
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8F8F2] px-4 py-10">
      <div className="mb-6">
        <img src="/logo-criador.png" alt="TuCriadero logo" className="w-20 h-20 drop-shadow" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-[#5cae97] text-center">
          Crear una cuenta
        </h1>

        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cae97] outline-none"
          required
        />

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
          minLength={6}
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cae97] outline-none"
          required
          minLength={6}
        />

        {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-3 rounded-lg transition"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <p className="text-center text-sm text-gray-600 mt-2">
          <Link href="/login" className="text-[#5cae97] font-medium underline hover:text-[#4c9c85]">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </p>
     </form>

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
