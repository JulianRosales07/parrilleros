import { useState, useEffect } from 'react';
import { LocationId } from '../utils/locationUtils';

interface SedeFromURL {
  sedeDetectada: LocationId | null;
  sedeFormateada: string | null;
  esSedeValida: boolean;
}

export const useSedeFromURL = (): SedeFromURL => {
  const [sedeInfo, setSedeInfo] = useState<SedeFromURL>({
    sedeDetectada: null,
    sedeFormateada: null,
    esSedeValida: false
  });

  useEffect(() => {
    const obtenerSedeDesdeURL = (): string | null => {
      const params = new URLSearchParams(window.location.search);
      const sedeParam = params.get("sedes");
      
      // Decodificar URL para manejar espacios correctamente
      const sedeDecodificada = sedeParam ? decodeURIComponent(sedeParam) : null;
      
      return sedeDecodificada;
    };

    const formatearNombreSede = (sede: string | null): { 
      sedeId: LocationId | null; 
      nombreFormateado: string | null 
    } => {
      if (!sede) {
        return { sedeId: null, nombreFormateado: null };
      }

      const sedesMap: Record<string, { id: LocationId; nombre: string }> = {
        "tamasagra": { id: "sede-tamasagra", nombre: "Tamasagra" },
        "san ignacio": { id: "sede-san-ignacio", nombre: "San Ignacio" },
        "las cuadras": { id: "sede-las-cuadras", nombre: "Las Cuadras" },
        // También manejar versiones con %20 (espacios codificados)
        "san%20ignacio": { id: "sede-san-ignacio", nombre: "San Ignacio" },
        "las%20cuadras": { id: "sede-las-cuadras", nombre: "Las Cuadras" }
      };

      const sedeKey = sede.toLowerCase();
      const sedeData = sedesMap[sedeKey];
      
      return {
        sedeId: sedeData?.id || null,
        nombreFormateado: sedeData?.nombre || null
      };
    };

    const sedeCruda = obtenerSedeDesdeURL();
    const { sedeId, nombreFormateado } = formatearNombreSede(sedeCruda);

    setSedeInfo({
      sedeDetectada: sedeId,
      sedeFormateada: nombreFormateado,
      esSedeValida: !!sedeId
    });
  }, []);

  return sedeInfo;
};