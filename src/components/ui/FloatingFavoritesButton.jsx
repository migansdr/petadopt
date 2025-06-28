import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import FavoritesManager from './FavoritesManager';

const FloatingFavoritesButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    updateFavoritesCount();
    
    // Listen for favorites changes
    const handleFavoritesChange = () => {
      updateFavoritesCount();
    };

    window.addEventListener('favoritesChanged', handleFavoritesChange);
    
    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChange);
    };
  }, []);

  const updateFavoritesCount = () => {
    const petFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const professionalFavorites = JSON.parse(localStorage.getItem('professionalFavorites') || '[]');
    setFavoritesCount(petFavorites.length + professionalFavorites.length);
  };

  if (favoritesCount === 0) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 hover:scale-110 z-40 group"
      >
        <div className="relative">
          <Icon name="Heart" size={24} />
          {favoritesCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-error text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {favoritesCount > 99 ? '99+' : favoritesCount}
            </span>
          )}
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-text-primary text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Mis Favoritos ({favoritesCount})
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary"></div>
        </div>
      </button>

      <FavoritesManager 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};

export default FloatingFavoritesButton;