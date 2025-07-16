'use client';

import Image from 'next/image';
import { FaInstagram, FaFacebook, FaTiktok, FaTwitter } from 'react-icons/fa6';

export default function Home() {
  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* Overlay con desenfoque suave */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto">
        {/* Logo centrado */}
        <Image
          src="/logo-criador.png"
          alt="Logo TuCriadero"
          width={100}
          height={100}
          className="mb-4"
        />

        <h1
          className="text-5xl font-extrabold mb-2"
          style={{ color: '#9ee0c6' }}
        >
          TuCriadero
        </h1>

        <p className="text-gray-600 text-lg mb-4">
          Cuando el origen importa, tucriadero es el destino.
        </p>

        <a
          href="/inicio"
          className="text-white font-semibold py-2 px-6 rounded-lg transition mb-10"
          style={{ backgroundColor: '#9ee0c6' }}
        >
          ENTRAR
        </a>

        <div className="flex justify-center gap-6 text-2xl mt-10">
          <a
            href="https://instagram.com/tucriadero_es"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#9ee0c6' }}
            className="hover:opacity-80 transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://facebook.com/tucriadero"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#9ee0c6' }}
            className="hover:opacity-80 transition"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.tiktok.com/@tucriadero"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#9ee0c6' }}
            className="hover:opacity-80 transition"
          >
            <FaTiktok />
          </a>
          <a
            href="https://twitter.com/tucriadero"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#9ee0c6' }}
            className="hover:opacity-80 transition"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </main>
  );
}

