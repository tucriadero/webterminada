'use client';

import Link from 'next/link';

export default function PoliticaCookies() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-[#5cae97] mb-6">Política de Cookies</h1>

      <section className="space-y-4">
        <p>
          En TuCriadero.es utilizamos cookies para mejorar la experiencia de usuario, analizar el tráfico y personalizar
          el contenido. A continuación, te explicamos qué son las cookies, qué tipos usamos y cómo puedes gestionarlas.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.
          Permiten recordar tus preferencias y mejorar tu experiencia de navegación.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">2. Tipos de cookies que utilizamos</h2>
        <ul className="list-disc list-inside">
          <li><strong>Cookies técnicas:</strong> Necesarias para el funcionamiento del sitio.</li>
          <li><strong>Cookies de análisis:</strong> Nos ayudan a entender cómo interactúan los usuarios con la web.</li>
          <li><strong>Cookies de personalización:</strong> Adaptan el contenido a tus preferencias.</li>
          <li><strong>Cookies de terceros:</strong> Como las de Google Analytics o redes sociales (Instagram, TikTok, etc.).</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">3. Gestión de cookies</h2>
        <p>
          Puedes configurar tu navegador para aceptar o rechazar las cookies, así como para eliminarlas cuando lo desees.
        </p>
        <p>
          Ten en cuenta que desactivar algunas cookies puede afectar al correcto funcionamiento de ciertas funcionalidades del sitio.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">4. Cambios en la política de cookies</h2>
        <p>
          Podemos actualizar esta política en cualquier momento para reflejar cambios legales o técnicos. Te recomendamos revisar esta página periódicamente.
        </p>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/inicio"
          className="inline-block bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-3 px-6 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
