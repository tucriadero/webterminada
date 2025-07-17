'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import MiCuenta from '@/components/MiCuenta';
import Image from 'next/image';
import Avatar from '@/components/Avatar';
<<<<<<< HEAD

export default function Inicio() {
  const [menuOpen, setMenuOpen] = useState(false);
=======
import { useUser } from '@supabase/auth-helpers-react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

export default function Inicio() {
  const user = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
>>>>>>> 293fc21 (Tu mensaje de commit)
  const [tipo, setTipo] = useState<'perro' | 'gato'>('perro');
  const [provincia, setProvincia] = useState('');
  const [raza, setRaza] = useState('');
  const router = useRouter();

<<<<<<< HEAD
=======
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

>>>>>>> 293fc21 (Tu mensaje de commit)
  const handleBuscar = () => {
    if (!provincia || !raza) {
      alert('Selecciona provincia y raza');
      return;
    }
    const query = `?tipo=${tipo}&provincia=${encodeURIComponent(provincia)}&raza=${encodeURIComponent(raza)}`;
    router.push(`/busqueda${query}`);
  };

<<<<<<< HEAD
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
=======
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
>>>>>>> 293fc21 (Tu mensaje de commit)

  return (
    <>
      <header className="bg-[#DFF6EA] shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link href="/" className="text-2xl font-bold" style={{ color: '#5cae97' }}>TuCriadero</Link>
          <nav className="hidden md:flex gap-6 text-[#5cae97] font-light">
            <Link href="/inicio">Inicio</Link>
<<<<<<< HEAD
            <Link href="/criaderos">Criaderos</Link>
            <Link href="/perros">Perros</Link>
            <Link href="/gatos">Gatos</Link>
            <Link href="/anuncio" className="font-semibold">Publicar un anuncio</Link>
=======
            <Link href="/perros">Perros</Link>
            <Link href="/gatos">Gatos</Link>
            <button onClick={() => user ? router.push('/anuncio') : setShowPopup(true)} className="font-semibold text-left">Publicar un anuncio</button>
>>>>>>> 293fc21 (Tu mensaje de commit)
            <Link href="/blog">Blog</Link>
            <Link href="/sobre-nosotros">Sobre Nosotros</Link>
            <Link href="/contacto">Contacto</Link>
          </nav>
          <div className="flex items-center gap-4">
<<<<<<< HEAD
            <MiCuenta />
            <Avatar />
=======
            {!user && (
              <>
                <button onClick={() => router.push('/registro')} className="bg-[#5cae97] hover:bg-[#4c9c85] text-white px-4 py-2 rounded-lg text-sm font-medium">Registrarse</button>
                <button onClick={() => router.push('/login')} className="text-[#5cae97] border border-[#5cae97] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8f8f2]">Iniciar sesión</button>
              </>
            )}
            {user && (
              <>
                <MiCuenta />
                <Avatar />
                <button onClick={handleLogout} className="text-[#5cae97] border border-[#5cae97] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8f8f2]">Cerrar sesión</button>
              </>
            )}
>>>>>>> 293fc21 (Tu mensaje de commit)
            <button className="md:hidden text-[#5cae97] text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#DFF6EA] px-6 pb-4 flex flex-col gap-4 text-[#5cae97] font-medium">
            <Link href="/inicio" onClick={() => setMenuOpen(false)}>Inicio</Link>
<<<<<<< HEAD
            <Link href="/criaderos" onClick={() => setMenuOpen(false)}>Criaderos</Link>
            <Link href="/perros" onClick={() => setMenuOpen(false)}>Perros</Link>
            <Link href="/gatos" onClick={() => setMenuOpen(false)}>Gatos</Link>
            <Link href="/anuncio" onClick={() => setMenuOpen(false)}>Publicar un anuncio</Link>
=======
            <Link href="/perros" onClick={() => setMenuOpen(false)}>Perros</Link>
            <Link href="/gatos" onClick={() => setMenuOpen(false)}>Gatos</Link>
            {!user && (
              <>
                <button onClick={() => { setMenuOpen(false); router.push('/registro'); }} className="bg-[#5cae97] hover:bg-[#4c9c85] text-white px-4 py-2 rounded-lg text-sm font-medium">Registrarse</button>
                <button onClick={() => { setMenuOpen(false); router.push('/login'); }} className="border border-[#5cae97] text-[#5cae97] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8f8f2]">Iniciar sesión</button>
              </>
            )}
            {user && (
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="border border-[#5cae97] text-[#5cae97] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#e8f8f2]">Cerrar sesión</button>
            )}
            <button onClick={() => { setMenuOpen(false); user ? router.push('/anuncio') : setShowPopup(true); }} className="text-left">Publicar un anuncio</button>
>>>>>>> 293fc21 (Tu mensaje de commit)
            <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
            <Link href="/contacto" onClick={() => setMenuOpen(false)}>Contacto</Link>
          </div>
        )}
      </header>

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
<<<<<<< HEAD
    <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#5cae97]">
      Encuentra perros y gatos de criadores verificados
    </h1>
    <p className="text-green-800">
      Filtra por tipo, raza y provincia para encontrar tu criadero ideal.
    </p>
=======
<h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#5cae97]">
  Tu nuevo mejor amigo te está esperando
</h1>
<p className="text-green-800 text-base md:text-lg mt-2">
  Descubre perros y gatos criados con amor por criadores verificados en toda España.
</p>
>>>>>>> 293fc21 (Tu mensaje de commit)
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

<<<<<<< HEAD
            <select
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
              value={raza}
              onChange={(e) => setRaza(e.target.value)}
            >
              <option value="">Seleccionar raza</option>
              {(tipo === 'perro' ? razasPerro : razasGato).map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>

            <select
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 w-full"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
            >
              <option value="">Toda España</option>
              {provincias.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
=======
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
>>>>>>> 293fc21 (Tu mensaje de commit)

            <button
              onClick={handleBuscar}
              className="bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-2 rounded-lg w-full"
            >
              Buscar
            </button>
<div className="text-center mt-6 bg-[#e6f5ef] p-5 rounded-xl shadow-sm">
  <h3 className="text-[#5cae97] font-semibold text-lg mb-2">
<<<<<<< HEAD
    ¿Eres criador? ¡Registrate ahora!
  </h3>
  <p className="text-gray-700 mb-4">
    Únete a TuCriadero y conecta con miles de personas que buscan un compañero ideal.
  </p>
  <Link
    href="/registro-criador"
    className="inline-block bg-[#5cae97] hover:bg-[#4c9c85] text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
  >
    Registrate ahora
  </Link>
=======
    ¿Eres criador? ¡Regístrate ahora!
  </h3>
  <p className="text-gray-700 mb-0">
    Únete a TuCriadero y conecta con miles de personas que buscan un compañero ideal.
  </p>
>>>>>>> 293fc21 (Tu mensaje de commit)
</div>
          </div>
        </div>

<section className="mt-16 px-4 max-w-7xl mx-auto space-y-20">
  {/* Últimos Anuncios Publicados */}
  <div>
    <h2 className="text-2xl font-bold text-[#5cae97] mb-6 text-center">Últimos anuncios publicados</h2>
<<<<<<< HEAD
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow p-4 hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          <div className="h-40 bg-gray-200 rounded-lg mb-4" />
=======
    <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
      <div className="flex gap-4 px-2 w-max justify-center items-center max-w-full xl:mx-auto xl:justify-center">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow p-4 w-64 h-64 flex flex-col justify-center items-center hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >
          <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4" />
>>>>>>> 293fc21 (Tu mensaje de commit)
          <h3 className="text-lg font-semibold text-gray-800">Anuncio {i}</h3>
          <p className="text-sm text-gray-600">Descripción breve del anuncio {i}.</p>
        </div>
      ))}
