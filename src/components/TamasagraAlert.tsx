import React from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';

interface TamasagraAlertProps {
  show: boolean;
  productName: string;
  onClose?: () => void;
}

const TamasagraAlert: React.FC<TamasagraAlertProps> = ({ 
  show, 
  productName, 
  onClose 
}) => {
  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-purple-50 border border-purple-200 rounded-lg shadow-lg p-4 animate-slide-in-right">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <MapPin size={16} className="text-purple-600" />
            </div>
          </div>
          <div className="ml-3 flex-1">
            <h4 className="text-sm font-bold text-purple-800 mb-1">
              📍 Producto exclusivo agregado
            </h4>
            <p className="text-xs text-purple-700 mb-2">
              <strong>{productName}</strong> solo está disponible en la sede Tamasagra.
            </p>
            <p className="text-xs text-purple-600 font-medium">
              💡 Recuerda seleccionar la sede Tamasagra al hacer tu pedido.
            </p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 text-purple-400 hover:text-purple-600 transition-colors"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TamasagraAlert;