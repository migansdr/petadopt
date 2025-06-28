import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';
import LoadingSpinner from 'components/ui/LoadingSpinner';

const AdopterPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('favorites');
  const [favorites, setFavorites] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockFavorites = [
    {
      id: '1',
      name: 'Luna',
      species: 'Dog',
      breed: 'Mestizo',
      age: '2 años',
      location: 'Madrid',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
      addedDate: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Milo',
      species: 'Cat',
      breed: 'Siamés',
      age: '1 año',
      location: 'Barcelona',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
      addedDate: '2024-01-12T15:20:00Z'
    }
  ];

  const mockApplications = [
    {
      id: 'app_001',
      petId: '1',
      petName: 'Luna',
      petImage: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
      shelterName: 'Refugio Esperanza Madrid',
      status: 'pending',
      submittedDate: '2024-01-18T09:15:00Z',
      lastUpdate: '2024-01-20T14:30:00Z'
    },
    {
      id: 'app_002',
      petId: '3',
      petName: 'Bella',
      petImage: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
      shelterName: 'Refugio Valencia',
      status: 'approved',
      submittedDate: '2024-01-10T11:45:00Z',
      lastUpdate: '2024-01-15T16:20:00Z'
    }
  ];

  const mockNotifications = [
    {
      id: 'notif_001',
      type: 'application_update',
      title: 'Solicitud actualizada',
      message: 'Tu solicitud para adoptar a Luna ha sido revisada',
      date: '2024-01-20T14:30:00Z',
      read: false,
      actionUrl: '/adopter-panel?tab=applications'
    },
    {
      id: 'notif_002',
      type: 'new_match',
      title: 'Nueva mascota disponible',
      message: 'Encontramos una mascota que podría interesarte: Max',
      date: '2024-01-19T10:15:00Z',
      read: true,
      actionUrl: '/pet/max'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Load favorites from localStorage
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const favoritePets = mockFavorites.filter(pet => storedFavorites.includes(pet.id));
        setFavorites(favoritePets);
        
        setApplications(mockApplications);
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRemoveFavorite = (petId) => {
    const updatedFavorites = favorites.filter(pet => pet.id !== petId);
    setFavorites(updatedFavorites);
    
    // Update localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const newStoredFavorites = storedFavorites.filter(id => id !== petId);
    localStorage.setItem('favorites', JSON.stringify(newStoredFavorites));
  };

  const handleMarkNotificationRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-light text-warning border-warning/20';
      case 'approved':
        return 'bg-success-light text-success border-success/20';
      case 'rejected':
        return 'bg-error-light text-error border-error/20';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'approved':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'favorites', label: 'Favoritos', icon: 'Heart', count: favorites.length },
    { id: 'applications', label: 'Solicitudes', icon: 'FileText', count: applications.length },
    { id: 'notifications', label: 'Notificaciones', icon: 'Bell', count: notifications.filter(n => !n.read).length }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Cargando tu panel..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveHeader />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
              Mi Panel de Adopción
            </h1>
            <p className="text-text-secondary">
              Gestiona tus mascotas favoritas, solicitudes de adopción y notificaciones
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-border-light">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span>{tab.label}</span>
                    {tab.count > 0 && (
                      <span className={`inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${
                        activeTab === tab.id ? 'bg-primary text-white' : 'bg-text-muted text-white'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                {favorites.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Heart" size={32} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                      No tienes favoritos aún
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Explora mascotas y añádelas a favoritos para encontrarlas fácilmente
                    </p>
                    <button
                      onClick={() => navigate('/')}
                      className="btn-primary"
                    >
                      Explorar mascotas
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((pet) => (
                      <div key={pet.id} className="card p-6">
                        <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={pet.image}
                            alt={pet.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => handleRemoveFavorite(pet.id)}
                            className="absolute top-2 right-2 p-2 bg-error text-white rounded-full hover:bg-error-600 transition-colors duration-200"
                          >
                            <Icon name="X" size={16} />
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h3 className="text-lg font-heading font-semibold text-text-primary">
                              {pet.name}
                            </h3>
                            <p className="text-text-secondary text-sm">
                              {pet.breed} • {pet.age}
                            </p>
                            <p className="text-text-muted text-sm flex items-center mt-1">
                              <Icon name="MapPin" size={14} className="mr-1" />
                              {pet.location}
                            </p>
                          </div>
                          
                          <div className="text-xs text-text-muted">
                            Añadido el {formatDate(pet.addedDate)}
                          </div>
                          
                          <button
                            onClick={() => navigate(`/pet/${pet.id}`)}
                            className="w-full btn-primary"
                          >
                            Ver detalles
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div>
                {applications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="FileText" size={32} className="text-secondary" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                      No tienes solicitudes
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Cuando contactes con refugios, tus solicitudes aparecerán aquí
                    </p>
                    <button
                      onClick={() => navigate('/')}
                      className="btn-primary"
                    >
                      Buscar mascotas
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {applications.map((application) => (
                      <div key={application.id} className="card p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={application.petImage}
                              alt={application.petName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-heading font-semibold text-text-primary">
                                  Solicitud para {application.petName}
                                </h3>
                                <p className="text-text-secondary text-sm">
                                  {application.shelterName}
                                </p>
                              </div>
                              
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(application.status)}`}>
                                {getStatusLabel(application.status)}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-text-secondary mb-4">
                              <div>
                                <span className="font-medium">Enviada:</span> {formatDate(application.submittedDate)}
                              </div>
                              <div>
                                <span className="font-medium">Última actualización:</span> {formatDate(application.lastUpdate)}
                              </div>
                            </div>
                            
                            <div className="flex space-x-3">
                              <button
                                onClick={() => navigate(`/pet/${application.petId}`)}
                                className="btn-outline text-sm px-4 py-2"
                              >
                                Ver mascota
                              </button>
                              <button className="btn-primary text-sm px-4 py-2">
                                Ver detalles
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                {notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Bell" size={32} className="text-accent" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                      No tienes notificaciones
                    </h3>
                    <p className="text-text-secondary">
                      Te notificaremos sobre actualizaciones de tus solicitudes y nuevas mascotas
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`card p-6 cursor-pointer transition-all duration-200 ${
                          !notification.read ? 'border-primary bg-primary-50' : ''
                        }`}
                        onClick={() => {
                          handleMarkNotificationRead(notification.id);
                          if (notification.actionUrl) {
                            navigate(notification.actionUrl);
                          }
                        }}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                            notification.type === 'application_update' ? 'bg-warning-light' :
                            notification.type === 'new_match' ? 'bg-success-light' : 'bg-primary-100'
                          }`}>
                            <Icon 
                              name={
                                notification.type === 'application_update' ? 'FileText' :
                                notification.type === 'new_match' ? 'Heart' : 'Bell'
                              } 
                              size={18} 
                              className={
                                notification.type === 'application_update' ? 'text-warning' :
                                notification.type === 'new_match' ? 'text-success' : 'text-primary'
                              }
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className="font-medium text-text-primary">
                                {notification.title}
                              </h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                              )}
                            </div>
                            <p className="text-text-secondary text-sm mb-2">
                              {notification.message}
                            </p>
                            <div className="text-xs text-text-muted">
                              {formatDate(notification.date)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdopterPanel;