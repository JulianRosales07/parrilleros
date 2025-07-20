export const LOCATIONS = {
    'sede-tamasagra': {
      id: 'sede-tamasagra',
      name: 'Tamasagra',
      displayName: 'Sede Tamasagra'
    },
    'sede-san-ignacio': {
      id: 'sede-san-ignacio',
      name: 'San Ignacio',
      displayName: 'Sede San Ignacio'
    },
    'sede-las-cuadras': {
      id: 'sede-las-cuadras',
      name: 'Las Cuadras',
      displayName: 'Sede Las Cuadras'
    }
  } as const;
  
  export type LocationId = keyof typeof LOCATIONS;
  
  export const getLocationDisplayName = (locationId: string): string => {
    return LOCATIONS[locationId as LocationId]?.displayName || locationId;
  };
  
  export const getLocationName = (locationId: string): string => {
    return LOCATIONS[locationId as LocationId]?.name || locationId;
  };
  
  export const isAvailableAtAllLocations = (availableAt?: string[]): boolean => {
    if (!availableAt) return false;
    return availableAt.length === Object.keys(LOCATIONS).length;
  };
  
  export const getAvailabilityMessage = (availableAt?: string[]): {
    type: 'all' | 'limited' | 'single' | 'unknown';
    message: string;
    locations: string[];
  } => {
    if (!availableAt || availableAt.length === 0) {
      return {
        type: 'unknown',
        message: 'Consulta disponibilidad en nuestras sedes',
        locations: []
      };
    }
  
    if (isAvailableAtAllLocations(availableAt)) {
      return {
        type: 'all',
        message: 'Disponible en todas nuestras sedes',
        locations: availableAt.map(getLocationName)
      };
    }
  
    if (availableAt.length === 1) {
      return {
        type: 'single',
        message: `solo ${getLocationName(availableAt[0])}`,
        locations: availableAt.map(getLocationName)
      };
    }
  
    return {
      type: 'limited',
      message: `Disponible en ${availableAt.length} sedes`,
      locations: availableAt.map(getLocationName)
    };
  };