<<<<<<< HEAD
=======
      </div>
>>>>>>> 293fc21 (Tu mensaje de commit)
    </div>
  </div>

   {/* Criadores Destacados */}
  <div>
    <h2 className="text-2xl font-bold text-[#5cae97] mb-6 text-center">Criadores destacados</h2>
<<<<<<< HEAD
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow p-4 text-center hover:shadow-xl hover:-translate-y-1 transition duration-300"
=======
    <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
      <div className="flex gap-4 px-2 w-max justify-center items-center max-w-full xl:mx-auto xl:justify-center">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow p-4 w-64 h-64 flex flex-col justify-center items-center text-center hover:shadow-xl hover:-translate-y-1 transition duration-300"
>>>>>>> 293fc21 (Tu mensaje de commit)
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800">Criador {i}</h3>
          <p className="text-sm text-gray-600">Especializado en raza X</p>
        </div>
      ))}
<<<<<<< HEAD
=======
      </div>
>>>>>>> 293fc21 (Tu mensaje de commit)
    </div>
  </div>

  {/* Últimos Blogs */}
  <div>
    <h2 className="text-2xl font-bold text-[#5cae97] mb-6 text-center">Últimos blogs</h2>
<<<<<<< HEAD
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow p-4 hover:shadow-xl hover:-translate-y-1 transition duration-300"
=======
    <div className="overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
      <div className="flex gap-4 px-2 w-max justify-center items-center max-w-full xl:mx-auto xl:justify-center">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow p-4 w-64 h-64 flex flex-col justify-center items-center hover:shadow-xl hover:-translate-y-1 transition duration-300"
