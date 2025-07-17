<<<<<<< HEAD
"use client";
=======
'use client';
>>>>>>> 293fc21 (Tu mensaje de commit)

import Link from 'next/link';
import { useState } from 'react';

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const response = await fetch('https://formspree.io/f/mvgqpoel', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      setEnviado(true);
      form.reset();
    } else {
      alert('Hubo un error al enviar tu mensaje. Inténtalo de nuevo más tarde.');
    }
  };

  return (
<<<<<<< HEAD
    <main className="bg-[#E8F8F2] min-h-screen px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        {/* Enlace para volver al inicio */}
        <Link href="/inicio" className="text-[#5cae97] hover:underline text-sm inline-block">
          ← Volver a inicio
        </Link>

        <h1 className="text-3xl font-bold text-[#5cae97] text-center">Contacto</h1>

        <p className="text-gray-700 text-lg">
          Si tienes dudas, comentarios o necesitas ponerte en contacto con el equipo de <strong>TuCriadero</strong>, puedes hacerlo rellenando el siguiente formulario.
        </p>

        <div className="bg-[#DFF6EA] border border-green-100 p-4 rounded-xl shadow-sm text-sm text-gray-700">
          <p className="mb-2">
            Estamos aquí para ayudarte, tu opinión y tus preguntas son importantes para nosotros.
          </p>
        </div>

        {!enviado ? (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
=======
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#E8F8F2] px-4 py-10">
      {/* Logo */}
      <div className="mb-6">
        <img src="/logo-criador.png" alt="TuCriadero logo" className="w-20 h-20 drop-shadow" />
      </div>

      {/* Contenedor principal */}
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-[#5cae97] text-center">Contacto</h1>

        <p className="text-gray-700 text-center text-sm">
          Si tienes dudas, sugerencias o necesitas contactar con <strong>TuCriadero</strong>, completa el formulario y te responderemos pronto.
        </p>

        {!enviado ? (
          <form onSubmit={handleSubmit} className="space-y-4">
>>>>>>> 293fc21 (Tu mensaje de commit)
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              required
<<<<<<< HEAD
              className="w-full border px-4 py-2 rounded-lg"
=======
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cae97] outline-none"
>>>>>>> 293fc21 (Tu mensaje de commit)
            />
            <input
              type="email"
              name="email"
              placeholder="Tu correo"
              required
<<<<<<< HEAD
              className="w-full border px-4 py-2 rounded-lg"
=======
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cae97] outline-none"
>>>>>>> 293fc21 (Tu mensaje de commit)
            />
            <textarea
              name="mensaje"
              rows={4}
              placeholder="Tu mensaje"
              required
<<<<<<< HEAD
              className="w-full border px-4 py-2 rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-[#5cae97] hover:bg-[#4c9c85] text-white font-semibold py-2 px-4 rounded-lg transition"
=======
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5cae97] outline-none resize-none"
            />
            <button
              type="submit"
              className="w-full bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-3 rounded-lg transition"
>>>>>>> 293fc21 (Tu mensaje de commit)
            >
              Enviar mensaje
            </button>
          </form>
        ) : (
<<<<<<< HEAD
          <div className="text-center text-[#5cae97] font-semibold mt-4">
=======
          <div className="text-center text-[#5cae97] font-semibold mt-4 text-sm">
>>>>>>> 293fc21 (Tu mensaje de commit)
            🎉 ¡Gracias por escribirnos! <br /> Te responderemos en menos de 48h.
          </div>
        )}
      </div>
<<<<<<< HEAD
    </main>
=======

      {/* Botón volver */}
      <Link
        href="/inicio"
        className="mt-6 inline-block bg-[#e8f8f2] hover:bg-[#d2eee2] text-[#5cae97] font-medium px-6 py-2 rounded-full transition duration-200 shadow-sm text-sm"
      >
        ← Volver al inicio
      </Link>
    </div>
>>>>>>> 293fc21 (Tu mensaje de commit)
  );
}
