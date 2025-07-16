'use client';

import Link from 'next/link';
import Image from 'next/image';

const blogPosts = [
  {
    id: 1,
    titulo: 'Cómo elegir el criadero ideal',
    resumen: 'Consejos prácticos para encontrar un criadero responsable y adaptado a tus necesidades.',
    imagen: '/background.jpg',
  },
  {
    id: 2,
    titulo: 'Cuidados esenciales del cachorro',
    resumen: 'Lo que necesitas saber los primeros días tras adoptar un perro o gato.',
    imagen: '/background.jpg',
  },
  {
    id: 3,
    titulo: 'Diferencias entre razas pequeñas y grandes',
    resumen: 'Ventajas y desafíos según el tamaño del animal que elijas.',
    imagen: '/background.jpg',
  },
  {
    id: 4,
    titulo: 'Adopción responsable vs. compra',
    resumen: 'Reflexión sobre las diferencias y responsabilidades en cada caso.',
    imagen: '/background.jpg',
  },
];

export default function BlogPage() {
  return (
    <main className="bg-[#E8F8F2] min-h-screen px-4 py-10">
      <Link href="/inicio" className="text-[#5cae97] hover:underline text-sm mb-4 inline-block">
        ← Volver a inicio
      </Link>

      <h1 className="text-3xl font-bold text-[#5cae97] mb-10 text-center">
        Consejos y artículos del blog
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="w-full h-40 relative bg-gray-200">
              <Image
                src={post.imagen}
                alt={post.titulo}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[#5cae97] mb-1 text-sm">{post.titulo}</h3>
              <p className="text-sm text-gray-700">{post.resumen}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
