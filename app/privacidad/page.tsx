'use client';

import Link from 'next/link';

export default function PoliticaPrivacidad() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-[#5cae97] mb-6">Política de Privacidad</h1>

      <section className="space-y-4">
        <p>
          En TuCriadero.es nos comprometemos a garantizar que tu información personal esté protegida y no se utilice de forma indebida.
        </p>
        <p>
          A continuación, te explicamos cómo recopilamos, usamos y protegemos tus datos personales cuando utilizas nuestra plataforma.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">1. Responsable del tratamiento</h2>
        <p>
          El responsable del tratamiento de tus datos es TuCriadero.es. Para cualquier consulta puedes contactarnos a través del correo: <strong>tucriadero.es@gmail.com</strong>
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">2. Datos que recopilamos</h2>
        <p>Recopilamos los siguientes datos:</p>
        <ul className="list-disc list-inside">
          <li>Datos de registro (correo electrónico, nombre, afijo, núcleo zoológico...)</li>
          <li>Información que decides compartir en tu perfil o en tus anuncios.</li>
          <li>Datos técnicos (IP, tipo de dispositivo, navegador).</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">3. Finalidades del tratamiento</h2>
        <ul className="list-disc list-inside">
          <li>Gestión de cuentas de usuario y publicaciones.</li>
          <li>Envío de notificaciones sobre actividad relevante (mensajes, favoritos, etc.).</li>
          <li>Mejora de la experiencia de usuario y seguridad de la plataforma.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">4. Conservación de los datos</h2>
        <p>
          Tus datos se conservarán mientras mantengas tu cuenta activa o hasta que solicites su eliminación, y durante el tiempo necesario para cumplir con obligaciones legales.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">5. Derechos del usuario</h2>
        <p>Tienes derecho a:</p>
        <ul className="list-disc list-inside">
          <li>Acceder, rectificar o eliminar tus datos personales.</li>
          <li>Oponerte al tratamiento o solicitar su limitación.</li>
          <li>Portar tus datos a otro proveedor de servicios.</li>
        </ul>
        <p>Para ejercer estos derechos, contáctanos en tucriadero.es@gmail.com.</p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">6. Seguridad</h2>
        <p>
          Aplicamos medidas de seguridad técnicas y organizativas adecuadas para proteger tu información personal.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">7. Cambios en esta política</h2>
        <p>
          Podemos modificar esta política de privacidad en cualquier momento. Te avisaremos si los cambios son significativos.
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