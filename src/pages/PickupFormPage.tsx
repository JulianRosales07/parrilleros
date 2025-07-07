import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, CreditCard, Mail, FileText, ArrowLeft, Send, CheckCircle, Clock, MapPin, Download, Printer, Receipt, ExternalLink } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import OrderSummary from '../components/OrderSummary';
import LocationSelector from '../components/LocationSelector';
import { locations } from '../data/locations';
import { Location } from '../types';
import { generateInvoicePDF } from '../utils/pdfGenerator';

const PickupFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart, orderNumber } = useOrder();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    cedula: '',
    email: '',
    paymentMethod: '',
    requiresInvoice: false,
    dataProcessingAuthorized: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  const paymentMethods = [
    'Efectivo',
    'Bancolombia',
    'Nequi',
    'Daviplata'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    const basicFieldsValid = selectedLocation &&
           formData.name && 
           formData.phone && 
           formData.paymentMethod && 
           cart.length > 0 &&
           formData.dataProcessingAuthorized;

    if (formData.requiresInvoice) {
      return basicFieldsValid && formData.cedula && formData.email;
    }

    return basicFieldsValid;
  };

  const generateTicketContent = () => {
    const subtotal = total * 0.92;
    const inc = total * 0.08;

    const cartDetails = cart.map((item, index) => {
      const basePrice = item.withFries ? (item.menuItem.priceWithFries || item.menuItem.price) : item.menuItem.price;
      const customizationsTotal = item.customizations.reduce((sum, option) => sum + option.price, 0);
      const itemSubtotal = (basePrice + customizationsTotal) * item.quantity;
      
      let itemText = `${index + 1}. ${item.menuItem.name}`;
      if (item.withFries) {
        itemText += ' + Papas';
      }
      itemText += ` x${item.quantity} - $${Math.round(itemSubtotal).toLocaleString()}`;
      
      if (item.customizations.length > 0) {
        itemText += `\n   + ${item.customizations.map(c => c.name.replace('AD ', '')).join(', ')}`;
      }
      
      if (item.specialInstructions) {
        itemText += `\n   * ${item.specialInstructions}`;
      }
      
      return itemText;
    }).join('\n\n');

    const invoiceInfo = formData.requiresInvoice ? 
      `\n📄 FACTURA REQUERIDA\nCC: ${formData.cedula} | Email: ${formData.email}` : 
      '\n📄 Sin factura';

    return `🍔 NUEVO PEDIDO RECOGIDA - PARRILLEROS
═══════════════════════════════════════

📋 PEDIDO #${orderNumber.toString().padStart(3, '0')} | ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

👤 CLIENTE
${formData.name}
📱 ${formData.phone}${invoiceInfo}

🏪 RECOGIDA EN SEDE
${selectedLocation?.name}
${selectedLocation?.address}
Tel: ${selectedLocation?.phone}

🛒 PRODUCTOS
${cartDetails}

💰 DESGLOSE DE COSTOS
• Subtotal: $${Math.round(subtotal).toLocaleString()}
• INC (8%): $${Math.round(inc).toLocaleString()}
• TOTAL: $${Math.round(total).toLocaleString()}

💳 Forma de pago: ${formData.paymentMethod}
⏰ Tiempo estimado: 15-20 minutos

¡PREPARAR INMEDIATAMENTE!

📍 ${selectedLocation?.name} | ${selectedLocation?.phone}`;
  };

  const handleDownloadTicket = () => {
    if (!selectedLocation) return;

    const subtotal = total * 0.92;
    const inc = total * 0.08;

    const invoiceData = {
      orderNumber,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.requiresInvoice ? formData.email : undefined,
      customerCedula: formData.requiresInvoice ? formData.cedula : undefined,
      address: 'RECOGIDA EN SEDE',
      neighborhood: selectedLocation.neighborhood,
      locationName: selectedLocation.name,
      locationAddress: selectedLocation.address,
      locationPhone: selectedLocation.phone,
      items: cart,
      subtotal: Math.round(subtotal),
      iva: Math.round(inc), // Using iva field for INC
      total: Math.round(total),
      paymentMethod: formData.paymentMethod,
      requiresInvoice: formData.requiresInvoice,
      date: new Date()
    };

    generateInvoicePDF(invoiceData);
  };

  const handlePrintTicket = () => {
    if (ticketRef.current) {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Ticket Parrilleros #${orderNumber.toString().padStart(3, '0')}</title>
              <style>
                body { font-family: monospace; font-size: 12px; line-height: 1.4; margin: 20px; }
                .header { text-align: center; margin-bottom: 20px; }
                .section { margin-bottom: 15px; }
                .section-title { font-weight: bold; margin-bottom: 5px; }
                .item { margin-bottom: 10px; }
                .total { font-weight: bold; font-size: 14px; }
              </style>
            </head>
            <body>
              <pre>${generateTicketContent()}</pre>
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid() || !selectedLocation) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSubmitted(true);

      const message = generateTicketContent();
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${selectedLocation.whatsapp}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    }, 2000);
  };

  const handleFinish = () => {
    clearCart();
    navigate('/');
  };

  if (orderSubmitted) {
    const subtotal = total * 0.92;
    const inc = total * 0.08;

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            ¡Pedido Enviado Exitosamente! 🎉
          </h1>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold mb-2">
              📞 Te contactaremos pronto
            </p>
            <p className="text-sm text-green-700">
              El equipo de <strong className="font-heavyrust-primary">{selectedLocation?.name}</strong> se comunicará contigo para confirmar tu pedido.
            </p>
          </div>

          <div className="space-y-3 mb-6 text-left">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">📋 Número de pedido:</span>
              <span className="font-bold text-[#FF8C00]">#{orderNumber.toString().padStart(3, '0')}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">🏪 Sede:</span>
              <span className="font-medium font-heavyrust-primary">{selectedLocation?.name}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">👤 Cliente:</span>
              <span className="font-medium">{formData.name}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">📱 Teléfono:</span>
              <span className="font-medium">{formData.phone}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">📄 Factura:</span>
              <span className="font-medium text-right">
                {formData.requiresInvoice ? `Sí - CC: ${formData.cedula}` : 'No requerida'}
              </span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-800 mb-3">💰 Desglose de Costos:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Subtotal:</span>
                  <span className="font-medium">${Math.round(subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">INC (8%):</span>
                  <span className="font-medium">${Math.round(inc).toLocaleString()}</span>
                </div>
                <div className="border-t border-blue-300 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-base">
                    <span className="text-blue-800">TOTAL:</span>
                    <span className="text-[#FF8C00]">${Math.round(total).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">💳 Pago:</span>
              <span className="font-medium">{formData.paymentMethod}</span>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Clock size={20} className="text-green-600 mr-2" />
              <span className="font-bold text-green-800">Tiempo estimado</span>
            </div>
            <p className="text-2xl font-bold text-green-600">15-20 minutos</p>
            <p className="text-sm text-green-700 mt-2">Tu pedido estará listo para recoger</p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex gap-2">
              <button
                onClick={handleDownloadTicket}
                className="flex-1 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm"
              >
                <Download size={16} className="mr-1" />
                Descargar PDF
              </button>
              <button
                onClick={handlePrintTicket}
                className="flex-1 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center text-sm"
              >
                <Printer size={16} className="mr-1" />
                Imprimir
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleFinish}
              className="w-full py-3 bg-[#FF8C00] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg"
            >
              Finalizar
            </button>
          </div>

          <div ref={ticketRef} className="hidden">
            <pre>{generateTicketContent()}</pre>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate('/order-type')}
              className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <MapPin size={28} className="mr-2 text-green-600" />
                Recogida en Sede
              </h1>
              <p className="text-gray-600">Selecciona tu sede y completa tus datos</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Location and Form */}
          <div className="space-y-6">
            {/* Location Selection */}
            <LocationSelector
              locations={locations}
              selectedLocation={selectedLocation}
              onSelectLocation={setSelectedLocation}
            />

            {/* Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800">Información Personal</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User size={16} className="inline mr-2" />
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Ingresa tu nombre completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Número de celular *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="3001234567"
                  />
                </div>

                {/* Invoice Option */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.requiresInvoice}
                      onChange={(e) => handleInputChange('requiresInvoice', e.target.checked)}
                      className="w-4 h-4 accent-green-600 mr-3"
                    />
                    <div>
                      <span className="font-medium text-gray-800 flex items-center">
                        <Receipt size={16} className="mr-2 text-green-600" />
                        ¿Requiere factura a su nombre?
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        Si necesita factura, marque esta opción y complete los campos adicionales
                      </p>
                    </div>
                  </label>
                </div>

                {formData.requiresInvoice && (
                  <div className="space-y-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-800 mb-3">Datos para facturación</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FileText size={16} className="inline mr-2" />
                        Número de cédula *
                      </label>
                      <input
                        type="text"
                        value={formData.cedula}
                        onChange={(e) => handleInputChange('cedula', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="12345678"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail size={16} className="inline mr-2" />
                        Correo electrónico *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard size={16} className="inline mr-2" />
                    Forma de pago *
                  </label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Selecciona forma de pago</option>
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.dataProcessingAuthorized}
                      onChange={(e) => handleInputChange('dataProcessingAuthorized', e.target.checked)}
                      className="w-4 h-4 accent-green-600 mr-3 mt-1 flex-shrink-0"
                    />
                    <div className="text-sm">
                      <span className="font-medium text-gray-800">
                        Autorizo el tratamiento de mis datos personales *
                      </span>
                      <p className="text-gray-600 mt-1">
                        Acepto que mis datos personales sean utilizados para procesar mi pedido y contactarme. 
                        <a 
                          href="/privacy-policy" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 font-medium ml-1 inline-flex items-center"
                        >
                          Ver política de tratamiento de datos
                          <ExternalLink size={12} className="ml-1" />
                        </a>
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                className={`w-full mt-6 py-4 font-bold rounded-lg text-lg flex items-center justify-center transition-all ${
                  isFormValid() && !isSubmitting
                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando pedido...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Enviar Pedido para Recogida
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupFormPage;