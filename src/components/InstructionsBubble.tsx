import React, { useState, useEffect } from 'react';
import { HelpCircle, X, Smartphone, Monitor } from 'lucide-react';

interface InstructionsBubbleProps {
  autoOpen?: boolean;
  autoOpenDelay?: number;
}

type DeviceType = 'ios' | 'android' | null;

const InstructionsBubble: React.FC<InstructionsBubbleProps> = ({
  autoOpen = false,
  autoOpenDelay = 2000
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>(null);

  useEffect(() => {
    if (autoOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, autoOpenDelay);

      return () => clearTimeout(timer);
    }
  }, [autoOpen, autoOpenDelay]);

  const toggleBubble = () => {
    setIsOpen(!isOpen);
  };

  const closeBubble = () => {
    setIsOpen(false);
    setSelectedDevice(null);
  };

  const selectDevice = (device: DeviceType) => {
    setSelectedDevice(device);
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
          onClick={closeBubble}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-4 zoom-in-95 duration-300 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-[#FF8C00] via-orange-500 to-orange-600 text-white p-5 rounded-t-2xl overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
              <div className="absolute -bottom-1 -left-1 w-12 h-12 bg-white/5 rounded-full blur-md"></div>

              <button
                onClick={closeBubble}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110 hover:rotate-90 z-20 cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X size={18} className="text-white" />
              </button>

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mr-4 shadow-lg">
                    <Smartphone size={28} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2 tracking-tight">📦 Pasos para solicitar el domicilio</h2>
                    <p className="text-orange-100 text-base font-medium">Configura tu navegador para recibir notificaciones</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-5 space-y-6">
                {/* Device Selection - Always visible */}
                <div className="space-y-5">
                  <div className="text-center mb-5">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">Selecciona tu dispositivo</h3>
                    <p className="text-gray-600 text-base leading-relaxed max-w-xl mx-auto">Elige el tipo de dispositivo que estás usando para ver las instrucciones específicas</p>
                  </div>

                  <div className="flex gap-3 justify-center">
                    {/* iPhone Button */}
                    <button
                      onClick={() => selectDevice('ios')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-[1.02] ${selectedDevice === 'ios'
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300'
                        }`}
                    >
                      📱 iPhone (iOS)
                    </button>

                    {/* Android Button */}
                    <button
                      onClick={() => selectDevice('android')}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-[1.02] ${selectedDevice === 'android'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300'
                        }`}
                    >
                      🤖 Android
                    </button>
                  </div>
                </div>

                {/* Instructions - Show based on selected device */}
                {selectedDevice === 'ios' ? (
                  /* iPhone Instructions */
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200 shadow-lg animate-in slide-in-from-right duration-300">
                    <div className="flex items-center mb-5">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-3 mr-4 shadow-md">
                        <span className="text-2xl">📱</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-blue-800 mb-1">iPhone (iOS)</h3>
                        <p className="text-blue-600 text-sm font-medium">Para dispositivos Apple</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start group">
                        <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-blue-800 font-bold text-sm">1</span>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3 flex-1 shadow-sm border border-blue-100">
                          <p className="text-blue-900 font-medium text-sm leading-relaxed">Abre <strong className="text-blue-800">Ajustes</strong> en tu dispositivo.</p>
                        </div>
                      </div>

                      <div className="flex items-start group">
                        <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-blue-800 font-bold text-sm">2</span>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3 flex-1 shadow-sm border border-blue-100">
                          <p className="text-blue-900 font-medium text-sm leading-relaxed">Busca la aplicación <strong className="text-blue-800">Safari</strong> o <strong className="text-blue-800">Google Chrome</strong> (la que utilices).</p>
                        </div>
                      </div>

                      <div className="flex items-start group">
                        <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-blue-800 font-bold text-sm">3</span>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3 flex-1 shadow-sm border border-blue-100">
                          <p className="text-blue-900 font-medium text-sm leading-relaxed">Ingresa a la configuración de esa aplicación.</p>
                        </div>
                      </div>

                      <div className="flex items-start group">
                        <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-blue-800 font-bold text-sm">4</span>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3 flex-1 shadow-sm border border-blue-100">
                          <p className="text-blue-900 font-medium text-sm leading-relaxed">Localiza la opción <strong className="text-blue-800">"Bloquear ventanas emergentes"</strong>.</p>
                        </div>
                      </div>

                      <div className="flex items-start group">
                        <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-blue-800 font-bold text-sm">5</span>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3 flex-1 shadow-sm border border-blue-100">
                          <p className="text-blue-900 font-medium text-sm leading-relaxed">Si está activada, <strong className="text-blue-800">desactívala</strong>.</p>
                        </div>
                      </div>

                      <div className="flex items-start group">
                        <div className="bg-gradient-to-br from-blue-200 to-blue-300 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                          <span className="text-blue-800 font-bold text-sm">6</span>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3 flex-1 shadow-sm border border-blue-100">
                          <p className="text-blue-900 font-medium text-sm leading-relaxed">Cierra la aplicación y procede a realizar tu pedido.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : selectedDevice === 'android' ? (
                  /* Android Instructions */
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-200 shadow-lg animate-in slide-in-from-left duration-300">
                    <div className="flex items-center mb-5">
                      <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-3 mr-4 shadow-md">
                        <span className="text-2xl">🤖</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-800 mb-1">Android</h3>
                        <p className="text-green-600 text-sm font-medium">Para dispositivos Android</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="bg-green-200 rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 font-bold text-xs">1</span>
                        </div>
                        <p className="text-green-800 font-medium text-sm">Abre la aplicación <strong>Google Chrome</strong> (o el navegador que utilices).</p>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-green-200 rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 font-bold text-xs">2</span>
                        </div>
                        <p className="text-green-800 font-medium text-sm">Pulsa en los <strong>tres puntos (menú)</strong> ubicados en la esquina superior derecha.</p>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-green-200 rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 font-bold text-xs">3</span>
                        </div>
                        <p className="text-green-800 font-medium text-sm">Entra en <strong>Configuración</strong>.</p>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-green-200 rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 font-bold text-xs">4</span>
                        </div>
                        <p className="text-green-800 font-medium text-sm">Busca y selecciona la opción <strong>"Configuración de sitios"</strong> o <strong>"Ajustes de sitios"</strong>.</p>
                      </div>

                      <div className="flex items-start">
                        <div className="bg-green-200 rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-green-700 font-bold text-xs">5</span>
                        </div>
                        <p className="text-green-800 font-medium text-sm">Toca en <strong>"Ventanas emergentes y redirecciones"</strong>.</p>
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
                ) : (
                  /* No device selected */
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">📱</div>
                    <h3 className="text-xl font-bold text-gray-600 mb-2">Selecciona un dispositivo</h3>
                    <p className="text-gray-500">Elige iPhone o Android para ver las instrucciones específicas</p>
                  </div>
                )}

                {/* Important Note - Show only when device is selected */}
                {selectedDevice && (
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
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 rounded-b-2xl border-t border-gray-100 flex-shrink-0">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center text-gray-600">
                  <Monitor size={18} className="mr-2" />
                  <span className="text-xs">¿Necesitas ayuda? Contacta a nuestro equipo</span>
                </div>
                <button
                  onClick={closeBubble}
                  className="bg-[#FF8C00] text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] text-sm"
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