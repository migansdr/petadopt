import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const DashboardQuickActions = () => {
  const navigate = useNavigate();

  const handleAddPet = () => {
    navigate('/add-edit-pet-form');
  };

  const handleViewPets = () => {
    // This would typically scroll to pets section or filter pets
    const petsSection = document.getElementById('pets-section');
    if (petsSection) {
      petsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleManageProfile = () => {
    // This would typically open profile management modal or navigate to profile page
    console.log('Manage profile clicked');
  };

  const quickActions = [
    {
      id: 'add-pet',
      label: 'Subir Nueva Mascota',
      description: 'Añade una nueva mascota disponible para adopción',
      icon: 'Plus',
      onClick: handleAddPet,
      primary: true,
      color: 'primary'
    },
    {
      id: 'view-pets',
      label: 'Ver Mis Mascotas',
      description: 'Gestiona las mascotas actualmente publicadas',
      icon: 'Eye',
      onClick: handleViewPets,
      primary: false,
      color: 'secondary'
    },
    {
      id: 'manage-profile',
      label: 'Gestionar Perfil',
      description: 'Actualiza la información del refugio',
      icon: 'Settings',
      onClick: handleManageProfile,
      primary: false,
      color: 'accent'
    }
  ];

  return (
    <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light mb-8 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
          Acciones Rápidas
        </h2>
        <p className="text-text-secondary">
          Gestiona tu refugio y ayuda a las mascotas a encontrar un hogar
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`group relative p-6 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 text-left ${
              action.primary
                ? `bg-${action.color} border-${action.color} text-white hover:bg-${action.color}-600 focus:ring-${action.color}-300 transform hover:scale-105 hover:shadow-md`
                : `bg-background border-border hover:border-${action.color} hover:bg-${action.color}-50 focus:ring-${action.color}-300 transform hover:translate-y-[-2px] hover:shadow-md`
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                action.primary
                  ? 'bg-white bg-opacity-20'
                  : `bg-${action.color}-100 group-hover:bg-${action.color}-200`
              }`}>
                <Icon 
                  name={action.icon} 
                  size={24} 
                  className={action.primary ? 'text-white' : `text-${action.color} group-hover:text-${action.color}-700`}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`font-heading font-semibold mb-1 transition-colors duration-300 ${
                  action.primary 
                    ? 'text-white' 
                    : `text-text-primary group-hover:text-${action.color}-700`
                }`}>
                  {action.label}
                </h3>
                <p className={`text-sm transition-colors duration-300 ${
                  action.primary 
                    ? 'text-white text-opacity-90' :'text-text-secondary group-hover:text-text-primary'
                }`}>
                  {action.description}
                </p>
              </div>
            </div>

            {/* Hover indicator */}
            <div className={`absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              action.primary ? 'text-white' : `text-${action.color}`
            }`}>
              <Icon name="ArrowRight" size={16} />
            </div>
          </button>
        ))}
      </div>

      {/* Additional Stats or Info */}
      <div className="mt-6 pt-6 border-t border-border-light">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Info" size={16} />
            <span>Tip: Mantén las fotos de las mascotas actualizadas para mejores resultados</span>
          </div>
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircle" size={16} />
            <span className="font-medium">Refugio Verificado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardQuickActions;