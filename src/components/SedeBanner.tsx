import React from 'react';
import { MapPin, CheckCircle, AlertTriangle } from 'lucide-react';

interface SedeBannerProps {
  sedeFormateada: string | null;
  esSedeValida: boolean;
}

const SedeBanner: React.FC<SedeBannerProps> = ({ sedeFormateada, esSedeValida }) => {
  if (!sedeFormateada && !esSedeValida) {
    // No mostrar nada si no hay parámetro de sede en la URL
    return null;
  }

  if (esSedeValida && sedeFormateada) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 mb-6 shadow-sm animate-fade-in">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-bold text-green-800 mb-1">
              📍 Realiza tu pedido en la sede: {sedeFormateada}
            </h3>
            <p className="text-sm text-green-700">
              Esta orden será dirigida automáticamente a la sede "{sedeFormateada}". 
              Todos los productos mostrados están disponibles para esta ubicación.
            </p>
          </div>
          <div className="flex-shrink-0">
            <MapPin size={24} className="text-green-600" />
          </div>
        </div>
      </div>
    );
  }

  // Sede no válida
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6 shadow-sm animate-fade-in">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <AlertTriangle size={20} className="text-amber-600" />
          </div>
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold text-amber-800 mb-1">
            ⚠️ Sede no válida detectada
          </h3>
          <p className="text-sm text-amber-700">
            No se ha detectado ninguna sede válida en el enlace. Por favor verifica el enlace o selecciona una sede manualmente al hacer tu pedido.
          </p>
          <div className="mt-3 p-3 bg-amber-100 rounded-md">
            <p className="text-xs text-amber-800 font-medium mb-1">
              💡 Sedes válidas para usar en la URL:
            </p>
            <div className="flex flex-wrap gap-2">
              <code className="bg-white px-2 py-1 rounded text-xs text-amber-700">?sedes=tamasagra</code>
              <code className="bg-white px-2 py-1 rounded text-xs text-amber-700">?sedes=san%20ignacio</code>
              <code className="bg-white px-2 py-1 rounded text-xs text-amber-700">?sedes=las%20cuadras</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SedeBanner;