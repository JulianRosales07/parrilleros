import React from "react";
import { ShoppingCart } from "lucide-react";
import { useOrder } from "../context/OrderContext";
import { useSedeFromURL } from "../hooks/useSedeFromURL";
import LOGOB from "../assets/logos/logoblanco.png";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showCart?: boolean;
  showBack?: boolean;
  onBack?: () => void;
  sedeTitle?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  showCart = false,
  showBack = false,
  onBack,
  sedeTitle,
}) => {
  const { cart } = useOrder();
  const { sedeFormateada, esSedeValida } = useSedeFromURL();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Usar sedeTitle si está disponible, sino usar el título con sede detectada
  const finalTitle =
    sedeTitle ||
    (esSedeValida && sedeFormateada ? `Sede: ${sedeFormateada}` : title);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-[#1A1A1A] text-white p-4 shadow-md relative z-30">
        <div className="container mx-auto relative flex items-center justify-between">
          {/* Logo + Título móvil + Botón back */}
          <div className="flex items-center space-x-2">
            {showBack && (
              <button
                onClick={onBack}
                className="p-2 bg-[#FF8C00] rounded-full hover:bg-orange-500 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
            <img
              src={LOGOB}
              alt="Logo Parrilleros"
              className="h-8 w-auto object-contain"
            />
            {/* Título en móviles */}
            {finalTitle && (
              <h2 className="text-base font-semibold text-white md:hidden">
                {finalTitle}
              </h2>
            )}
          </div>

          {/* Título centrado en pantallas md+ */}
          {finalTitle && (
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
              <h2 className="text-xl font-semibold text-white drop-shadow">
                {finalTitle}
              </h2>
            </div>
          )}

          {/* Carrito */}
          {showCart && (
            <div className="relative">
              <button className="p-2 bg-[#FF8C00] rounded-full hover:bg-orange-500 transition-colors">
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-[#FF8C00] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold z-40">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content with Background */}
      <main className="flex-1 menu-page-bg pb-4">{children}</main>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-8 border-t border-gray-700 relative z-20">
        <div className="container mx-auto px-6">
          {/* Top Section - Three columns layout */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-6 md:space-y-0">
            {/* Left - Social Media */}
            <div className="flex items-center space-x-4">
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#FF8C00] transition-colors cursor-pointer">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#FF8C00] transition-colors cursor-pointer">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-[#FF8C00] transition-colors cursor-pointer">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Center - Logo */}
            <div className="flex justify-center">
              <img
                src={LOGOB}
                alt="Parrilleros Fast Food"
                className="h-12 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            {/* Right - Developer Credit */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-300 mb-1">Desarrollado por</p>
              <p className="text-base font-semibold italic text-white hover:text-[#FF8C00] transition-colors duration-300">
                Julian Rosales
              </p>
            </div>
          </div>

          {/* Bottom Section - Copyright */}
          <div className="text-center pt-6 border-t border-gray-700">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Parrilleros Fast Food. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
