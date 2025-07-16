'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Selector() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-10 text-center">
      {/* Logo arriba */}
      <Link href="/" className="mb-6">
        <Image src="/logo-criador.png" alt="TuCriadero logo" width={80} height={80} priority />
      </Link>

      {/* Título */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        ¿Qué tipo de cuenta quieres crear?
      </motion.h1>

      {/* Opciones de registro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Criador */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/registro-criador">
            <div className="border border-[#9ee0c6] rounded-2xl p-6 cursor-pointer hover:shadow-lg transition group hover:bg-[#f0fdf9]">
              <div className="text-5xl mb-4">🐾</div>
              <h2 className="text-2xl font-semibold mb-2 group-hover:text-[#5cae97] transition">
                Soy criador
              </h2>
              <p className="text-gray-600">
                Publica tus animales, gestiona tu perfil y recibe contactos verificados.
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Usuario */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
        <Link href="/registro">
  <div className="border border-[#9ee0c6] rounded-2xl p-6 cursor-pointer hover:shadow-lg transition group hover:bg-[#f0fdf9]">
    <div className="text-5xl mb-4">👤</div>
    <h2 className="text-2xl font-semibold mb-2 group-hover:text-[#5cae97] transition">
      Soy usuario
    </h2>
    <p className="text-gray-600">
      Busca animales, guarda favoritos y contacta con los criadores.
    </p>
  </div>
</Link>
        </motion.div>
      </div>

      {/* Botón de volver */}
      <Link
  href="/inicio"
  className="mt-10 inline-block bg-[#9ee0c6] text-black font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition"
>
  ← Volver al inicio
</Link>
    </main>
  );
}
