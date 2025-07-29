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
export const validateCartForLocation = (cartItems: any[], selectedLocationId: string): {
  isValid: boolean;
  invalidItems: any[];
  requiredLocation?: string;
} => {
  const invalidItems = cartItems.filter(item => {
    const availableAt = item.menuItem.availableAt;
    if (!availableAt || availableAt.length === 0) {
      return false; // Si no tiene restricciones, está disponible en todas partes
    }
    return !availableAt.includes(selectedLocationId);
  });

  // Verificar si hay productos exclusivos de Tamasagra
  const tamasagraOnlyItems = invalidItems.filter(item => {
    const availableAt = item.menuItem.availableAt;
    return availableAt && availableAt.length === 1 && availableAt[0] === 'sede-tamasagra';
  });

  return {
    isValid: invalidItems.length === 0,
    invalidItems,
    requiredLocation: tamasagraOnlyItems.length > 0 ? 'sede-tamasagra' : undefined
  };
};

export const getLocationValidationMessage = (invalidItems: any[], requiredLocation?: string): string => {
  if (invalidItems.length === 0) return '';
  
  if (requiredLocation === 'sede-tamasagra') {
    const itemNames = invalidItems.map(item => item.menuItem.name).join(', ');
    return `Los siguientes productos solo están disponibles en la sede Tamasagra: ${itemNames}. Por favor selecciona la sede Tamasagra para continuar con tu pedido.`;
  }
  
  const itemNames = invalidItems.map(item => item.menuItem.name).join(', ');
  return `Los siguientes productos no están disponibles en la sede seleccionada: ${itemNames}. Por favor selecciona una sede donde estén disponibles.`;
};