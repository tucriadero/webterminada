import { Suspense } from 'react';
import BusquedaContenido from './BusquedaContenido';

export default function BusquedaPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Cargando búsqueda...</div>}>
      <BusquedaContenido />
    </Suspense>
  );
}
