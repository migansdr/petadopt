import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import ConfirmDialog from 'components/ui/ConfirmDialog';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('moderation');
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);

  // Mock data
  const [pendingPets, setPendingPets] = useState([
    {
      id: 'pet_001',
      name: 'Luna',
      species: 'Dog',
      breed: 'Mestizo',
      shelterName: 'Refugio Esperanza',
      submittedDate: '2024-01-20T10:30:00Z',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
      reportCount: 0
    },
    {
      id: 'pet_002',
      name: 'Max',
      species: 'Dog',
      breed: 'Pastor Alemán',
      shelterName: 'Refugio Valencia',
      submittedDate: '2024-01-19T15:20:00Z',
      status: 'reported',
      image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
      reportCount: 3
    }
  ]);

  const [users, setUsers] = useState([
    {
      id: 'user_001',
      name: 'Refugio Esperanza',
      email: 'refugio@esperanza.com',
      type: 'shelter',
      status: 'active',
      joinDate: '2024-01-10T09:00:00Z',
      petsCount: 12,
      reportsCount: 0
    },
    {
      id: 'user_002',
      name: 'María García',
      email: 'maria@email.com',
      type: 'adopter',
      status: 'active',
      joinDate: '2024-01-15T14:30:00Z',
      applicationsCount: 3,
      reportsCount: 1
    }
  ]);

  const [statistics, setStatistics] = useState({
    totalPets: 156,
    activePets: 142,
    adoptedPets: 89,
    totalShelters: 25,
    activeShelters: 23,
    totalAdopters: 1247,
    pendingReports: 5,
    resolvedReports: 23
  });

  useEffect(() => {
    // Check admin authentication
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/');
      return;
    }

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const handleApprovePet = (petId) => {
    setPendingPets(prev => 
      prev.map(pet => 
        pet.id === petId ? { ...pet, status: 'approved' } : pet
      )
    );
  };

  const handleRejectPet = (petId) => {
    setActionToConfirm({
      type: 'reject_pet',
      petId,
      title: '¿Rechazar mascota?',
      message: 'Esta acción rechazará la publicación de la mascota. El refugio será notificado.'
    });
    setShowConfirmDialog(true);
  };

  const handleSuspendUser = (userId) => {
    setActionToConfirm({
      type: 'suspend_user',
      userId,
      title: '¿Suspender usuario?',
      message: 'Esta acción suspenderá temporalmente la cuenta del usuario.'
    });
    setShowConfirmDialog(true);
  };

  const handleConfirmAction = () => {
    if (actionToConfirm?.type === 'reject_pet') {
      setPendingPets(prev => 
        prev.filter(pet => pet.id !== actionToConfirm.petId)
      );
    } else if (actionToConfirm?.type === 'suspend_user') {
      setUsers(prev => 
        prev.map(user => 
          user.id === actionToConfirm.userId ? { ...user, status: 'suspended' } : user
        )
      );
    }
    
    setShowConfirmDialog(false);
    setActionToConfirm(null);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-light text-warning border-warning/20';
      case 'approved':
        return 'bg-success-light text-success border-success/20';
      case 'reported':
        return 'bg-error-light text-error border-error/20';
      case 'active':
        return 'bg-success-light text-success border-success/20';
      case 'suspended':
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
        return 'Aprobado';
      case 'reported':
        return 'Reportado';
      case 'active':
        return 'Activo';
      case 'suspended':
        return 'Suspendido';
      default:
        return status;
    }
  };

  const tabs = [
    { id: 'moderation', label: 'Moderación', icon: 'Shield', count: pendingPets.filter(p => p.status === 'pending' || p.status === 'reported').length },
    { id: 'users', label: 'Usuarios', icon: 'Users', count: users.length },
    { id: 'statistics', label: 'Estadísticas', icon: 'BarChart3', count: null }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Cargando panel de administración..." />
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
              Panel de Administración
            </h1>
            <p className="text-text-secondary">
              Gestiona la moderación, usuarios y estadísticas de la plataforma
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-surface rounded-lg p-6 shadow-sm border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Mascotas Activas</p>
                  <p className="text-2xl font-bold text-primary">{statistics.activePets}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 shadow-sm border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Refugios Activos</p>
                  <p className="text-2xl font-bold text-secondary">{statistics.activeShelters}</p>
                </div>
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Icon name="Building2" size={24} className="text-secondary" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 shadow-sm border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Adopciones</p>
                  <p className="text-2xl font-bold text-success">{statistics.adoptedPets}</p>
                </div>
                <div className="w-12 h-12 bg-success-light rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 shadow-sm border border-border-light">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-secondary text-sm">Reportes Pendientes</p>
                  <p className="text-2xl font-bold text-warning">{statistics.pendingReports}</p>
                </div>
                <div className="w-12 h-12 bg-warning-light rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-warning" />
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
                    {tab.count !== null && tab.count > 0 && (
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
            {/* Moderation Tab */}
            {activeTab === 'moderation' && (
              <div className="space-y-6">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Moderación de Contenido
                </h2>
                
                {pendingPets.filter(p => p.status === 'pending' || p.status === 'reported').length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-success-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckCircle" size={32} className="text-success" />
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                      Todo al día
                    </h3>
                    <p className="text-text-secondary">
                      No hay contenido pendiente de moderación
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingPets.filter(p => p.status === 'pending' || p.status === 'reported').map((pet) => (
                      <div key={pet.id} className="card p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={pet.image}
                              alt={pet.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-heading font-semibold text-text-primary">
                                  {pet.name}
                                </h3>
                                <p className="text-text-secondary text-sm">
                                  {pet.breed} • {pet.shelterName}
                                </p>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(pet.status)}`}>
                                  {getStatusLabel(pet.status)}
                                </span>
                                {pet.reportCount > 0 && (
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error-light text-error">
                                    {pet.reportCount} reportes
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-sm text-text-secondary mb-4">
                              Enviado el {formatDate(pet.submittedDate)}
                            </div>
                            
                            <div className="flex space-x-3">
                              <button
                                onClick={() => navigate(`/pet/${pet.id}`)}
                                className="btn-outline text-sm px-4 py-2"
                              >
                                Ver detalles
                              </button>
                              <button
                                onClick={() => handleApprovePet(pet.id)}
                                className="bg-success text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-success-600 transition-colors duration-200"
                              >
                                Aprobar
                              </button>
                              <button
                                onClick={() => handleRejectPet(pet.id)}
                                className="bg-error text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-error-600 transition-colors duration-200"
                              >
                                Rechazar
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

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Gestión de Usuarios
                </h2>
                
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="card p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            user.type === 'shelter' ? 'bg-primary-100' : 'bg-secondary-100'
                          }`}>
                            <Icon 
                              name={user.type === 'shelter' ? 'Building2' : 'User'} 
                              size={24} 
                              className={user.type === 'shelter' ? 'text-primary' : 'text-secondary'}
                            />
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-heading font-semibold text-text-primary">
                              {user.name}
                            </h3>
                            <p className="text-text-secondary text-sm">{user.email}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-text-muted">
                              <span>Tipo: {user.type === 'shelter' ? 'Refugio' : 'Adoptante'}</span>
                              <span>•</span>
                              <span>Registrado: {formatDate(user.joinDate)}</span>
                            </div>
                            {user.type === 'shelter' && (
                              <div className="text-sm text-text-secondary mt-1">
                                {user.petsCount} mascotas publicadas
                              </div>
                            )}
                            {user.type === 'adopter' && (
                              <div className="text-sm text-text-secondary mt-1">
                                {user.applicationsCount} solicitudes enviadas
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(user.status)}`}>
                            {getStatusLabel(user.status)}
                          </span>
                          
                          {user.reportsCount > 0 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning-light text-warning">
                              {user.reportsCount} reportes
                            </span>
                          )}
                          
                          {user.status === 'active' && (
                            <button
                              onClick={() => handleSuspendUser(user.id)}
                              className="bg-warning text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-warning-600 transition-colors duration-200"
                            >
                              Suspender
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === 'statistics' && (
              <div className="space-y-8">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Estadísticas de la Plataforma
                </h2>
                
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-surface rounded-lg p-6 shadow-sm border border-border-light">
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                      Mascotas
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Total:</span>
                        <span className="font-medium">{statistics.totalPets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Activas:</span>
                        <span className="font-medium text-success">{statistics.activePets}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Adoptadas:</span>
                        <span className="font-medium text-primary">{statistics.adoptedPets}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface rounded-lg p-6 shadow-sm border border-border-light">
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                      Refugios
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Total:</span>
                        <span className="font-medium">{statistics.totalShelters}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Activos:</span>
                        <span className="font-medium text-success">{statistics.activeShelters}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface rounded-lg p-6 shadow-sm border border-border-light">
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                      Reportes
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Pendientes:</span>
                        <span className="font-medium text-warning">{statistics.pendingReports}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Resueltos:</span>
                        <span className="font-medium text-success">{statistics.resolvedReports}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts placeholder */}
                <div className="bg-surface rounded-lg p-6 shadow-sm border border-border-light">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Actividad Reciente
                  </h3>
                  <div className="text-center py-12 text-text-secondary">
                    <Icon name="BarChart3" size={48} className="mx-auto mb-4 text-text-muted" />
                    <p>Gráficos de estadísticas próximamente</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmAction}
        title={actionToConfirm?.title}
        message={actionToConfirm?.message}
        type="warning"
      />
    </div>
  );
};

export default AdminPanel;