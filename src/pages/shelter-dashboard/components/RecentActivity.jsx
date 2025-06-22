import React from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = () => {
  // Mock recent activity data
  const recentActivities = [
    {
      id: 1,
      type: 'pet_added',
      title: 'Nueva mascota añadida',
      description: 'Luna (Perro Mestizo) ha sido añadida al refugio',
      timestamp: '2024-01-15T10:30:00Z',
      icon: 'Plus',
      color: 'success'
    },
    {
      id: 2,
      type: 'pet_viewed',
      title: 'Mascota vista',
      description: 'Max ha recibido 15 nuevas visualizaciones hoy',
      timestamp: '2024-01-15T09:15:00Z',
      icon: 'Eye',
      color: 'primary'
    },
    {
      id: 3,
      type: 'inquiry',
      title: 'Nueva consulta',
      description: 'Alguien ha preguntado sobre Bella via WhatsApp',
      timestamp: '2024-01-14T16:45:00Z',
      icon: 'MessageCircle',
      color: 'secondary'
    },
    {
      id: 4,
      type: 'pet_updated',
      title: 'Mascota actualizada',
      description: 'Rocky - Información actualizada correctamente',
      timestamp: '2024-01-14T14:20:00Z',
      icon: 'Edit',
      color: 'warning'
    },
    {
      id: 5,
      type: 'adoption_interest',
      title: 'Interés de adopción',
      description: 'Whiskers ha recibido 3 consultas esta semana',
      timestamp: '2024-01-13T11:30:00Z',
      icon: 'Heart',
      color: 'accent'
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Hace menos de 1 hora';
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'pet_added':
        return 'Plus';
      case 'pet_viewed':
        return 'Eye';
      case 'inquiry':
        return 'MessageCircle';
      case 'pet_updated':
        return 'Edit';
      case 'adoption_interest':
        return 'Heart';
      default:
        return 'Bell';
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-semibold text-text-primary">
          Actividad Reciente
        </h2>
        <button className="text-primary hover:text-primary-600 text-sm font-medium transition-colors duration-200">
          Ver todo
        </button>
      </div>

      {recentActivities.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-text-muted bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Clock" size={24} className="text-text-muted" />
          </div>
          <p className="text-text-secondary">No hay actividad reciente</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-4 p-4 bg-background rounded-lg border border-border-light hover:border-primary-200 transition-all duration-200"
            >
              {/* Activity Icon */}
              <div className={`flex-shrink-0 w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                <Icon 
                  name={getActivityIcon(activity.type)} 
                  size={18} 
                  className={`text-${activity.color}`} 
                />
              </div>

              {/* Activity Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary mb-1">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-text-secondary mb-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-text-muted">
                      <Icon name="Clock" size={12} />
                      <span>{formatTimeAgo(activity.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                <button className="p-2 text-text-muted hover:text-primary hover:bg-primary-50 rounded-lg transition-all duration-200">
                  <Icon name="ChevronRight" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activity Summary */}
      <div className="mt-6 pt-6 border-t border-border-light">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">12</div>
            <div className="text-xs text-text-secondary">Mascotas añadidas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">248</div>
            <div className="text-xs text-text-secondary">Visualizaciones</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary mb-1">18</div>
            <div className="text-xs text-text-secondary">Consultas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1">5</div>
            <div className="text-xs text-text-secondary">Adopciones</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;