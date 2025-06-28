import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import ConfirmDialog from 'components/ui/ConfirmDialog';
import { generateWhatsAppUrl, generateEmailUrl, formatTimeAgo } from 'utils/helpers';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [viewCount, setViewCount] = useState(0);
  const [contactClicks, setContactClicks] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock pet data - in real app, this would come from API
  const mockPet = {
    id: id,
    name: "Luna",
    species: "Dog",
    breed: "Mestizo",
    age: "2 años",
    size: "Medium",
    gender: "female",
    location: "Madrid",
    province: "Madrid",
    images: [
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop"
    ],
    videos: [
      "https://www.youtube.com/embed/dQw4w9WgXcQ" // Mock video URL
    ],
    tags: ["vaccinated", "sterilized", "sociable", "good_with_kids"],
    description: `Luna es una perra muy cariñosa y juguetona que busca una familia que le dé todo el amor que se merece. Es perfecta para familias con niños ya que es muy paciente y protectora.

Le encanta pasear por el parque y jugar con otros perros. Está completamente vacunada y esterilizada. Luna ha vivido en la calle pero se ha adaptado perfectamente a la vida doméstica.

Necesita una familia activa que pueda darle el ejercicio diario que necesita. Es muy obediente y aprende rápido las órdenes básicas.

**Características especiales:**
- Muy sociable con otros perros
- Excelente con niños
- Sabe caminar con correa
- Responde a órdenes básicas
- Le encanta jugar con pelotas

**Cuidados necesarios:**
- Paseos diarios de al menos 1 hora
- Cepillado semanal
- Revisiones veterinarias regulares
- Mucho amor y atención`,
    healthStatus: "healthy",
    sterilized: true,
    vaccinated: true,
    microchipped: true,
    shelterInfo: {
      name: "Refugio Esperanza Madrid",
      phone: "+34 600 123 456",
      email: "refugio.madrid@example.com",
      address: "Calle Esperanza 123, Madrid",
      website: "https://refugioesperanza.com"
    },
    uploadDate: "2024-01-15T10:30:00Z",
    lastUpdated: "2024-01-20T14:20:00Z"
  };

  useEffect(() => {
    // Simulate API call
    const fetchPet = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPet(mockPet);
        
        // Increment view count
        const currentViews = parseInt(localStorage.getItem(`pet_${id}_views`) || '0');
        const newViews = currentViews + 1;
        setViewCount(newViews);
        localStorage.setItem(`pet_${id}_views`, newViews.toString());
        
        // Check if pet is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.includes(id));
        
        // Get contact clicks
        const clicks = parseInt(localStorage.getItem(`pet_${id}_contacts`) || '0');
        setContactClicks(clicks);
      } catch (error) {
        console.error('Error fetching pet:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleWhatsApp = () => {
    const message = `Hola, estoy interesado en adoptar a ${pet.name}. ¿Podrían darme más información?`;
    const url = generateWhatsAppUrl(pet.shelterInfo.phone, message);
    window.open(url, '_blank');
    
    // Increment contact clicks
    const newClicks = contactClicks + 1;
    setContactClicks(newClicks);
    localStorage.setItem(`pet_${id}_contacts`, newClicks.toString());
  };

  const handleEmail = () => {
    const subject = `Interés en adoptar a ${pet.name}`;
    const body = `Hola,

Estoy interesado/a en adoptar a ${pet.name}, ${pet.breed} de ${pet.age} ubicado en ${pet.location}.

¿Podrían proporcionarme más información sobre el proceso de adopción?

Gracias.`;
    
    const url = generateEmailUrl(pet.shelterInfo.email, subject, body);
    window.location.href = url;
    
    // Increment contact clicks
    const newClicks = contactClicks + 1;
    setContactClicks(newClicks);
    localStorage.setItem(`pet_${id}_contacts`, newClicks.toString());
  };

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(favId => favId !== id);
    } else {
      newFavorites = [...favorites, id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const handleReport = () => {
    if (!reportReason.trim()) {
      alert('Por favor, selecciona un motivo para el reporte');
      return;
    }
    
    // In real app, this would send to backend
    console.log('Reporting pet:', id, 'Reason:', reportReason);
    alert('Reporte enviado. Gracias por ayudarnos a mantener la plataforma segura.');
    setShowReportDialog(false);
    setReportReason('');
  };

  const getTagLabel = (tag) => {
    const labels = {
      vaccinated: 'Vacunado',
      sterilized: 'Esterilizado',
      sociable: 'Sociable',
      urgent: 'Urgente',
      good_with_kids: 'Bueno con niños',
      good_with_pets: 'Bueno con mascotas',
      house_trained: 'Educado en casa',
      special_needs: 'Necesidades especiales'
    };
    return labels[tag] || tag;
  };

  const getTagColor = (tag) => {
    const colors = {
      vaccinated: 'bg-success-light text-success border-success/20',
      sterilized: 'bg-primary-100 text-primary border-primary/20',
      sociable: 'bg-secondary-100 text-secondary border-secondary/20',
      urgent: 'bg-error-light text-error border-error/20',
      good_with_kids: 'bg-accent-100 text-accent-700 border-accent/20',
      good_with_pets: 'bg-purple-100 text-purple-700 border-purple/20',
      house_trained: 'bg-green-100 text-green-700 border-green/20',
      special_needs: 'bg-orange-100 text-orange-700 border-orange/20'
    };
    return colors[tag] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <LoadingSpinner size="lg" text="Cargando información de la mascota..." />
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-background">
        <AdaptiveHeader />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
              Mascota no encontrada
            </h1>
            <p className="text-text-secondary mb-6">
              La mascota que buscas no existe o ha sido eliminada.
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Volver al inicio
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
              <span className="text-text-primary font-medium">{pet.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative aspect-video bg-background rounded-lg overflow-hidden">
                    <Image
                      src={pet.images[currentImageIndex]}
                      alt={`${pet.name} - Imagen ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Navigation Arrows */}
                    {pet.images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImageIndex(
                            currentImageIndex === 0 ? pet.images.length - 1 : currentImageIndex - 1
                          )}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
                        >
                          <Icon name="ChevronLeft" size={20} />
                        </button>
                        <button
                          onClick={() => setCurrentImageIndex(
                            currentImageIndex === pet.images.length - 1 ? 0 : currentImageIndex + 1
                          )}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
                        >
                          <Icon name="ChevronRight" size={20} />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {pet.images.length}
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  {pet.images.length > 1 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                      {pet.images.map((image, index) => (
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
                            alt={`${pet.name} - Miniatura ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Videos */}
                  {pet.videos && pet.videos.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-heading font-semibold text-text-primary">
                        Videos
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pet.videos.map((video, index) => (
                          <div key={index} className="aspect-video rounded-lg overflow-hidden">
                            <iframe
                              src={video}
                              title={`Video de ${pet.name} ${index + 1}`}
                              className="w-full h-full"
                              allowFullScreen
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Pet Information */}
              <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
                        {pet.name}
                      </h1>
                      <div className="flex items-center space-x-4 text-text-secondary">
                        <span>{pet.breed}</span>
                        <span>•</span>
                        <span>{pet.age}</span>
                        <span>•</span>
                        <span>{pet.gender === 'male' ? 'Macho' : 'Hembra'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={handleToggleFavorite}
                        className={`p-3 rounded-full border-2 transition-all duration-200 ${
                          isFavorite
                            ? 'border-error bg-error text-white'
                            : 'border-border text-text-secondary hover:border-error hover:text-error'
                        }`}
                      >
                        <Icon name="Heart" size={20} />
                      </button>
                      
                      <button
                        onClick={() => setShowReportDialog(true)}
                        className="p-3 rounded-full border border-border text-text-secondary hover:border-warning hover:text-warning transition-all duration-200"
                      >
                        <Icon name="Flag" size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Icon name="MapPin" size={18} />
                    <span>{pet.location}, {pet.province}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {pet.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getTagColor(tag)}`}
                      >
                        {getTagLabel(tag)}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <div className="prose prose-sm max-w-none">
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                      Sobre {pet.name}
                    </h3>
                    <div className="text-text-secondary whitespace-pre-line">
                      {pet.description}
                    </div>
                  </div>

                  {/* Health Information */}
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                      Información de salud
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={pet.vaccinated ? "CheckCircle" : "XCircle"} 
                          size={18} 
                          className={pet.vaccinated ? "text-success" : "text-error"} 
                        />
                        <span className="text-sm">
                          {pet.vaccinated ? "Vacunado" : "No vacunado"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={pet.sterilized ? "CheckCircle" : "XCircle"} 
                          size={18} 
                          className={pet.sterilized ? "text-success" : "text-error"} 
                        />
                        <span className="text-sm">
                          {pet.sterilized ? "Esterilizado" : "No esterilizado"}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={pet.microchipped ? "CheckCircle" : "XCircle"} 
                          size={18} 
                          className={pet.microchipped ? "text-success" : "text-error"} 
                        />
                        <span className="text-sm">
                          {pet.microchipped ? "Con microchip" : "Sin microchip"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <h3 className="text-lg font-heading font-semibold text-text-primary mb-3">
                      Estadísticas
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{viewCount}</div>
                        <div className="text-sm text-text-secondary">Visualizaciones</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-secondary">{contactClicks}</div>
                        <div className="text-sm text-text-secondary">Contactos</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">{formatTimeAgo(pet.uploadDate)}</div>
                        <div className="text-sm text-text-secondary">Publicado</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-text-primary">{formatTimeAgo(pet.lastUpdated)}</div>
                        <div className="text-sm text-text-secondary">Actualizado</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light sticky top-24">
                <h3 className="text-xl font-heading font-semibold text-text-primary mb-4">
                  ¿Interesado en adoptar?
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="text-sm text-text-secondary">
                    Contacta directamente con el refugio para más información sobre {pet.name}.
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={handleWhatsApp}
                      className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-success text-white rounded-lg font-medium transition-all duration-200 hover:bg-success-600 focus:outline-none focus:ring-2 focus:ring-success-300 active:transform active:scale-95"
                    >
                      <Icon name="MessageCircle" size={20} />
                      <span>WhatsApp</span>
                    </button>
                    
                    <button
                      onClick={handleEmail}
                      className="w-full flex items-center justify-center space-x-3 px-4 py-3 border border-border text-text-primary rounded-lg font-medium transition-all duration-200 hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-primary-300 active:transform active:scale-95"
                    >
                      <Icon name="Mail" size={20} />
                      <span>Email</span>
                    </button>
                  </div>
                </div>

                {/* Shelter Information */}
                <div className="pt-4 border-t border-border-light">
                  <h4 className="font-medium text-text-primary mb-3">
                    Información del refugio
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Building2" size={16} className="text-text-muted" />
                      <span className="text-text-secondary">{pet.shelterInfo.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={16} className="text-text-muted" />
                      <span className="text-text-secondary">{pet.shelterInfo.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Phone" size={16} className="text-text-muted" />
                      <span className="text-text-secondary">{pet.shelterInfo.phone}</span>
                    </div>
                    {pet.shelterInfo.website && (
                      <div className="flex items-center space-x-2">
                        <Icon name="Globe" size={16} className="text-text-muted" />
                        <a
                          href={pet.shelterInfo.website}
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

              {/* Share Card */}
              <div className="bg-surface rounded-xl p-6 shadow-sm border border-border-light">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Comparte a {pet.name}
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: `Adopta a ${pet.name}`,
                          text: `${pet.name} busca un hogar amoroso. ¡Ayúdanos a encontrarle una familia!`,
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
        </div>
      </main>

      {/* Report Dialog */}
      <ConfirmDialog
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        onConfirm={handleReport}
        title="Reportar ficha"
        message="¿Por qué quieres reportar esta ficha?"
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
            <option value="animal_abuse">Maltrato animal</option>
            <option value="other">Otro</option>
          </select>
        </div>
      </ConfirmDialog>
    </div>
  );
};

export default PetDetail;