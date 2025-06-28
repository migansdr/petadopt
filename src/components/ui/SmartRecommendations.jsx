import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const SmartRecommendations = ({ currentItem, type }) => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (currentItem) {
      generateSmartRecommendations();
    }
  }, [currentItem, type]);

  const generateSmartRecommendations = () => {
    let recs = [];

    if (type === 'pet') {
      // Recommend professionals based on pet needs
      recs = [
        {
          id: 'vet-nearby',
          type: 'professional',
          title: 'Veterinario recomendado',
          subtitle: `Clínica cerca de ${currentItem.location}`,
          description: 'Para el cuidado de salud de tu nueva mascota',
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=150&h=150&fit=crop',
          rating: 4.8,
          distance: '2.3 km',
          action: () => navigate('/professionals?service=veterinary&location=' + currentItem.location),
          urgent: currentItem.tags?.includes('special_needs')
        },
        {
          id: 'grooming-service',
          type: 'professional',
          title: 'Peluquería especializada',
          subtitle: `Perfecta para ${currentItem.species === 'Dog' ? 'perros' : 'gatos'}`,
          description: 'Mantén a tu mascota siempre limpia y bella',
          image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=150&h=150&fit=crop',
          rating: 4.6,
          distance: '1.8 km',
          action: () => navigate('/professionals?service=grooming&location=' + currentItem.location),
          urgent: false
        }
      ];

      if (currentItem.age === 'Puppy' || currentItem.age?.includes('meses')) {
        recs.push({
          id: 'training-service',
          type: 'professional',
          title: 'Adiestramiento para cachorros',
          subtitle: 'Educación temprana esencial',
          description: 'Entrena a tu cachorro desde pequeño',
          image: 'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=150&h=150&fit=crop',
          rating: 4.9,
          distance: '3.1 km',
          action: () => navigate('/professionals?service=training&location=' + currentItem.location),
          urgent: false
        });
      }
    } else if (type === 'professional') {
      // Recommend pets based on professional services
      if (currentItem.services?.includes('veterinary')) {
        recs = [
          {
            id: 'pets-needing-care',
            type: 'pet',
            title: 'Mascotas que necesitan cuidados',
            subtitle: 'Adopta y cuida desde el primer día',
            description: 'Estas mascotas se beneficiarían de tus servicios',
            image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop',
            location: currentItem.location,
            action: () => navigate('/?location=' + currentItem.location + '&health=special_needs'),
            urgent: true
          }
        ];
      }

      if (currentItem.services?.includes('grooming')) {
        recs.push({
          id: 'long-hair-pets',
          type: 'pet',
          title: 'Mascotas de pelo largo',
          subtitle: 'Perfectas para tus servicios',
          description: 'Estas mascotas necesitarán cuidado regular',
          image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=150&h=150&fit=crop',
          location: currentItem.location,
          action: () => navigate('/?location=' + currentItem.location + '&breed=persa,maine_coon'),
          urgent: false
        });
      }
    }

    setRecommendations(recs);
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-6 border border-accent-200">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Sparkles" size={20} className="text-accent" />
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Recomendaciones inteligentes
        </h3>
      </div>
      
      <p className="text-text-secondary text-sm mb-6">
        {type === 'pet' 
          ? 'Servicios que podrías necesitar para tu nueva mascota'
          : 'Mascotas que podrían beneficiarse de estos servicios'
        }
      </p>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className={`bg-background rounded-lg p-4 border transition-all duration-200 hover:shadow-md cursor-pointer ${
              rec.urgent ? 'border-warning bg-warning-light' : 'border-border-light hover:border-primary-300'
            }`}
            onClick={rec.action}
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={rec.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-heading font-semibold text-text-primary">
                    {rec.title}
                  </h4>
                  {rec.urgent && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning text-white">
                      <Icon name="AlertTriangle" size={12} className="mr-1" />
                      Recomendado
                    </span>
                  )}
                </div>
                
                <p className="text-primary font-medium text-sm mb-1">
                  {rec.subtitle}
                </p>
                
                <p className="text-text-secondary text-sm mb-3">
                  {rec.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-text-muted">
                    {rec.rating && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-accent" />
                        <span>{rec.rating}</span>
                      </div>
                    )}
                    {rec.distance && (
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{rec.distance}</span>
                      </div>
                    )}
                    {rec.location && (
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{rec.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-1 text-primary text-sm font-medium">
                    <span>Ver más</span>
                    <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-accent-200">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-accent-600">
            <Icon name="Info" size={16} />
            <span>Recomendaciones basadas en ubicación y necesidades</span>
          </div>
          <button className="text-primary hover:text-primary-600 font-medium">
            Ver todas
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmartRecommendations;