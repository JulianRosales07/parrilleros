import React from "react";
import { Beef, GlassWater, IceCream, Salad } from "lucide-react";
import { Hamburger } from "@phosphor-icons/react";
import { FaHotdog } from "react-icons/fa";
import { Category } from "../types";

interface CategorySelectorProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const FriesIcon = ({ size = 24, color = "white" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 3h1l1 4h10l1-4h1" />
    <path d="M4 8h16l-2 12H6L4 8z" />
    <path d="M9 3v4M15 3v4" />
  </svg>
);

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const getIconForCategory = (
    iconName: string,
    isSelected: boolean = false
  ) => {
    switch (iconName) {
      case "beef":
        return (
          <Hamburger
            size={24}
            weight="duotone"
            color={isSelected ? "#FFFFFF" : "#FF8C00"}
          />
        );
      case "hot-dog":
        return (
          <FaHotdog size={24} color={isSelected ? "#FFFFFF" : "#FF8C00"} />
        );
      case "french-fries":
        return (
          <FriesIcon size={32} color={isSelected ? "#FFFFFF" : "#FF8C00"} />
        );
      case "cup-soda":
        return <GlassWater size={24} />;
      case "acompañamientos":
        return <Salad size={24} />;
      case "ice-cream":
        return <IceCream size={24} />;
      default:
        return <Beef size={24} />;
    }
  };

  // Filter non-burger categories and exclude acompañamientos
  const nonBurgerCategories = categories.filter(
    (cat) =>
      (!cat.id.includes("burgers") || cat.id === "burgers") &&
      cat.icon !== "acompañamientos"
  );

  // Get burger subcategories
  const burgerCategories = categories.filter(
    (cat) => cat.id.includes("burgers") && cat.id !== "burgers"
  );

  // Drink subcategories
  const drinkSubcategories = [
    { id: "gaseosas", name: "Gaseosas", icon: "🥤" },
    { id: "limonadas", name: "Limonadas", icon: "🍋" },
    { id: "jugos-naturales", name: "Jugos Naturales", icon: "🧃" },
    { id: "malteadas", name: "Malteadas", icon: "🥤" },
    { id: "cervezas", name: "Cervezas", icon: "🍺" },
    { id: "otras-bebidas", name: "Otras Bebidas", icon: "☕" },
  ];

  // Check if we're in burger context (main burgers category or any burger subcategory)
  const isInBurgerContext =
    selectedCategory === "burgers" ||
    selectedCategory === "classic-burgers" ||
    selectedCategory === "deluxe-burgers" ||
    selectedCategory === "contest-burgers";

  // Check if we're in drinks context (main drinks category or any drink subcategory)
  const isInDrinksContext =
    selectedCategory === "drinks" ||
    selectedCategory === "gaseosas" ||
    selectedCategory === "limonadas" ||
    selectedCategory === "jugos-naturales" ||
    selectedCategory === "malteadas" ||
    selectedCategory === "cervezas" ||
    selectedCategory === "otras-bebidas";

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 mt-18">
      {/* Swipe hint for mobile */}
      <div className="text-center mb-2 md:hidden">
        <span className="text-xs text-gray-500">← Desliza →</span>
      </div>

      {/* Main categories */}
      <div className="overflow-x-auto px-2 pb-4">
        <div
          className="flex space-x-4 min-w-max justify-center mx-auto"
          style={{ width: "fit-content" }}
        >
          {nonBurgerCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex flex-col items-center px-4 py-3 rounded-xl transition-all transform hover:scale-105 flex-shrink-0 ${
                selectedCategory === category.id ||
                (category.id === "burgers" && isInBurgerContext) ||
                (category.id === "drinks" && isInDrinksContext)
                  ? "bg-[#FF8C00] text-white shadow-lg scale-105"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div
                className={`mb-2 ${
                  selectedCategory === category.id ||
                  (category.id === "burgers" && isInBurgerContext) ||
                  (category.id === "drinks" && isInDrinksContext)
                    ? "text-white"
                    : "text-[#FF8C00]"
                }`}
              >
                {getIconForCategory(
                  category.icon,
                  selectedCategory === category.id ||
                    (category.id === "burgers" && isInBurgerContext) ||
                    (category.id === "drinks" && isInDrinksContext)
                )}
              </div>
              <span className="text-sm font-medium whitespace-nowrap">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Burger subcategories - show when in burger context */}
      {isInBurgerContext && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {burgerCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? "bg-[#FF8C00] text-white shadow-md"
                  : "bg-gray-50 text-gray-700 hover:bg-[#FF8C00] hover:text-white"
              }`}
            >
              {category.name.replace("Hamburguesas ", "")}
            </button>
          ))}
        </div>
      )}

      {/* Drink subcategories - show when in drinks context */}
      {isInDrinksContext && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {drinkSubcategories.map((subcategory) => (
            <button
              key={subcategory.id}
              onClick={() => onSelectCategory(subcategory.id)}
              className={`flex items-center justify-center py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === subcategory.id
                  ? "bg-[#FF8C00] text-white shadow-md"
                  : "bg-gray-50 text-gray-700 hover:bg-[#FF8C00] hover:text-white"
              }`}
            >
              <span className="mr-2 text-lg">{subcategory.icon}</span>
              {subcategory.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
