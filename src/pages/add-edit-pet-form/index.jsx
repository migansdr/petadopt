import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';
import BreadcrumbNavigation from 'components/ui/BreadcrumbNavigation';
import Icon from 'components/AppIcon';

import PetImageUpload from './components/PetImageUpload';
import PetFormFields from './components/PetFormFields';
import PetTagsSection from './components/PetTagsSection';
import FormActions from './components/FormActions';

const AddEditPetForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEdit = searchParams.get('edit') === 'true' || searchParams.get('id');
  const petId = searchParams.get('id');

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    species: '',
    size: '',
    province: '',
    description: '',
    images: [],
    primaryImageIndex: 0,
    tags: {
      vaccinated: false,
      sterilized: false,
      sociable: false,
      urgent: false
    }
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock data for editing
  const mockPetData = {
    id: '1',
    name: 'Luna',
    age: 'adult',
    species: 'dog',
    size: 'medium',
    province: 'madrid',
    description: `Luna es una perra muy cariñosa y juguetona que busca una familia que le dé todo el amor que se merece. Es perfecta para familias con niños ya que es muy paciente y protectora.

Le encanta pasear por el parque y jugar con otros perros. Está completamente vacunada y esterilizada. Luna ha vivido en la calle pero se ha adaptado perfectamente a la vida doméstica.

Necesita una familia activa que pueda darle el ejercicio diario que necesita. Es muy obediente y aprende rápido las órdenes básicas.`,
    images: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&h=400&fit=crop'
    ],
    primaryImageIndex: 0,
    tags: {
      vaccinated: true,
      sterilized: true,
      sociable: true,
      urgent: false
    }
  };

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/authentication-login-register');
      return;
    }

    // Load pet data for editing
    if (isEdit && petId) {
      setFormData(mockPetData);
    }
  }, [isEdit, petId, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.age) {
      newErrors.age = 'La edad es obligatoria';
    }

    if (!formData.species) {
      newErrors.species = 'La especie es obligatoria';
    }

    if (!formData.size) {
      newErrors.size = 'El tamaño es obligatorio';
    }

    if (!formData.province) {
      newErrors.province = 'La provincia es obligatoria';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'La descripción debe tener al menos 50 caracteres';
    }

    if (formData.images.length === 0) {
      newErrors.images = 'Debe subir al menos una imagen';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTagChange = (tag, value) => {
    setFormData(prev => ({
      ...prev,
      tags: {
        ...prev.tags,
        [tag]: value
      }
    }));
  };

  const handleImageUpload = (images) => {
    setFormData(prev => ({
      ...prev,
      images: images
    }));

    if (errors.images) {
      setErrors(prev => ({
        ...prev,
        images: ''
      }));
    }
  };

  const handlePrimaryImageChange = (index) => {
    setFormData(prev => ({
      ...prev,
      primaryImageIndex: index
    }));
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    setIsDraft(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage as draft
      const drafts = JSON.parse(localStorage.getItem('petDrafts') || '[]');
      const draftData = {
        ...formData,
        id: isEdit ? petId : Date.now().toString(),
        isDraft: true,
        lastModified: new Date().toISOString()
      };

      const existingIndex = drafts.findIndex(draft => draft.id === draftData.id);
      if (existingIndex >= 0) {
        drafts[existingIndex] = draftData;
      } else {
        drafts.push(draftData);
      }

      localStorage.setItem('petDrafts', JSON.stringify(drafts));
      
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setIsLoading(false);
      setIsDraft(false);
    }
  };

  const handlePublish = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save to localStorage as published
      const pets = JSON.parse(localStorage.getItem('publishedPets') || '[]');
      const petData = {
        ...formData,
        id: isEdit ? petId : Date.now().toString(),
        isDraft: false,
        publishedAt: new Date().toISOString(),
        shelterId: JSON.parse(localStorage.getItem('shelterInfo') || '{}').id || '1'
      };

      const existingIndex = pets.findIndex(pet => pet.id === petData.id);
      if (existingIndex >= 0) {
        pets[existingIndex] = petData;
      } else {
        pets.push(petData);
      }

      localStorage.setItem('publishedPets', JSON.stringify(pets));
      
      // Remove from drafts if it was a draft
      const drafts = JSON.parse(localStorage.getItem('petDrafts') || '[]');
      const filteredDrafts = drafts.filter(draft => draft.id !== petData.id);
      localStorage.setItem('petDrafts', JSON.stringify(filteredDrafts));
      
      navigate('/shelter-dashboard');
    } catch (error) {
      console.error('Error publishing pet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (JSON.stringify(formData) !== JSON.stringify(isEdit ? mockPetData : {
      name: '', age: '', species: '', size: '', province: '', description: '',
      images: [], primaryImageIndex: 0, tags: { vaccinated: false, sterilized: false, sociable: false, urgent: false }
    })) {
      if (window.confirm('¿Estás seguro de que quieres salir? Los cambios no guardados se perderán.')) {
        navigate('/shelter-dashboard');
      }
    } else {
      navigate('/shelter-dashboard');
    }
  };

  const getFormProgress = () => {
    const requiredFields = ['name', 'age', 'species', 'size', 'province', 'description'];
    const filledFields = requiredFields.filter(field => formData[field] && formData[field].toString().trim());
    const hasImages = formData.images.length > 0;
    const totalSteps = requiredFields.length + 1; // +1 for images
    const completedSteps = filledFields.length + (hasImages ? 1 : 0);
    
    return Math.round((completedSteps / totalSteps) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveHeader />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BreadcrumbNavigation />
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-heading font-bold text-text-primary">
                  {isEdit ? 'Editar Mascota' : 'Añadir Nueva Mascota'}
                </h1>
                <p className="text-text-secondary mt-2">
                  {isEdit 
                    ? 'Actualiza la información de la mascota para mejorar sus posibilidades de adopción'
                    : 'Completa la información para ayudar a esta mascota a encontrar un hogar'
                  }
                </p>
              </div>
              
              {/* Progress Indicator */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-sm text-text-secondary">
                  Progreso: {getFormProgress()}%
                </div>
                <div className="w-24 h-2 bg-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${getFormProgress()}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Progress */}
            <div className="md:hidden mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-secondary">
                  Progreso del formulario
                </span>
                <span className="text-sm font-semibold text-primary">
                  {getFormProgress()}%
                </span>
              </div>
              <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${getFormProgress()}%` }}
                />
              </div>
            </div>
          </div>

          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-6 p-4 bg-success-light border border-success rounded-lg flex items-center space-x-3 animate-fade-in">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="text-success font-medium">
                Borrador guardado correctamente
              </span>
            </div>
          )}

          {/* Form */}
          <form className="space-y-8">
            {/* Basic Information */}
            <div className="card p-6">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-6 flex items-center space-x-2">
                <Icon name="Info" size={20} className="text-primary" />
                <span>Información Básica</span>
              </h2>
              
              <PetFormFields 
                formData={formData}
                errors={errors}
                onChange={handleInputChange}
              />
            </div>

            {/* Images */}
            <div className="card p-6">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-6 flex items-center space-x-2">
                <Icon name="Camera" size={20} className="text-primary" />
                <span>Fotografías</span>
              </h2>
              
              <PetImageUpload
                images={formData.images}
                primaryImageIndex={formData.primaryImageIndex}
                onImagesChange={handleImageUpload}
                onPrimaryImageChange={handlePrimaryImageChange}
                error={errors.images}
              />
            </div>

            {/* Tags */}
            <div className="card p-6">
              <h2 className="text-xl font-heading font-semibold text-text-primary mb-6 flex items-center space-x-2">
                <Icon name="Tags" size={20} className="text-primary" />
                <span>Características</span>
              </h2>
              
              <PetTagsSection
                tags={formData.tags}
                onChange={handleTagChange}
              />
            </div>

            {/* Form Actions */}
            <FormActions
              isEdit={isEdit}
              isLoading={isLoading}
              isDraft={isDraft}
              onPublish={handlePublish}
              onSaveDraft={handleSaveDraft}
              onCancel={handleCancel}
            />
          </form>

          {/* Tips Sidebar - Desktop Only */}
          <div className="hidden lg:block fixed right-8 top-1/2 transform -translate-y-1/2 w-80">
            <div className="card p-6">
              <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="Lightbulb" size={18} className="text-accent" />
                <span>Consejos</span>
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <Icon name="Camera" size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-text-primary">Fotos de calidad</p>
                    <p className="text-text-secondary">Usa fotos claras y bien iluminadas. La primera imagen será la principal.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Icon name="FileText" size={16} className="text-secondary mt-0.5" />
                  <div>
                    <p className="font-medium text-text-primary">Descripción detallada</p>
                    <p className="text-text-secondary">Incluye personalidad, comportamiento y necesidades especiales.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Icon name="Heart" size={16} className="text-accent mt-0.5" />
                  <div>
                    <p className="font-medium text-text-primary">Sé honesto</p>
                    <p className="text-text-secondary">La transparencia ayuda a encontrar la familia perfecta.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddEditPetForm;