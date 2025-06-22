import React from 'react';
import Icon from 'components/AppIcon';

const DashboardStats = ({ pets }) => {
  const totalPets = pets.length;
  const activePets = pets.filter(pet => pet.status === 'active').length;
  const urgentPets = pets.filter(pet => pet.urgent).length;
  const totalViews = pets.reduce((sum, pet) => sum + pet.viewCount, 0);

  const stats = [
    {
      id: 'total-pets',
      label: 'Total Mascotas',
      value: totalPets,
      icon: 'Heart',
      color: 'primary',
      description: 'Mascotas registradas'
    },
    {
      id: 'active-pets',
      label: 'Mascotas Activas',
      value: activePets,
      icon: 'CheckCircle',
      color: 'success',
      description: 'Disponibles para adopción'
    },
    {
      id: 'urgent-pets',
      label: 'Casos Urgentes',
      value: urgentPets,
      icon: 'AlertTriangle',
      color: 'warning',
      description: 'Necesitan adopción urgente'
    },
    {
      id: 'total-views',
      label: 'Visualizaciones',
      value: totalViews,
      icon: 'Eye',
      color: 'secondary',
      description: 'Total de vistas'
    }
  ];

  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">
        Estadísticas del Refugio
      </h2>
      
      {/* Mobile: Horizontal scroll */}
      <div className="flex space-x-4 overflow-x-auto pb-4 md:hidden">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex-shrink-0 w-64 bg-surface rounded-lg p-4 shadow-sm border border-border-light"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <Icon name={stat.icon} size={20} className={`text-${stat.color}`} />
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold text-${stat.color}`}>
                  {stat.value.toLocaleString()}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-text-primary text-sm mb-1">
                {stat.label}
              </h3>
              <p className="text-xs text-text-secondary">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-surface rounded-lg p-6 shadow-sm border border-border-light hover:shadow-md transition-all duration-300 hover:transform hover:translate-y-[-2px]"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <Icon name={stat.icon} size={24} className={`text-${stat.color}`} />
              </div>
              <div className={`text-3xl font-bold text-${stat.color}`}>
                {stat.value.toLocaleString()}
              </div>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-1">
                {stat.label}
              </h3>
              <p className="text-sm text-text-secondary">
                {stat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Insights */}
      <div className="mt-6 bg-accent-50 rounded-lg p-4 border border-accent-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="TrendingUp" size={16} className="text-accent" />
          </div>
          <div>
            <h4 className="font-medium text-text-primary mb-1">
              Rendimiento del Refugio
            </h4>
            <p className="text-sm text-text-secondary">
              {activePets > 0 ? (
                <>
                  Tienes <span className="font-semibold text-success">{activePets} mascotas activas</span> disponibles para adopción.
                  {urgentPets > 0 && (
                    <> <span className="font-semibold text-warning">{urgentPets} casos requieren atención urgente.</span></>
                  )}
                </>
              ) : (
                'No tienes mascotas activas. ¡Añade algunas para empezar a ayudar!'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;