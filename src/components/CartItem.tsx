import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useOrder } from '../context/OrderContext';

interface CartItemProps {
  item: CartItemType;
  readOnly?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, readOnly = false }) => {
  const { menuItem, quantity, customizations, specialInstructions, withFries, friesType } = item;
  const { updateQuantity, removeFromCart } = useOrder();

  const basePrice = withFries ? (menuItem.priceWithFries || menuItem.price) : menuItem.price;
  const customizationsTotal = customizations.reduce(
    (sum, option) => sum + option.price,
    0
  );

  const itemTotal = (basePrice + customizationsTotal) * quantity;

  // Determinar el texto de las papas
  const getFriesText = () => {
    if (!withFries) return '';
    if (friesType === 'rustic') return ' + Papas Rústicas';
    if (friesType === 'french') return ' + Papas Francesas';
    return ' + Papas'; // fallback
  };
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start flex-1">
          <div className="w-20 h-20 rounded-xl overflow-hidden mr-4 flex-shrink-0">
            <img
              src={menuItem.image}
              alt={menuItem.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg leading-tight">
              {menuItem.name}
              {getFriesText()}
            </h3>
            {customizations.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-lg inline-block">
                  {customizations.map((c) => c.name).join(', ')}
                </p>
              </div>
            )}
            {specialInstructions && (
              <p className="text-sm italic text-gray-600 mt-2 bg-yellow-50 px-3 py-2 rounded-lg border-l-4 border-yellow-400">
                <span className="font-medium">Instrucciones:</span> {specialInstructions}
              </p>
            )}
          </div>
        </div>
        <div className="text-right ml-4">
          <span className="font-bold text-[#FF8C00] text-xl">${Math.round(itemTotal).toLocaleString()}</span>
          <p className="text-sm text-gray-500">Total</p>
        </div>
      </div>

      {!readOnly && (
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={() => removeFromCart(item.id)}
            className="flex items-center text-red-500 bg-red-50 px-4 py-2 rounded-lg font-medium"
          >
            <Trash2 size={18} className="mr-2" />
            Eliminar
          </button>

          <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
            <button
              onClick={() => updateQuantity(item.id, quantity - 1)}
              className="p-3 text-gray-600 rounded-l-xl"
              disabled={quantity <= 1}
            >
              <Minus size={20} />
            </button>
            <span className="px-6 py-3 font-bold text-lg text-gray-900 bg-white border-x border-gray-200">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, quantity + 1)}
              className="p-3 text-gray-600 rounded-r-xl"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;