import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = createClient();
  const formData = await req.formData();

  const file = formData.get('imagen') as File;

  if (!file) {
    console.error('⚠️ Imagen no recibida');
    return NextResponse.json({ error: 'No se recibió la imagen' }, { status: 400 });
  }

  // Nombre único para la imagen
  const nombreArchivo = `anuncio-${Date.now()}-${file.name}`;

  // Subir imagen al bucket 'anuncios'
  const { data: subida, error: errorUpload } = await supabase.storage
    .from('anuncios')
    .upload(nombreArchivo, file, {
      cacheControl: '3600',
      upsert: false,
    });

  // Mostrar resultado en consola
  console.log('📦 Subida resultado:', subida);
  console.log('❌ Error resultado:', errorUpload);

  if (errorUpload) {
    return NextResponse.json({ error: errorUpload.message }, { status: 500 });
  }

  // URL pública de la imagen subida
  const urlImagen = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/anuncios/${nombreArchivo}`;

  // Leer el resto del formulario
  const titulo = formData.get('titulo')?.toString() || '';
  const descripcion = formData.get('descripcion')?.toString() || '';

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  // Guardar anuncio en la base de datos
  const { error: errorDB } = await supabase.from('anuncios').insert([
    {
      titulo,
      descripcion,
      imagen_url: urlImagen,
      usuario_id: user.id,
    },
  ]);

  if (errorDB) {
    console.error('❌ Error al guardar en la base de datos:', errorDB);
    return NextResponse.json({ error: 'Error al guardar el anuncio' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
