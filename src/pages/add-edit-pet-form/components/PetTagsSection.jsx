import React from 'react';
import Icon from 'components/AppIcon';

const PetTagsSection = ({ tags, onChange }) => {
  const tagOptions = [
    {
      key: 'vaccinated',
      label: 'Vacunado',
      description: 'Tiene todas las vacunas al día',
      icon: 'Shield',
      color: 'success'
    },
    {
      key: 'sterilized',
      label: 'Esterilizado',
      description: 'Ha sido esterilizado/castrado',
      icon: 'Heart',
      color: 'secondary'
    },
    {
      key: 'sociable',
      label: 'Sociable',
      description: 'Se lleva bien con otros animales y personas',
      icon: 'Users',
      color: 'primary'
    },
    {
      key: 'urgent',
      label: 'Adopción Urgente',
      description: 'Necesita encontrar hogar con urgencia',
      icon: 'AlertTriangle',
      color: 'warning'
    }
  ];

  const handleTagToggle = (tagKey) => {
    onChange(tagKey, !tags[tagKey]);
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-text-secondary">
        Selecciona las características que aplican a esta mascota. Esto ayudará a los adoptantes a encontrar la mascota perfecta para ellos.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tagOptions.map((tag) => (
          <div
            key={tag.key}
            className={`relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
              tags[tag.key]
                ? `border-${tag.color} bg-${tag.color}-50`
                : 'border-border hover:border-border-focus hover:bg-surface'
            }`}
            onClick={() => handleTagToggle(tag.key)}
          >
            <div className="flex items-start space-x-4">
              {/* Checkbox */}
              <div className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                tags[tag.key]
                  ? `border-${tag.color} bg-${tag.color}`
                  : 'border-border bg-background'
              }`}>
                {tags[tag.key] && (
                  <Icon name="Check" size={14} color="white" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tags[tag.key]
                      ? `bg-${tag.color} text-white`
                      : `bg-${tag.color}-100 text-${tag.color}`
                  }`}>
                    <Icon name={tag.icon} size={16} />
                  </div>
                  
                  <h3 className={`font-medium transition-colors duration-200 ${
                    tags[tag.key]
                      ? `text-${tag.color}-700`
                      : 'text-text-primary'
                  }`}>
                    {tag.label}
                  </h3>
                </div>
                
                <p className="text-sm text-text-secondary">
                  {tag.description}
                </p>
              </div>
            </div>

            {/* Selected indicator */}
            {tags[tag.key] && (
              <div className={`absolute top-2 right-2 w-3 h-3 rounded-full bg-${tag.color}`} />
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="p-4 bg-surface rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Tags" size={16} className="text-primary" />
          <span className="font-medium text-text-primary">Resumen de características</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Object.entries(tags).map(([key, isSelected]) => {
            if (!isSelected) return null;
            
            const tag = tagOptions.find(t => t.key === key);
            return (
              <span
                key={key}
                className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium bg-${tag.color} text-white`}
              >
                <Icon name={tag.icon} size={12} />
                <span>{tag.label}</span>
              </span>
            );
          })}
          
          {Object.values(tags).every(value => !value) && (
            <span className="text-text-muted italic">
              No se han seleccionado características
            </span>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="p-4 bg-accent-50 rounded-lg border border-accent-200">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-accent-700 mb-1">¿Por qué son importantes estas características?</p>
            <p className="text-accent-600">
              Los adoptantes buscan mascotas que se adapten a su estilo de vida. Proporcionar información precisa sobre vacunación, esterilización y comportamiento social ayuda a crear coincidencias perfectas y reduce las devoluciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetTagsSection;