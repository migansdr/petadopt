import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PetCard = ({ pet }) => {
  const navigate = useNavigate();

  const getSpeciesIcon = (species) => {
    switch (species) {
      case 'Dog':
        return 'Dog';
      case 'Cat':
        return 'Cat';
      default:
        return 'Heart';
    }
  };

  const getSpeciesLabel = (species) => {
    switch (species) {
      case 'Dog':
        return 'Perro';
      case 'Cat':
        return 'Gato';
      default:
        return 'Mascota';
    }
  };

  const getSizeLabel = (size) => {
    switch (size) {
      case 'Small':
        return 'Pequeño';
      case 'Medium':
        return 'Mediano';
      case 'Large':
        return 'Grande';
      default:
        return size;
    }
  };

  const getTagLabel = (tag) => {
    const labels = {
      vaccinated: 'Vacunado',
      sterilized: 'Esterilizado',
      sociable: 'Sociable',
      urgent: 'Urgente',
      good_with_kids: 'Bueno con niños',
      good_with_pets: 'Bueno con mascotas',
      house_trained: 'Educado en casa',
      special_needs: 'Necesidades especiales'
    };
    return labels[tag] || tag;
  };

  const getTagColor = (tag) => {
    const colors = {
      vaccinated: 'bg-success-light text-success border-success/20',
      sterilized: 'bg-primary-100 text-primary border-primary/20',
      sociable: 'bg-secondary-100 text-secondary border-secondary/20',
      urgent: 'bg-error-light text-error border-error/20',
      good_with_kids: 'bg-accent-100 text-accent-700 border-accent/20',
      good_with_pets: 'bg-purple-100 text-purple-700 border-purple/20',
      house_trained: 'bg-green-100 text-green-700 border-green/20',
      special_needs: 'bg-orange-100 text-orange-700 border-orange/20'
    };
    return colors[tag] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hola, estoy interesado en adoptar a ${pet.name}. ¿Podrían darme más información?`
    );
    const whatsappUrl = `https://wa.me/${pet.shelterPhone.replace(/\s+/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = (e) => {
    e.stopPropagation();
    const subject = encodeURIComponent(`Interés en adoptar a ${pet.name}`);
    const body = encodeURIComponent(
      `Hola,

Estoy interesado/a en adoptar a ${pet.name}, ${getSpeciesLabel(pet.species).toLowerCase()} de ${pet.age} ubicado en ${pet.location}.

¿Podrían proporcionarme más información sobre el proceso de adopción?

Gracias.`
    );
    const emailUrl = `mailto:${pet.shelterEmail}?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
  };

  const handleCardClick = () => {
    navigate(`/pet/${pet.id}`);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = favorites.includes(pet.id.toString());
    
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== pet.id.toString());
    } else {
      newFavorites = [...favorites, pet.id.toString()];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    // Trigger a custom event to update other components
    window.dispatchEvent(new CustomEvent('favoritesChanged'));
  };

  const isFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.includes(pet.id.toString());
  };

  return (
    <div 
      className="card group cursor-pointer overflow-hidden transform transition-all duration-300 hover:scale-105"
      onClick={handleCardClick}
    >
      {/* Pet Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={pet.image}
          alt={`${pet.name} - ${getSpeciesLabel(pet.species)} en adopción`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Species Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Icon name={getSpeciesIcon(pet.species)} size={14} className="text-primary" />
          <span className="text-xs font-medium text-text-primary">
            {getSpeciesLabel(pet.species)}
          </span>
        </div>

        {/* Urgent Badge */}
        {pet.tags.includes('urgent') && (
          <div className="absolute top-3 right-3 bg-error text-white rounded-full px-3 py-1 animate-pulse">
            <span className="text-xs font-medium">¡Urgente!</span>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className={`absolute bottom-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isFavorite() 
              ? 'bg-error text-white' 
              : 'bg-white/90 text-text-secondary hover:bg-error hover:text-white'
          }`}
        >
          <Icon name="Heart" size={16} />
        </button>
      </div>

      {/* Pet Info */}
      <div className="p-6">
        {/* Name and Basic Info */}
        <div className="mb-4">
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-200">
            {pet.name}
          </h3>
          
          <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={14} />
              <span>{pet.age}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Ruler" size={14} />
              <span>{getSizeLabel(pet.size)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="User" size={14} />
              <span>{pet.gender === 'male' ? 'Macho' : 'Hembra'}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-sm text-text-secondary mb-4">
            <Icon name="MapPin" size={14} />
            <span>{pet.location}, {pet.province}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-2">
          {pet.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {pet.tags.filter(tag => tag !== 'urgent').slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTagColor(tag)}`}
            >
              {getTagLabel(tag)}
            </span>
          ))}
          {pet.tags.filter(tag => tag !== 'urgent').length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-text-muted bg-opacity-10 text-text-muted border border-text-muted border-opacity-20">
              +{pet.tags.filter(tag => tag !== 'urgent').length - 3}
            </span>
          )}
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center space-x-2 px-4 py-3 bg-success text-white rounded-lg font-medium transition-all duration-200 hover:bg-success-600 focus:outline-none focus:ring-2 focus:ring-success-300 active:transform active:scale-95"
          >
            <Icon name="MessageCircle" size={16} />
            <span className="text-sm">WhatsApp</span>
          </button>
          
          <button
            onClick={handleEmail}
            className="flex items-center justify-center space-x-2 px-4 py-3 border border-border text-text-primary rounded-lg font-medium transition-all duration-200 hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary-300 active:transform active:scale-95"
          >
            <Icon name="Mail" size={16} />
            <span className="text-sm">Email</span>
          </button>
        </div>

        {/* View Details Link */}
        <div className="mt-4 pt-4 border-t border-border-light">
          <div className="flex items-center justify-center text-primary hover:text-primary-600 transition-colors duration-200">
            <span className="text-sm font-medium">Ver detalles completos</span>
            <Icon name="ArrowRight" size={14} className="ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;