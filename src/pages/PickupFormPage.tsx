import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  CreditCard,
  Mail,
  FileText,
  ArrowLeft,
  Send,
  CheckCircle,
  Clock,
  MapPin,
  Download,
  Receipt,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { useOrder } from "../context/OrderContext";
import OrderSummary from "../components/OrderSummary";
import { locations } from "../data/locations";
import { Location } from "../types";
import { generateInvoicePDF } from "../utils/pdfGenerator";
import FONDO from "../assets/fondo.png";

const PickupFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart, orderNumber } = useOrder();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState<"location" | "form">(
    "location"
  );
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    cedula: "",
    email: "",
    paymentMethod: "",
    requiresInvoice: false,
    dataProcessingAuthorized: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const paymentMethods = ["Efectivo", "Bancolombia", "Nequi"];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setCurrentStep("form");
  };

  const isFormValid = () => {
    const basicFieldsValid =
      selectedLocation &&
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

    const cartDetails = cart
      .map((item, index) => {
        const basePrice = item.withFries
          ? item.menuItem.priceWithFries || item.menuItem.price
          : item.menuItem.price;
        const customizationsTotal = item.customizations.reduce(
          (sum, option) => sum + option.price,
          0
        );
        const itemSubtotal = (basePrice + customizationsTotal) * item.quantity;

        let itemText = `${index + 1}. ${item.menuItem.name}`;
        if (item.withFries) {
          if (item.friesType === "rustic") {
            itemText += " + Papas Rústicas";
          } else if (item.friesType === "french") {
            itemText += " + Papas Francesas";
          } else {
            itemText += " + Papas";
          }
        }
        itemText += ` x${item.quantity} - ${Math.round(
          itemSubtotal
        ).toLocaleString()}`;

        if (item.customizations.length > 0) {
          itemText += `\n   + ${item.customizations
            .map((c) => c.name.replace("AD ", ""))
            .join(", ")}`;
        }

        if (item.specialInstructions) {
          itemText += `\n   * ${item.specialInstructions}`;
        }

        return itemText;
      })
      .join("\n\n");

    const invoiceInfo = formData.requiresInvoice
      ? `\n📄 FACTURA REQUERIDA\nCC: ${formData.cedula} | Email: ${formData.email}`
      : "\n📄 Sin factura";

    return `🍔 NUEVO PEDIDO RECOGIDA - PARRILLEROS
═══════════════════════════════════════

� P{EDIDO #${orderNumber
      .toString()
      .padStart(
        3,
        "0"
      )} | ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}

👤 CLIENTE
${formData.name}
📱 ${formData.phone}${invoiceInfo}

🏪 RECOGIDA EN SEDE
${selectedLocation?.name}
${selectedLocation?.address}
Tel: ${selectedLocation?.phone}

� PbRODUCTOS
${cartDetails}

💰 DESGLOSE DE COSTOS
• Subtotal: ${Math.round(subtotal).toLocaleString()}
• INC (8%): ${Math.round(inc).toLocaleString()}
• TOTAL: ${Math.round(total).toLocaleString()}

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
      address: "RECOGIDA EN SEDE",
      neighborhood: selectedLocation.neighborhood,
      locationName: selectedLocation.name,
      locationAddress: selectedLocation.address,
      locationPhone: selectedLocation.phone,
      items: cart,
      subtotal: Math.round(subtotal),
      iva: Math.round(inc),
      total: Math.round(total),
      paymentMethod: formData.paymentMethod,
      requiresInvoice: formData.requiresInvoice,
      date: new Date(),
    };

    generateInvoicePDF(invoiceData);
  };

  const handleSubmit = async () => {
    if (!isFormValid() || !selectedLocation) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const message = generateTicketContent();
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${selectedLocation.whatsapp}?text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");

      handleDownloadTicket();

      // Clear cart and redirect to welcome page
      clearCart();
      navigate("/");
    }, 2000);
  };

  const handleFinish = () => {
    clearCart();
    navigate("/");
  };

  if (orderSubmitted) {
    const subtotal = total * 0.92;
    const inc = total * 0.08;

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200">
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} className="text-orange-600" />
          </div>

          <h1 className="text-2xl font-bold text-black mb-2">
            ¡Pedido Enviado Exitosamente! 🎉
          </h1>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <p className="text-orange-800 font-semibold mb-2">
              📞 Te contactaremos pronto
            </p>
            <p className="text-sm text-orange-700">
              El equipo de <strong>{selectedLocation?.name}</strong> se
              comunicará contigo para confirmar tu pedido.
            </p>
          </div>

          <div className="space-y-3 mb-6 text-left">
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-black">� NúmNero de pedido:</span>
              <span className="font-bold text-orange-600">
                #{orderNumber.toString().padStart(3, "0")}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-black">🏪 Sede:</span>
              <span className="font-medium text-black">
                {selectedLocation?.name}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-black">👤 Cliente:</span>
              <span className="font-medium text-black">{formData.name}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <span className="text-black">📱 Teléfono:</span>
              <span className="font-medium text-black">{formData.phone}</span>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-bold text-orange-800 mb-3">
                💰 Desglose de Costos:
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-black">Subtotal:</span>
                  <span className="font-medium text-black">
                    ${Math.round(subtotal).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">INC (8%):</span>
                  <span className="font-medium text-black">
                    ${Math.round(inc).toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-orange-300 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-base">
                    <span className="text-black">TOTAL:</span>
                    <span className="text-orange-600">
                      ${Math.round(total).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <Clock size={20} className="text-orange-600 mr-2" />
              <span className="font-bold text-orange-800">Tiempo estimado</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">15-20 minutos</p>
            <p className="text-sm text-orange-700 mt-2">
              Tu pedido estará listo para recoger
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex gap-2">
              <button
                onClick={handleDownloadTicket}
                className="flex-1 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center text-sm"
              >
                <Download size={16} className="mr-1" />
                Descargar PDF
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
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4"
      style={{
        backgroundImage: `url(${FONDO})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 border border-orange-200">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate("/order-type")}
              className="mr-4 p-2 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors"
            >
              <ArrowLeft size={20} className="text-black" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-black flex items-center">
                <MapPin size={28} className="mr-2 text-orange-600" />
                Recogida en Sede
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {currentStep === "location"
                  ? "Selecciona tu sede preferida"
                  : "Completa tus datos personales"}
              </p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div
              className={`flex items-center ${
                currentStep === "location"
                  ? "text-orange-600"
                  : selectedLocation
                  ? "text-orange-600"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  selectedLocation
                    ? "bg-orange-600 text-white"
                    : currentStep === "location"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                1
              </div>
              <span className="ml-2 font-medium hidden sm:inline text-black">
                Seleccionar Sede
              </span>
            </div>

            <ChevronRight size={20} className="text-gray-400" />

            <div
              className={`flex items-center ${
                currentStep === "form" ? "text-orange-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep === "form"
                    ? "bg-orange-100 text-orange-600"
                    : "bg-gray-200 text-gray-400"
                }`}
              >
                2
              </div>
              <span className="ml-2 font-medium hidden sm:inline text-black">
                Datos Personales
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === "location" ? (
              /* Location Selection Step */
              <div className="bg-white rounded-lg shadow-md p-6 border border-orange-200">
                <h2 className="text-xl font-bold mb-6 text-black flex items-center">
                  <MapPin size={24} className="mr-2 text-orange-600" />
                  Selecciona tu Sede
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      onClick={() => handleLocationSelect(location)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-lg ${
                        selectedLocation?.id === location.id
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-black mb-2">
                            {location.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {location.address}
                          </p>
                          <p className="text-sm text-gray-500 mb-2">
                            {location.neighborhood}
                          </p>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone size={14} className="mr-1" />
                            {location.phone}
                          </div>
                        </div>
                        <ChevronRight
                          size={20}
                          className="text-orange-400 mt-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Form Step */
              <div className="bg-white rounded-lg shadow-md p-6 border border-orange-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-black flex items-center">
                    <User size={24} className="mr-2 text-orange-600" />
                    Información Personal
                  </h2>
                  <button
                    onClick={() => setCurrentStep("location")}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Cambiar sede
                  </button>
                </div>

                {/* Selected Location Summary */}
                {selectedLocation && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                    <h3 className="font-bold text-orange-800 mb-2">
                      Sede seleccionada:
                    </h3>
                    <p className="text-orange-700 font-medium">
                      {selectedLocation.name}
                    </p>
                    <p className="text-sm text-orange-600">
                      {selectedLocation.address}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      <User size={16} className="inline mr-2 text-orange-600" />
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ingresa tu nombre completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      <Phone
                        size={16}
                        className="inline mr-2 text-orange-600"
                      />
                      Número de celular *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="3001234567"
                    />
                  </div>

                  {/* Invoice Option */}
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.requiresInvoice}
                        onChange={(e) =>
                          handleInputChange("requiresInvoice", e.target.checked)
                        }
                        className="w-4 h-4 accent-orange-600 mr-3"
                      />
                      <div>
                        <span className="font-medium text-black flex items-center">
                          <Receipt size={16} className="mr-2 text-orange-600" />
                          ¿Requiere factura a su nombre?
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          Si necesita factura, marque esta opción y complete los
                          campos adicionales
                        </p>
                      </div>
                    </label>
                  </div>

                  {formData.requiresInvoice && (
                    <div className="space-y-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h3 className="font-medium text-black mb-3">
                        Datos para facturación
                      </h3>

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          <FileText
                            size={16}
                            className="inline mr-2 text-orange-600"
                          />
                          Número de cédula *
                        </label>
                        <input
                          type="text"
                          value={formData.cedula}
                          onChange={(e) =>
                            handleInputChange("cedula", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="12345678"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          <Mail
                            size={16}
                            className="inline mr-2 text-orange-600"
                          />
                          Correo electrónico *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-black mb-2">
                      <CreditCard
                        size={16}
                        className="inline mr-2 text-orange-600"
                      />
                      Forma de pago *
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) =>
                        handleInputChange("paymentMethod", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Selecciona forma de pago</option>
                      {paymentMethods.map((method) => (
                        <option key={method} value={method}>
                          {method}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.dataProcessingAuthorized}
                        onChange={(e) =>
                          handleInputChange(
                            "dataProcessingAuthorized",
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 accent-orange-600 mr-3 mt-1 flex-shrink-0"
                      />
                      <div className="text-sm">
                        <span className="font-medium text-black">
                          Autorizo el tratamiento de mis datos personales *
                        </span>
                        <p className="text-gray-600 mt-1">
                          Acepto que mis datos personales sean utilizados para
                          procesar mi pedido y contactarme.
                          <a
                            href="/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-700 font-medium ml-1 inline-flex items-center"
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
                      ? "bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
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
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupFormPage;
