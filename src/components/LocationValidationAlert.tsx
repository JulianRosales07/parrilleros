import React from 'react';
import { AlertTriangle, MapPin, ShoppingCart } from 'lucide-react';
import { validateCartForLocation, getLocationValidationMessage, LOCATIONS } from '../utils/locationUtils';

interface LocationValidationAlertProps {
  cartItems: any[];
  selectedLocationId: string;
  onLocationChange?: () => void;
}

const LocationValidationAlert: React.FC<LocationValidationAlertProps> = ({
  cartItems,
  selectedLocationId,
  onLocationChange
}) => {
  const validation = validateCartForLocation(cartItems, selectedLocationId);
  
  if (validation.isValid) {
    return null;
  }

  const message = getLocationValidationMessage(validation.invalidItems, validation.requiredLocation);
  const isTamasagraRequired = validation.requiredLocation === 'sede-tamasagra';

  return (
    <div className={`rounded-lg p-4 mb-6 border-l-4 ${
      isTamasagraRequired 
        ? 'bg-red-50 border-red-500 border border-red-200' 
        : 'bg-yellow-50 border-yellow-500 border border-yellow-200'
    }`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle 
            size={24} 
            className={isTamasagraRequired ? 'text-red-600' : 'text-yellow-600'} 
          />
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-sm font-bold ${
            isTamasagraRequired ? 'text-red-800' : 'text-yellow-800'
          }`}>
            {isTamasagraRequired ? '🚫 Productos no disponibles en esta sede' : '⚠️ Productos con disponibilidad limitada'}
          </h3>
          <p className={`text-sm mt-1 ${
            isTamasagraRequired ? 'text-red-700' : 'text-yellow-700'
          }`}>
            {message}
          </p>
          
          {/* Lista de productos afectados */}
          <div className="mt-3">
            <p className={`text-xs font-medium ${
              isTamasagraRequired ? 'text-red-800' : 'text-yellow-800'
            }`}>
              Productos afectados:
            </p>
            <ul className="mt-1 space-y-1">
              {validation.invalidItems.map((item, index) => (
                <li key={index} className={`text-xs flex items-center ${
                  isTamasagraRequired ? 'text-red-700' : 'text-yellow-700'
                }`}>
                  <ShoppingCart size={12} className="mr-2" />
                  {item.menuItem.name} (x{item.quantity})
                </li>
              ))}
            </ul>
          </div>

          {/* Botón para cambiar ubicación */}
          {onLocationChange && (
            <div className="mt-4">
              <button
                onClick={onLocationChange}
                className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  isTamasagraRequired
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-yellow-600 text-white hover:bg-yellow-700'
                }`}
              >
                <MapPin size={14} className="mr-1" />
                {isTamasagraRequired ? 'Cambiar a Sede Tamasagra' : 'Cambiar Sede'}
              </button>
            </div>
          )}

          {/* Información adicional para Tamasagra */}
          {isTamasagraRequired && (
            <div className="mt-3 p-3 bg-red-100 rounded-md">
              <div className="flex items-center">
                <MapPin size={16} className="text-red-600 mr-2" />
                <div>
                  <p className="text-xs font-medium text-red-800">
                    Sede Tamasagra
                  </p>
                  <p className="text-xs text-red-700">
                    {LOCATIONS['sede-tamasagra']?.displayName}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationValidationAlert;