import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const UnifiedSearchBar = ({ onSearch, initialValue = '', currentPage = 'pets' }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [activeTab, setActiveTab] = useState(currentPage);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);
  const containerRef = useRef(null);

  const searchTabs = [
    { id: 'pets', label: 'Mascotas', icon: 'Heart', placeholder: 'Buscar mascotas por nombre, raza...' },
    { id: 'professionals', label: 'Profesionales', icon: 'Stethoscope', placeholder: 'Buscar veterinarios, peluquerías...' },
    { id: 'all', label: 'Todo', icon: 'Search', placeholder: 'Buscar en toda la plataforma...' }
  ];

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
  }, [searchTerm, activeTab]);

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

    if (activeTab === 'pets' || activeTab === 'all') {
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
    }

    if (activeTab === 'professionals' || activeTab === 'all') {
      // Professional suggestions
      const professionalMatches = mockData.professionals.filter(prof =>
        prof.name.toLowerCase().includes(lowerTerm) ||
        prof.location.toLowerCase().includes(lowerTerm) ||
        prof.services.some(service => service.toLowerCase().includes(lowerTerm))
      );

      professionalMatches.forEach(prof => {
        suggestions.push({
          id: `prof-${prof.id}`,
          type: 'professional',
          title: prof.name,
          subtitle: `${prof.services.join(', ')} en ${prof.location}`,
          icon: 'Stethoscope',
          category: 'Profesionales',
          action: () => navigate(`/professional/${prof.id}`)
        });
      });

      // Service suggestions
      const serviceMatches = mockData.services.filter(service =>
        service.toLowerCase().includes(lowerTerm)
      );

      serviceMatches.forEach(service => {
        suggestions.push({
          id: `service-${service}`,
          type: 'service',
          title: `Buscar ${service}`,
          subtitle: 'Filtrar profesionales por servicio',
          icon: 'Filter',
          category: 'Servicios',
          action: () => navigate(`/professionals?service=${encodeURIComponent(service)}`)
        });
      });
    }

    // Location suggestions (for both)
    const locationMatches = mockData.locations.filter(location =>
      location.toLowerCase().includes(lowerTerm)
    );

    locationMatches.forEach(location => {
      if (activeTab === 'pets' || activeTab === 'all') {
        suggestions.push({
          id: `pet-location-${location}`,
          type: 'location',
          title: `Mascotas en ${location}`,
          subtitle: 'Ver mascotas disponibles',
          icon: 'MapPin',
          category: 'Ubicaciones',
          action: () => navigate(`/?province=${encodeURIComponent(location.toLowerCase())}`)
        });
      }

      if (activeTab === 'professionals' || activeTab === 'all') {
        suggestions.push({
          id: `prof-location-${location}`,
          type: 'location',
          title: `Profesionales en ${location}`,
          subtitle: 'Ver servicios disponibles',
          icon: 'MapPin',
          category: 'Ubicaciones',
          action: () => navigate(`/professionals?province=${encodeURIComponent(location.toLowerCase())}`)
        });
      }
    });

    setSuggestions(suggestions.slice(0, 8));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length >= 2);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      if (activeTab === 'pets') {
        navigate(`/?search=${encodeURIComponent(searchTerm)}`);
      } else if (activeTab === 'professionals') {
        navigate(`/professionals?search=${encodeURIComponent(searchTerm)}`);
      } else {
        // Search all - could show a unified results page
        navigate(`/?search=${encodeURIComponent(searchTerm)}`);
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

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const getCurrentPlaceholder = () => {
    const tab = searchTabs.find(t => t.id === activeTab);
    return tab ? tab.placeholder : 'Buscar...';
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
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">
      {/* Search Tabs */}
      <div className="flex bg-surface rounded-t-xl border border-b-0 border-border-light overflow-hidden mb-0">
        {searchTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-primary hover:bg-primary-50'
            }`}
          >
            <Icon name={tab.icon} size={18} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

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
          className="w-full pl-12 pr-12 py-4 text-lg border-2 border-t-0 border-border rounded-b-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md"
        />
        
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm('');
              setShowSuggestions(false);
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