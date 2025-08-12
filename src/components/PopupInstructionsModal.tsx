import React, { useState } from 'react';
import { X, Smartphone, Monitor, Settings, Chrome, CheckCircle } from 'lucide-react';

interface PopupInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type DeviceType = 'iphone' | 'android';

const PopupInstructionsModal: React.FC<PopupInstructionsModalProps> = ({ isOpen, onClose }) => {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('iphone');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-4 duration-500">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#FF8C00] via-orange-500 to-orange-600 text-white px-8 py-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-200 hover:scale-110"
          >
            <X size={18} className="text-white" />
          </button>

          <div className="flex items-start gap-4">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 mt-1">
              <Settings size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2 leading-tight">Configuración del navegador</h2>
              <p className="text-orange-100 text-sm leading-relaxed">
                Sigue estos pasos para permitir ventanas emergentes y completar tu pedido sin problemas
              </p>
            </div>
          </div>
        </div>

        {/* Device Selection Buttons */}
        <div className="px-8 pt-6 pb-2">
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedDevice('iphone')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold transition-all duration-300 ${selectedDevice === 'iphone'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-[1.02]'
                : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                }`}
            >
              <Smartphone size={20} />
              iPhone (iOS)
            </button>
            <button
              onClick={() => setSelectedDevice('android')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-bold transition-all duration-300 ${selectedDevice === 'android'
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-[1.02]'
                : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                }`}
            >
              <Chrome size={20} />
              Android
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="px-8 pb-8 space-y-8">

            {/* iPhone Instructions */}
            {selectedDevice === 'iphone' && (
              <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-100 rounded-xl p-6 border border-blue-200/50 shadow-sm hover:shadow-md transition-shadow duration-300 animate-in slide-in-from-right duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 mr-4 shadow-lg">
                    <Smartphone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-1">iPhone (iOS)</h3>
                    <p className="text-blue-700 text-sm font-medium">Para dispositivos Apple</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 flex-1 border border-blue-200/50">
                      <p className="text-blue-900 font-medium">Abre <span className="bg-blue-100 px-2 py-1 rounded font-bold text-blue-800">Ajustes</span> en tu dispositivo</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 flex-1 border border-blue-200/50">
                      <p className="text-blue-900 font-medium">Busca <span className="bg-blue-100 px-2 py-1 rounded font-bold text-blue-800">Safari</span> o <span className="bg-blue-100 px-2 py-1 rounded font-bold text-blue-800">Chrome</span></p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 flex-1 border border-blue-200/50">
                      <p className="text-blue-900 font-medium">Ingresa a la configuración de esa aplicación</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 flex-1 border border-blue-200/50">
                      <p className="text-blue-900 font-medium">Localiza <span className="bg-blue-100 px-2 py-1 rounded font-bold text-blue-800">"Bloquear ventanas emergentes"</span></p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">5</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 flex-1 border border-blue-200/50">
                      <p className="text-blue-900 font-medium">Si está activada, <span className="bg-red-100 px-2 py-1 rounded font-bold text-red-800">desactívala</span></p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 flex-1 border border-green-200">
                      <p className="text-green-900 font-medium">Cierra la aplicación y procede a realizar tu pedido</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Android Instructions */}
            {selectedDevice === 'android' && (
              <div className="bg-gradient-to-br from-green-50 via-green-50 to-emerald-100 rounded-xl p-6 border border-green-200/50 shadow-sm hover:shadow-md transition-shadow duration-300 animate-in slide-in-from-left duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-3 mr-4 shadow-lg">
                    <Chrome size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-900 mb-1">Android</h3>
                    <p className="text-green-700 text-sm font-medium">Para dispositivos Android</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 flex-1 border border-green-200/50">
                      <p className="text-green-900 font-medium">Abre <span className="bg-green-100 px-2 py-1 rounded font-bold text-green-800">Google Chrome</span> (o tu navegador)</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 flex-1 border border-green-200/50">
                      <p className="text-green-900 font-medium">Pulsa los <span className="bg-green-100 px-2 py-1 rounded font-bold text-green-800">tres puntos (⋮)</span> en la esquina superior</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 flex-1 border border-green-200/50">
                      <p className="text-green-900 font-medium">Entra en <span className="bg-green-100 px-2 py-1 rounded font-bold text-green-800">Configuración</span></p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 flex-1 border border-green-200/50">
                      <p className="text-green-900 font-medium">Busca <span className="bg-green-100 px-2 py-1 rounded font-bold text-green-800">"Configuración de sitios"</span></p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">5</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 flex-1 border border-green-200/50">
                      <p className="text-green-900 font-medium">Toca <span className="bg-green-100 px-2 py-1 rounded font-bold text-green-800">"Ventanas emergentes y redirecciones"</span></p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <span className="text-white font-bold text-sm">6</span>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 flex-1 border border-green-200/50">
                      <p className="text-green-900 font-medium"><span className="bg-green-100 px-2 py-1 rounded font-bold text-green-800">Permite las ventanas emergentes</span> (desactiva el bloqueo)</p>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-full w-9 h-9 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
                      <CheckCircle size={16} className="text-white" />
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 flex-1 border border-green-200">
                      <p className="text-green-900 font-medium">Regresa al navegador y realiza tu pedido</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Important Note */}
            <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-xl p-6 border border-amber-200/50 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-3 mt-1 shadow-lg">
                  <Monitor size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-amber-900 mb-3 flex items-center gap-2">
                    <span>💡</span> ¿Por qué es importante?
                  </h4>
                  <div className="bg-white/70 rounded-lg p-4 border border-amber-200/50">
                    <p className="text-amber-800 leading-relaxed font-medium">
                      Estos pasos permiten que tu navegador abra WhatsApp automáticamente para confirmar tu pedido.
                      <span className="block mt-2 text-amber-700">
                        Sin esta configuración, no podrás completar tu orden correctamente.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-t border-gray-200/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-gray-600 bg-white/60 rounded-lg px-4 py-2 border border-gray-200/50">
              <Smartphone size={18} className="mr-2 text-gray-500" />
              <span className="text-sm font-medium">¿Necesitas ayuda? Contacta a nuestro equipo</span>
            </div>
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-[#FF8C00] to-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center gap-2"
            >
              <CheckCircle size={18} />
              ¡Entendido!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupInstructionsModal;