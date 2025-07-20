import { useMemo } from 'react';
import { MenuItem } from '../types';
import { LocationId } from '../utils/locationUtils';

export const useLocationFilter = (
  menuItems: MenuItem[],
  selectedLocation: LocationId | 'all'
) => {
  return useMemo(() => {
    if (selectedLocation === 'all') {
      return menuItems;
    }

    return menuItems.filter(item => {
      // If no availableAt is specified, assume it's available everywhere
      if (!item.availableAt || item.availableAt.length === 0) {
        return true;
      }

      return item.availableAt.includes(selectedLocation);
    });
  }, [menuItems, selectedLocation]);
};