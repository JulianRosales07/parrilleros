import React from 'react';
import { useOrder } from '../context/OrderContext';
import CartItem from './CartItem';
import { ShoppingBag, AlertTriangle } from 'lucide-react';

interface OrderSummaryProps {
  showItems?: boolean;
  isReceipt?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ 
  showItems = true, 
  isReceipt = false 
}) => {
  const { cart, total, orderNumber, currentOrder } = useOrder();
  const items = isReceipt && currentOrder ? currentOrder.items : cart;
  const orderTotal = isReceipt && currentOrder ? currentOrder.total : total;

  // Detectar productos exclusivos de Tamasagra
  const tamasagraOnlyItems = items.filter(item => {
    const availableAt = item.menuItem.availableAt;
    return availableAt && availableAt.length === 1 && availableAt[0] === 'sede-tamasagra';
  });

  if (items.length === 0 && !isReceipt) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8 text-center border border-gray-200">
        <div className="text-gray-400 my-8">
          <div className="bg-white rounded-full p-6 w-24 h-24 mx-auto mb-6 shadow-md">
            <ShoppingBag size={48} className="mx-auto text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Tu carrito está vacío</h3>
          <p className="text-gray-500">Añade productos del menú para comenzar tu pedido</p>
        </div>
      </div>
    );
  }

  // Cálculos de impuestos corregidos - INC (Ipoconsumo) en lugar de IVA
  const subtotal = orderTotal * 0.92; // Base gravable (92%)
  const inc = orderTotal * 0.08; // INC - Ipoconsumo (8%)

  return (
    <div className={`${isReceipt ? 'text-sm' : 'bg-white rounded-2xl shadow-lg border border-gray-100 p-6'}`}>
      {!isReceipt && (
        <div className="flex items-center mb-6">
          <div className="bg-[#FF8C00] rounded-full p-2 mr-3">
            <ShoppingBag size={20} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Tu Pedido</h2>
        </div>
      )}

      {/* Alerta para productos exclusivos de Tamasagra */}
      {!isReceipt && tamasagraOnlyItems.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <AlertTriangle size={20} className="text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-purple-800 mb-1">
                📍 Productos exclusivos de Tamasagra
              </h4>
              <p className="text-xs text-purple-700 mb-2">
                Tu carrito contiene productos que solo están disponibles en la sede Tamasagra:
              </p>
              <ul className="text-xs text-purple-700 space-y-1">
                {tamasagraOnlyItems.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-1 h-1 bg-purple-400 rounded-full mr-2"></span>
                    {item.menuItem.name} (x{item.quantity})
                  </li>
                ))}
              </ul>
              <p className="text-xs text-purple-600 mt-2 font-medium">
                💡 Recuerda seleccionar la sede Tamasagra al momento de hacer tu pedido.
              </p>
            </div>
          </div>
        </div>
      )}

      {showItems && (
        <div className={`${isReceipt ? 'mb-3' : 'max-h-[500px] overflow-y-auto pr-2 mb-6 space-y-1'}`}>
          {items.map((item) => (
            <div key={item.id} className={`${isReceipt ? 'mb-2 pb-2 border-b border-gray-100' : ''}`}>
              <CartItem item={item} readOnly={isReceipt} />
            </div>
          ))}
        </div>
      )}

      <div className={`bg-gray-50 rounded-xl p-4 ${isReceipt ? 'text-xs' : ''}`}>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Subtotal:</span>
            <span className="font-semibold text-gray-900">${Math.round(subtotal).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">INC (8%):</span>
            <span className="font-semibold text-gray-900">${Math.round(inc).toLocaleString()}</span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className={`flex justify-between items-center bg-[#FF8C00] text-white rounded-lg p-4 ${isReceipt ? 'text-sm' : 'text-xl'}`}>
              <span className="font-bold">Total a Pagar:</span>
              <span className="font-bold">${Math.round(orderTotal).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;