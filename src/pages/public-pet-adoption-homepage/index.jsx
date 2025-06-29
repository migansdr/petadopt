import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import AdvancedFilterBar from './components/AdvancedFilterBar';
import PetGrid from './components/PetGrid';
import Pagination from './components/Pagination';
import FloatingFavoritesButton from 'components/ui/FloatingFavoritesButton';
import NavigationBreadcrumbs from 'components/ui/NavigationBreadcrumbs';
import QuickActionsFAB from 'components/ui/QuickActionsFAB';
import { mockPets } from 'utils/mockData';

const PublicPetAdoptionHomepage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    species: '',
    age: '',
    size: '',
    province: '',
    breed: '',
    healthStatus: '',
    gender: '',
    sterilized: '',
    tags: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [professionalSearch, setProfessionalSearch] = useState('');
  const petsPerPage = 27;

  // Memoized filtered pets for better performance
  const filteredPets = useMemo(() => {
    let filtered = mockPets;

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm) ||
        pet.breed.toLowerCase().includes(searchTerm) ||
        pet.description.toLowerCase().includes(searchTerm)
      );
    }

    // Apply all other filters
    if (filters.species) {
      filtered = filtered.filter(pet => pet.species === filters.species);
    }

    if (filters.age) {
      if (filters.age === 'Puppy') {
        filtered = filtered.filter(pet => 
          pet.age.includes('meses') || 
          (pet.age.includes('año') && parseInt(pet.age) <= 1)
        );
      } else if (filters.age === 'Adult') {
        filtered = filtered.filter(pet => 
          pet.age.includes('año') && 
          parseInt(pet.age) >= 2 && 
          parseInt(pet.age) <= 6
        );
      } else if (filters.age === 'Senior') {
        filtered = filtered.filter(pet => 
          pet.age.includes('año') && parseInt(pet.age) >= 7
        );
      }
    }

    if (filters.size) {
      filtered = filtered.filter(pet => pet.size === filters.size);
    }

    if (filters.province) {
      filtered = filtered.filter(pet => pet.province === filters.province);
    }

    if (filters.breed) {
      filtered = filtered.filter(pet => pet.breed === filters.breed);
    }

    if (filters.healthStatus) {
      filtered = filtered.filter(pet => pet.healthStatus === filters.healthStatus);
    }

    if (filters.gender) {
      filtered = filtered.filter(pet => pet.gender === filters.gender);
    }

    if (filters.sterilized !== '') {
      const isSterialized = filters.sterilized === 'true';
      filtered = filtered.filter(pet => pet.sterilized === isSterialized);
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(pet => 
        filters.tags.every(tag => pet.tags.includes(tag))
      );
    }

    return filtered;
  }, [filters]);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [filters]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPets.length]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);
  const startIndex = (currentPage - 1) * petsPerPage;
  const currentPets = filteredPets.slice(startIndex, startIndex + petsPerPage);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      species: '',
      age: '',
      size: '',
      province: '',
      breed: '',
      healthStatus: '',
      gender: '',
      sterilized: '',
      tags: []
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = () => {
    navigate('/authentication-login-register');
  };

  const handleProfessionalLogin = () => {
    navigate('/professional-login');
  };

  const handleProfessionalSearch = () => {
    if (professionalSearch.trim()) {
      navigate(`/professionals?search=${encodeURIComponent(professionalSearch)}`);
    } else {
      navigate('/professionals');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border-light shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-text-primary">
                AdoptaEspaña
              </span>
            </div>

            {/* Navigation - Nuevo orden */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleProfessionalLogin}
                className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-secondary-50 transition-all duration-200"
              >
                <Icon name="UserCheck" size={18} />
                <span className="hidden sm:inline">Acceso Profesionales</span>
              </button>
              
              <button
                onClick={handleLogin}
                className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200"
              >
                <Icon name="Building2" size={18} />
                <span className="hidden sm:inline">Acceso Protectoras</span>
              </button>

              <button
                onClick={() => navigate('/professionals')}
                className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200"
              >
                <Icon name="Search" size={18} />
                <span className="hidden sm:inline">Profesionales</span>
              </button>
              
              <button
                onClick={() => navigate('/adopter-panel')}
                className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200"
              >
                <Icon name="User" size={18} />
                <span className="hidden sm:inline">Mi Panel</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Breadcrumbs */}
      <NavigationBreadcrumbs />

      {/* Hero Section Simplificado */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-16 lg:py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6 leading-tight">
              Adopta una mascota{' '}
              <span className="text-primary">cerca de ti</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Encuentra tu compañero perfecto entre miles de mascotas que buscan un hogar amoroso en toda España.
            </p>

            {/* Buscador de Mascotas */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="Search" size={20} className="text-text-muted" />
                </div>
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Buscar mascotas por nombre, raza..."
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {/* Buscador de Profesionales */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="Stethoscope" size={20} className="text-text-muted" />
                </div>
                <input
                  type="text"
                  value={professionalSearch}
                  onChange={(e) => setProfessionalSearch(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleProfessionalSearch()}
                  placeholder="Buscar veterinarios, peluquerías..."
                  className="w-full pl-12 pr-16 py-4 text-lg border-2 border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:border-secondary transition-all duration-200 shadow-sm hover:shadow-md"
                />
                <button
                  onClick={handleProfessionalSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary hover:text-secondary-600 transition-colors duration-200"
                >
                  <Icon name="ArrowRight" size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Filter Bar */}
      <AdvancedFilterBar 
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        resultsCount={filteredPets.length}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pet Grid */}
        <PetGrid 
          pets={currentPets}
          isLoading={isLoading}
        />

        {/* Pagination */}
        {!isLoading && filteredPets.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalResults={filteredPets.length}
            resultsPerPage={petsPerPage}
          />
        )}

        {/* No Results */}
        {!isLoading && filteredPets.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Search" size={48} className="text-primary" />
            </div>
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
              No se encontraron mascotas
            </h3>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              No hay mascotas que coincidan con tus filtros actuales. 
              Intenta ajustar los criterios de búsqueda.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn-outline"
            >
              Limpiar filtros
            </button>
          </div>
        )}
      </main>

      {/* Floating Favorites Button */}
      <FloatingFavoritesButton />

      {/* Quick Actions FAB */}
      <QuickActionsFAB />

      {/* Footer */}
      <footer className="bg-surface border-t border-border-light mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Heart" size={20} color="white" />
                </div>
                <span className="font-heading font-bold text-xl text-text-primary">
                  AdoptaEspaña
                </span>
              </div>
              <p className="text-text-secondary">
                Conectando protectoras con familias amorosas para dar una segunda oportunidad a las mascotas.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-text-primary mb-4">
                Para Protectoras
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={handleLogin}
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Registrar Protectora
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogin}
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Subir Mascotas
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-text-primary mb-4">
                Profesionales
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/professionals')}
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Directorio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/professional-register')}
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Registrar Negocio
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-text-primary mb-4">
                Contacto
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-text-secondary">
                  <Icon name="Mail" size={16} />
                  <span>info@adoptaespana.com</span>
                </div>
                <div className="flex items-center space-x-2 text-text-secondary">
                  <Icon name="Phone" size={16} />
                  <span>+34 900 123 456</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border-light mt-8 pt-8 text-center">
            <p className="text-text-muted">
              © {new Date().getFullYear()} AdoptaEspaña. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicPetAdoptionHomepage;