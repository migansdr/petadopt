import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const CrossSellingSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recommendations, setRecommendations] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    generateRecommendations();
    
    // Show sidebar after a delay to not be intrusive
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  const generateRecommendations = () => {
    const currentPath = location.pathname;
    let recs = [];

    if (currentPath.startsWith('/pet/')) {
      // User is viewing a pet, recommend professionals
      recs = [
        {
          id: 'vet-rec',
          type: 'professional',
          title: '¿Necesitas un veterinario?',
          subtitle: 'Encuentra profesionales cerca de ti',
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop',
          action: () => navigate('/professionals?service=veterinary'),
          priority: 'high'
        },
        {
          id: 'grooming-rec',
          type: 'professional',
          title: 'Servicios de peluquería',
          subtitle: 'Mantén a tu mascota siempre bella',
          image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=100&h=100&fit=crop',
          action: () => navigate('/professionals?service=grooming'),
          priority: 'medium'
        }
      ];
    } else if (currentPath.startsWith('/professional/')) {
      // User is viewing a professional, recommend pets
      recs = [
        {
          id: 'pets-rec',
          type: 'pet',
          title: '¿Buscas una mascota?',
          subtitle: 'Encuentra tu compañero perfecto',
          image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=100&h=100&fit=crop',
          action: () => navigate('/'),
          priority: 'high'
        },
        {
          id: 'urgent-pets',
          type: 'pet',
          title: 'Adopciones urgentes',
          subtitle: 'Mascotas que necesitan hogar ya',
          image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&h=100&fit=crop',
          action: () => navigate('/?urgent=true'),
          priority: 'urgent'
        }
      ];
    } else if (currentPath === '/') {
      // User is on homepage, recommend professionals
      recs = [
        {
          id: 'professionals-rec',
          type: 'professional',
          title: 'Servicios para mascotas',
          subtitle: 'Veterinarios, peluquerías y más',
          image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop',
          action: () => navigate('/professionals'),
          priority: 'medium'
        }
      ];
    } else if (currentPath === '/professionals') {
      // User is on professionals page, recommend pets
      recs = [
        {
          id: 'adopt-rec',
          type: 'pet',
          title: '¿Ya tienes todo listo?',
          subtitle: 'Encuentra tu mascota ideal',
          image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=100&h=100&fit=crop',
          action: () => navigate('/'),
          priority: 'medium'
        }
      ];
    }

    setRecommendations(recs);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-4 border-l-error bg-error-light';
      case 'high':
        return 'border-l-4 border-l-primary bg-primary-50';
      case 'medium':
        return 'border-l-4 border-l-secondary bg-secondary-50';
      default:
        return 'border-l-4 border-l-accent bg-accent-50';
    }
  };

  if (!isVisible || recommendations.length === 0) {
    return null;
  }

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 max-w-sm">
      <div className="bg-background rounded-xl shadow-lg border border-border-light overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-sm">
                Recomendado para ti
              </h3>
              <p className="text-xs opacity-90">
                Basado en tu navegación
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-4 space-y-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${getPriorityStyles(rec.priority)}`}
              onClick={rec.action}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={rec.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-text-primary text-sm mb-1">
                    {rec.title}
                  </h4>
                  <p className="text-text-secondary text-xs">
                    {rec.subtitle}
                  </p>
                </div>
                
                <Icon name="ArrowRight" size={16} className="text-text-muted" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-surface border-t border-border-light p-3">
          <div className="flex items-center justify-between text-xs text-text-muted">
            <span>Personalizado para ti</span>
            <button
              onClick={handleDismiss}
              className="text-primary hover:text-primary-600"
            >
              Ocultar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrossSellingSidebar;