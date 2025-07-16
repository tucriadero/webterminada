'use client';
import { useRouter } from 'next/navigation';

export default function Contactar({
  usuarioIdDelCriador,
  anuncioId,
}: {
  usuarioIdDelCriador: string;
  anuncioId: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/chat/${usuarioIdDelCriador}?anuncio=${anuncioId}`);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Contactar con el criador
    </button>
  );
}
