import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

import HeroSection from './components/HeroSection';
import FilterBar from './components/FilterBar';
import PetGrid from './components/PetGrid';
import Pagination from './components/Pagination';

const PublicPetAdoptionHomepage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    species: '',
    age: '',
    size: '',
    province: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPets, setFilteredPets] = useState([]);
  const petsPerPage = 27;

  // Mock data for pets
  const mockPets = [
    {
      id: 1,
      name: "Luna",
      age: "2 años",
      species: "Dog",
      size: "Medium",
      location: "Madrid",
      province: "Madrid",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable"],
      description: "Luna es una perra muy cariñosa que busca una familia amorosa.",
      shelterPhone: "+34 600 123 456",
      shelterEmail: "refugio.madrid@example.com"
    },
    {
      id: 2,
      name: "Milo",
      age: "6 meses",
      species: "Cat",
      size: "Small",
      location: "Barcelona",
      province: "Barcelona",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable"],
      description: "Milo es un gatito juguetón que adora las caricias.",
      shelterPhone: "+34 600 234 567",
      shelterEmail: "refugio.barcelona@example.com"
    },
    {
      id: 3,
      name: "Rocky",
      age: "5 años",
      species: "Dog",
      size: "Large",
      location: "Valencia",
      province: "Valencia",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized"],
      description: "Rocky es un perro tranquilo perfecto para familias.",
      shelterPhone: "+34 600 345 678",
      shelterEmail: "refugio.valencia@example.com"
    },
    {
      id: 4,
      name: "Bella",
      age: "1 año",
      species: "Dog",
      size: "Small",
      location: "Sevilla",
      province: "Sevilla",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable"],
      description: "Bella es una perrita pequeña llena de energía y amor.",
      shelterPhone: "+34 600 456 789",
      shelterEmail: "refugio.sevilla@example.com"
    },
    {
      id: 5,
      name: "Simba",
      age: "3 años",
      species: "Cat",
      size: "Medium",
      location: "Bilbao",
      province: "Vizcaya",
      image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized"],
      description: "Simba es un gato independiente que busca un hogar tranquilo.",
      shelterPhone: "+34 600 567 890",
      shelterEmail: "refugio.bilbao@example.com"
    },
    {
      id: 6,
      name: "Max",
      age: "4 años",
      species: "Dog",
      size: "Large",
      location: "Zaragoza",
      province: "Zaragoza",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable"],
      description: "Max es un perro grande con un corazón aún más grande.",
      shelterPhone: "+34 600 678 901",
      shelterEmail: "refugio.zaragoza@example.com"
    },
    {
      id: 7,
      name: "Coco",
      age: "8 meses",
      species: "Cat",
      size: "Small",
      location: "Málaga",
      province: "Málaga",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable"],
      description: "Coco es una gatita muy dulce que adora jugar.",
      shelterPhone: "+34 600 789 012",
      shelterEmail: "refugio.malaga@example.com"
    },
    {
      id: 8,
      name: "Bruno",
      age: "6 años",
      species: "Dog",
      size: "Medium",
      location: "Murcia",
      province: "Murcia",
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized"],
      description: "Bruno es un perro maduro y tranquilo, ideal para personas mayores.",
      shelterPhone: "+34 600 890 123",
      shelterEmail: "refugio.murcia@example.com"
    },
    {
      id: 9,
      name: "Nala",
      age: "2 años",
      species: "Cat",
      size: "Medium",
      location: "Palma",
      province: "Baleares",
      image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable"],
      description: "Nala es una gata cariñosa que busca mimos constantes.",
      shelterPhone: "+34 600 901 234",
      shelterEmail: "refugio.palma@example.com"
    },
    {
      id: 10,
      name: "Thor",
      age: "3 años",
      species: "Dog",
      size: "Large",
      location: "Las Palmas",
      province: "Las Palmas",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable"],
      description: "Thor es un perro fuerte pero gentil, perfecto para familias activas.",
      shelterPhone: "+34 600 012 345",
      shelterEmail: "refugio.laspalmas@example.com"
    },
    {
      id: 11,
      name: "Mia",
      age: "1 año",
      species: "Cat",
      size: "Small",
      location: "Santander",
      province: "Cantabria",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized"],
      description: "Mia es una gatita joven llena de curiosidad y travesuras.",
      shelterPhone: "+34 600 123 456",
      shelterEmail: "refugio.santander@example.com"
    },
    {
      id: 12,
      name: "Rex",
      age: "7 años",
      species: "Dog",
      size: "Large",
      location: "Valladolid",
      province: "Valladolid",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable"],
      description: "Rex es un perro senior que aún tiene mucho amor que dar.",
      shelterPhone: "+34 600 234 567",
      shelterEmail: "refugio.valladolid@example.com"
    },
    {
      id: 13,
      name: "Lola",
      age: "4 meses",
      species: "Dog",
      size: "Small",
      location: "Vigo",
      province: "Pontevedra",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
      tags: ["vaccinated"],
      description: "Lola es una cachorra adorable que necesita una familia paciente.",
      shelterPhone: "+34 600 345 678",
      shelterEmail: "refugio.vigo@example.com"
    },
    {
      id: 14,
      name: "Oliver",
      age: "5 años",
      species: "Cat",
      size: "Medium",
      location: "Gijón",
      province: "Asturias",
      image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable"],
      description: "Oliver es un gato muy sociable que se lleva bien con otros animales.",
      shelterPhone: "+34 600 456 789",
      shelterEmail: "refugio.gijon@example.com"
    },
    {
      id: 15,
      name: "Kira",
      age: "2 años",
      species: "Dog",
      size: "Medium",
      location: "Córdoba",
      province: "Córdoba",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized"],
      description: "Kira es una perra equilibrada perfecta para cualquier familia.",
      shelterPhone: "+34 600 567 890",
      shelterEmail: "refugio.cordoba@example.com"
    },
    {
      id: 16,
      name: "Whiskers",
      age: "6 meses",
      species: "Cat",
      size: "Small",
      location: "Granada",
      province: "Granada",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable"],
      description: "Whiskers es un gatito juguetón que adora las pelotas de lana.",
      shelterPhone: "+34 600 678 901",
      shelterEmail: "refugio.granada@example.com"
    },
    {
      id: 17,
      name: "Duke",
      age: "8 años",
      species: "Dog",
      size: "Large",
      location: "Alicante",
      province: "Alicante",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable"],
      description: "Duke es un perro mayor muy tranquilo y obediente.",
      shelterPhone: "+34 600 789 012",
      shelterEmail: "refugio.alicante@example.com"
    },
    {
      id: 18,
      name: "Princess",
      age: "3 años",
      species: "Cat",
      size: "Medium",
      location: "Salamanca",
      province: "Salamanca",
      image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized"],
      description: "Princess es una gata elegante que prefiere la tranquilidad.",
      shelterPhone: "+34 600 890 123",
      shelterEmail: "refugio.salamanca@example.com"
    },
    {
      id: 19,
      name: "Buddy",
      age: "1 año",
      species: "Dog",
      size: "Medium",
      location: "Cádiz",
      province: "Cádiz",
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable"],
      description: "Buddy es un perro joven lleno de energía y ganas de jugar.",
      shelterPhone: "+34 600 901 234",
      shelterEmail: "refugio.cadiz@example.com"
    },
    {
      id: 20,
      name: "Shadow",
      age: "4 años",
      species: "Cat",
      size: "Large",
      location: "Badajoz",
      province: "Badajoz",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable"],
      description: "Shadow es un gato grande y cariñoso que adora las siestas al sol.",
      shelterPhone: "+34 600 012 345",
      shelterEmail: "refugio.badajoz@example.com"
    },
    {
      id: 21,
      name: "Daisy",
      age: "5 meses",
      species: "Dog",
      size: "Small",
      location: "Logroño",
      province: "La Rioja",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
      tags: ["vaccinated"],
      description: "Daisy es una cachorra pequeña que necesita mucho amor y paciencia.",
      shelterPhone: "+34 600 123 456",
      shelterEmail: "refugio.logrono@example.com"
    },
    {
      id: 22,
      name: "Garfield",
      age: "6 años",
      species: "Cat",
      size: "Large",
      location: "Pamplona",
      province: "Navarra",
      image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized"],
      description: "Garfield es un gato grande y perezoso que adora la comida.",
      shelterPhone: "+34 600 234 567",
      shelterEmail: "refugio.pamplona@example.com"
    },
    {
      id: 23,
      name: "Zeus",
      age: "3 años",
      species: "Dog",
      size: "Large",
      location: "Vitoria",
      province: "Álava",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable"],
      description: "Zeus es un perro imponente pero muy gentil con los niños.",
      shelterPhone: "+34 600 345 678",
      shelterEmail: "refugio.vitoria@example.com"
    },
    {
      id: 24,
      name: "Mittens",
      age: "2 años",
      species: "Cat",
      size: "Small",
      location: "Castellón",
      province: "Castellón",
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable"],
      description: "Mittens es una gatita pequeña con unas patitas adorables.",
      shelterPhone: "+34 600 456 789",
      shelterEmail: "refugio.castellon@example.com"
    },
    {
      id: 25,
      name: "Ace",
      age: "4 años",
      species: "Dog",
      size: "Medium",
      location: "Huelva",
      province: "Huelva",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized"],
      description: "Ace es un perro leal que será tu mejor compañero de aventuras.",
      shelterPhone: "+34 600 567 890",
      shelterEmail: "refugio.huelva@example.com"
    },
    {
      id: 26,
      name: "Fluffy",
      age: "7 años",
      species: "Cat",
      size: "Medium",
      location: "Jaén",
      province: "Jaén",
      image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable"],
      description: "Fluffy es una gata mayor muy cariñosa que busca tranquilidad.",
      shelterPhone: "+34 600 678 901",
      shelterEmail: "refugio.jaen@example.com"
    },
    {
      id: 27,
      name: "Ranger",
      age: "1 año",
      species: "Dog",
      size: "Large",
      location: "Almería",
      province: "Almería",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable"],
      description: "Ranger es un perro joven y aventurero perfecto para familias activas.",
      shelterPhone: "+34 600 789 012",
      shelterEmail: "refugio.almeria@example.com"
    },
    {
      id: 28,
      name: "Patches",
      age: "3 años",
      species: "Cat",
      size: "Small",
      location: "Ciudad Real",
      province: "Ciudad Real",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized"],
      description: "Patches es una gata con manchas únicas y personalidad encantadora.",
      shelterPhone: "+34 600 890 123",
      shelterEmail: "refugio.ciudadreal@example.com"
    },
    {
      id: 29,
      name: "Titan",
      age: "5 años",
      species: "Dog",
      size: "Large",
      location: "Cuenca",
      province: "Cuenca",
      image: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable"],
      description: "Titan es un perro grande con un corazón gigante lleno de amor.",
      shelterPhone: "+34 600 901 234",
      shelterEmail: "refugio.cuenca@example.com"
    },
    {
      id: 30,
      name: "Snowball",
      age: "8 meses",
      species: "Cat",
      size: "Small",
      location: "Guadalajara",
      province: "Guadalajara",
      image: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable"],
      description: "Snowball es un gatito blanco como la nieve, juguetón y cariñoso.",
      shelterPhone: "+34 600 012 345",
      shelterEmail: "refugio.guadalajara@example.com"
    }
  ];

  // Filter pets based on current filters
  useEffect(() => {
    let filtered = mockPets;

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

            {/* Login/Register Links */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogin}
                className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200"
              >
                <Icon name="LogIn" size={18} />
                <span className="hidden sm:inline">Iniciar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Filter Bar */}
      <FilterBar 
        filters={filters}
        onFilterChange={handleFilterChange}
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
              onClick={() => setFilters({ species: '', age: '', size: '', province: '' })}
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