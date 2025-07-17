'use client';

import Link from 'next/link';

export default function AvisoLegal() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-3xl font-bold text-[#5cae97] mb-6">Aviso Legal</h1>

      <section className="space-y-4">
        <p>
          En cumplimiento con el deber de información recogido en la Ley 34/2002 de Servicios de la Sociedad de la
          Información y del Comercio Electrónico (LSSI-CE), se facilita a continuación la siguiente información general
          del sitio web:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Titular del sitio web:</strong> TuCriadero.es</li>
          <li><strong>Correo electrónico de contacto:</strong> tucriadero.es@gmail.com</li>
          <li><strong>Nombre comercial:</strong> TuCriadero</li>
          <li><strong>Finalidad:</strong> Plataforma de publicación de anuncios de criadores de perros y gatos.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">Condiciones de uso</h2>
        <p>
          El acceso y la navegación en este sitio web, así como el uso de los servicios ofrecidos, implican la aceptación
          de las siguientes condiciones:
        </p>
        <ul className="list-disc list-inside">
          <li>El usuario se compromete a utilizar el sitio web y sus contenidos de forma lícita.</li>
          <li>Está prohibida la reproducción, distribución o modificación del contenido sin autorización.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">Responsabilidad</h2>
        <p>
          TuCriadero.es actúa como intermediario entre criadores y usuarios interesados. No se hace responsable de:
        </p>
        <ul className="list-disc list-inside">
          <li>La veracidad de los datos publicados por los criadores.</li>
          <li>La calidad o estado de los animales anunciados.</li>
          <li>Daños derivados de relaciones entre usuarios y criadores.</li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">Propiedad intelectual e industrial</h2>
        <p>
          Todos los derechos del sitio web y sus contenidos son titularidad de TuCriadero.es o de sus autores. Queda
          prohibida su reproducción sin permiso.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">Protección de datos</h2>
        <p>
          Los datos personales recabados se tratarán conforme a lo establecido en nuestra{' '}
          <Link href="/privacidad" className="text-[#5cae97] underline hover:text-[#4c9c85]">
            Política de Privacidad
          </Link>
          .
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold text-[#5cae97]">Legislación y jurisdicción aplicable</h2>
        <p>
          Para cualquier controversia será de aplicación la legislación española, sometiéndose a los juzgados del
          domicilio del titular del sitio web.
        </p>
      </section>

      <div className="mt-12 text-center">
        <Link href="/inicio" className="inline-block bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-3 px-6 rounded-full shadow-md transition-transform duration-300 hover:scale-105">
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}