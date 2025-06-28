import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const QuickActionsFAB = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const getContextualActions = () => {
    const path = location.pathname;
    
    if (path === '/') {
      return [
        {
          id: 'add-favorite',
          label: 'Mis Favoritos',
          icon: 'Heart',
          color: 'error',
          action: () => {
            // This would open favorites manager
            window.dispatchEvent(new CustomEvent('openFavorites'));
          }
        },
        {
          id: 'find-professionals',
          label: 'Buscar Profesionales',
          icon: 'Stethoscope',
          color: 'secondary',
          action: () => navigate('/professionals')
        },
        {
          id: 'urgent-pets',
          label: 'Adopciones Urgentes',
          icon: 'AlertTriangle',
          color: 'warning',
          action: () => navigate('/?urgent=true')
        }
      ];
    } else if (path === '/professionals') {
      return [
        {
          id: 'find-pets',
          label: 'Buscar Mascotas',
          icon: 'Heart',
          color: 'primary',
          action: () => navigate('/')
        },
        {
          id: 'register-business',
          label: 'Registrar Negocio',
          icon: 'Plus',
          color: 'accent',
          action: () => navigate('/professional-register')
        },
        {
          id: 'emergency-services',
          label: 'Servicios de Urgencia',
          icon: 'AlertCircle',
          color: 'error',
          action: () => navigate('/professionals?emergency=true')
        }
      ];
    } else if (path.startsWith('/pet/')) {
      return [
        {
          id: 'find-similar',
          label: 'Mascotas Similares',
          icon: 'Search',
          color: 'primary',
          action: () => navigate('/?similar=true')
        },
        {
          id: 'find-vet',
          label: 'Buscar Veterinario',
          icon: 'Stethoscope',
          color: 'secondary',
          action: () => navigate('/professionals?service=veterinary')
        },
        {
          id: 'adoption-guide',
          label: 'Guía de Adopción',
          icon: 'BookOpen',
          color: 'accent',
          action: () => {
            // This would open adoption guide modal
            console.log('Open adoption guide');
          }
        }
      ];
    } else if (path.startsWith('/professional/')) {
      return [
        {
          id: 'find-pets',
          label: 'Buscar Mascotas',
          icon: 'Heart',
          color: 'primary',
          action: () => navigate('/')
        },
        {
          id: 'compare-professionals',
          label: 'Comparar Servicios',
          icon: 'GitCompare',
          color: 'accent',
          action: () => navigate('/professionals')
        },
        {
          id: 'emergency-contact',
          label: 'Contacto de Urgencia',
          icon: 'Phone',
          color: 'error',
          action: () => {
            // This would initiate emergency contact
            console.log('Emergency contact');
          }
        }
      ];
    }

    return [];
  };

  const actions = getContextualActions();

  if (actions.length === 0) {
    return null;
  }

  const toggleFAB = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Action Buttons */}
      {isOpen && (
        <div className="mb-4 space-y-3 animate-slide-up">
          {actions.map((action, index) => (
            <div
              key={action.id}
              className="flex items-center space-x-3"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-background px-3 py-2 rounded-lg shadow-md border border-border-light">
                <span className="text-sm font-medium text-text-primary whitespace-nowrap">
                  {action.label}
                </span>
              </div>
              <button
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                className={`w-12 h-12 bg-${action.color} text-white rounded-full shadow-lg hover:bg-${action.color}-600 transition-all duration-300 hover:scale-110 flex items-center justify-center`}
              >
                <Icon name={action.icon} size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={toggleFAB}
        className={`w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-600 transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        <Icon name={isOpen ? 'X' : 'Zap'} size={24} />
      </button>
    </div>
  );
};

export default QuickActionsFAB;