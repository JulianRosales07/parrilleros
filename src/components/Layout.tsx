import React from "react";
import { ShoppingCart } from "lucide-react";
import { useOrder } from "../context/OrderContext";
import { useSedeFromURL } from "../hooks/useSedeFromURL";
import LOGOB from "../assets/logos/logoblanco.png";
import LOGO2 from "../assets/logos/logoblanco2.png";


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
            <div className="relative group">
              <img
                src={LOGO2}
                alt="Logo Parrilleros"
                className="h-6 w-auto object-contain drop-shadow-lg filter brightness-110 contrast-110 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-xl"
              />
              {/* Resplandor sutil detrás del logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF8C00]/20 to-transparent rounded-lg blur-sm -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
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
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/parrillerosfastfood/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center hover:scale-110 hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-300 cursor-pointer group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg
                    className="w-5 h-5 text-white drop-shadow-sm z-10 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2ZM16.25 3.5h-8.5a4.25 4.25 0 0 0-4.25 4.25v8.5a4.25 4.25 0 0 0 4.25 4.25h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM17.5 5.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
                  </svg>
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                </a>
               
              </div>
            </div>

            {/* Center - Logo */}
            <div className="flex justify-center">
              <img
                src={LOGOB}
                alt="Parrilleros Fast Food"
                className="h-28 w-auto object-contain opacity-95 hover:opacity-100 transition-opacity duration-300"
              />
            </div>

            {/* Right - Developer Credit */}
            <div className="text-center md:text-right">
              <div className="inline-flex flex-col items-center md:items-end space-y-1 p-3 rounded-lg bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/30 hover:border-[#FF8C00]/30 transition-all duration-300 group">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                  Desarrollado por
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#FF8C00] rounded-full animate-pulse"></div>
                  <p className="text-sm font-bold text-white group-hover:text-[#FF8C00] transition-colors duration-300 tracking-wide">
                    Julian Rosales
                  </p>
                </div>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#FF8C00]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
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
