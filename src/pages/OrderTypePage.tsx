import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Truck, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

const OrderTypePage: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useOrder();
  const [selectedType, setSelectedType] = useState<'delivery' | 'pickup' | null>(null);

  const handleBack = () => {
    navigate('/cart');
  };

  const handleContinue = () => {
    if (!selectedType) return;
    
    if (selectedType === 'delivery') {
      navigate('/delivery-form');
    } else {
      navigate('/pickup-form');
    }
  };

  const orderTypes = [
    {
      id: 'delivery' as const,
      title: 'Entrega a Domicilio',
      subtitle: 'Te llevamos tu pedido hasta tu puerta',
      icon: <Truck size={48} className="text-[#FF8C00]" />,
      features: [
        'Entrega en 45-60 minutos',
        'Cobertura en toda la ciudad',
        'Seguimiento del pedido',
        'Pago contra entrega'
      ],
      color: 'border-[#FF8C00] bg-orange-50'
    },
    {
      id: 'pickup' as const,
      title: 'Recoger en el Lugar',
      subtitle: 'Recoge tu pedido en nuestra sede',
      icon: <MapPin size={48} className="text-green-600" />,
      features: [
        'Listo en 15-20 minutos',
        'Sin costo de envío',
        'Producto más fresco',
        'Atención personalizada'
      ],
      color: 'border-green-600 bg-green-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={handleBack}
            className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">¿Cómo quieres recibir tu pedido?</h1>
            <p className="text-gray-600">Elige la opción que más te convenga</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Resumen de tu pedido</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} producto{cart.length !== 1 ? 's' : ''}
              </p>
              <p className="text-sm text-gray-500">
                {cart.map(item => item.menuItem.name).join(', ')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-[#FF8C00]">
                ${cart.reduce((sum, item) => {
                  const basePrice = item.withFries ? (item.menuItem.priceWithFries || item.menuItem.price) : item.menuItem.price;
                  const customizationsTotal = item.customizations.reduce((sum, option) => sum + option.price, 0);
                  return sum + (basePrice + customizationsTotal) * item.quantity;
                }, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Order Type Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {orderTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] border-2 ${
                selectedType === type.id
                  ? type.color + ' shadow-xl scale-[1.02]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {selectedType === type.id && (
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg">
                  <CheckCircle size={24} className="text-green-600" />
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="mr-4">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{type.title}</h3>
                    <p className="text-gray-600">{type.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {type.id === 'delivery' && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center">
                      <Clock size={20} className="text-blue-600 mr-2" />
                      <span className="text-sm text-blue-800 font-medium">
                        Tiempo estimado: 45-60 minutos
                      </span>
                    </div>
                  </div>
                )}

                {type.id === 'pickup' && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <Clock size={20} className="text-green-600 mr-2" />
                      <span className="text-sm text-green-800 font-medium">
                        Listo para recoger: 15-20 minutos
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className={`w-full py-4 font-bold rounded-lg text-lg flex items-center justify-center transition-all ${
              selectedType
                ? 'bg-[#FF8C00] text-white hover:bg-orange-600 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {selectedType ? (
              <>
                <CheckCircle size={24} className="mr-2" />
                Continuar con {selectedType === 'delivery' ? 'Entrega a Domicilio' : 'Recogida en Sede'}
              </>
            ) : (
              <>
                Selecciona una opción para continuar
              </>
            )}
          </button>
          
          {selectedType && (
            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">
                    Opción seleccionada: {selectedType === 'delivery' ? 'Entrega a Domicilio' : 'Recogida en Sede'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedType === 'delivery' 
                      ? 'Completa tus datos de entrega en el siguiente paso'
                      : 'Selecciona tu sede preferida en el siguiente paso'
                    }
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

export default OrderTypePage;