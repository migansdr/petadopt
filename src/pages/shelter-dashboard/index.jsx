import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import AdaptiveHeader from 'components/ui/AdaptiveHeader';
import DashboardQuickActions from 'components/ui/DashboardQuickActions';
import DashboardStats from './components/DashboardStats';
import PetManagementGrid from './components/PetManagementGrid';
import RecentActivity from './components/RecentActivity';

const ShelterDashboard = () => {
  const navigate = useNavigate();
  const [shelterInfo, setShelterInfo] = useState(null);
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [speciesFilter, setSpeciesFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPets, setSelectedPets] = useState([]);

  // Mock data for shelter pets
  const mockPets = [
    {
      id: 1,
      name: "Luna",
      species: "Perro",
      breed: "Mestizo",
      age: "2 años",
      size: "Mediano",
      location: "Madrid",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop",
      uploadDate: "2024-01-15",
      viewCount: 45,
      status: "active",
      tags: ["Vacunado", "Esterilizado", "Sociable"],
      description: `Luna es una perra muy cariñosa y juguetona que busca una familia que le dé todo el amor que se merece. 
      
Es perfecta para familias con niños ya que es muy paciente y protectora. Le encanta pasear y jugar en el parque.`,
      urgent: false
    },
    {
      id: 2,
      name: "Milo",
      species: "Gato",
      breed: "Siamés",
      age: "1 año",
      size: "Pequeño",
      location: "Barcelona",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
      uploadDate: "2024-01-12",
      viewCount: 32,
      status: "active",
      tags: ["Vacunado", "Sociable"],
      description: `Milo es un gato joven muy activo y curioso. Le gusta explorar y jugar con juguetes.
      
Es muy cariñoso una vez que toma confianza y se adapta bien a otros gatos.`,
      urgent: true
    },
    {
      id: 3,
      name: "Bella",
      species: "Perro",
      breed: "Golden Retriever",
      age: "5 años",
      size: "Grande",
      location: "Valencia",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      uploadDate: "2024-01-10",
      viewCount: 67,
      status: "pending",
      tags: ["Vacunado", "Esterilizado", "Sociable"],
      description: `Bella es una perra adulta muy tranquila y obediente. Es perfecta como compañera para personas mayores.
      
Tiene mucha experiencia con niños y es muy protectora con su familia.`,
      urgent: false
    },
    {
      id: 4,
      name: "Rocky",
      species: "Perro",
      breed: "Pastor Alemán",
      age: "3 años",
      size: "Grande",
      location: "Sevilla",
      image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop",
      uploadDate: "2024-01-08",
      viewCount: 89,
      status: "active",
      tags: ["Vacunado", "Esterilizado"],
      description: `Rocky es un perro muy inteligente y leal. Necesita una familia activa que pueda darle el ejercicio que necesita.
      
Es excelente como perro guardián y muy obediente con el entrenamiento adecuado.`,
      urgent: false
    },
    {
      id: 5,
      name: "Whiskers",
      species: "Gato",
      breed: "Persa",
      age: "4 años",
      size: "Mediano",
      location: "Bilbao",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop",
      uploadDate: "2024-01-05",
      viewCount: 23,
      status: "active",
      tags: ["Vacunado", "Esterilizado", "Sociable"],
      description: `Whiskers es un gato muy elegante y tranquilo. Le gusta la tranquilidad y los mimos.
      
Es perfecto para personas que buscan un compañero relajado y cariñoso.`,
      urgent: false
    },
    {
      id: 6,
      name: "Max",
      species: "Perro",
      breed: "Labrador",
      age: "6 meses",
      size: "Mediano",
      location: "Zaragoza",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
      uploadDate: "2024-01-03",
      viewCount: 156,
      status: "active",
      tags: ["Vacunado", "Sociable"],
      description: `Max es un cachorro muy enérgico y juguetón. Necesita una familia que pueda dedicarle tiempo para su entrenamiento.
      
Es muy inteligente y aprende rápido. Perfecto para familias activas con niños.`,
      urgent: true
    }
  ];

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const shelter = JSON.parse(localStorage.getItem('shelterInfo') || 'null');
    
    if (!isAuthenticated || !shelter) {
      navigate('/authentication-login-register');
      return;
    }

    setShelterInfo(shelter);
    
    // Simulate loading
    setTimeout(() => {
      setPets(mockPets);
      setFilteredPets(mockPets);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  useEffect(() => {
    let filtered = pets;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(pet => pet.status === statusFilter);
    }

    // Apply species filter
    if (speciesFilter !== 'all') {
      filtered = filtered.filter(pet => pet.species === speciesFilter);
    }

    setFilteredPets(filtered);
  }, [pets, searchTerm, statusFilter, speciesFilter]);

  const handleAddPet = () => {
    navigate('/add-edit-pet-form');
  };

  const handleEditPet = (petId) => {
    navigate(`/add-edit-pet-form?edit=true&id=${petId}`);
  };

  const handleDeletePet = (petId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta mascota?')) {
      const updatedPets = pets.filter(pet => pet.id !== petId);
      setPets(updatedPets);
    }
  };

  const handleBulkAction = (action) => {
    if (selectedPets.length === 0) {
      alert('Por favor selecciona al menos una mascota');
      return;
    }

    switch (action) {
      case 'delete':
        if (window.confirm(`¿Estás seguro de que quieres eliminar ${selectedPets.length} mascota(s)?`)) {
          const updatedPets = pets.filter(pet => !selectedPets.includes(pet.id));
          setPets(updatedPets);
          setSelectedPets([]);
        }
        break;
      case 'activate':
        const activatedPets = pets.map(pet =>
          selectedPets.includes(pet.id) ? { ...pet, status: 'active' } : pet
        );
        setPets(activatedPets);
        setSelectedPets([]);
        break;
      case 'deactivate':
        const deactivatedPets = pets.map(pet =>
          selectedPets.includes(pet.id) ? { ...pet, status: 'pending' } : pet
        );
        setPets(deactivatedPets);
        setSelectedPets([]);
        break;
      default:
        break;
    }
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Cargando panel de control...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveHeader />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8 animate-fade-in">
            <div className="bg-gradient-to-r from-primary to-primary-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                    ¡Bienvenido, {shelterInfo?.name || 'Refugio'}!
                  </h1>
                  <p className="text-primary-100 capitalize">
                    {getCurrentDate()}
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Icon name="Heart" size={32} color="white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <DashboardQuickActions />

          {/* Dashboard Stats */}
          <DashboardStats pets={pets} />

          {/* Search and Filters */}
          <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light mb-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                Gestión de Mascotas
              </h2>
              
              {selectedPets.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-secondary">
                    {selectedPets.length} seleccionada(s)
                  </span>
                  <button
                    onClick={() => handleBulkAction('activate')}
                    className="px-3 py-1 bg-success text-white text-sm rounded-lg hover:bg-success-600 transition-colors duration-200"
                  >
                    Activar
                  </button>
                  <button
                    onClick={() => handleBulkAction('deactivate')}
                    className="px-3 py-1 bg-warning text-white text-sm rounded-lg hover:bg-warning-600 transition-colors duration-200"
                  >
                    Desactivar
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="px-3 py-1 bg-error text-white text-sm rounded-lg hover:bg-error-600 transition-colors duration-200"
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" 
                />
                <input
                  type="text"
                  placeholder="Buscar por nombre o raza..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">Todos los estados</option>
                <option value="active">Activo</option>
                <option value="pending">Pendiente</option>
              </select>

              {/* Species Filter */}
              <select
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
                className="input-field"
              >
                <option value="all">Todas las especies</option>
                <option value="Perro">Perros</option>
                <option value="Gato">Gatos</option>
              </select>

              {/* Add Pet Button */}
              <button
                onClick={handleAddPet}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Icon name="Plus" size={20} />
                <span>Añadir Mascota</span>
              </button>
            </div>
          </div>

          {/* Pet Management Grid */}
          <div id="pets-section">
            <PetManagementGrid
              pets={filteredPets}
              selectedPets={selectedPets}
              onSelectPet={setSelectedPets}
              onEditPet={handleEditPet}
              onDeletePet={handleDeletePet}
            />
          </div>

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </main>
    </div>
  );
};

export default ShelterDashboard;