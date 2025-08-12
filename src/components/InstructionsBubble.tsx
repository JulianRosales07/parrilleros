import React, { useState } from 'react';
import { HelpCircle, X, Smartphone, Monitor } from 'lucide-react';

const InstructionsBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBubble = () => {
    setIsOpen(!isOpen);
  };

  const closeBubble = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Bubble Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleBubble}
          className="bg-[#FF8C00] text-white p-4 rounded-full shadow-2xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-110 animate-pulse"
          aria-label="Ayuda con ventanas emergentes"
        >
          <HelpCircle size={24} />
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#FF8C00] to-orange-600 text-white p-6 rounded-t-3xl">
              <button
                onClick={closeBubble}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
              >
                <X size={20} className="text-white" />
              </button>

              <div className="flex items-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 mr-4">
                  <Smartphone size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">📦 Pasos para solicitar el domicilio</h2>
                  <p className="text-orange-100">Configura tu navegador para recibir notificaciones</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">

              {/* iPhone Instructions */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-2xl p-3 mr-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-800 mb-1">iPhone (iOS)</h3>
                    <p className="text-blue-600 text-sm">Para dispositivos Apple</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-blue-700 font-bold text-sm">1</span>
                    </div>
                    <p className="text-blue-800 font-medium">Abre <strong>Ajustes</strong> en tu dispositivo.</p>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-blue-700 font-bold text-sm">2</span>
                    </div>
                    <p className="text-blue-800 font-medium">Busca la aplicación <strong>Safari</strong> o <strong>Google Chrome</strong> (la que utilices).</p>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-blue-700 font-bold text-sm">3</span>
                    </div>
                    <p className="text-blue-800 font-medium">Ingresa a la configuración de esa aplicación.</p>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-blue-700 font-bold text-sm">4</span>
                    </div>
                    <p className="text-blue-800 font-medium">Localiza la opción <strong>"Bloquear ventanas emergentes"</strong>.</p>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-blue-700 font-bold text-sm">5</span>
                    </div>
                    <p className="text-blue-800 font-medium">Si está activada, <strong>desactívala</strong>.</p>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-blue-700 font-bold text-sm">6</span>
                    </div>
                    <p className="text-blue-800 font-medium">Cierra la aplicación y procede a realizar tu pedido.</p>
                  </div>
                </div>
              </div>

              {/* Android Instructions */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 rounded-2xl p-3 mr-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-1">Android</h3>
                    <p className="text-green-600 text-sm">Para dispositivos Android</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-green-700 font-bold text-sm">1</span>
                    </div>
                    <p className="text-green-800 font-medium">Abre la aplicación <strong>Google Chrome</strong> (o el navegador que utilices).</p>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-green-700 font-bold text-sm">2</span>
                    </div>
                    <p className="text-green-800 font-medium">Pulsa en los <strong>tres puntos (menú)</strong> ubicados en la esquina superior derecha.</p>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-green-700 font-bold text-sm">3</span>
                    </div>
                    <p className="text-green-800 font-medium">Entra en <strong>Configuración</strong>.</p>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-green-700 font-bold text-sm">4</span>
                    </div>
                    <p className="text-green-800 font-medium">Busca y selecciona la opción <strong>"Configuración de sitios"</strong> o <strong>"Ajustes de sitios"</strong>.</p>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-green-700 font-bold text-sm">5</span>
                    </div>
                    <p className="text-green-800 font-medium">Toca en <strong>"Ventanas emergentes y redirecciones"</strong>.</p>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-green-700 font-bold text-sm">6</span>
                    </div>
                    <p className="text-green-800 font-medium"><strong>Permite las ventanas emergentes</strong> (desactiva el bloqueo).</p>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                      <span className="text-green-700 font-bold text-sm">7</span>
                    </div>
                    <p className="text-green-800 font-medium">Regresa al navegador, cierra la aplicación y realiza tu pedido.</p>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <h4 className="text-lg font-bold text-orange-800">Importante</h4>
                </div>
                <p className="text-orange-700 leading-relaxed">
                  Estos pasos son necesarios para que puedas recibir la confirmación de tu pedido a través de WhatsApp.
                  Sin esta configuración, es posible que no puedas completar tu orden correctamente.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-6 rounded-b-3xl border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center text-gray-600">
                  <Monitor size={20} className="mr-2" />
                  <span className="text-sm">¿Necesitas ayuda? Contacta a nuestro equipo</span>
                </div>
                <button
                  onClick={closeBubble}
                  className="bg-[#FF8C00] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  ¡Entendido!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstructionsBubble;