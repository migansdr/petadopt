import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import HeroSection from './components/HeroSection';
import AdvancedFilterBar from './components/AdvancedFilterBar';
import PetGrid from './components/PetGrid';
import Pagination from './components/Pagination';

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
  const [filteredPets, setFilteredPets] = useState([]);
  const petsPerPage = 27;

  // Enhanced mock data for pets with more fields
  const mockPets = [
    {
      id: 1,
      name: "Luna",
      age: "2 años",
      species: "Dog",
      breed: "Mestizo",
      size: "Medium",
      gender: "female",
      location: "Madrid",
      province: "madrid",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable", "good_with_kids"],
      description: "Luna es una perra muy cariñosa que busca una familia amorosa.",
      healthStatus: "healthy",
      sterilized: true,
      shelterPhone: "+34 600 123 456",
      shelterEmail: "refugio.madrid@example.com"
    },
    {
      id: 2,
      name: "Milo",
      age: "6 meses",
      species: "Cat",
      breed: "Siamés",
      size: "Small",
      gender: "male",
      location: "Barcelona",
      province: "barcelona",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable"],
      description: "Milo es un gatito juguetón que adora las caricias.",
      healthStatus: "healthy",
      sterilized: false,
      shelterPhone: "+34 600 234 567",
      shelterEmail: "refugio.barcelona@example.com"
    },
    {
      id: 3,
      name: "Rocky",
      age: "5 años",
      species: "Dog",
      breed: "Pastor Alemán",
      size: "Large",
      gender: "male",
      location: "Valencia",
      province: "valencia",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "house_trained"],
      description: "Rocky es un perro tranquilo perfecto para familias.",
      healthStatus: "healthy",
      sterilized: true,
      shelterPhone: "+34 600 345 678",
      shelterEmail: "refugio.valencia@example.com"
    },
    {
      id: 4,
      name: "Bella",
      age: "1 año",
      species: "Dog",
      breed: "Golden Retriever",
      size: "Small",
      gender: "female",
      location: "Sevilla",
      province: "sevilla",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable", "good_with_pets"],
      description: "Bella es una perrita pequeña llena de energía y amor.",
      healthStatus: "healthy",
      sterilized: true,
      shelterPhone: "+34 600 456 789",
      shelterEmail: "refugio.sevilla@example.com"
    },
    {
      id: 5,
      name: "Simba",
      age: "3 años",
      species: "Cat",
      breed: "Persa",
      size: "Medium",
      gender: "male",
      location: "Bilbao",
      province: "vizcaya",
      image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "special_needs"],
      description: "Simba es un gato independiente que busca un hogar tranquilo.",
      healthStatus: "special_needs",
      sterilized: true,
      shelterPhone: "+34 600 567 890",
      shelterEmail: "refugio.bilbao@example.com"
    },
    {
      id: 6,
      name: "Max",
      age: "4 años",
      species: "Dog",
      breed: "Labrador",
      size: "Large",
      gender: "male",
      location: "Zaragoza",
      province: "zaragoza",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable", "urgent"],
      description: "Max es un perro grande con un corazón aún más grande.",
      healthStatus: "healthy",
      sterilized: false,
      shelterPhone: "+34 600 678 901",
      shelterEmail: "refugio.zaragoza@example.com"
    },
    // Add more pets with varied characteristics...
    {
      id: 7,
      name: "Coco",
      age: "8 meses",
      species: "Cat",
      breed: "Mestizo",
      size: "Small",
      gender: "female",
      location: "Málaga",
      province: "málaga",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable", "good_with_kids"],
      description: "Coco es una gatita muy dulce que adora jugar.",
      healthStatus: "healthy",
      sterilized: true,
      shelterPhone: "+34 600 789 012",
      shelterEmail: "refugio.malaga@example.com"
    }
    // ... continue with more pets
  ];

  // Enhanced filter function
  useEffect(() => {
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

    // Species filter
    if (filters.species) {
      filtered = filtered.filter(pet => pet.species === filters.species);
    }

    // Age filter
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

    // Size filter
    if (filters.size) {
      filtered = filtered.filter(pet => pet.size === filters.size);
    }

    // Province filter
    if (filters.province) {
      filtered = filtered.filter(pet => pet.province === filters.province);
    }

    // Breed filter
    if (filters.breed) {
      filtered = filtered.filter(pet => pet.breed === filters.breed);
    }

    // Health status filter
    if (filters.healthStatus) {
      filtered = filtered.filter(pet => pet.healthStatus === filters.healthStatus);
    }

    // Gender filter
    if (filters.gender) {
      filtered = filtered.filter(pet => pet.gender === filters.gender);
    }

    // Sterilization filter
    if (filters.sterilized !== '') {
      const isSterialized = filters.sterilized === 'true';
      filtered = filtered.filter(pet => pet.sterilized === isSterialized);
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(pet => 
        filters.tags.every(tag => pet.tags.includes(tag))
      );
    }

    setFilteredPets(filtered);
    setCurrentPage(1);
  }, [filters]);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [filters]);

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

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/adopter-panel')}
                className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200"
              >
                <Icon name="User" size={18} />
                <span className="hidden sm:inline">Mi Panel</span>
              </button>
              
              <button
                onClick={handleLogin}
                className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200"
              >
                <Icon name="LogIn" size={18} />
                <span className="hidden sm:inline">Refugios</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

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

      {/* Footer */}
      <footer className="bg-surface border-t border-border-light mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                Conectando refugios con familias amorosas para dar una segunda oportunidad a las mascotas.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold text-text-primary mb-4">
                Para Refugios
              </h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={handleLogin}
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Registrar Refugio
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