>>>>>>> 293fc21 (Tu mensaje de commit)
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Título del blog {i}</h3>
          <p className="text-sm text-gray-600">Un pequeño resumen o snippet del blog {i}...</p>
        </div>
      ))}
<<<<<<< HEAD
=======
      </div>
>>>>>>> 293fc21 (Tu mensaje de commit)
    </div>
  </div>
</section>

      </main>
<<<<<<< HEAD
{/* Bloque de llamada a la acción para criadores */}
<div className="mt-10 text-center bg-[#dff6ea] py-10 rounded-2xl shadow-inner">
  <h2 className="text-2xl font-bold text-[#5cae97] mb-4">¿Eres criador y aún no estás registrado?</h2>

  <p className="text-gray-700 mb-6">Únete a TuCriadero y conecta con miles de personas que buscan un compañero ideal.</p>
  <Link
  href="/registro-criador"
  className="inline-block bg-gradient-to-r from-[#5cae97] to-[#4c9c85] hover:from-[#4c9c85] hover:to-[#5cae97] text-white font-bold py-3 px-8 rounded-full shadow-md transition-transform duration-300 hover:scale-105"
>
  Registrate ahora
</Link>
</div>
{/* Espacio extra antes del footer */}
<div className="h-10" />
=======
<div className="mt-8 bg-[#e6f5ef] rounded-2xl shadow-inner p-10 text-center max-w-5xl mx-auto">
  <h2 className="text-2xl font-bold text-[#5cae97] mb-3">Confianza, transparencia y conexión directa</h2>
  <p className="text-gray-700 text-sm md:text-base max-w-2xl mx-auto">
    En TuCriadero promovemos la crianza responsable. Aquí encontrarás criadores verificados, sin intermediarios y con toda la información clara para tomar la mejor decisión.
  </p>
  <p className="mt-4 italic text-sm text-gray-600">
    Porque encontrar un compañero fiel también debe ser una experiencia honesta y cuidada.
  </p>
</div>{/* Espacio extra antes del footer */}
<div className="h-8" />
>>>>>>> 293fc21 (Tu mensaje de commit)

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

<<<<<<< HEAD
    </>
=======
    
{showPopup && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
      <h2 className="text-lg font-bold text-[#5cae97] mb-2">Inicia sesión para continuar</h2>
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
)}</>

>>>>>>> 293fc21 (Tu mensaje de commit)
  );
}