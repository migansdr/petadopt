import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';
import LoadingSpinner from 'components/ui/LoadingSpinner';

const ProfessionalPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [professionalInfo, setProfessionalInfo] = useState(null);
  const [statistics, setStatistics] = useState({});
  const [inquiries, setInquiries] = useState([]);

  // Mock data
  const mockProfessional = {
    id: 'prof_001',
    name: 'Clínica Veterinaria San Antón',
    type: 'clinic',
    email: 'info@clinicasananton.com',
    phone: '+34 91 123 4567',
    whatsapp: '+34 600 123 456',
    website: 'https://clinicasananton.com',
    address: 'Calle Mayor 123, Madrid',
    city: 'Madrid',
    province: 'madrid',
    description: 'Clínica veterinaria con más de 20 años de experiencia.',
    services: ['veterinary', 'emergency', 'surgery', 'dentistry'],
    verified: true,
    status: 'active',
    joinDate: '2023-06-15T10:00:00Z',
    rating: 4.8,
    reviewsCount: 127,
    viewsCount: 1250,
    contactsCount: 89
  };

  const mockStatistics = {
    totalViews: 1250,
    totalContacts: 89,
    totalReviews: 127,
    averageRating: 4.8,
    monthlyViews: 320,
    monthlyContacts: 25
  };

  const mockInquiries = [
    {
      id: 'inq_001',
      customerName: 'María García',
      customerEmail: 'maria@email.com',
      customerPhone: '+34 600 111 222',
      service: 'veterinary',
      message: 'Hola, necesito una consulta urgente para mi gato. ¿Tienen disponibilidad hoy?',
      date: '2024-01-20T14:30:00Z',
      status: 'pending'
    },
    {
      id: 'inq_002',
      customerName: 'Carlos López',
      customerEmail: 'carlos@email.com',
      customerPhone: '+34 600 333 444',
      service: 'surgery',
      message: 'Mi perro necesita una cirugía. ¿Podrían darme información sobre precios y disponibilidad?',
      date: '2024-01-19T10:15:00Z',
      status: 'responded'
    }
  ];

  useEffect(() => {
    // Check professional authentication
    const isProfessional = localStorage.getItem('isProfessional') === 'true';
    if (!isProfessional) {
      navigate('/professional-register');
      return;
    }

    // Simulate loading
    setTimeout(() => {
      setProfessionalInfo(mockProfessional);
      setStatistics(mockStatistics);
      setInquiries(mockInquiries);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const getServiceLabel = (service) => {
    const labels = {
      veterinary: 'Veterinaria',
      grooming: 'Peluquería',
      training: 'Adiestramiento',
      pet_store: 'Tienda de mascotas',
      boarding: 'Hospedaje',
      daycare: 'Guardería',
      emergency: 'Urgencias',
      surgery: 'Cirugía',
      dentistry: 'Odontología'
    };
    return labels[service] || service;
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

  const handleMarkInquiryResponded = (inquiryId) => {
    setInquiries(prev =>
      prev.map(inquiry =>
        inquiry.id === inquiryId ? { ...inquiry, status: 'responded' } : inquiry
      )
    );
  };

  const tabs = [
    { id: 'profile', label: 'Mi Perfil', icon: 'User' },
    { id: 'statistics', label: 'Estadísticas', icon: 'BarChart3' },
    { id: 'inquiries', label: 'Consultas', icon: 'MessageCircle', count: inquiries.filter(i => i.status === 'pending').length },
    { id: 'settings', label: 'Configuración', icon: 'Settings' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Cargando panel profesional..." />
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                  Panel Profesional
                </h1>
                <p className="text-text-secondary">
                  Gestiona tu perfil, estadísticas y consultas de clientes
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                {professionalInfo?.verified && (
                  <div className="flex items-center space-x-2 bg-success-light text-success px-3 py-2 rounded-lg">
                    <Icon name="CheckCircle" size={18} />
                    <span className="text-sm font-medium">Verificado</span>
                  </div>
                )}
                
                <button
                  onClick={() => navigate(`/professional/${professionalInfo?.id}`)}
                  className="btn-outline flex items-center space-x-2"
                >
                  <Icon name="Eye" size={18} />
                  <span>Ver perfil público</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface rounded-lg p-6 shadow-sm border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Visualizaciones</p>
                  <p className="text-2xl font-bold text-primary">{statistics.totalViews}</p>
                  <p className="text-xs text-success">+{statistics.monthlyViews} este mes</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Eye" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 shadow-sm border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Contactos</p>
                  <p className="text-2xl font-bold text-secondary">{statistics.totalContacts}</p>
                  <p className="text-xs text-success">+{statistics.monthlyContacts} este mes</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Icon name="MessageCircle" size={24} className="text-secondary" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 shadow-sm border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Reseñas</p>
                  <p className="text-2xl font-bold text-accent">{statistics.totalReviews}</p>
                  <p className="text-xs text-text-secondary">Promedio: {statistics.averageRating}⭐</p>
                </div>
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Icon name="Star" size={24} className="text-accent" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 shadow-sm border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Consultas Pendientes</p>
                  <p className="text-2xl font-bold text-warning">{inquiries.filter(i => i.status === 'pending').length}</p>
                  <p className="text-xs text-text-secondary">Requieren respuesta</p>
                </div>
                <div className="w-12 h-12 bg-warning-light rounded-lg flex items-center justify-center">
                  <Icon name="AlertCircle" size={24} className="text-warning" />
                </div>
              </div>
            </div>
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
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-heading font-semibold text-text-primary">
                      Información del Perfil
                    </h2>
                    <button className="btn-outline">
                      Editar perfil
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Nombre del negocio
                        </label>
                        <p className="text-text-primary font-medium">{professionalInfo.name}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Email
                        </label>
                        <p className="text-text-primary">{professionalInfo.email}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Teléfono
                        </label>
                        <p className="text-text-primary">{professionalInfo.phone}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          WhatsApp
                        </label>
                        <p className="text-text-primary">{professionalInfo.whatsapp}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Dirección
                        </label>
                        <p className="text-text-primary">{professionalInfo.address}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Servicios
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {professionalInfo.services.map((service) => (
                            <span
                              key={service}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary border border-secondary/20"
                            >
                              {getServiceLabel(service)}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                          Estado
                        </label>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            professionalInfo.status === 'active' 
                              ? 'bg-success-light text-success border border-success/20'
                              : 'bg-warning-light text-warning border border-warning/20'
                          }`}>
                            {professionalInfo.status === 'active' ? 'Activo' : 'Pendiente'}
                          </span>
                          {professionalInfo.verified && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary border border-primary/20">
                              Verificado
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Descripción
                  </h3>
                  <p className="text-text-secondary">{professionalInfo.description}</p>
                </div>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === 'statistics' && (
              <div className="space-y-6">
                <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                  <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                    Estadísticas de Rendimiento
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-background rounded-lg border border-border-light">
                      <Icon name="Eye" size={32} className="text-primary mx-auto mb-3" />
                      <div className="text-2xl font-bold text-text-primary mb-1">{statistics.totalViews}</div>
                      <div className="text-sm text-text-secondary">Visualizaciones totales</div>
                    </div>
                    
                    <div className="text-center p-6 bg-background rounded-lg border border-border-light">
                      <Icon name="MessageCircle" size={32} className="text-secondary mx-auto mb-3" />
                      <div className="text-2xl font-bold text-text-primary mb-1">{statistics.totalContacts}</div>
                      <div className="text-sm text-text-secondary">Contactos recibidos</div>
                    </div>
                    
                    <div className="text-center p-6 bg-background rounded-lg border border-border-light">
                      <Icon name="Star" size={32} className="text-accent mx-auto mb-3" />
                      <div className="text-2xl font-bold text-text-primary mb-1">{statistics.averageRating}</div>
                      <div className="text-sm text-text-secondary">Puntuación promedio</div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Rendimiento Mensual
                  </h3>
                  <div className="text-center py-12 text-text-secondary">
                    <Icon name="BarChart3" size={48} className="mx-auto mb-4 text-text-muted" />
                    <p>Gráficos de estadísticas próximamente</p>
                  </div>
                </div>
              </div>
            )}

            {/* Inquiries Tab */}
            {activeTab === 'inquiries' && (
              <div className="space-y-6">
                <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                  <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                    Consultas de Clientes
                  </h2>
                  
                  {inquiries.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="MessageCircle" size={48} className="text-text-muted mx-auto mb-4" />
                      <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                        No hay consultas
                      </h3>
                      <p className="text-text-secondary">
                        Las consultas de clientes aparecerán aquí
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="border border-border-light rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-text-primary">{inquiry.customerName}</h4>
                              <p className="text-sm text-text-secondary">{inquiry.customerEmail}</p>
                              <p className="text-sm text-text-secondary">{inquiry.customerPhone}</p>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary border border-secondary/20">
                                {getServiceLabel(inquiry.service)}
                              </span>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                inquiry.status === 'pending'
                                  ? 'bg-warning-light text-warning border border-warning/20'
                                  : 'bg-success-light text-success border border-success/20'
                              }`}>
                                {inquiry.status === 'pending' ? 'Pendiente' : 'Respondida'}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-text-secondary mb-3">{inquiry.message}</p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-text-muted">
                              {formatDate(inquiry.date)}
                            </span>
                            
                            {inquiry.status === 'pending' && (
                              <div className="flex space-x-2">
                                <a
                                  href={`mailto:${inquiry.customerEmail}`}
                                  className="btn-outline text-sm px-3 py-1"
                                >
                                  Responder por email
                                </a>
                                <button
                                  onClick={() => handleMarkInquiryResponded(inquiry.id)}
                                  className="bg-success text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-success-600 transition-colors duration-200"
                                >
                                  Marcar como respondida
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                  <h2 className="text-xl font-heading font-semibold text-text-primary mb-6">
                    Configuración de la Cuenta
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-3">Notificaciones</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-border rounded focus:ring-primary-300" />
                          <span className="text-text-secondary">Recibir notificaciones por email de nuevas consultas</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-border rounded focus:ring-primary-300" />
                          <span className="text-text-secondary">Recibir resumen semanal de estadísticas</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" className="w-4 h-4 text-primary border-border rounded focus:ring-primary-300" />
                          <span className="text-text-secondary">Recibir consejos para mejorar el perfil</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-text-primary mb-3">Privacidad</h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-border rounded focus:ring-primary-300" />
                          <span className="text-text-secondary">Mostrar mi perfil en el directorio público</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-primary border-border rounded focus:ring-primary-300" />
                          <span className="text-text-secondary">Permitir que los clientes me contacten directamente</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border-light">
                      <h3 className="text-lg font-medium text-text-primary mb-3">Zona de Peligro</h3>
                      <div className="space-y-3">
                        <button className="bg-warning text-white px-4 py-2 rounded-lg font-medium hover:bg-warning-600 transition-colors duration-200">
                          Pausar perfil temporalmente
                        </button>
                        <button className="bg-error text-white px-4 py-2 rounded-lg font-medium hover:bg-error-600 transition-colors duration-200">
                          Eliminar cuenta permanentemente
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalPanel;