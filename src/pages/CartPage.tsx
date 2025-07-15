import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Layout from '../components/Layout';
import TourButton from '../components/TourButton';
import { useOrder } from '../context/OrderContext';
import OrderSummary from '../components/OrderSummary';
import { useDriverTour, cartTourSteps } from '../hooks/useDriverTour';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useOrder();
  const [showTourButton, setShowTourButton] = useState(true);

  const { startTour } = useDriverTour({
    steps: cartTourSteps,
    onDestroyed: () => {
      setShowTourButton(false);
      setTimeout(() => {
        setShowTourButton(true);
      }, 30000);
    }
  });

  // Auto-start tour for first-time users
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('parrilleros-cart-tour-seen');
    if (!hasSeenTour && cart.length > 0) {
      const timer = setTimeout(() => {
        startTour();
        localStorage.setItem('parrilleros-cart-tour-seen', 'true');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [startTour, cart.length]);
  
  const handleBackToMenu = () => {
    navigate('/menu');
  };

  const handleOrderType = () => {
    navigate('/order-type');
  };

  const handleStartTour = () => {
    startTour();
  };

  return (
    <Layout title="Tu pedido" showBack onBack={handleBackToMenu}>
      <div className="container mx-auto max-w-2xl py-6 px-4">
        <div data-tour="order-summary">
          <OrderSummary />
        </div>
        
        <div className="mt-8 flex flex-col gap-4">
          {cart.length > 0 && (
            <button
              data-tour="delivery-button"
              onClick={handleOrderType}
              className="w-full py-5 bg-[#FF8C00] text-white font-bold rounded-2xl text-lg shadow-lg border-2 border-[#FF8C00] flex items-center justify-center gap-3"
            >
              <ShoppingBag size={24} />
              <span>Continuar con el Pedido</span>
            </button>
          )}
          
          <button
            data-tour="add-more-button"
            onClick={handleBackToMenu}
            className={`w-full py-4 font-bold rounded-2xl text-lg border-2 ${
              cart.length > 0 
                ? 'bg-white text-[#FF8C00] border-[#FF8C00] shadow-md' 
                : 'bg-[#FF8C00] text-white border-[#FF8C00] shadow-lg'
            }`}
          >
            {cart.length > 0 ? 'Agregar más productos' : 'Volver al menú'}
          </button>
        </div>

        {/* Tour Button - Pequeño en esquina inferior izquierda */}
        {showTourButton && cart.length > 0 && (
          <TourButton 
            onStartTour={handleStartTour}
            variant="floating"
            size="sm"
            className="bottom-6 left-6"
          />
        )}
      </div>
    </Layout>
  );
};

export default CartPage;