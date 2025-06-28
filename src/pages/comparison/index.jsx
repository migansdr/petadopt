import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';

const ComparisonPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [comparisonType, setComparisonType] = useState('pets');

  // Mock data
  const mockPets = [
    {
      id: 1,
      name: "Luna",
      species: "Dog",
      breed: "Mestizo",
      age: "2 años",
      size: "Medium",
      gender: "female",
      location: "Madrid",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sterilized", "sociable", "good_with_kids"],
      description: "Luna es una perra muy cariñosa que busca una familia amorosa.",
      healthStatus: "healthy",
      sterilized: true,
      shelterName: "Refugio Esperanza Madrid",
      shelterPhone: "+34 600 123 456",
      uploadDate: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      name: "Milo",
      species: "Cat",
      breed: "Siamés",
      age: "6 meses",
      size: "Small",
      gender: "male",
      location: "Barcelona",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
      tags: ["vaccinated", "sociable"],
      description: "Milo es un gatito juguetón que adora las caricias.",
      healthStatus: "healthy",
      sterilized: false,
      shelterName: "Refugio Barcelona",
      shelterPhone: "+34 600 234 567",
      uploadDate: "2024-01-12T15:20:00Z"
    }
  ];

  const mockProfessionals = [
    {
      id: 'prof_001',
      name: 'Clínica Veterinaria San Antón',
      type: 'clinic',
      services: ['veterinary', 'emergency', 'surgery'],
      location: 'Madrid',
      address: 'Calle Mayor 123, Madrid',
      phone: '+34 91 123 4567',
      email: 'info@clinicasananton.com',
      rating: 4.8,
      reviewsCount: 127,
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=200&h=200&fit=crop',
      emergencyAvailable: true,
      verified: true,
      openingHours: {
        monday: '09:00-20:00',
        tuesday: '09:00-20:00',
        wednesday: '09:00-20:00',
        thursday: '09:00-20:00',
        friday: '09:00-20:00',
        saturday: '10:00-14:00',
        sunday: 'Cerrado'
      }
    },
    {
      id: 'prof_002',
      name: 'Dr. María González',
      type: 'individual',
      services: ['veterinary', 'home_visits'],
      location: 'Barcelona',
      address: 'Consultas a domicilio',
      phone: '+34 93 456 7890',
      email: 'dra.gonzalez@veterinaria.com',
      rating: 4.9,
      reviewsCount: 89,
      logo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop',
      emergencyAvailable: false,
      verified: true,
      openingHours: {
        monday: '10:00-18:00',
        tuesday: '10:00-18:00',
        wednesday: '10:00-18:00',
        thursday: '10:00-18:00',
        friday: '10:00-18:00',
        saturday: '10:00-14:00',
        sunday: 'Cerrado'
      }
    }
  ];

  useEffect(() => {
    const type = searchParams.get('type') || 'pets';
    const ids = searchParams.get('ids')?.split(',') || [];
    
    setComparisonType(type);
    
    if (type === 'pets') {
      const selectedPets = mockPets.filter(pet => ids.includes(pet.id.toString()));
      setItems(selectedPets);
    } else {
      const selectedProfessionals = mockProfessionals.filter(prof => ids.includes(prof.id));
      setItems(selectedProfessionals);
    }
  }, [searchParams]);

  const getServiceLabel = (service) => {
    const labels = {
      veterinary: 'Veterinaria',
      emergency: 'Urgencias',
      surgery: 'Cirugía',
      grooming: 'Peluquería',
      training: 'Adiestramiento',
      home_visits: 'Visitas a domicilio'
    };
    return labels[service] || service;
  };

  const getTagLabel = (tag) => {
    const labels = {
      vaccinated: 'Vacunado',
      sterilized: 'Esterilizado',
      sociable: 'Sociable',
      good_with_kids: 'Bueno con niños'
    };
    return labels[tag] || tag;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleContact = (item) => {
    if (comparisonType === 'pets') {
      const message = encodeURIComponent(
        `Hola, estoy interesado en adoptar a ${item.name}. ¿Podrían darme más información?`
      );
      const whatsappUrl = `https://wa.me/${item.shelterPhone.replace(/\s+/g, '')}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    } else {
      const message = encodeURIComponent(
        `Hola, estoy interesado en sus servicios. ¿Podrían darme más información?`
      );
      const whatsappUrl = `https://wa.me/${item.phone.replace(/\s+/g, '')}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (items.length < 2) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="GitCompare" size={48} className="text-text-muted mx-auto mb-4" />
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
              Comparación no disponible
            </h1>
            <p className="text-text-secondary mb-6">
              Necesitas seleccionar al menos 2 elementos para comparar
            </p>
            <button
              onClick={() => navigate(-1)}
              className="btn-primary"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveHeader />
      
      <main className="pt-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent-50 to-primary-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                  Comparación de {comparisonType === 'pets' ? 'Mascotas' : 'Profesionales'}
                </h1>
                <p className="text-text-secondary">
                  Compara las características para tomar la mejor decisión
                </p>
              </div>
              <button
                onClick={() => navigate(-1)}
                className="btn-outline flex items-center space-x-2"
              >
                <Icon name="ArrowLeft" size={18} />
                <span>Volver</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-surface rounded-xl shadow-sm border border-border-light overflow-hidden">
            {/* Mobile View */}
            <div className="lg:hidden">
              {items.map((item, index) => (
                <div key={item.id} className="p-6 border-b border-border-light last:border-b-0">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-background">
                      <Image
                        src={comparisonType === 'pets' ? item.image : item.logo}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-heading font-semibold text-text-primary">
                        {item.name}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {comparisonType === 'pets' ? `${item.breed} • ${item.location}` : `${item.location}`}
                      </p>
                    </div>
                  </div>

                  {comparisonType === 'pets' ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-text-primary">Edad:</span>
                          <span className="ml-2 text-text-secondary">{item.age}</span>
                        </div>
                        <div>
                          <span className="font-medium text-text-primary">Tamaño:</span>
                          <span className="ml-2 text-text-secondary">{item.size}</span>
                        </div>
                        <div>
                          <span className="font-medium text-text-primary">Sexo:</span>
                          <span className="ml-2 text-text-secondary">
                            {item.gender === 'male' ? 'Macho' : 'Hembra'}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-text-primary">Esterilizado:</span>
                          <span className="ml-2 text-text-secondary">
                            {item.sterilized ? 'Sí' : 'No'}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <span className="font-medium text-text-primary block mb-2">Características:</span>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-secondary-100 text-secondary text-xs rounded-full"
                            >
                              {getTagLabel(tag)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div>
                          <span className="font-medium text-text-primary">Tipo:</span>
                          <span className="ml-2 text-text-secondary capitalize">
                            {item.type === 'clinic' ? 'Clínica' : 'Individual'}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-text-primary">Puntuación:</span>
                          <span className="ml-2 text-text-secondary">
                            {item.rating} ⭐ ({item.reviewsCount} reseñas)
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-text-primary">Urgencias 24h:</span>
                          <span className="ml-2 text-text-secondary">
                            {item.emergencyAvailable ? 'Sí' : 'No'}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <span className="font-medium text-text-primary block mb-2">Servicios:</span>
                        <div className="flex flex-wrap gap-2">
                          {item.services.map((service, serviceIndex) => (
                            <span
                              key={serviceIndex}
                              className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full"
                            >
                              {getServiceLabel(service)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-border-light">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => navigate(comparisonType === 'pets' ? `/pet/${item.id}` : `/professional/${item.id}`)}
                        className="flex-1 btn-outline text-sm py-2"
                      >
                        Ver detalles
                      </button>
                      <button
                        onClick={() => handleContact(item)}
                        className="flex-1 btn-primary text-sm py-2"
                      >
                        Contactar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-light">
                    <th className="text-left p-6 font-heading font-semibold text-text-primary w-48">
                      Característica
                    </th>
                    {items.map((item) => (
                      <th key={item.id} className="text-center p-6 min-w-64">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-background">
                            <Image
                              src={comparisonType === 'pets' ? item.image : item.logo}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-heading font-semibold text-text-primary">
                              {item.name}
                            </h3>
                            <p className="text-text-secondary text-sm">
                              {comparisonType === 'pets' ? item.breed : item.location}
                            </p>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonType === 'pets' ? (
                    <>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Edad</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6 text-center text-text-secondary">
                            {item.age}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Tamaño</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6 text-center text-text-secondary">
                            {item.size}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Sexo</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6 text-center text-text-secondary">
                            {item.gender === 'male' ? 'Macho' : 'Hembra'}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Ubicación</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6 text-center text-text-secondary">
                            {item.location}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Esterilizado</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6 text-center">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              item.sterilized 
                                ? 'bg-success-light text-success' 
                                : 'bg-warning-light text-warning'
                            }`}>
                              {item.sterilized ? 'Sí' : 'No'}
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Características</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6">
                            <div className="flex flex-wrap gap-1 justify-center">
                              {item.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-2 py-1 bg-secondary-100 text-secondary text-xs rounded-full"
                                >
                                  {getTagLabel(tag)}
                                </span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Refugio</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6 text-center text-text-secondary">
                            {item.shelterName}
                          </td>
                        ))}
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Tipo</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6 text-center text-text-secondary capitalize">
                            {item.type === 'clinic' ? 'Clínica' : 'Individual'}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Puntuación</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              <span className="font-medium">{item.rating}</span>
                              <Icon name="Star" size={16} className="text-accent" />
                              <span className="text-text-muted text-sm">({item.reviewsCount})</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Dirección</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6 text-center text-text-secondary text-sm">
                            {item.address}
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Urgencias 24h</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6 text-center">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              item.emergencyAvailable 
                                ? 'bg-success-light text-success' 
                                : 'bg-gray-100 text-gray-600'
                            }`}>
                              {item.emergencyAvailable ? 'Disponible' : 'No disponible'}
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Servicios</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6">
                            <div className="flex flex-wrap gap-1 justify-center">
                              {item.services.map((service, serviceIndex) => (
                                <span
                                  key={serviceIndex}
                                  className="px-2 py-1 bg-primary-100 text-primary text-xs rounded-full"
                                >
                                  {getServiceLabel(service)}
                                </span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="border-b border-border-light">
                        <td className="p-6 font-medium text-text-primary">Verificado</td>
                        {items.map((item) => (
                          <td key={item.id} className="p-6 text-center">
                            {item.verified ? (
                              <Icon name="CheckCircle" size={20} className="text-success mx-auto" />
                            ) : (
                              <Icon name="X" size={20} className="text-error mx-auto" />
                            )}
                          </td>
                        ))}
                      </tr>
                    </>
                  )}
                  
                  {/* Actions Row */}
                  <tr>
                    <td className="p-6 font-medium text-text-primary">Acciones</td>
                    {items.map((item) => (
                      <td key={item.id} className="p-6">
                        <div className="flex flex-col space-y-2">
                          <button
                            onClick={() => navigate(comparisonType === 'pets' ? `/pet/${item.id}` : `/professional/${item.id}`)}
                            className="btn-outline text-sm py-2"
                          >
                            Ver detalles
                          </button>
                          <button
                            onClick={() => handleContact(item)}
                            className="btn-primary text-sm py-2"
                          >
                            Contactar
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Comparison Tips */}
          <div className="mt-8 bg-accent-50 rounded-lg p-6 border border-accent-200">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
              <div>
                <h3 className="font-heading font-semibold text-accent-700 mb-2">
                  Consejos para la comparación
                </h3>
                {comparisonType === 'pets' ? (
                  <ul className="text-accent-600 text-sm space-y-1">
                    <li>• Considera el tamaño de tu hogar y estilo de vida</li>
                    <li>• Verifica si tienes experiencia con la especie</li>
                    <li>• Ten en cuenta los gastos veterinarios y cuidados</li>
                    <li>• Contacta con el refugio para conocer más sobre la personalidad</li>
                  </ul>
                ) : (
                  <ul className="text-accent-600 text-sm space-y-1">
                    <li>• Compara precios y servicios incluidos</li>
                    <li>• Verifica la proximidad a tu ubicación</li>
                    <li>• Considera los horarios de atención</li>
                    <li>• Lee las reseñas de otros clientes</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComparisonPage;