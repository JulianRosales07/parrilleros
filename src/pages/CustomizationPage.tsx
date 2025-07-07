import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { MenuItem, CustomizationOption } from '../types';
import { useOrder } from '../context/OrderContext';

const CustomizationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { menuItem, options } = location.state as { menuItem: MenuItem; options: CustomizationOption[] };
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<CustomizationOption[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [withFries, setWithFries] = useState(false);
  const { addToCart } = useOrder();

  const toggleOption = (option: CustomizationOption) => {
    if (option.name === 'Agregar papas (+$6.000)') {
      setWithFries(!withFries);
      return;
    }
    
    setSelectedOptions((prevOptions) => {
      const exists = prevOptions.some((item) => item.id === option.id);
      if (exists) {
        return prevOptions.filter((item) => item.id !== option.id);
      } else {
        return [...prevOptions, option];
      }
    });
  };

  const handleAddToCart = () => {
    const customizations = selectedOptions.filter(opt => opt.name !== 'Agregar papas (+$6.000)');
    addToCart(menuItem, quantity, customizations, withFries, specialInstructions);
    
    // Check if it's a burger to show suggestions
    const isBurgerCategory = menuItem.category.includes('burger');
    if (isBurgerCategory) {
      navigate('/suggestions');
    } else {
      navigate('/menu');
    }
  };

  const basePrice = withFries ? (menuItem.priceWithFries || menuItem.price) : menuItem.price;
  const optionsPrice = selectedOptions
    .filter(opt => opt.name !== 'Agregar papas (+$6.000)')
    .reduce((sum, option) => sum + option.price, 0);
  const totalPrice = (basePrice + optionsPrice) * quantity;

  // Group options by type for better organization
  const proteinOptions = options.filter(opt => 
    opt.name.includes('CARNE') || opt.name.includes('CHORIZO') || opt.name.includes('TOCINETA')
  );
  
  const cheeseOptions = options.filter(opt => 
    opt.name.includes('QUESO')
  );
  
  const vegetableOptions = options.filter(opt => 
    opt.name.includes('CEBOLLA') || opt.name.includes('PIÑA') || opt.name.includes('PEPINILLOS') || 
    opt.name.includes('JALAPEÑOS') || opt.name.includes('AROS')
  );
  
  const otherOptions = options.filter(opt => 
    !proteinOptions.includes(opt) && !cheeseOptions.includes(opt) && !vegetableOptions.includes(opt)
  );

  const OptionGroup = ({ title, options, icon }: { title: string; options: CustomizationOption[]; icon: string }) => {
    if (options.length === 0) return null;
    
    return (
      <div className="mb-6">
        <h4 className="font-bold text-lg mb-3 flex items-center text-gray-800">
          <span className="mr-2 text-xl">{icon}</span>
          {title}
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {options.map((option) => (
            <label 
              key={option.id} 
              className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-sm ${
                selectedOptions.some(opt => opt.id === option.id)
                  ? 'border-[#FF8C00] bg-orange-50 shadow-sm'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedOptions.some(opt => opt.id === option.id)}
                  onChange={() => toggleOption(option)}
                  className="w-5 h-5 accent-[#FF8C00] mr-4"
                />
                <span className="text-gray-800 font-medium">
                  {option.name.replace('AD ', '')}
                </span>
              </div>
              {option.price > 0 && (
                <span className="font-bold text-[#FF8C00]">
                  +${option.price.toLocaleString()}
                </span>
              )}
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-md p-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={() => navigate('/menu')}
            className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Personalizar Producto</h1>
            <p className="text-gray-600">Agrega tus ingredientes favoritos</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {/* Product Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="h-48 relative">
            <img 
              src={menuItem.image} 
              alt={menuItem.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl font-bold text-white mb-2">{menuItem.name}</h2>
              <p className="text-white/90">{menuItem.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customization Options */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Fries option - prominent placement */}
              {menuItem.priceWithFries && (
                <div className="mb-6">
                  <label className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-sm ${
                    withFries
                      ? 'border-[#FF8C00] bg-orange-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={withFries}
                        onChange={() => setWithFries(!withFries)}
                        className="w-5 h-5 accent-[#FF8C00] mr-4"
                      />
                      <div>
                        <span className="text-lg font-bold text-gray-800">🍟 Agregar Papas</span>
                        <p className="text-sm text-gray-600">Papas francesas crujientes</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#FF8C00] text-lg">
                      +${((menuItem.priceWithFries || menuItem.price) - menuItem.price).toLocaleString()}
                    </span>
                  </label>
                </div>
              )}

              {/* Organized customization options */}
              <div className="space-y-6">
                <OptionGroup title="Proteínas" options={proteinOptions} icon="🥩" />
                <OptionGroup title="Quesos" options={cheeseOptions} icon="🧀" />
                <OptionGroup title="Vegetales y Extras" options={vegetableOptions} icon="🥬" />
                <OptionGroup title="Otros" options={otherOptions} icon="➕" />
              </div>
              
              {/* Special instructions */}
              <div className="mt-6">
                <h4 className="font-bold text-lg mb-3 flex items-center text-gray-800">
                  <span className="mr-2 text-xl">📝</span>
                  Instrucciones especiales
                </h4>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Ej: Sin cebolla, salsa aparte..."
                  className="w-full p-4 border-2 border-gray-200 rounded-lg resize-none h-24 focus:ring-2 focus:ring-[#FF8C00] focus:border-[#FF8C00] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Resumen</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Precio base:</span>
                  <span>${basePrice.toLocaleString()}</span>
                </div>
                {optionsPrice > 0 && (
                  <div className="flex justify-between">
                    <span>Extras:</span>
                    <span>+${optionsPrice.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-[#FF8C00]">${Math.round(totalPrice).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-medium">Cantidad:</span>
                <div className="flex items-center bg-gray-100 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-l-lg transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-r-lg transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-[#FF8C00] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPage;