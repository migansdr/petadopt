import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const UnifiedSearchBar = ({ onSearch, initialValue = '', currentPage = 'pets' }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const containerRef = useRef(null);

  // Mock unified suggestions
  const mockData = {
    pets: [
      { id: 1, name: 'Luna', type: 'pet', breed: 'Mestizo', location: 'Madrid' },
      { id: 2, name: 'Milo', type: 'pet', breed: 'Siamés', location: 'Barcelona' }
    ],
    professionals: [
      { id: 'prof_001', name: 'Clínica Veterinaria San Antón', type: 'professional', services: ['veterinary'], location: 'Madrid' },
      { id: 'prof_002', name: 'PetGrooming Valencia', type: 'professional', services: ['grooming'], location: 'Valencia' }
    ],
    services: ['Veterinaria', 'Peluquería', 'Adiestramiento', 'Urgencias'],
    locations: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla']
  };

  useEffect(() => {
    if (searchTerm && searchTerm.length >= 2) {
      generateUnifiedSuggestions(searchTerm);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const generateUnifiedSuggestions = (term) => {
    const lowerTerm = term.toLowerCase();
    const suggestions = [];

    if (currentPage === 'pets') {
      // Pet suggestions
      const petMatches = mockData.pets.filter(pet =>
        pet.name.toLowerCase().includes(lowerTerm) ||
        pet.breed.toLowerCase().includes(lowerTerm) ||
        pet.location.toLowerCase().includes(lowerTerm)
      );

      petMatches.forEach(pet => {
        suggestions.push({
          id: `pet-${pet.id}`,
          type: 'pet',
          title: pet.name,
          subtitle: `${pet.breed} en ${pet.location}`,
          icon: 'Heart',
          category: 'Mascotas',
          action: () => navigate(`/pet/${pet.id}`)
        });
      });

      // Location suggestions for pets
      const locationMatches = mockData.locations.filter(location =>
        location.toLowerCase().includes(lowerTerm)
      );

      locationMatches.forEach(location => {
        suggestions.push({
          id: `pet-location-${location}`,
          type: 'location',
          title: `Mascotas en ${location}`,
          subtitle: 'Ver mascotas disponibles',
          icon: 'MapPin',
          category: 'Ubicaciones',
          action: () => navigate(`/?province=${encodeURIComponent(location.toLowerCase())}`)
        });
      });
    }

    setSuggestions(suggestions.slice(0, 6));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length >= 2);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      if (currentPage === 'pets') {
        navigate(`/?search=${encodeURIComponent(searchTerm)}`);
      } else {
        navigate(`/professionals?search=${encodeURIComponent(searchTerm)}`);
      }
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const getCurrentPlaceholder = () => {
    return currentPage === 'pets' 
      ? 'Buscar mascotas por nombre, raza...' 
      : 'Buscar profesionales...';
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Mascotas':
        return 'text-primary';
      case 'Profesionales':
        return 'text-secondary';
      case 'Servicios':
        return 'text-accent';
      case 'Ubicaciones':
        return 'text-warning';
      default:
        return 'text-text-muted';
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon name="Search" size={20} className="text-text-muted" />
        </div>
        
        <input
          ref={searchRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
          placeholder={getCurrentPlaceholder()}
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md"
        />
        
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setShowSuggestions(false);
              if (onSearch) onSearch('');
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        )}
      </div>

      {/* Unified Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border-light rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            {suggestions.reduce((acc, suggestion) => {
              const categoryExists = acc.find(item => item.category === suggestion.category);
              if (!categoryExists) {
                acc.push({
                  category: suggestion.category,
                  items: suggestions.filter(s => s.category === suggestion.category)
                });
              }
              return acc;
            }, []).map((group) => (
              <div key={group.category} className="mb-4 last:mb-0">
                <div className={`text-xs font-medium px-3 py-2 ${getCategoryColor(group.category)}`}>
                  {group.category}
                </div>
                {group.items.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={suggestion.action}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-surface transition-colors duration-200 text-left"
                  >
                    <div className={`w-8 h-8 rounded-full bg-opacity-10 flex items-center justify-center ${getCategoryColor(group.category)} bg-current`}>
                      <Icon name={suggestion.icon} size={16} className={getCategoryColor(group.category)} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-text-primary text-sm">
                        {suggestion.title}
                      </div>
                      <div className="text-text-secondary text-xs">
                        {suggestion.subtitle}
                      </div>
                    </div>
                    
                    <Icon name="ArrowUpRight" size={14} className="text-text-muted" />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedSearchBar;