'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SobreNosotros() {
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
      alert('Hubo un error al enviar tu sugerencia. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <main className="bg-[#E8F8F2] min-h-screen px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <Link href="/inicio" className="text-[#5cae97] hover:underline text-sm inline-block">
          ← Volver a inicio
        </Link>

        <h1 className="text-3xl font-bold text-[#5cae97] text-center">Sobre Nosotros</h1>

        <div className="bg-[#DFF6EA] border border-green-100 p-4 rounded-xl shadow-sm text-sm text-gray-700">
          <p className="mb-2">
            <strong>TuCriadero.es</strong> es la primera plataforma en España especializada en la cría responsable de perros y gatos. Está diseñada para conectar a familias responsables con criadores verificados, garantizando la transparencia, el bienestar animal y la seguridad en cada publicación.
          </p>
          <p>
            No buscamos ser un portal masivo, sino una comunidad fiable y cuidada, donde todos los criadores cumplen con los estándares legales y éticos exigidos, y donde cada familia puede encontrar a su nuevo compañero con plena confianza.
          </p>
        </div>

        <p className="text-gray-700 text-lg">
          En <strong>TuCriadero.es</strong> creemos en la cría responsable y el respeto hacia los animales. Nuestro objetivo es conectar a las personas con <strong>criadores verificados</strong> de perros y gatos, facilitando un entorno transparente, ético y seguro.
        </p>

        <p className="text-gray-700 text-lg">
          La plataforma ha sido creada por amantes de los animales con una visión clara: ofrecer una alternativa profesional, moderna y confiable a los portales generalistas. Aquí, cada criador debe cumplir con unos estándares mínimos, incluyendo número de núcleo zoológico, cuidado de la salud de los animales y compromiso con su bienestar.
        </p>

        <p className="text-gray-700 text-lg">
          Además, apostamos por la tecnología para mejorar la experiencia: perfiles detallados, contacto directo, filtros inteligentes por raza y ubicación, y próximamente, sistemas de verificación avanzada y valoraciones reales.
        </p>

        <p className="text-gray-700 text-lg">
          Si eres criador, estás en el lugar adecuado para dar visibilidad a tu trabajo. Si estás buscando un nuevo compañero de vida, aquí encontrarás información clara, actualizada y criadores comprometidos.
        </p>

        <div className="mt-12 bg-[#DFF6EA] p-6 rounded-xl shadow space-y-4">
          <h2 className="text-xl font-bold text-[#5cae97] text-center">¿Tienes una sugerencia?</h2>
          <div className="text-gray-700 text-justify text-lg leading-relaxed">
            <p className="mb-2 font-bold">¿Tienes una sugerencia?</p>
            <p>
              En TuCriadero valoramos las ideas y propuestas de criadores y usuarios. Si crees que podemos mejorar la plataforma, nos encantará leerte.
            </p>
            <p className="mt-2 font-medium text-[#5cae97]">
              Te responderemos en menos de 48h.
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
                placeholder="Tu sugerencia"
                required
                className="w-full border px-4 py-2 rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-[#5cae97] hover:bg-[#4c9c85] text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Enviar sugerencia
              </button>
            </form>
          ) : (
            <div className="text-center text-[#5cae97] font-semibold mt-4">
              🎉 ¡Gracias por tu sugerencia! <br /> Te responderemos en menos de 48h.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}