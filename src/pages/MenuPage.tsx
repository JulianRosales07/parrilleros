import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronDown } from 'lucide-react';
import Layout from '../components/Layout';
import CategorySelector from '../components/CategorySelector';
import MenuCard from '../components/MenuCard';
import CustomizationModal from '../components/CustomizationModal';
import SuggestionsModal from '../components/SuggestionsModal';
import { categories, menuItems, customizationOptions } from '../data/menu';
import { MenuItem } from '../types';
import { useOrder } from '../context/OrderContext';

const MenuPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useOrder();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filteredItems = menuItems.filter((item) => {
    if (selectedCategory === 'sides') {
      // If a subcategory is selected, filter by it
      if (selectedSubcategory) {
        return item.category === selectedSubcategory;
      }
      // If no subcategory is selected, show all sides
      return item.category === 'sides';
    }
    return item.category === selectedCategory;
  });

  const sides = menuItems.filter((item) => item.category === 'sides');
  const drinks = menuItems.filter((item) => item.category === 'drinks');

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    const isBurgerCategory = selectedItem?.category.includes('burger');
    setSelectedItem(null);
    
    if (isBurgerCategory) {
      setShowSuggestions(true);
    }
  };

  const handleCloseSuggestions = () => {
    setShowSuggestions(false);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Get the current category object
  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <Layout title="Menú" showCart={false}>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-semibold"
        >
          ← Volver al inicio
        </button>
        
        <div className="max-w-4xl mx-auto mb-12">
          <CategorySelector
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => {
              setSelectedCategory(category);
              setSelectedSubcategory(null);
            }}
          />

          {/* Subcategories Dropdown for Sides */}
          {selectedCategory === 'sides' && currentCategory?.subcategories && (
            <div className="mt-6">
              <div className="relative">
                <select
                  value={selectedSubcategory || ''}
                  onChange={(e) => setSelectedSubcategory(e.target.value || null)}
                  className="w-full p-3 bg-white rounded-lg border border-gray-300 shadow-sm appearance-none pr-10 cursor-pointer"
                >
                  <option value="">Todos los acompañamientos</option>
                  {currentCategory.subcategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
                </select>
                <ChevronDown 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
                  size={20} 
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} onClick={handleItemClick} />
          ))}
        </div>

        {selectedItem && (
          <CustomizationModal
            menuItem={selectedItem}
            options={customizationOptions.filter(
              (option) => selectedItem.category !== 'burgers' || 
                        option.id <= 10
            )}
            onClose={handleCloseModal}
          />
        )}

        {showSuggestions && (
          <SuggestionsModal
            onClose={handleCloseSuggestions}
            sides={sides}
            drinks={drinks}
          />
        )}
        
        {cartTotal > 0 && (
          <div className="fixed bottom-8 right-8 z-50">
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center bg-[#FF8C00] text-white px-6 py-4 rounded-full shadow-lg hover:bg-orange-600 transition-all hover:scale-105 hover:shadow-xl"
            >
              <ShoppingCart size={28} />
              <span className="ml-3 font-bold text-lg">{cartTotal}</span>
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MenuPage;