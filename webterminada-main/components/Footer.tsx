import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-10 py-6 text-center text-sm text-gray-600">
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/sobre-nosotros" className="hover:underline">
          Sobre Nosotros
        </Link>
        <Link href="/aviso-legal" className="hover:underline">
          Aviso Legal
        </Link>
        <Link href="/politica-cookies" className="hover:underline">
          Política de Cookies
        </Link>
        <Link href="/contacto" className="hover:underline">
          Contacto
        </Link>
      </div>
      <p className="mt-4">&copy; {new Date().getFullYear()} TuCriadero.es</p>
    </footer>
  );
}
