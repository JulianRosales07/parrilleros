import React from 'react';
import { useOrder } from '../context/OrderContext';
import CartItem from './CartItem';
import { ShoppingBag } from 'lucide-react';

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