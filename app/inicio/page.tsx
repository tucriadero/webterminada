'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

export default function Inicio() {
  const user = useUser();
  const [showPopup, setShowPopup] = useState(false);
  const [tipo, setTipo] = useState<'perro' | 'gato'>('perro');
  const [provincia, setProvincia] = useState('');
  const [raza, setRaza] = useState('');
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error('Hubo un error al cerrar sesión.');
        console.error('Error al cerrar sesión:', error.message);
        return;
      }
      toast.success('Sesión cerrada correctamente');
      router.push('/inicio');
    } catch (err) {
      toast.error('Algo salió mal. Intenta de nuevo.');
      console.error('Error inesperado:', err);
    }
  };

  const handleBuscar = () => {
    const sinProvincia = provincia.trim() === '';
    const sinRaza = raza.trim() === '';

    const query = new URLSearchParams();
    query.set('tipo', tipo);
    if (!sinProvincia) query.set('provincia', provincia);
    if (!sinRaza) query.set('raza', raza);

    router.push(`/busqueda?${query.toString()}`);
  };

  const razasPerro = [
    "Affenpinscher", "Akita Inu", "Alaskan Malamute", "American Bully", "American Staffordshire Terrier",
    "Basenji", "Basset Hound", "Beagle", "Bearded Collie", "Bedlington Terrier", "Bichón Frisé", "Bichón Maltés",
    "Border Collie", "Boston Terrier", "Boxer", "Braco Alemán", "Bull Terrier", "Bulldog Francés", "Bulldog Inglés",
    "Cairn Terrier", "Caniche (Poodle)", "Carlino (Pug)", "Chihuahua", "Chow Chow", "Cocker Spaniel Inglés",
    "Collie", "Dálmata", "Dogo Alemán", "Dogo Argentino", "Doberman", "Fox Terrier", "Galgo Español", "Golden Retriever",
    "Gran Danés", "Husky Siberiano", "Jack Russell Terrier", "Labrador Retriever", "Lhasa Apso", "Mastín Español",
    "Papillón", "Pastor Alemán", "Pastor Australiano", "Pastor Belga", "Pequinés", "Perro de Agua Español",
    "Perro Lobo Checoslovaco", "Pitbull", "Pointer", "Pomerania", "Rottweiler", "Schnauzer Miniatura", "Setter Irlandés",
    "Shar Pei", "Shiba Inu", "Shih Tzu", "Staffordshire Bull Terrier", "Teckel (Dachshund)", "Terranova", "Vizsla",
    "Weimaraner", "West Highland White Terrier", "Whippet", "Yorkshire Terrier"
  ];
  const razasGato = [
    "Ragdoll", "Sphynx", "Persa", "Maine Coon", "British Shorthair", "Siamés", "Bengalí", "Azul Ruso", "Abisinio",
    "Exótico de Pelo Corto", "Bombay", "Burmés", "Himalayo", "Korat", "Manx", "Oriental", "Scottish Fold",
    "Selkirk Rex", "Somalí", "Van Turco"
  ];
  const provincias = [
    "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres",
    "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Girona", "Granada", "Guadalajara",
    "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "A Coruña", "La Rioja", "Las Palmas", "León",
    "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca",
    "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora",
    "Zaragoza", "Ceuta", "Melilla"
  ];

  return (
    <>
   
      <main className="bg-[#DFF6EA] py-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="max-w-xl space-y-4 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/logo-criador.png"
                alt="Logo criador"
                width={80}
                height={80}
                className="mb-4 w-16 h-16 md:w-24 md:h-24 transition-transform duration-300 md:hover:scale-105 drop-shadow-md"
                priority
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#5cae97]">
              Tu nuevo mejor amigo te está esperando
            </h1>
            <p className="text-green-800 text-base md:text-lg mt-2">
              Descubre perros y gatos criados con amor por criadores verificados en toda España.
            </p>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-lg w-full md:max-w-md space-y-4">
            <div className="flex justify-start">
              <div className="inline-flex rounded-full overflow-hidden border border-gray-300">
                <button
                  className={`px-4 py-1 text-sm font-medium ${tipo === 'perro' ? 'bg-[#5cae97] text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setTipo('perro')}
                >
                  Perros
                </button>
                <button
                  className={`px-4 py-1 text-sm font-medium ${tipo === 'gato' ? 'bg-[#5cae97] text-white' : 'bg-white text-gray-700'}`}
                  onClick={() => setTipo('gato')}
                >
                  Gatos
                </button>
              </div>
            </div>

            <select
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
              value={raza}
              onChange={(e) => setRaza(e.target.value)}
            >
              <option value="">Todas las razas</option>
              {(tipo === 'perro' ? razasPerro : razasGato).map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <select
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
            >
              <option value="">Toda España</option>
              {provincias.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <button
              onClick={handleBuscar}
              className="bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-2 rounded-lg w-full"
            >
              Buscar
            </button>

            <div className="text-center mt-6 bg-[#e6f5ef] p-5 rounded-xl shadow-sm">
              <h3 className="text-[#5cae97] font-semibold text-lg mb-2">
                ¿Eres criador? ¡Regístrate ahora!
              </h3>
              <p className="text-gray-700 mb-0">
                Únete a TuCriadero y conecta con miles de personas que buscan un compañero ideal.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-16 max-w-7xl mx-auto space-y-20 px-4">
          {/* Últimos Anuncios Publicados */}
          <div>
            <h2 className="text-2xl font-bold text-[#5cae97] mb-6 text-center">Últimos anuncios publicados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow p-4 w-full max-w-xs h-64 flex flex-col justify-center items-center hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4 w-full" />
                  <h3 className="text-lg font-semibold text-gray-800 text-center">Anuncio {i}</h3>
                  <p className="text-sm text-gray-600 text-center">Descripción breve del anuncio {i}.</p>
                </div>
              ))}
            </div>
          </div>

          {/* Criadores Destacados */}
          <div>
            <h2 className="text-2xl font-bold text-[#5cae97] mb-6 text-center">Criadores destacados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow p-4 w-full max-w-xs h-64 flex flex-col justify-center items-center text-center hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-300 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800">Criador {i}</h3>
                  <p className="text-sm text-gray-600">Especializado en raza X</p>
                </div>
              ))}
            </div>
          </div>

          {/* Últimos Blogs */}
          <div>
            <h2 className="text-2xl font-bold text-[#5cae97] mb-6 text-center">Últimos blogs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow p-4 w-full max-w-xs h-64 flex flex-col justify-center items-center hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">Título del blog {i}</h3>
                  <p className="text-sm text-gray-600 text-center">Un pequeño resumen o snippet del blog {i}...</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="mt-8 bg-[#e6f5ef] rounded-2xl shadow-inner p-10 text-center max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-[#5cae97] mb-3">Confianza, transparencia y conexión directa</h2>
        <p className="text-gray-700 text-sm md:text-base max-w-2xl mx-auto">
          En TuCriadero promovemos la crianza responsable. Aquí encontrarás criadores verificados, sin intermediarios y con toda la información clara para tomar la mejor decisión.
        </p>
        <p className="mt-4 italic text-sm text-gray-600">
          Porque encontrar un compañero fiel también debe ser una experiencia honesta y cuidada.
        </p>
      </div>

      {/* Espacio extra antes del footer */}
      <div className="h-8" />

      {/* Footer */}
      <footer className="bg-[#DFF6EA] text-center text-sm text-gray-600 py-8">
        <div className="mb-2">
          © {new Date().getFullYear()} TuCriadero.es · Todos los derechos reservados
        </div>

        {/* Enlaces legales y contacto */}
        <div className="flex justify-center flex-wrap gap-4 items-center mb-4 text-[#5cae97] font-medium">
          <Link href="/aviso-legal" className="hover:underline">Aviso legal</Link>
          <Link href="/privacidad" className="hover:underline">Política de privacidad</Link>
          <Link href="/cookies" className="hover:underline">Política de cookies</Link>
          <Link href="/contacto" className="hover:underline">Contacto</Link>
        </div>

        {/* Redes sociales */}
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://instagram.com/tucriadero_es" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.svg" alt="Instagram" className="h-6 hover:scale-110 transition-transform" />
          </a>
          <a href="https://www.tiktok.com/@tucriadero" target="_blank" rel="noopener noreferrer">
            <img src="/tiktok.svg" alt="TikTok" className="h-6 hover:scale-110 transition-transform" />
          </a>
          <a href="https://twitter.com/tucriadero" target="_blank" rel="noopener noreferrer">
            <img src="/twitter.svg" alt="Twitter" className="h-6 hover:scale-110 transition-transform" />
          </a>
        </div>
      </footer>

      {showPopup && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-bold text-[#5cae97] mb-2">Accede para continuar</h2>
            <p className="text-gray-700 mb-4">
              Debes iniciar sesión con tu cuenta para poder publicar un anuncio.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-xl"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowPopup(false);
                  router.push('/login');
                }}
                className="bg-[#5cae97] hover:bg-[#4c9c85] text-white px-4 py-2 rounded-xl"
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
