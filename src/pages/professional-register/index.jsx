import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import { SPANISH_PROVINCES } from 'utils/constants';

const ProfessionalRegister = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    type: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Business Information
    description: '',
    services: [],
    address: '',
    city: '',
    province: '',
    phone: '',
    whatsapp: '',
    website: '',
    
    // Additional Information
    openingHours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    emergencyAvailable: false,
    logo: null,
    images: [],
    
    // Legal
    acceptTerms: false,
    acceptPrivacy: false
  });
  
  const [errors, setErrors] = useState({});

  const businessTypes = [
    { value: 'clinic', label: 'Clínica Veterinaria', icon: 'Building2' },
    { value: 'individual', label: 'Veterinario Individual', icon: 'User' },
    { value: 'business', label: 'Negocio/Servicio', icon: 'Store' }
  ];

  // Servicios ordenados alfabéticamente
  const serviceOptions = [
    { value: 'accessories', label: 'Accesorios', icon: 'ShoppingBag' },
    { value: 'dog_trainer', label: 'Adiestramiento canino', icon: 'Award' },
    { value: 'agility_trainer', label: 'Adiestramiento de agility y deportes caninos', icon: 'Award' },
    { value: 'service_dog_trainer', label: 'Adiestramiento de perros de servicio o asistencia', icon: 'Award' },
    { value: 'boarding', label: 'Alojamiento canino (groomer)', icon: 'Home' },
    { value: 'behavioral_therapist', label: 'Asesor/a de comportamiento', icon: 'Brain' },
    { value: 'surgery', label: 'Cirugía', icon: 'Activity' },
    { value: 'consultation', label: 'Consultas', icon: 'MessageCircle' },
    { value: 'pet_sitter', label: 'Cuidador/a de perros a domicilio (pet sitter)', icon: 'Home' },
    { value: 'dentistry', label: 'Odontología', icon: 'Smile' },
    { value: 'canine_educator', label: 'Educador/a canino', icon: 'BookOpen' },
    { value: 'food_delivery', label: 'Entrega a domicilio', icon: 'Package' },
    { value: 'canine_aesthetician', label: 'Esteticista canino', icon: 'Scissors' },
    { value: 'ethologist', label: 'Etólogo/a', icon: 'Brain' },
    { value: 'physiotherapist', label: 'Fisioterapeuta', icon: 'Activity' },
    { value: 'pet_photographer', label: 'Fotógrafo/a de perros', icon: 'Camera' },
    { value: 'grooming', label: 'Grooming/Peluquería', icon: 'Scissors' },
    { value: 'daycare', label: 'Guardería', icon: 'Users' },
    { value: 'obedience_instructor', label: 'Instructor/a de obediencia', icon: 'Award' },
    { value: 'nutritionist', label: 'Nutricionista', icon: 'Apple' },
    { value: 'dog_walker', label: 'Paseador/a de perros', icon: 'MapPin' },
    { value: 'behavioral_modification_therapist', label: 'Terapeuta de modificación conductual', icon: 'Brain' },
    { value: 'pet_store', label: 'Tienda de mascotas', icon: 'Store' },
    { value: 'emergency', label: 'Urgencias', icon: 'AlertCircle' },
    { value: 'veterinary', label: 'Veterinaria', icon: 'Stethoscope' },
    { value: 'home_visits', label: 'Visitas a domicilio', icon: 'Truck' }
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const steps = [
    { id: 1, title: 'Información Básica', icon: 'User' },
    { id: 2, title: 'Servicios y Ubicación', icon: 'MapPin' },
    { id: 3, title: 'Horarios y Contacto', icon: 'Clock' },
    { id: 4, title: 'Imágenes y Verificación', icon: 'Camera' }
  ];

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

  const handleServiceToggle = (service) => {
    const currentServices = formData.services;
    const newServices = currentServices.includes(service)
      ? currentServices.filter(s => s !== service)
      : [...currentServices, service];
    
    handleInputChange('services', newServices);
  };

  const handleHoursChange = (day, type, value) => {
    const currentHours = formData.openingHours[day];
    let newHours;
    
    if (value === 'closed') {
      newHours = 'Cerrado';
    } else if (type === 'open') {
      const closeTime = currentHours.includes('-') ? currentHours.split('-')[1] : '18:00';
      newHours = `${value}-${closeTime}`;
    } else {
      const openTime = currentHours.includes('-') ? currentHours.split('-')[0] : '09:00';
      newHours = `${openTime}-${value}`;
    }
    
    setFormData(prev => ({
      ...prev,
      openingHours: {
        ...prev.openingHours,
        [day]: newHours
      }
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
        if (!formData.type) newErrors.type = 'Selecciona el tipo de negocio';
        if (!formData.email.trim()) newErrors.email = 'El email es obligatorio';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Email no válido';
        }
        if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
        if (formData.password.length < 6) {
          newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }
        break;
        
      case 2:
        if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria';
        if (formData.description.trim().length < 50) {
          newErrors.description = 'La descripción debe tener al menos 50 caracteres';
        }
        if (formData.services.length === 0) {
          newErrors.services = 'Selecciona al menos un servicio';
        }
        if (!formData.address.trim()) newErrors.address = 'La dirección es obligatoria';
        if (!formData.city.trim()) newErrors.city = 'La ciudad es obligatoria';
        if (!formData.province) newErrors.province = 'La provincia es obligatoria';
        break;
        
      case 3:
        if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
        break;
        
      case 4:
        if (!formData.acceptTerms) {
          newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
        }
        if (!formData.acceptPrivacy) {
          newErrors.acceptPrivacy = 'Debes aceptar la política de privacidad';
        }
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store registration data
      const registrationData = {
        ...formData,
        id: `prof_${Date.now()}`,
        registrationDate: new Date().toISOString(),
        verified: false,
        status: 'pending'
      };
      
      localStorage.setItem('professionalRegistration', JSON.stringify(registrationData));
      
      // Redirect to success page
      navigate('/professional-register-success');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Error en el registro. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Información Básica
        </h2>
        <p className="text-text-secondary">
          Comencemos con la información básica de tu negocio o servicio
        </p>
      </div>

      {/* Business Name */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Nombre del negocio/servicio *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={`input-field ${errors.name ? 'border-error' : ''}`}
          placeholder="Ej: Clínica Veterinaria San Antón"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-error">{errors.name}</p>
        )}
      </div>

      {/* Business Type */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Tipo de negocio *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {businessTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => handleInputChange('type', type.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                formData.type === type.value
                  ? 'border-primary bg-primary-50'
                  : 'border-border hover:border-primary-300 hover:bg-surface'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={type.icon} size={20} className={formData.type === type.value ? 'text-primary' : 'text-text-muted'} />
                <span className={`font-medium ${formData.type === type.value ? 'text-primary' : 'text-text-primary'}`}>
                  {type.label}
                </span>
              </div>
            </button>
          ))}
        </div>
        {errors.type && (
          <p className="mt-1 text-sm text-error">{errors.type}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Email de contacto *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`input-field ${errors.email ? 'border-error' : ''}`}
          placeholder="contacto@ejemplo.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-error">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Contraseña *
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`input-field ${errors.password ? 'border-error' : ''}`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-error">{errors.password}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Confirmar contraseña *
          </label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={`input-field ${errors.confirmPassword ? 'border-error' : ''}`}
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-error">{errors.confirmPassword}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Servicios y Ubicación
        </h2>
        <p className="text-text-secondary">
          Describe tu negocio y los servicios que ofreces
        </p>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Descripción del negocio *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={6}
          className={`input-field resize-none ${errors.description ? 'border-error' : ''}`}
          placeholder="Describe tu negocio, experiencia, especialidades y lo que te hace único..."
        />
        <div className="flex items-center justify-between mt-2">
          {errors.description ? (
            <p className="text-sm text-error">{errors.description}</p>
          ) : (
            <p className="text-sm text-text-secondary">
              Mínimo 50 caracteres
            </p>
          )}
          <span className={`text-sm ${formData.description.length < 50 ? 'text-warning' : 'text-success'}`}>
            {formData.description.length} caracteres
          </span>
        </div>
      </div>

      {/* Services */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Servicios que ofreces *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto border border-border rounded-lg p-4">
          {serviceOptions.map((service) => (
            <button
              key={service.value}
              type="button"
              onClick={() => handleServiceToggle(service.value)}
              className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                formData.services.includes(service.value)
                  ? 'border-primary bg-primary-50 text-primary'
                  : 'border-border hover:border-primary-300 hover:bg-surface'
              }`}
            >
              <div className="flex items-center space-y-2">
                <Icon name={service.icon} size={16} className="mr-2" />
                <span className="text-sm font-medium">{service.label}</span>
              </div>
            </button>
          ))}
        </div>
        {errors.services && (
          <p className="mt-1 text-sm text-error">{errors.services}</p>
        )}
        <p className="text-sm text-text-secondary mt-2">
          Servicios seleccionados: {formData.services.length}
        </p>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Dirección completa *
        </label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className={`input-field ${errors.address ? 'border-error' : ''}`}
          placeholder="Calle, número, código postal"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-error">{errors.address}</p>
        )}
      </div>

      {/* City and Province */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Ciudad *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={`input-field ${errors.city ? 'border-error' : ''}`}
            placeholder="Madrid"
          />
          {errors.city && (
            <p className="mt-1 text-sm text-error">{errors.city}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Provincia *
          </label>
          <select
            value={formData.province}
            onChange={(e) => handleInputChange('province', e.target.value)}
            className={`input-field ${errors.province ? 'border-error' : ''}`}
          >
            <option value="">Selecciona la provincia</option>
            {SPANISH_PROVINCES.map(province => (
              <option key={province.toLowerCase()} value={province.toLowerCase()}>
                {province}
              </option>
            ))}
          </select>
          {errors.province && (
            <p className="mt-1 text-sm text-error">{errors.province}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Horarios y Contacto
        </h2>
        <p className="text-text-secondary">
          Configura tus horarios de atención y datos de contacto
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={`input-field ${errors.phone ? 'border-error' : ''}`}
            placeholder="+34 91 123 4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-error">{errors.phone}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            WhatsApp (opcional)
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => handleInputChange('whatsapp', e.target.value)}
            className="input-field"
            placeholder="+34 600 123 456"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Sitio web (opcional)
        </label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => handleInputChange('website', e.target.value)}
          className="input-field"
          placeholder="https://www.ejemplo.com"
        />
      </div>

      {/* Emergency Services */}
      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.emergencyAvailable}
            onChange={(e) => handleInputChange('emergencyAvailable', e.target.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary-300"
          />
          <span className="text-sm font-medium text-text-primary">
            Ofrezco servicios de urgencia 24 horas
          </span>
        </label>
      </div>

      {/* Opening Hours */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-4">
          Horarios de atención
        </label>
        <div className="space-y-3">
          {Object.keys(formData.openingHours).map((day) => (
            <div key={day} className="grid grid-cols-4 gap-3 items-center">
              <div className="text-sm font-medium text-text-primary capitalize">
                {day === 'monday' ? 'Lunes' :
                 day === 'tuesday' ? 'Martes' :
                 day === 'wednesday' ? 'Miércoles' :
                 day === 'thursday' ? 'Jueves' :
                 day === 'friday' ? 'Viernes' :
                 day === 'saturday' ? 'Sábado' : 'Domingo'}
              </div>
              
              <select
                value={formData.openingHours[day] === 'Cerrado' ? 'closed' : 
                       formData.openingHours[day].includes('-') ? 
                       formData.openingHours[day].split('-')[0] : '09:00'}
                onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                className="input-field text-sm"
              >
                <option value="closed">Cerrado</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              
              <span className="text-center text-text-muted">a</span>
              
              <select
                value={formData.openingHours[day] === 'Cerrado' ? 'closed' : 
                       formData.openingHours[day].includes('-') ? 
                       formData.openingHours[day].split('-')[1] : '18:00'}
                onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                className="input-field text-sm"
                disabled={formData.openingHours[day] === 'Cerrado'}
              >
                <option value="closed">Cerrado</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
          Imágenes y Verificación
        </h2>
        <p className="text-text-secondary">
          Sube imágenes de tu negocio y acepta los términos para completar el registro
        </p>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Logo del negocio (opcional)
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <Icon name="Upload" size={32} className="mx-auto text-text-muted mb-2" />
          <p className="text-text-secondary text-sm">
            Arrastra tu logo aquí o haz clic para seleccionar
          </p>
          <p className="text-text-muted text-xs mt-1">
            Formatos: JPG, PNG. Máximo 2MB
          </p>
        </div>
      </div>

      {/* Images Upload */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Imágenes del negocio (opcional)
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <Icon name="Images" size={32} className="mx-auto text-text-muted mb-2" />
          <p className="text-text-secondary text-sm">
            Sube fotos de tus instalaciones, equipo o servicios
          </p>
          <p className="text-text-muted text-xs mt-1">
            Máximo 6 imágenes. Formatos: JPG, PNG. Máximo 5MB cada una
          </p>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div>
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-300 mt-1"
            />
            <span className="text-sm text-text-secondary">
              Acepto los{' '}
              <a href="/terms" target="_blank" className="text-primary hover:text-primary-600">
                términos y condiciones
              </a>{' '}
              de uso de la plataforma
            </span>
          </label>
          {errors.acceptTerms && (
            <p className="mt-1 text-sm text-error ml-7">{errors.acceptTerms}</p>
          )}
        </div>
        
        <div>
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.acceptPrivacy}
              onChange={(e) => handleInputChange('acceptPrivacy', e.target.checked)}
              className="w-4 h-4 text-primary border-border rounded focus:ring-primary-300 mt-1"
            />
            <span className="text-sm text-text-secondary">
              Acepto la{' '}
              <a href="/privacy" target="_blank" className="text-primary hover:text-primary-600">
                política de privacidad
              </a>{' '}
              y el tratamiento de mis datos personales
            </span>
          </label>
          {errors.acceptPrivacy && (
            <p className="mt-1 text-sm text-error ml-7">{errors.acceptPrivacy}</p>
          )}
        </div>
      </div>

      {/* Verification Notice */}
      <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-accent-700 mb-1">Proceso de verificación</p>
            <p className="text-accent-600">
              Tu registro será revisado por nuestro equipo en un plazo de 24-48 horas. 
              Te notificaremos por email cuando tu perfil esté aprobado y visible en el directorio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveHeader />
      
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    currentStep >= step.id
                      ? 'border-primary bg-primary text-white'
                      : 'border-border bg-background text-text-muted'
                  }`}>
                    {currentStep > step.id ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step.icon} size={20} />
                    )}
                  </div>
                  
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id ? 'text-primary' : 'text-text-muted'
                    }`}>
                      Paso {step.id}
                    </p>
                    <p className={`text-xs ${
                      currentStep >= step.id ? 'text-text-primary' : 'text-text-muted'
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`w-12 sm:w-20 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-surface rounded-xl p-6 sm:p-8 shadow-sm border border-border-light">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t border-border-light mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentStep === 1
                    ? 'text-text-muted cursor-not-allowed'
                    : 'text-text-secondary border border-border hover:bg-surface-hover'
                }`}
              >
                <Icon name="ChevronLeft" size={20} />
                <span>Anterior</span>
              </button>

              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="btn-primary flex items-center space-x-2"
                >
                  <span>Siguiente</span>
                  <Icon name="ChevronRight" size={20} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="btn-primary flex items-center space-x-2 min-w-[160px] justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Registrando...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Check" size={20} />
                      <span>Completar Registro</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfessionalRegister;