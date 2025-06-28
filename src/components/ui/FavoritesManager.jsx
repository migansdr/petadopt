import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const FavoritesManager = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [activeTab, setActiveTab] = useState('pets');

  // Mock data - en producción vendría de la API
  const mockPets = [
    {
      id: 1,
      name: "Luna",
      species: "Dog",
      breed: "Mestizo",
      age: "2 años",
      size: "Medium",
      location: "Madrid",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable"],
      addedDate: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Milo",
      species: "Cat",
      breed: "Siamés",
      age: "6 meses",
      size: "Small",
      location: "Barcelona",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable"],
      addedDate: "2024-01-12T15:20:00Z"
    }
  ];

  const mockProfessionals = [
    {
      id: 'prof_001',
      name: 'Clínica Veterinaria San Antón',
      type: 'clinic',
      services: ['veterinary', 'emergency'],
      location: 'Madrid',
      rating: 4.8,
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop',
      addedDate: "2024-01-10T09:00:00Z"
    }
  ];

  useEffect(() => {
    if (isOpen) {
      loadFavorites();
    }
  }, [isOpen]);

  const loadFavorites = () => {
    const petFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const professionalFavorites = JSON.parse(localStorage.getItem('professionalFavorites') || '[]');
    
    const favoritePets = mockPets.filter(pet => petFavorites.includes(pet.id.toString()));
    const favoriteProfessionals = mockProfessionals.filter(prof => professionalFavorites.includes(prof.id));
    
    setFavorites({
      pets: favoritePets,
      professionals: favoriteProfessionals
    });
  };

  const removeFavorite = (id, type) => {
    const storageKey = type === 'pets' ? 'favorites' : 'professionalFavorites';
    const currentFavorites = JSON.parse(localStorage.getItem(storageKey) || '[]');
    const newFavorites = currentFavorites.filter(favId => favId !== id.toString());
    localStorage.setItem(storageKey, JSON.stringify(newFavorites));
    
    loadFavorites();
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };

  const toggleComparison = (id) => {
    if (selectedForComparison.includes(id)) {
      setSelectedForComparison(prev => prev.filter(item => item !== id));
    } else if (selectedForComparison.length < 3) {
      setSelectedForComparison(prev => [...prev, id]);
    }
  };

  const handleCompare = () => {
    if (selectedForComparison.length >= 2) {
      const compareIds = selectedForComparison.join(',');
      navigate(`/compare?type=${activeTab}&ids=${compareIds}`);
      onClose();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getServiceLabel = (service) => {
    const labels = {
      veterinary: 'Veterinaria',
      emergency: 'Urgencias',
      grooming: 'Peluquería',
      training: 'Adiestramiento'
    };
    return labels[service] || service;
  };

  if (!isOpen) return null;

  const currentFavorites = favorites[activeTab] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-primary text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-2">
                Mis Favoritos
              </h2>
              <p className="text-primary-100">
                Gestiona tus mascotas y profesionales favoritos
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-primary-600 rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border-light">
          <div className="flex">
            <button
              onClick={() => setActiveTab('pets')}
              className={`flex-1 py-4 px-6 font-medium transition-colors duration-200 ${
                activeTab === 'pets'
                  ? 'text-primary border-b-2 border-primary bg-primary-50'
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Heart" size={18} />
                <span>Mascotas ({favorites.pets?.length || 0})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('professionals')}
              className={`flex-1 py-4 px-6 font-medium transition-colors duration-200 ${
                activeTab === 'professionals'
                  ? 'text-primary border-b-2 border-primary bg-primary-50'
                  : 'text-text-secondary hover:text-primary'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name="Stethoscope" size={18} />
                <span>Profesionales ({favorites.professionals?.length || 0})</span>
              </div>
            </button>
          </div>
        </div>

        {/* Comparison Bar */}
        {selectedForComparison.length > 0 && (
          <div className="bg-accent-50 border-b border-accent-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="GitCompare" size={20} className="text-accent" />
                <span className="font-medium text-accent-700">
                  {selectedForComparison.length} seleccionados para comparar
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedForComparison([])}
                  className="text-accent-600 hover:text-accent-700 text-sm"
                >
                  Limpiar
                </button>
                <button
                  onClick={handleCompare}
                  disabled={selectedForComparison.length < 2}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedForComparison.length >= 2
                      ? 'bg-accent text-white hover:bg-accent-600'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Comparar ({selectedForComparison.length})
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentFavorites.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-text-muted bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon 
                  name={activeTab === 'pets' ? 'Heart' : 'Stethoscope'} 
                  size={32} 
                  className="text-text-muted" 
                />
              </div>
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                No tienes {activeTab === 'pets' ? 'mascotas' : 'profesionales'} favoritos
              </h3>
              <p className="text-text-secondary mb-6">
                Explora y añade {activeTab === 'pets' ? 'mascotas' : 'profesionales'} a favoritos para encontrarlos fácilmente
              </p>
              <button
                onClick={() => {
                  navigate(activeTab === 'pets' ? '/' : '/professionals');
                  onClose();
                }}
                className="btn-primary"
              >
                Explorar {activeTab === 'pets' ? 'Mascotas' : 'Profesionales'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentFavorites.map((item) => (
                <div
                  key={item.id}
                  className={`card p-4 transition-all duration-200 ${
                    selectedForComparison.includes(item.id)
                      ? 'border-accent bg-accent-50'
                      : ''
                  }`}
                >
                  {/* Selection for comparison */}
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedForComparison.includes(item.id)}
                        onChange={() => toggleComparison(item.id)}
                        disabled={!selectedForComparison.includes(item.id) && selectedForComparison.length >= 3}
                        className="w-4 h-4 text-accent border-border rounded focus:ring-accent-300"
                      />
                      <span className="text-sm text-text-secondary">Comparar</span>
                    </label>
                    <button
                      onClick={() => removeFavorite(item.id, activeTab)}
                      className="p-1 text-error hover:bg-error-light rounded transition-colors duration-200"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>

                  {/* Image */}
                  <div className="relative h-32 mb-3 rounded-lg overflow-hidden bg-surface">
                    <Image
                      src={activeTab === 'pets' ? item.image : item.logo}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-2">
                    <h4 className="font-heading font-semibold text-text-primary">
                      {item.name}
                    </h4>
                    
                    {activeTab === 'pets' ? (
                      <>
                        <p className="text-sm text-text-secondary">
                          {item.breed} • {item.age} • {item.size}
                        </p>
                        <div className="flex items-center space-x-1 text-sm text-text-muted">
                          <Icon name="MapPin" size={14} />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-secondary-100 text-secondary text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-text-secondary capitalize">
                          {item.type === 'clinic' ? 'Clínica' : item.type}
                        </p>
                        <div className="flex items-center space-x-1 text-sm text-text-muted">
                          <Icon name="MapPin" size={14} />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Icon name="Star" size={14} className="text-accent" />
                          <span className="font-medium">{item.rating}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.services.slice(0, 2).map((service, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full"
                            >
                              {getServiceLabel(service)}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                    
                    <div className="text-xs text-text-muted">
                      Añadido el {formatDate(item.addedDate)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-border-light">
                    <button
                      onClick={() => {
                        navigate(activeTab === 'pets' ? `/pet/${item.id}` : `/professional/${item.id}`);
                        onClose();
                      }}
                      className="w-full btn-outline text-sm py-2"
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-surface border-t border-border-light p-4">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>
              Total: {currentFavorites.length} {activeTab === 'pets' ? 'mascotas' : 'profesionales'}
            </span>
            <div className="flex items-center space-x-4">
              <span>Máximo 3 para comparar</span>
              <button
                onClick={onClose}
                className="text-primary hover:text-primary-600 font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesManager;