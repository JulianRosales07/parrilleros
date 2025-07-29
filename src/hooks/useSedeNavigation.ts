import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback } from 'react';

export const useSedeNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener el parámetro de sede actual
  const getSedeParam = useCallback(() => {
    const params = new URLSearchParams(location.search);
    return params.get('sedes');
  }, [location.search]);

  // Navegar preservando el parámetro de sede
  const navigateWithSede = useCallback((path: string, options?: any) => {
    const sedeParam = getSedeParam();
    
    if (sedeParam) {
      const separator = path.includes('?') ? '&' : '?';
      const newPath = `${path}${separator}sedes=${encodeURIComponent(sedeParam)}`;
      navigate(newPath, options);
    } else {
      navigate(path, options);
    }
  }, [navigate, getSedeParam]);

  // Crear URL con parámetro de sede
  const createUrlWithSede = useCallback((path: string) => {
    const sedeParam = getSedeParam();
    
    if (sedeParam) {
      const separator = path.includes('?') ? '&' : '?';
      return `${path}${separator}sedes=${encodeURIComponent(sedeParam)}`;
    }
    
    return path;
  }, [getSedeParam]);

  return {
    navigateWithSede,
    createUrlWithSede,
    sedeParam: getSedeParam()
  };
};