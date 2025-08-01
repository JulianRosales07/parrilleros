import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Plus, Minus, ChevronDown, ChevronUp } from "lucide-react";
import { MenuItem, CustomizationOption } from "../types";
import { useOrder } from "../context/OrderContext";
import { customizationOptions } from "../data/menu";
import { getAvailabilityMessage, isAvailableAtAllLocations } from "../utils/locationUtils";
import { useSedeNavigation } from "../hooks/useSedeNavigation";
import FONDO from "../assets/fondo.png";

const CustomizationPage: React.FC = () => {
  const navigate = useNavigate();
  const { navigateWithSede } = useSedeNavigation();
  const location = useLocation();
  const { menuItem } = location.state as { menuItem: MenuItem };

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<CustomizationOption[]>(
    []
  );
  const [specialInstructions, setSpecialInstructions] = useState("");

  const [friesType, setFriesType] = useState<"none" | "french" | "rustic">(
    "none"
  );
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["proteinas"])
  ); // Proteínas expanded by default
  const { addToCart } = useOrder();

  // Get all available customization options for hamburgers
  const availableOptions = customizationOptions;

  const toggleOption = (option: CustomizationOption) => {
    setSelectedOptions((prevOptions) => {
      const exists = prevOptions.some((item) => item.id === option.id);
      if (exists) {
        return prevOptions.filter((item) => item.id !== option.id);
      } else {
        return [...prevOptions, option];
      }
    });
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleAddToCart = () => {
    const hasFries = friesType !== "none";
    addToCart(
      menuItem,
      quantity,
      selectedOptions,
      hasFries,
      specialInstructions,
      friesType !== "none" ? friesType : undefined
    );

    // Check if it's a burger to show suggestions
    const isBurgerCategory = menuItem.category.includes("burger");
    if (isBurgerCategory) {
      navigateWithSede("/suggestions");
    } else {
      navigateWithSede("/menu");
    }
  };

  const basePrice =
    friesType !== "none"
      ? menuItem.priceWithFries || menuItem.price
      : menuItem.price;
  const optionsPrice = selectedOptions.reduce(
    (sum, option) => sum + option.price,
    0
  );
  const totalPrice = (basePrice + optionsPrice) * quantity;

  // Group options by type for better organization
  const proteinOptions = availableOptions.filter((opt) => {
    const name = opt.name.toUpperCase();
    return (
      name.includes("CARNE") ||
      name.includes("CHORIZO") ||
      name.includes("TOCINETA")
    );
  });

  const cheeseOptions = availableOptions.filter((opt) => {
    const name = opt.name.toUpperCase();
    return name.includes("QUESO");
  });

  const vegetableOptions = availableOptions.filter((opt) => {
    const name = opt.name.toUpperCase();
    return (
      name.includes("CEBOLLA") ||
      name.includes("PIÑA") ||
      name.includes("PEPINILLOS") ||
      name.includes("JALAPEÑOS") ||
      name.includes("AROS")
    );
  });

  const otherOptions = availableOptions.filter(
    (opt) =>
      !proteinOptions.includes(opt) &&
      !cheeseOptions.includes(opt) &&
      !vegetableOptions.includes(opt)
  );

  const OptionGroup = ({
    id,
    title,
    options,
    icon,
    description,
  }: {
    id: string;
    title: string;
    options: CustomizationOption[];
    icon: string;
    description?: string;
  }) => {
    if (options.length === 0) return null;

    const isExpanded = expandedCategories.has(id);
    const selectedCount = options.filter((opt) =>
      selectedOptions.some((selected) => selected.id === opt.id)
    ).length;

    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4 border border-gray-200">
        <button
          onClick={() => toggleCategory(id)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-all duration-300"
        >
          <div className="flex items-center">
            <div className="bg-orange-100 rounded-xl p-3 mr-4">
              <span className="text-2xl">{icon}</span>
            </div>
            <div className="text-left">
              <h4 className="text-xl font-bold text-gray-800 flex items-center">
                {title}
                {selectedCount > 0 && (
                  <span className="ml-3 bg-[#FF8C00] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedCount} seleccionado{selectedCount > 1 ? "s" : ""}
                  </span>
                )}
              </h4>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {options.length} opciones disponibles
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {isExpanded ? (
              <ChevronUp size={24} className="text-gray-500" />
            ) : (
              <ChevronDown size={24} className="text-gray-500" />
            )}
          </div>
        </button>

        {isExpanded && (
          <div className="border-t border-gray-100 bg-gray-50">
            <div className="p-6 pt-4">
              <div className="grid grid-cols-1 gap-3">
                {options.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-sm ${
                      selectedOptions.some((opt) => opt.id === option.id)
                        ? "border-[#FF8C00] bg-orange-50 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedOptions.some(
                          (opt) => opt.id === option.id
                        )}
                        onChange={() => toggleOption(option)}
                        className="w-5 h-5 accent-[#FF8C00] mr-4"
                      />
                      <span className="text-gray-800 font-medium">
                        {option.name.replace("AD ", "")}
                      </span>
                    </div>
                    {option.price > 0 && (
                      <span className="font-bold text-[#FF8C00]">
                        +${option.price.toLocaleString()}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${FONDO})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <div className="bg-transparet shadow-md p-4">
        <div className="max-w-6xl mx-auto flex items-center">
          <button
            onClick={() => navigateWithSede("/menu")}
            className="mr-4 p-2 bg-transparent-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              Personalizar Producto
            </h1>
            <p className="text-gray-600">Agrega tus ingredientes favoritos</p>
          </div>
        </div>
      </div>

      {/* Product Availability Alert */}
      <div className="max-w-6xl mx-auto px-4 pb-4">
        {(() => {
          const availability = getAvailabilityMessage(menuItem.availableAt);
          
          switch (availability.type) {
            case 'all':
              return (
                <div className="bg-gradient-to-r from-green-100 to-green-50 border-l-4 border-green-600 p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">✅</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        <strong>{availability.message}</strong>
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        Puedes disfrutar este producto en cualquiera de nuestras ubicaciones: {availability.locations.join(", ")}.
                      </p>
                    </div>
                  </div>
                </div>
              );
            
            case 'single':
              return (
                <div className="bg-gradient-to-r from-purple-100 to-purple-50 border-l-4 border-purple-600 p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-purple-800">
                        <strong>Producto exclusivo</strong>
                      </p>
                      <p className="text-sm text-purple-700 mt-1">
                        {availability.message}. ¡Visítanos para disfrutarlo!
                      </p>
                    </div>
                  </div>
                </div>
              );
            
            case 'limited':
              return (
                <div className="bg-gradient-to-r from-blue-100 to-blue-50 border-l-4 border-blue-600 p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-800">
                        <strong>Disponible en sedes seleccionadas</strong>
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        Este producto está disponible en: {availability.locations.join(", ")}.
                      </p>
                    </div>
                  </div>
                </div>
              );
            
            default:
              return (
                <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-l-4 border-gray-600 p-4 rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <span className="text-2xl">ℹ️</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-800">
                        <strong>Consulta disponibilidad</strong>
                      </p>
                      <p className="text-sm text-gray-700 mt-1">
                        {availability.message}.
                      </p>
                    </div>
                  </div>
                </div>
              );
          }
        })()}
      </div>

      <div className="max-w-6xl mx-auto p-4">
        {/* Product Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6 border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-full lg:h-full overflow-hidden rounded-l-xl">
              <img
                src={menuItem.image}
                alt={menuItem.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-4 right-4 bg-white text-[#FF8C00] text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                ${menuItem.price.toLocaleString()}
              </div>
            </div>

            {/* Information Section */}
            <div className="p-6 flex flex-col justify-center bg-white">
              {/* Categoría */}
              <span className="text-sm text-[#FF8C00] uppercase font-semibold tracking-wider mb-2">
                {menuItem.category.includes("classic")
                  ? "Clásica"
                  : menuItem.category.includes("deluxe")
                  ? "Deluxe"
                  : menuItem.category.includes("contest")
                  ? "Burger Master"
                  : "Hamburguesa"}
              </span>

              {/* Nombre del producto */}
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {menuItem.name}
              </h2>

              {/* Descripción */}
              <p className="text-base text-gray-700 leading-relaxed">
                {menuItem.description}
              </p>

              {/* Precio con papas */}
              {menuItem.priceWithFries && (
                <div className="mt-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-800 font-medium">
                      🍟 Con papas francesas:
                    </span>
                    <span className="text-[#FF8C00] font-bold">
                      ${menuItem.priceWithFries.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
              {/* Precio con papas */}
              {menuItem.priceWithFries && (
                <div className="mt-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-800 font-medium">
                      🍟 Con papas rusticas:
                    </span>
                    <span className="text-[#FF8C00] font-bold">
                      ${menuItem.priceWithFries.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customization Options */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Fries option - prominent placement */}
              {menuItem.priceWithFries && (
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-3">🍟</span>
                    Agregar Papas
                  </h3>
                  {/* Opción 1: Papas Francesas */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-sm ${
                      friesType === "french"
                        ? "border-[#FF8C00] bg-orange-50 shadow-md scale-[1.01]"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    } transition-transform duration-200 ease-in-out`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={friesType === "french"}
                        onChange={() =>
                          setFriesType(
                            friesType === "french" ? "none" : "french"
                          )
                        }
                        className="w-5 h-5 accent-[#FF8C00] mr-4"
                      />
                      <div>
                        <span className="text-lg font-bold text-gray-800">
                          Papas Francesas
                        </span>
                        <p className="text-sm text-gray-600">
                          Crujientes, doradas y clásicas
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#FF8C00] text-lg">
                      +$
                      {(
                        (menuItem.priceWithFries || menuItem.price) -
                        menuItem.price
                      ).toLocaleString()}
                    </span>
                  </label>

                  {/* Opción 2: Papas Rústicas */}
                  <label
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-sm ${
                      friesType === "rustic"
                        ? "border-[#FF8C00] bg-orange-50 shadow-md scale-[1.01]"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    } transition-transform duration-200 ease-in-out mt-4`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={friesType === "rustic"}
                        onChange={() =>
                          setFriesType(
                            friesType === "rustic" ? "none" : "rustic"
                          )
                        }
                        className="w-5 h-5 accent-[#FF8C00] mr-4"
                      />
                      <div>
                        <span className="text-lg font-bold text-gray-800">
                          Papas Rústicas
                        </span>
                        <p className="text-sm text-gray-600">
                          Más gruesas, doradas y con cáscara
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#FF8C00] text-lg">
                      +$
                      {(
                        (menuItem.priceWithFries || menuItem.price) -
                        menuItem.price
                      ).toLocaleString()}
                    </span>
                  </label>
                </div>
              )}

              {/* Organized customization options with dropdowns */}
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Personaliza tu Hamburguesa
                  </h3>
                  <p className="text-gray-600">
                    Selecciona los ingredientes adicionales que desees
                  </p>
                </div>

                <OptionGroup
                  id="proteinas"
                  title="Proteínas Adicionales"
                  options={proteinOptions}
                  icon="🥩"
                  description="Agrega más proteína a tu hamburguesa"
                />

                <OptionGroup
                  id="quesos"
                  title="Quesos Premium"
                  options={cheeseOptions}
                  icon="🧀"
                  description="Diferentes tipos de queso para tu hamburguesa"
                />

                <OptionGroup
                  id="vegetales"
                  title="Vegetales y Extras"
                  options={vegetableOptions}
                  icon="🥬"
                  description="Vegetales frescos y extras crujientes"
                />

                <OptionGroup
                  id="otros"
                  title="Otros Complementos"
                  options={otherOptions}
                  icon="➕"
                  description="Complementos especiales para tu hamburguesa"
                />
              </div>

              {/* Special instructions */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-2xl mr-3">📝</span>
                  Instrucciones Especiales
                </h4>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Ej: Sin cebolla, salsa aparte, término de la carne..."
                  className="w-full p-4 border-2 border-gray-200 rounded-lg resize-none h-24 focus:ring-2 focus:ring-[#FF8C00] focus:border-[#FF8C00] transition-colors"
                />
                <p className="text-sm text-gray-500 mt-2">
                  💡 Comparte cualquier preferencia especial para tu pedido
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary - Sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4 border border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                Resumen del Pedido
              </h3>

              {/* Product image and name */}
              <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                <img
                  src={menuItem.image}
                  alt={menuItem.name}
                  className="w-16 h-16 object-cover rounded-lg mr-3"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{menuItem.name}</h4>
                  {friesType === "french" && (
                    <span className="text-sm text-[#FF8C00] font-medium">
                      + Papas Francesas
                    </span>
                  )}
                  {friesType === "rustic" && (
                    <span className="text-sm text-[#FF8C00] font-medium">
                      + Papas Rústicas
                    </span>
                  )}
                </div>
              </div>

              {/* Selected customizations */}
              {selectedOptions.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-medium text-gray-700 mb-2">
                    Extras seleccionados:
                  </h5>
                  <div className="space-y-1">
                    {selectedOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">
                          + {option.name.replace("AD ", "")}
                        </span>
                        <span className="text-[#FF8C00] font-medium">
                          +${option.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Price breakdown */}
              <div className="space-y-3 mb-6 border-t pt-4">
                <div className="flex justify-between">
                  <span>Precio base:</span>
                  <span className="font-medium">
                    ${basePrice.toLocaleString()}
                  </span>
                </div>
                {optionsPrice > 0 && (
                  <div className="flex justify-between">
                    <span>Extras:</span>
                    <span className="font-medium">
                      +${optionsPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-[#FF8C00]">
                      ${Math.round(totalPrice).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-medium">Cantidad:</span>
                <div className="flex items-center bg-gray-100 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-l-lg transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-r-lg transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-[#FF8C00] text-white font-bold rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPage;
