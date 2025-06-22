import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PetCard = ({ pet }) => {
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
    switch (tag) {
      case 'vaccinated':
        return 'Vacunado';
      case 'sterilized':
        return 'Esterilizado';
      case 'sociable':
        return 'Sociable';
      case 'urgent':
        return 'Urgente';
      default:
        return tag;
    }
  };

  const getTagColor = (tag) => {
    switch (tag) {
      case 'vaccinated':
        return 'bg-success-light text-success border-success/20';
      case 'sterilized':
        return 'bg-primary-100 text-primary border-primary/20';
      case 'sociable':
        return 'bg-secondary-100 text-secondary border-secondary/20';
      case 'urgent':
        return 'bg-error-light text-error border-error/20';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, estoy interesado en adoptar a ${pet.name}. ¿Podrían darme más información?`
    );
    const whatsappUrl = `https://wa.me/${pet.shelterPhone.replace(/\s+/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
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

  return (
    <div className="card group cursor-pointer overflow-hidden">
      {/* Pet Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={pet.image}
          alt={`${pet.name} - ${getSpeciesLabel(pet.species)} en adopción`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
          <div className="absolute top-3 right-3 bg-error text-white rounded-full px-3 py-1">
            <span className="text-xs font-medium">¡Urgente!</span>
          </div>
        )}
      </div>

      {/* Pet Info */}
      <div className="p-6">
        {/* Name and Basic Info */}
        <div className="mb-4">
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
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
          {pet.tags.filter(tag => tag !== 'urgent').map((tag) => (
            <span
              key={tag}
              className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getTagColor(tag)}`}
            >
              {getTagLabel(tag)}
            </span>
          ))}
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
      </div>
    </div>
  );
};

export default PetCard;