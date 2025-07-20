import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { gsap } from "gsap";
import { ShoppingCart, ArrowLeft, MapPin } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Layout from "../components/Layout";
import CategorySelector from "../components/CategorySelector";
import MenuCard from "../components/MenuCard";
import SearchBar from "../components/SearchBar";
import TourButton from "../components/TourButton";
import {
  categories,
  menuItems,
  customizationOptions,
  categorizedSides,
} from "../data/menu";
import { useOrder } from "../context/OrderContext";
import { useDriverTour, menuTourSteps } from "../hooks/useDriverTour";
import { locations } from '../data/locations';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, selectedLocation } = useOrder();
  const [selectedCategory, setSelectedCategory] = useState("classic-burgers");
  const [selectedSidesFilter, setSelectedSidesFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTourButton, setShowTourButton] = useState(true);

  // Referencias para animaciones GSAP
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const categorySelectorRef = useRef<HTMLDivElement>(null);
  const menuGridRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLDivElement>(null);
  const menuCardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { startTour } = useDriverTour({
    steps: menuTourSteps,
    onDestroyed: () => {
      setShowTourButton(false);
      // Hide tour button for 30 seconds after tour completion
      setTimeout(() => {
        setShowTourButton(true);
      }, 30000);
    },
  });

  // Filter items based on category and search query - MOVED BEFORE useEffect
  const filteredItems = useMemo(() => {
    let items;

    // First filter by selected location
    let locationFilteredItems = menuItems;
    if (selectedLocation) {
      locationFilteredItems = menuItems.filter(item => 
        !item.availableAt || item.availableAt.includes(selectedLocation.id)
      );
    }

    // Handle drink subcategories
    if (selectedCategory === "gaseosas") {
      items = locationFilteredItems.filter(
        (item) =>
          item.category === "drinks" &&
          (item.name.toLowerCase().includes("gaseosa") ||
            item.name.toLowerCase().includes("coca") ||
            item.name.toLowerCase().includes("fuze"))
      );
    } else if (selectedCategory === "limonadas") {
      items = locationFilteredItems.filter(
        (item) =>
          item.category === "drinks" &&
          item.name.toLowerCase().includes("limonada")
      );
    } else if (selectedCategory === "jugos-naturales") {
      items = locationFilteredItems.filter(
        (item) =>
          item.category === "drinks" &&
          item.name.toLowerCase().includes("jugo natural")
      );
    } else if (selectedCategory === "malteadas") {
      items = locationFilteredItems.filter(
        (item) =>
          item.category === "drinks" &&
          item.name.toLowerCase().includes("malteada")
      );
    } else if (selectedCategory === "cervezas") {
      items = locationFilteredItems.filter(
        (item) =>
          item.category === "drinks" &&
          item.name.toLowerCase().includes("cerveza")
      );
    } else if (selectedCategory === "otras-bebidas") {
      items = locationFilteredItems.filter((item) => {
        const itemName = item.name.toLowerCase();
        return (
          item.category === "drinks" &&
          !itemName.includes("gaseosa") &&
          !itemName.includes("coca") &&
          !itemName.includes("fuze") &&
          !itemName.includes("limonada") &&
          !itemName.includes("jugo natural") &&
          !itemName.includes("malteada") &&
          !itemName.includes("cerveza")
        );
      });
    } else if (selectedCategory === "sides") {
      // Handle sides subcategories
      items = locationFilteredItems.filter((item) => item.category === "sides");

      if (selectedSidesFilter !== "all") {
        const categoryItems =
          categorizedSides[
            selectedSidesFilter as keyof typeof categorizedSides
          ];
        if (categoryItems) {
          const categoryIds = categoryItems
            .map((item) => item?.id)
            .filter(Boolean);
          items = items.filter((item) => categoryIds.includes(item.id));
        }
      }
    } else {
      // Default filtering by category
      items = locationFilteredItems.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    return items;
  }, [selectedCategory, selectedSidesFilter, searchQuery, selectedLocation]);

  // Global search across all items - MOVED BEFORE useEffect
  const globalSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    // Filter by location first
    let locationFilteredItems = menuItems;
    if (selectedLocation) {
      locationFilteredItems = menuItems.filter(item => 
        !item.availableAt || item.availableAt.includes(selectedLocation.id)
      );
    }

    const query = searchQuery.toLowerCase().trim();
    return locationFilteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }, [searchQuery, selectedLocation]);

  // Redirect to location selection if no location is selected
  useEffect(() => {
    if (!selectedLocation) {
      navigate('/location-selection');
    }
  }, [selectedLocation, navigate]);

  // Auto-start tour for first-time users
  useEffect(() => {
    const hasSeenTour = localStorage.getItem("parrilleros-menu-tour-seen");
    if (!hasSeenTour) {
      const timer = setTimeout(() => {
        startTour();
        localStorage.setItem("parrilleros-menu-tour-seen", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [startTour]);

  // Animaciones de entrada de la página
  useEffect(() => {
    // Check if all refs are available before proceeding
    if (
      !backButtonRef.current ||
      !searchBarRef.current ||
      !categorySelectorRef.current
    ) {
      return;
    }

    const tl = gsap.timeline();

    // Configurar estados iniciales
    gsap.set(
      [
        backButtonRef.current,
        searchBarRef.current,
        categorySelectorRef.current,
      ],
      {
        opacity: 0,
        y: -30,
      }
    );

    // Animación de entrada secuencial
    tl.to(backButtonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
    })
      .to(
        searchBarRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        categorySelectorRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, []);

  // Animaciones para las tarjetas del menú
  useEffect(() => {
    // Filter out null refs before proceeding
    const validCards = menuCardsRefs.current.filter((card) => card !== null);

    if (validCards.length > 0) {
      // Limpiar animaciones anteriores
      gsap.killTweensOf(validCards);

      // Configurar estado inicial
      gsap.set(validCards, {
        opacity: 0,
        y: 50,
        scale: 0.9,
      });

      // Animación de entrada escalonada
      gsap.to(validCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: {
          amount: 0.8,
          from: "start",
        },
      });

      // Animaciones con ScrollTrigger para efectos al hacer scroll
      validCards.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              rotationY: 15,
              transformPerspective: 1000,
            },
            {
              rotationY: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [filteredItems]);

  // Efecto simple para mostrar el botón del carrito
  useEffect(() => {
    // Solo para mantener la referencia, sin animaciones
  }, [cart.length]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStartTour = () => {
    startTour();
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Reset sides filter when changing category
    setSelectedSidesFilter("all");

    // Animación suave al cambiar categoría
    if (menuGridRef.current) {
      gsap.fromTo(
        menuGridRef.current,
        {
          opacity: 0.5,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }
  };

  const handleBackButtonHover = () => {
    if (backButtonRef.current) {
      gsap.to(backButtonRef.current, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleBackButtonLeave = () => {
    if (backButtonRef.current) {
      gsap.to(backButtonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Show global search results when searching
  const itemsToShow = searchQuery.trim() ? globalSearchResults : filteredItems;
  const showCategorySelector = !searchQuery.trim();

  // Don't render if no location is selected
  if (!selectedLocation) {
    return null;
  }

  return (
    <Layout title={`Menú - ${selectedLocation.name}`} showCart={false}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Location Info Banner */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-[#FF8C00]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin size={20} className="text-[#FF8C00] mr-2" />
                <div>
                  <span className="font-bold text-gray-800">Sede seleccionada: </span>
                  <span className="font-heavyrust-primary text-[#FF8C00]">{selectedLocation.name}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/location-selection')}
                className="text-sm text-[#FF8C00] hover:text-orange-600 font-medium"
              >
                Cambiar sede
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Back Button */}
        <div className="max-w-4xl mx-auto mb-6">
          <button
            ref={backButtonRef}
            data-tour="back-button"
            onClick={() => navigate("/location-selection")}
            onMouseEnter={handleBackButtonHover}
            onMouseLeave={handleBackButtonLeave}
            className="group flex items-center bg-white hover:bg-[#FF8C00] text-[#FF8C00] hover:text-white px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-2 border-[#FF8C00] font-semibold menu-card-enhanced"
          >
            <ArrowLeft
              size={20}
              className="mr-2 transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span className="text-sm sm:text-base">Cambiar sede</span>
          </button>
        </div>
        {/* Search Bar */}
        <div
          ref={searchBarRef}
          className="max-w-6xl mx-auto mb-8"
          data-tour="search-bar"
        >
          <SearchBar
            onSearch={handleSearch}
            placeholder="Buscar burguer, gaseosa, acompañamientos..."
          />
        </div>

        {/* Category Selector - only show when not searching */}
        {showCategorySelector && (
          <div
            ref={categorySelectorRef}
            className="max-w-4xl mx-auto mb-12 mt-16"
            data-tour="category-selector"
          >
            <div className="menu-category-enhanced rounded-2xl">
              <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategoryChange}
              />
            </div>
          </div>
        )}

        {/* Sides Filter - only show when sides category is selected and not searching */}
        {showCategorySelector && selectedCategory === "sides" && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="menu-card-enhanced rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Filtrar Acompañamientos
              </h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedSidesFilter("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedSidesFilter === "all"
                      ? "bg-[#FF8C00] text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Todos
                </button>
                {Object.keys(categorizedSides).map((filterKey) => (
                  <button
                    key={filterKey}
                    onClick={() => setSelectedSidesFilter(filterKey)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      selectedSidesFilter === filterKey
                        ? "bg-[#FF8C00] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {filterKey}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results Header */}
        {searchQuery.trim() && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="menu-card-enhanced rounded-lg shadow-sm p-4">
              <h2 className="text-xl font-bold text-gray-800">
                Resultados para "{searchQuery}"
              </h2>
              <p className="text-gray-600">
                {itemsToShow.length} producto
                {itemsToShow.length !== 1 ? "s" : ""} encontrado
                {itemsToShow.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        )}

        {/* Menu Grid */}
        {itemsToShow.length > 0 ? (
          <div
            ref={menuGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            data-tour="menu-grid"
          >
            {itemsToShow.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (menuCardsRefs.current[index] = el)}
                className="menu-card-container transform transition-all duration-300"
              >
                <div className="menu-card-enhanced rounded-3xl overflow-hidden">
                  <MenuCard item={item} />
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery.trim() ? (
          <div className="max-w-4xl mx-auto">
            <div className="menu-card-enhanced rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-600 mb-4">
                No hay productos que coincidan con "{searchQuery}"
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="bg-[#FF8C00] text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Ver todos los productos
              </button>
            </div>
          </div>
        ) : null}

        {/* Floating cart button */}
        {cartTotal > 0 && (
          <div
            ref={cartButtonRef}
            className="fixed bottom-8 right-8 z-50"
            data-tour="cart-button"
          >
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center bg-[#FF8C00] text-white px-6 py-4 rounded-full shadow-lg hover:bg-orange-600 transition-all hover:scale-105 hover:shadow-xl backdrop-blur-sm"
            >
              <ShoppingCart size={28} />
              <span className="ml-3 font-bold text-lg">{cartTotal}</span>
            </button>
          </div>
        )}

        {/* Tour Button - Pequeño en esquina inferior izquierda */}
        {showTourButton && (
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

export default MenuPage;
