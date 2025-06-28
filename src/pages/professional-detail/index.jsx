import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import ConfirmDialog from 'components/ui/ConfirmDialog';

const ProfessionalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professional, setProfessional] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reviews, setReviews] = useState([]);

  // Mock professional data
  const mockProfessional = {
    id: id,
    name: 'Clínica Veterinaria San Antón',
    type: 'clinic',
    services: ['veterinary', 'emergency', 'surgery', 'dentistry'],
    description: `Clínica veterinaria con más de 20 años de experiencia en el cuidado integral de mascotas. Nuestro equipo de veterinarios especializados ofrece servicios de medicina preventiva, cirugía, odontología veterinaria y atención de urgencias.

**Nuestros servicios incluyen:**
- Consultas veterinarias generales
- Cirugía general y especializada
- Odontología veterinaria
- Radiología digital
- Laboratorio propio
- Hospitalización
- Urgencias 24 horas

**Especialidades:**
- Medicina interna
- Dermatología veterinaria
- Cardiología
- Oftalmología veterinaria

Contamos con instalaciones modernas y equipamiento de última generación para brindar el mejor cuidado a tu mascota.`,
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
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=600&fit=crop'
    ],
    rating: 4.8,
    reviewsCount: 127,
    verified: true,
    openingHours: {
      monday: '09:00-20:00',
      tuesday: '09:00-20:00',
      wednesday: '09:00-20:00',
      thursday: '09:00-20:00',
      friday: '09:00-20:00',
      saturday: '10:00-14:00',
      sunday: 'Cerrado'
    },
    emergencyAvailable: true,
    joinDate: '2023-06-15T10:00:00Z',
    coordinates: { lat: 40.4168, lng: -3.7038 }
  };

  const mockReviews = [
    {
      id: 'review_001',
      userName: 'María García',
      rating: 5,
      comment: 'Excelente atención. El Dr. Martínez cuidó muy bien de mi gato durante su cirugía. Muy profesionales y cariñosos.',
      date: '2024-01-15T14:30:00Z',
      verified: true
    },
    {
      id: 'review_002',
      userName: 'Carlos López',
      rating: 4,
      comment: 'Buena clínica, aunque a veces hay que esperar un poco. El personal es muy amable y conocen bien su trabajo.',
      date: '2024-01-10T10:15:00Z',
      verified: true
    },
    {
      id: 'review_003',
      userName: 'Ana Rodríguez',
      rating: 5,
      comment: 'Llevé a mi perro de urgencia y la atención fue inmediata. Salvaron la vida de mi mascota. Muy recomendable.',
      date: '2024-01-08T16:45:00Z',
      verified: true
    }
  ];

  useEffect(() => {
    const fetchProfessional = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProfessional(mockProfessional);
        setReviews(mockReviews);
      } catch (error) {
        console.error('Error fetching professional:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessional();
  }, [id]);

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
      dentistry: 'Odontología',
      home_visits: 'Visitas a domicilio',
      food_delivery: 'Entrega a domicilio',
      consultation: 'Consultas',
      accessories: 'Accesorios'
    };
    return labels[service] || service;
  };

  const getServiceIcon = (service) => {
    const icons = {
      veterinary: 'Stethoscope',
      grooming: 'Scissors',
      training: 'Award',
      pet_store: 'Store',
      boarding: 'Home',
      daycare: 'Users',
      emergency: 'AlertCircle',
      surgery: 'Activity',
      dentistry: 'Smile',
      home_visits: 'Truck',
      food_delivery: 'Package',
      consultation: 'MessageCircle',
      accessories: 'ShoppingBag'
    };
    return icons[service] || 'Circle';
  };

  const getDayLabel = (day) => {
    const labels = {
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      thursday: 'Jueves',
      friday: 'Viernes',
      saturday: 'Sábado',
      sunday: 'Domingo'
    };
    return labels[day] || day;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, estoy interesado en sus servicios de ${professional.services.map(s => getServiceLabel(s)).join(', ')}. ¿Podrían darme más información?`
    );
    const whatsappUrl = `https://wa.me/${professional.whatsapp.replace(/\s+/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Consulta sobre servicios - ${professional.name}`);
    const body = encodeURIComponent(
      `Hola,

Estoy interesado en sus servicios de ${professional.services.map(s => getServiceLabel(s)).join(', ')}.

¿Podrían proporcionarme más información sobre disponibilidad y precios?

Gracias.`
    );
    const emailUrl = `mailto:${professional.email}?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
  };

  const handleReport = () => {
    if (!reportReason.trim()) {
      alert('Por favor, selecciona un motivo para el reporte');
      return;
    }
    
    console.log('Reporting professional:', id, 'Reason:', reportReason);
    alert('Reporte enviado. Gracias por ayudarnos a mantener la plataforma segura.');
    setShowReportDialog(false);
    setReportReason('');
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-accent fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="Star" size={16} className="text-accent fill-current opacity-50" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Cargando información del profesional..." />
        </div>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
              Profesional no encontrado
            </h1>
            <p className="text-text-secondary mb-6">
              El profesional que buscas no existe o ha sido eliminado.
            </p>
            <button
              onClick={() => navigate('/professionals')}
              className="btn-primary"
            >
              Volver al directorio
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
        {/* Breadcrumb */}
        <div className="bg-surface border-b border-border-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => navigate('/')}
                className="text-text-secondary hover:text-primary transition-colors duration-200"
              >
                Inicio
              </button>
              <Icon name="ChevronRight" size={16} className="text-text-muted" />
              <button
                onClick={() => navigate('/professionals')}
                className="text-text-secondary hover:text-primary transition-colors duration-200"
              >
                Profesionales
              </button>
              <Icon name="ChevronRight" size={16} className="text-text-muted" />
              <span className="text-text-primary font-medium">{professional.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-background">
                    <Image
                      src={professional.logo}
                      alt={professional.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary">
                        {professional.name}
                      </h1>
                      
                      <div className="flex items-center space-x-2">
                        {professional.verified && (
                          <div className="flex items-center space-x-1 bg-success-light text-success px-2 py-1 rounded-full text-sm">
                            <Icon name="CheckCircle" size={16} />
                            <span>Verificado</span>
                          </div>
                        )}
                        
                        <button
                          onClick={() => setShowReportDialog(true)}
                          className="p-2 rounded-full border border-border text-text-secondary hover:border-warning hover:text-warning transition-all duration-200"
                        >
                          <Icon name="Flag" size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-1">
                        {renderStars(professional.rating)}
                      </div>
                      <span className="text-lg font-semibold text-text-primary">
                        {professional.rating}
                      </span>
                      <span className="text-text-secondary">
                        ({professional.reviewsCount} reseñas)
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-text-secondary">
                      <Icon name="MapPin" size={18} />
                      <span>{professional.address}</span>
                    </div>
                  </div>
                </div>

                {/* Emergency Badge */}
                {professional.emergencyAvailable && (
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-2 rounded-lg bg-error-light text-error border border-error/20 font-medium">
                      <Icon name="AlertCircle" size={18} className="mr-2" />
                      Urgencias 24 horas disponibles
                    </span>
                  </div>
                )}

                {/* Services */}
                <div className="mb-6">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                    Servicios
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {professional.services.map((service) => (
                      <div
                        key={service}
                        className="flex items-center space-x-2 p-3 bg-background rounded-lg border border-border-light"
                      >
                        <Icon name={getServiceIcon(service)} size={18} className="text-secondary" />
                        <span className="text-sm font-medium text-text-primary">
                          {getServiceLabel(service)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              {professional.images && professional.images.length > 0 && (
                <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                  <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                    Galería
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative aspect-video bg-background rounded-lg overflow-hidden">
                      <Image
                        src={professional.images[currentImageIndex]}
                        alt={`${professional.name} - Imagen ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Navigation Arrows */}
                      {professional.images.length > 1 && (
                        <>
                          <button
                            onClick={() => setCurrentImageIndex(
                              currentImageIndex === 0 ? professional.images.length - 1 : currentImageIndex - 1
                            )}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
                          >
                            <Icon name="ChevronLeft" size={20} />
                          </button>
                          <button
                            onClick={() => setCurrentImageIndex(
                              currentImageIndex === professional.images.length - 1 ? 0 : currentImageIndex + 1
                            )}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
                          >
                            <Icon name="ChevronRight" size={20} />
                          </button>
                        </>
                      )}

                      {/* Image Counter */}
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {professional.images.length}
                      </div>
                    </div>

                    {/* Thumbnail Gallery */}
                    {professional.images.length > 1 && (
                      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                        {professional.images.map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                              currentImageIndex === index
                                ? 'border-primary shadow-md'
                                : 'border-border hover:border-primary-300'
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`${professional.name} - Miniatura ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Sobre {professional.name}
                </h3>
                <div className="prose prose-sm max-w-none text-text-secondary whitespace-pre-line">
                  {professional.description}
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Reseñas ({reviews.length})
                </h3>
                
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-border-light pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-text-primary">{review.userName}</span>
                            {review.verified && (
                              <Icon name="CheckCircle" size={14} className="text-success" />
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-text-secondary">
                              {formatDate(review.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-text-secondary">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light sticky top-24">
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                  Contactar
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="text-sm text-text-secondary">
                    Ponte en contacto con {professional.name} para más información sobre sus servicios.
                  </div>
                  
                  <div className="space-y-3">
                    {professional.whatsapp && (
                      <button
                        onClick={handleWhatsApp}
                        className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-success text-white rounded-lg font-medium transition-all duration-200 hover:bg-success-600 focus:outline-none focus:ring-2 focus:ring-success-300 active:transform active:scale-95"
                      >
                        <Icon name="MessageCircle" size={20} />
                        <span>WhatsApp</span>
                      </button>
                    )}
                    
                    <button
                      onClick={handleEmail}
                      className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-border text-text-primary rounded-lg font-medium transition-all duration-200 hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary-300 active:transform active:scale-95"
                    >
                      <Icon name="Mail" size={20} />
                      <span>Email</span>
                    </button>
                    
                    <a
                      href={`tel:${professional.phone}`}
                      className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-border text-text-primary rounded-lg font-medium transition-all duration-200 hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary-300 active:transform active:scale-95"
                    >
                      <Icon name="Phone" size={20} />
                      <span>Llamar</span>
                    </a>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="pt-4 border-t border-border-light">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={16} className="text-text-muted" />
                      <span className="text-text-secondary">{professional.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Mail" size={16} className="text-text-muted" />
                      <span className="text-text-secondary">{professional.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={16} className="text-text-muted" />
                      <span className="text-text-secondary">{professional.address}</span>
                    </div>
                    {professional.website && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Globe" size={16} className="text-text-muted" />
                        <a
                          href={professional.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary-600 transition-colors duration-200"
                        >
                          Sitio web
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Horarios
                </h3>
                <div className="space-y-2">
                  {Object.entries(professional.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm">
                      <span className="text-text-secondary">{getDayLabel(day)}:</span>
                      <span className={`font-medium ${hours === 'Cerrado' ? 'text-error' : 'text-text-primary'}`}>
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share Card */}
              <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Compartir
                </h3>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: professional.name,
                        text: `Conoce a ${professional.name} - ${professional.services.map(s => getServiceLabel(s)).join(', ')}`,
                        url: window.location.href
                      });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Enlace copiado al portapapeles');
                    }
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-surface-hover transition-all duration-200"
                >
                  <Icon name="Share2" size={16} />
                  <span>Compartir</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Report Dialog */}
      <ConfirmDialog
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        onConfirm={handleReport}
        title="Reportar profesional"
        message="¿Por qué quieres reportar este profesional?"
        confirmText="Enviar reporte"
        cancelText="Cancelar"
        type="warning"
      >
        <div className="mt-4">
          <select
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            className="input-field w-full"
          >
            <option value="">Selecciona un motivo</option>
            <option value="inappropriate_content">Contenido inapropiado</option>
            <option value="false_information">Información falsa</option>
            <option value="spam">Spam</option>
            <option value="unprofessional_behavior">Comportamiento no profesional</option>
            <option value="other">Otro</option>
          </select>
        </div>
      </ConfirmDialog>
    </div>
  );
};

export default ProfessionalDetail;