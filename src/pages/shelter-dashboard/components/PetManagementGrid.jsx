import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PetManagementGrid = ({ pets, selectedPets, onSelectPet, onEditPet, onDeletePet }) => {
  const handleSelectPet = (petId) => {
    if (selectedPets.includes(petId)) {
      onSelectPet(selectedPets.filter(id => id !== petId));
    } else {
      onSelectPet([...selectedPets, petId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPets.length === pets.length) {
      onSelectPet([]);
    } else {
      onSelectPet(pets.map(pet => pet.id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'text-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Activo';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Desconocido';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (pets.length === 0) {
    return (
      <div className="bg-surface rounded-xl p-8 shadow-sm border border-border-light text-center animate-fade-in">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Heart" size={32} className="text-primary" />
        </div>
        <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
          No hay mascotas registradas
        </h3>
        <p className="text-text-secondary mb-6">
          Comienza añadiendo tu primera mascota para ayudarla a encontrar un hogar
        </p>
        <button
          onClick={() => window.location.href = '/add-edit-pet-form'}
          className="btn-primary flex items-center space-x-2 mx-auto"
        >
          <Icon name="Plus" size={20} />
          <span>Añadir Primera Mascota</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light animate-fade-in">
      {/* Header with bulk actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Mis Mascotas ({pets.length})
          </h3>
          {pets.length > 0 && (
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedPets.length === pets.length}
                onChange={handleSelectAll}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary-300"
              />
              <span className="text-sm text-text-secondary">Seleccionar todo</span>
            </label>
          )}
        </div>
      </div>

      {/* Pet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className={`bg-background rounded-lg border-2 transition-all duration-300 hover:shadow-md hover:transform hover:translate-y-[-2px] ${
              selectedPets.includes(pet.id) 
                ? 'border-primary shadow-md' 
                : 'border-border-light hover:border-primary-200'
            }`}
          >
            {/* Selection checkbox */}
            <div className="p-4 pb-0">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedPets.includes(pet.id)}
                  onChange={() => handleSelectPet(pet.id)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary-300"
                />
                <span className="text-sm text-text-secondary">Seleccionar</span>
              </label>
            </div>

            {/* Pet Image */}
            <div className="px-4 pb-4">
              <div className="relative w-full h-48 bg-surface rounded-lg overflow-hidden">
                <Image
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                {pet.urgent && (
                  <div className="absolute top-2 right-2 bg-warning text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Icon name="AlertTriangle" size={12} />
                    <span>Urgente</span>
                  </div>
                )}
                <div className={`absolute top-2 left-2 bg-${getStatusColor(pet.status)} text-white px-2 py-1 rounded-full text-xs font-medium`}>
                  {getStatusText(pet.status)}
                </div>
              </div>
            </div>

            {/* Pet Info */}
            <div className="px-4 pb-4">
              <div className="mb-3">
                <h4 className="font-heading font-semibold text-text-primary text-lg mb-1">
                  {pet.name}
                </h4>
                <p className="text-text-secondary text-sm">
                  {pet.breed} • {pet.age} • {pet.size}
                </p>
                <p className="text-text-muted text-sm flex items-center mt-1">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  {pet.location}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {pet.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary-100 text-secondary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {pet.tags.length > 3 && (
                  <span className="px-2 py-1 bg-text-muted bg-opacity-10 text-text-muted text-xs rounded-full">
                    +{pet.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{formatDate(pet.uploadDate)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={14} />
                  <span>{pet.viewCount} vistas</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => onEditPet(pet.id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 text-sm"
                >
                  <Icon name="Edit" size={16} />
                  <span>Editar</span>
                </button>
                <button
                  onClick={() => onDeletePet(pet.id)}
                  className="flex items-center justify-center px-3 py-2 bg-error text-white rounded-lg hover:bg-error-600 transition-colors duration-200"
                >
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button (for future pagination) */}
      {pets.length >= 6 && (
        <div className="text-center mt-8">
          <button className="btn-outline flex items-center space-x-2 mx-auto">
            <Icon name="ChevronDown" size={20} />
            <span>Cargar más mascotas</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PetManagementGrid;