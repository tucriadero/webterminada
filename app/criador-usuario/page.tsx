'use client';

<<<<<<< HEAD
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
=======
<<<<<<< HEAD
>>>>>>> b3770a13e18418497f9843c7bf45b5f3d5d4ca5f
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function RegistroCriador() {
  const [formData, setFormData] = useState({
    nombre: '',
    afijo: '',
    email: '',
    password: '',
    telefono: '',
    provincia: '',
    tipo: '',
    raza: '',
    nucleo: '',
    web: '',
    redes: '',
    descripcion: '',
    logo: null as File | null,
});
    nombre: '',
    afijo: '',
    email: '',
    telefono: '',
    provincia: '',
    nucleo: '',
    web: '',
    redes: '',
    logo: null as File | null,
    descripcion: '',
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = createClientComponentClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('Debes iniciar sesión primero');
      return;
    }

    let avatarUrl = null;

    if (formData.logo) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('perfiles')
        .upload(`logos/${user.id}`, formData.logo, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        console.error('Error al subir el logo:', uploadError);
        alert('Error al subir el logo');
        return;
      }

      const { data: urlData } = supabase.storage
        .from('perfiles')
        .getPublicUrl(`logos/${user.id}`);

      avatarUrl = urlData?.publicUrl || null;
    }


          const { error } = await supabase
      .from('profiles')
      .update({
        nombre: formData.nombre,
        afijo: formData.afijo,
        email: formData.email,
        telefono: formData.telefono,
        provincia: formData.provincia,
        tipo: formData.tipo,
        raza: formData.raza,
        nucleo: formData.nucleo,
        web: formData.web,
        redes: formData.redes,
        avatar_url: avatarUrl,
        rol: 'criador',
        descripcion: formData.descripcion,
      })
      .eq('id', user.id);

    if (error) {
      console.error(error);
      alert('Error al guardar el perfil de criador');
    } else {
      alert('Registro como criador completado');
      router.push('/inicio');
    }
  };


  const tipos = ['Perro', 'Gato'];

  const razas = {
    Perro: ['Labrador', 'Bulldog', 'Pastor Alemán', 'Golden Retriever', 'Chihuahua'],
    Gato: ['Siamés', 'Persa', 'Maine Coon', 'Bengalí', 'British Shorthair'],
  };


const provincias = [
  "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres",
  "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Girona", "Granada", "Guadalajara",
  "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "A Coruña", "La Rioja", "Las Palmas", "León",
  "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca",
  "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora",
  "Zaragoza", "Ceuta", "Melilla"
];

  return (
    <main className="min-h-screen bg-green-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <Link
  href="/inicio"
  className="inline-flex items-center bg-[#5cae97] hover:bg-[#4c9c85] text-white font-semibold py-2 px-6 rounded-lg mb-6 transition"
>
  <FaArrowLeft className="mr-2" /> Volver al inicio
</Link>
<<<<<<< HEAD
=======
=======
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function RegistroCriador() {
  const [formData, setFormData] = useState({
    nombre: '',
    afijo: '',
    email: '',
    password: '',
    telefono: '',
    provincia: '',
    tipo: '',
    raza: '',
    nucleo: '',
    web: '',
    redes: '',
    descripcion: '',
    logo: null as File | null,
});
    nombre: '',
    afijo: '',
    email: '',
    telefono: '',
    provincia: '',
    nucleo: '',
    web: '',
    redes: '',
    logo: null as File | null,
    descripcion: '',
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const supabase = createClientComponentClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert('Debes iniciar sesión primero');
      return;
    }

    let avatarUrl = null;

    if (formData.logo) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('perfiles')
        .upload(`logos/${user.id}`, formData.logo, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        console.error('Error al subir el logo:', uploadError);
        alert('Error al subir el logo');
        return;
      }

      const { data: urlData } = supabase.storage
        .from('perfiles')
        .getPublicUrl(`logos/${user.id}`);

      avatarUrl = urlData?.publicUrl || null;
    }


          const { error } = await supabase
      .from('profiles')
      .update({
        nombre: formData.nombre,
        afijo: formData.afijo,
        email: formData.email,
        telefono: formData.telefono,
        provincia: formData.provincia,
        tipo: formData.tipo,
        raza: formData.raza,
        nucleo: formData.nucleo,
        web: formData.web,
        redes: formData.redes,
        avatar_url: avatarUrl,
        rol: 'criador',
        descripcion: formData.descripcion,
      })
      .eq('id', user.id);

    if (error) {
      console.error(error);
      alert('Error al guardar el perfil de criador');
    } else {
      alert('Registro como criador completado');
      router.push('/inicio');
    }
  };


  const tipos = ['Perro', 'Gato'];

  const razas = {
    Perro: ['Labrador', 'Bulldog', 'Pastor Alemán', 'Golden Retriever', 'Chihuahua'],
    Gato: ['Siamés', 'Persa', 'Maine Coon', 'Bengalí', 'British Shorthair'],
  };


const provincias = [
  "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres",
  "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Girona", "Granada", "Guadalajara",
  "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "A Coruña", "La Rioja", "Las Palmas", "León",
  "Lleida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca",
  "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora",
  "Zaragoza", "Ceuta", "Melilla"
];

  return (
    <main className="min-h-screen bg-green-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <Link
  href="/inicio"
  className="inline-flex items-center bg-[#5cae97] hover:bg-[#4c9c85] text-white font-semibold py-2 px-6 rounded-lg mb-6 transition"
>
  <FaArrowLeft className="mr-2" /> Volver al inicio
</Link>
>>>>>>> b3770a13e18418497f9843c7bf45b5f3d5d4ca5f

        <h1 className="text-2xl font-bold text-[#5cae97] mb-6 text-center">Únete como criador</h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium mb-1">Nombre del criadero *</label>
            <input
              type="text"
              required
              className="w-full border rounded px-4 py-2"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Afijo</label>
            <input
              type="text"
              className="w-full border rounded px-4 py-2"
              value={formData.afijo}
              onChange={(e) => setFormData({ ...formData, afijo: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email de contacto *</label>
              <input
                type="email"
                required
                className="w-full border rounded px-4 py-2"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Teléfono *</label>
              <input
                type="tel"
                required
                className="w-full border rounded px-4 py-2"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              />
            </div>
          </div>

          <div>
  <label className="block text-sm font-medium mb-1">Provincia *</label>
  <select
    required
    className="w-full border rounded px-4 py-2"
    value={formData.provincia}
    onChange={(e) => setFormData({ ...formData, provincia: e.target.value })}
  >
    <option value="">Seleccionar provincia</option>
    {provincias.map((prov) => (
      <option key={prov} value={prov}>{prov}</option>
    ))}
  </select>
</div>


          <div>
            <label className="block text-sm font-medium mb-1">Número de núcleo zoológico *</label>
            <input
              type="text"
              required
              className="w-full border rounded px-4 py-2"
              value={formData.nucleo}
              onChange={(e) => setFormData({ ...formData, nucleo: e.target.value })}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Web (opcional)</label>
              <input
                type="url"
                className="w-full border rounded px-4 py-2"
                value={formData.web}
                onChange={(e) => setFormData({ ...formData, web: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Redes sociales (opcional)</label>
              <input
                type="text"
                className="w-full border rounded px-4 py-2"
                value={formData.redes}
                onChange={(e) => setFormData({ ...formData, redes: e.target.value })}
              />
            </div>
          </div>
<div>
  <label className="block text-sm font-medium mb-1">Descripción del criadero *</label>
  <textarea
    required
    className="w-full border rounded px-4 py-2"
    rows={4}
    value={formData.descripcion}
    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
  />
</div>

{/* Casilla de compromiso */}
<div className="mt-4">
  <label className="inline-flex items-start gap-2">
    <input
      type="checkbox"
      required
      className="mt-1 accent-[#4ca388]"
      name="compromiso_bienestar"
    />
    <span className="text-sm text-gray-700">
      Declaro que el criadero está debidamente registrado con número de núcleo zoológico (NZ)
      y me comprometo a garantizar el bienestar animal, cumpliendo con toda la normativa vigente aplicable.
    </span>
  </label>
</div>

          <div>
            <label className="block text-sm font-medium mb-1">Logotipo (opcional)</label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={(e) =>
                setFormData({ ...formData, logo: e.target.files?.[0] || null })
              }
            />
          </div>

          <button
            type="submit"
            className="bg-[#5cae97] hover:bg-[#4c9c85] text-white font-semibold py-2 px-6 rounded-lg"
          >
            Unirme
          </button>
        </form>
      </div>
<<<<<<< HEAD
=======
>>>>>>> 293fc21 (Tu mensaje de commit)
>>>>>>> b3770a13e18418497f9843c7bf45b5f3d5d4ca5f
    </main>
  );
}
