// Centralized mock data for the application
export const mockPets = [
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
    description: "Luna es una perra muy cariñosa que busca una familia amorosa. Es perfecta para familias con niños ya que es muy paciente y protectora. Le encanta pasear por el parque y jugar con otros perros.",
    healthStatus: "healthy",
    sterilized: true,
    shelterPhone: "+34 600 123 456",
    shelterEmail: "refugio.madrid@example.com",
    uploadDate: "2024-01-15T10:30:00Z",
    viewCount: 45,
    status: "active",
    urgent: false
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
    tags: ["vaccinated", "sociable", "urgent"],
    description: "Milo es un gatito juguetón que adora las caricias.",
    healthStatus: "healthy",
    sterilized: false,
    shelterPhone: "+34 600 234 567",
    shelterEmail: "refugio.barcelona@example.com",
    uploadDate: "2024-01-12T15:20:00Z",
    viewCount: 32,
    status: "active",
    urgent: true
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
    shelterEmail: "refugio.valencia@example.com",
    uploadDate: "2024-01-10T09:15:00Z",
    viewCount: 67,
    status: "pending",
    urgent: false
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
    tags: ["vaccinated", "sterilized", "sociable", "good_with_pets", "good_with_kids"],
    description: "Bella es una perrita pequeña llena de energía y amor.",
    healthStatus: "healthy",
    sterilized: true,
    shelterPhone: "+34 600 456 789",
    shelterEmail: "refugio.sevilla@example.com",
    uploadDate: "2024-01-08T14:20:00Z",
    viewCount: 89,
    status: "active",
    urgent: false
  }
];

export const mockProfessionals = [
  {
    id: 'prof_001',
    name: 'Clínica Veterinaria San Antón',
    type: 'clinic',
    services: ['veterinary', 'emergency', 'surgery', 'dentistry'],
    description: 'Clínica veterinaria con más de 20 años de experiencia en el cuidado integral de mascotas.',
    address: 'Calle Mayor 123, Madrid',
    city: 'Madrid',
    province: 'madrid',
    phone: '+34 91 123 4567',
    email: 'info@clinicasananton.com',
    website: 'https://clinicasananton.com',
    whatsapp: '+34 600 123 456',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop'
    ],
    rating: 4.8,
    reviewsCount: 127,
    verified: true,
    emergencyAvailable: true,
    joinDate: '2023-06-15T10:00:00Z'
  },
  {
    id: 'prof_002',
    name: 'Dr. María González',
    type: 'individual',
    services: ['veterinary', 'home_visits'],
    description: 'Veterinaria especializada en medicina felina y consultas a domicilio.',
    address: 'Consultas a domicilio en Barcelona y alrededores',
    city: 'Barcelona',
    province: 'barcelona',
    phone: '+34 93 456 7890',
    email: 'dra.gonzalez@veterinaria.com',
    whatsapp: '+34 600 234 567',
    logo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
    rating: 4.9,
    reviewsCount: 89,
    verified: true,
    emergencyAvailable: false,
    joinDate: '2023-08-20T14:30:00Z'
  }
];

export const mockShelterInfo = {
  id: 'shelter_001',
  name: 'Refugio Esperanza',
  email: 'refugio@ejemplo.com',
  phone: '+34 600 123 456',
  address: 'Calle Esperanza 123, Madrid',
  verified: true
};

export const mockCredentials = {
  shelter: {
    email: 'refugio@ejemplo.com',
    password: 'refugio123'
  },
  professional: {
    email: 'clinica@sananton.com',
    password: 'profesional123'
  },
  admin: {
    email: 'admin@adoptaespana.com',
    password: 'admin123'
  }
};