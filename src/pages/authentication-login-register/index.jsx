import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const AuthenticationLoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    shelterName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'refugio@ejemplo.com',
    password: 'refugio123'
  };

  useEffect(() => {
    // Clear form when switching modes
    setFormData({
      shelterName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
    setSuccessMessage('');
  }, [isLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.shelterName.trim()) {
      newErrors.shelterName = 'El nombre del refugio es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor, introduce un email válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (isLogin) {
        // Check mock credentials
        if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
          // Store authentication state
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('shelterInfo', JSON.stringify({
            name: 'Refugio Esperanza',
            email: formData.email,
            id: 'shelter_001'
          }));
          
          setSuccessMessage('¡Inicio de sesión exitoso! Redirigiendo...');
          setTimeout(() => {
            navigate('/shelter-dashboard');
          }, 1000);
        } else {
          setErrors({
            general: `Credenciales incorrectas. Usa: ${mockCredentials.email} / ${mockCredentials.password}`
          });
        }
      } else {
        // Registration success
        setSuccessMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setTimeout(() => {
          setIsLogin(true);
        }, 2000);
      }
    } catch (error) {
      setErrors({
        general: 'Ha ocurrido un error. Por favor, inténtalo de nuevo.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/public-pet-adoption-homepage');
  };

  const handleForgotPassword = () => {
    alert('Funcionalidad de recuperación de contraseña próximamente disponible');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-primary hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-lg p-1"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-text-primary">
                AdoptaEspaña
              </span>
            </button>

            {/* Back to Home */}
            <button
              onClick={handleBackToHome}
              className="flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-lg px-3 py-2"
            >
              <Icon name="ArrowLeft" size={18} />
              <span className="hidden sm:inline font-medium">Volver al inicio</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto lg:max-w-4xl">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            {/* Form Section */}
            <div className="w-full">
              {/* Mode Toggle */}
              <div className="mb-8">
                <div className="flex bg-surface rounded-lg p-1 border border-border-light">
                  <button
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                      isLogin
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                      !isLogin
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    Registrarse
                  </button>
                </div>
              </div>

              {/* Form Header */}
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-text-primary mb-2">
                  {isLogin ? 'Bienvenido de vuelta' : 'Únete a nosotros'}
                </h1>
                <p className="text-text-secondary">
                  {isLogin 
                    ? 'Accede a tu panel de refugio para gestionar las mascotas' :'Crea tu cuenta para comenzar a ayudar mascotas a encontrar hogar'
                  }
                </p>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 p-4 bg-success-light border border-success rounded-lg flex items-center space-x-3 animate-fade-in">
                  <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0" />
                  <span className="text-success font-medium">{successMessage}</span>
                </div>
              )}

              {/* General Error */}
              {errors.general && (
                <div className="mb-6 p-4 bg-error-light border border-error rounded-lg flex items-center space-x-3 animate-fade-in">
                  <Icon name="AlertCircle" size={20} className="text-error flex-shrink-0" />
                  <span className="text-error font-medium">{errors.general}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shelter Name (Register only) */}
                {!isLogin && (
                  <div>
                    <label htmlFor="shelterName" className="block text-sm font-medium text-text-primary mb-2">
                      Nombre del Refugio *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="Building2" size={20} className="text-text-muted" />
                      </div>
                      <input
                        type="text"
                        id="shelterName"
                        name="shelterName"
                        value={formData.shelterName}
                        onChange={handleInputChange}
                        className={`input-field pl-10 ${errors.shelterName ? 'border-error focus:ring-error-300 focus:border-error' : ''}`}
                        placeholder="Ej: Refugio Esperanza"
                      />
                    </div>
                    {errors.shelterName && (
                      <p className="mt-2 text-sm text-error flex items-center space-x-1">
                        <Icon name="AlertCircle" size={16} />
                        <span>{errors.shelterName}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                    Email del Refugio *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon name="Mail" size={20} className="text-text-muted" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`input-field pl-10 ${errors.email ? 'border-error focus:ring-error-300 focus:border-error' : ''}`}
                      placeholder="refugio@ejemplo.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-error flex items-center space-x-1">
                      <Icon name="AlertCircle" size={16} />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Icon name="Lock" size={20} className="text-text-muted" />
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`input-field pl-10 ${errors.password ? 'border-error focus:ring-error-300 focus:border-error' : ''}`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-error flex items-center space-x-1">
                      <Icon name="AlertCircle" size={16} />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                {/* Confirm Password (Register only) */}
                {!isLogin && (
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-primary mb-2">
                      Confirmar Contraseña *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon name="Lock" size={20} className="text-text-muted" />
                      </div>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`input-field pl-10 ${errors.confirmPassword ? 'border-error focus:ring-error-300 focus:border-error' : ''}`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-2 text-sm text-error flex items-center space-x-1">
                        <Icon name="AlertCircle" size={16} />
                        <span>{errors.confirmPassword}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Remember Me (Login only) */}
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="rememberMe"
                        name="rememberMe"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 text-primary focus:ring-primary-300 border-border rounded"
                      />
                      <label htmlFor="rememberMe" className="ml-2 block text-sm text-text-secondary">
                        Recordarme
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-sm text-primary hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded px-1 py-1"
                    >
                      ¿Olvidaste tu contraseña?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>{isLogin ? 'Iniciando sesión...' : 'Registrando...'}</span>
                    </>
                  ) : (
                    <>
                      <Icon name={isLogin ? "LogIn" : "UserPlus"} size={20} />
                      <span>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Information Text */}
              <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-primary mb-1">
                      Acceso para Refugios
                    </h3>
                    <p className="text-sm text-primary-700">
                      {isLogin 
                        ? 'Una vez autenticado, podrás acceder a tu panel privado para subir y gestionar las mascotas disponibles para adopción.'
                        : 'Al registrarte obtienes acceso completo para subir fotos de mascotas, gestionar sus perfiles y conectar con adoptantes potenciales.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration Section (Desktop only) */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100 p-8">
                  <Image
                    src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Refugio de mascotas"
                    className="w-full h-full object-cover rounded-xl shadow-lg"
                  />
                </div>
                
                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-border-light">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Heart" size={16} color="white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">+150</p>
                      <p className="text-xs text-text-secondary">Adopciones</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 border border-border-light">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <Icon name="Users" size={16} color="white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">25+</p>
                      <p className="text-xs text-text-secondary">Refugios</p>
                    </div>
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

export default AuthenticationLoginRegister;