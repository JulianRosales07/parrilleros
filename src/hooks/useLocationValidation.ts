import { useMemo } from 'react';
import { validateCartForLocation, getLocationValidationMessage } from '../utils/locationUtils';

export const useLocationValidation = (cartItems: any[], selectedLocationId?: string) => {
  return useMemo(() => {
    if (!selectedLocationId) {
      return {
        isValid: false,
        invalidItems: [],
        message: '',
        requiredLocation: undefined,
        hasTamasagraOnlyItems: false
      };
    }

    const validation = validateCartForLocation(cartItems, selectedLocationId);
    const message = getLocationValidationMessage(validation.invalidItems, validation.requiredLocation);
    
    // Detectar productos exclusivos de Tamasagra
    const hasTamasagraOnlyItems = cartItems.some(item => {
      const availableAt = item.menuItem.availableAt;
      return availableAt && availableAt.length === 1 && availableAt[0] === 'sede-tamasagra';
    });

    return {
      isValid: validation.isValid,
      invalidItems: validation.invalidItems,
      message,
      requiredLocation: validation.requiredLocation,
      hasTamasagraOnlyItems
    };
  }, [cartItems, selectedLocationId]);
};