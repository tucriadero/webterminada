'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ConsejosPage() {
  return (
    <main className="bg-[#E8F8F2] min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* 🐾 Logo pata arriba */}
        <div className="flex justify-center mb-4">
          <Image
            src="/logo-criador.png"
            alt="Logo TuCriadero"
            width={80}
            height={80}
            priority
            className="opacity-90"
          />
        </div>

        <h1 className="text-4xl font-bold text-[#5cae97] text-center mb-6">
          Consejos y Guías
        </h1>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Aprende sobre el cuidado, la adopción y la cría responsable de perros
          y gatos. En TuCriadero te ayudamos a ofrecerles la mejor vida posible.
        </p>

        {/* Tarjetas de artículos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="/consejos/como-elegir-un-buen-criador"
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 text-left"
          >
            <Image
              src="/blog/criador.jpg"
              alt="Cómo elegir un buen criador"
              width={500}
              height={300}
              className="rounded-lg mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-[#5cae97] mb-2">
              Cómo elegir un buen criador
            </h2>
            <p className="text-gray-600 text-sm">
              Claves para reconocer un criador responsable y evitar estafas.
            </p>
          </Link>

          <Link
            href="/consejos/cuidados-de-un-cachorro"
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 text-left"
          >
            <Image
              src="/blog/cachorro.jpg"
              alt="Cuidados de un cachorro"
              width={500}
              height={300}
              className="rounded-lg mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-[#5cae97] mb-2">
              Cuidados básicos de un cachorro
            </h2>
            <p className="text-gray-600 text-sm">
              Alimentación, vacunas y adaptación para un comienzo feliz.
            </p>
          </Link>

          <Link
            href="/consejos/adoptar-un-gato"
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 text-left"
          >
            <Image
              src="/blog/gato.jpg"
              alt="Adoptar un gato"
              width={500}
              height={300}
              className="rounded-lg mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-[#5cae97] mb-2">
              Qué tener en cuenta antes de adoptar un gato
            </h2>
            <p className="text-gray-600 text-sm">
              Todo lo que necesitas preparar antes de dar la bienvenida a un
              nuevo felino en casa.
            </p>
          </Link>
        </div>

        {/* Botón volver */}
        <div className="mt-16">
          <Link
            href="/inicio"
            className="inline-block bg-[#5cae97] text-white px-6 py-3 rounded-lg hover:bg-[#4c9c85] transition"
          >
            Volver a inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
