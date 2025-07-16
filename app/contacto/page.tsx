"use client";

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
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              required
              className="w-full border px-4 py-2 rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Tu correo"
              required
              className="w-full border px-4 py-2 rounded-lg"
            />
            <textarea
              name="mensaje"
              rows={4}
              placeholder="Tu mensaje"
              required
              className="w-full border px-4 py-2 rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-[#5cae97] hover:bg-[#4c9c85] text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Enviar mensaje
            </button>
          </form>
        ) : (
          <div className="text-center text-[#5cae97] font-semibold mt-4">
            🎉 ¡Gracias por escribirnos! <br /> Te responderemos en menos de 48h.
          </div>
        )}
      </div>
    </main>
  );
}
