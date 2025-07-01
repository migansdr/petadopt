import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    personalization: false,
    advertising: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    } else {
      // Load saved preferences
      const savedPreferences = JSON.parse(cookieConsent);
      setPreferences(savedPreferences);
      // Apply cookies based on preferences
      applyCookieSettings(savedPreferences);
    }
  }, []);

  const applyCookieSettings = (prefs) => {
    // Here you would implement the actual cookie setting logic
    // For example:
    
    if (prefs.analytics) {
      // Enable Google Analytics
      console.log('Analytics cookies enabled');
      // gtag('config', 'GA_MEASUREMENT_ID');
    } else {
      // Disable Google Analytics
      console.log('Analytics cookies disabled');
    }

    if (prefs.personalization) {
      // Enable personalization cookies
      console.log('Personalization cookies enabled');
    }

    if (prefs.advertising) {
      // Enable advertising cookies
      console.log('Advertising cookies enabled');
    }
  };

  const savePreferences = (prefs) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setPreferences(prefs);
    applyCookieSettings(prefs);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      personalization: true,
      advertising: true
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      personalization: false,
      advertising: false
    };
    savePreferences(onlyNecessary);
  };

  const handleCustomize = () => {
    setShowModal(true);
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  const handlePreferenceChange = (type, value) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const cookieTypes = [
    {
      id: 'necessary',
      title: 'Cookies Necesarias',
      description: 'Estas cookies son esenciales para el funcionamiento básico del sitio web y no se pueden desactivar.',
      icon: 'Shield',
      color: 'success',
      required: true
    },
    {
      id: 'analytics',
      title: 'Cookies de Análisis',
      description: 'Nos ayudan a entender cómo los visitantes interactúan con el sitio web recopilando información de forma anónima.',
      icon: 'BarChart3',
      color: 'secondary',
      required: false
    },
    {
      id: 'personalization',
      title: 'Cookies de Personalización',
      description: 'Permiten que el sitio web recuerde las elecciones que haces para proporcionarte una experiencia más personalizada.',
      icon: 'User',
      color: 'accent',
      required: false
    },
    {
      id: 'advertising',
      title: 'Cookies Publicitarias',
      description: 'Se utilizan para hacer que los mensajes publicitarios sean más relevantes para ti y tus intereses.',
      icon: 'Target',
      color: 'warning',
      required: false
    }
  ];

  if (!showBanner && !showModal) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-primary shadow-lg animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon name="Cookie" size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-text-primary mb-2">
                      🍪 Utilizamos cookies
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación, 
                      analizar el tráfico del sitio y personalizar el contenido. Puedes aceptar todas las cookies, 
                      rechazar las no esenciales o configurar tus preferencias.
                    </p>
                    <button
                      onClick={() => window.open('/politica-cookies', '_blank')}
                      className="text-primary hover:text-primary-600 text-sm font-medium mt-2 inline-flex items-center space-x-1"
                    >
                      <span>Leer política de cookies</span>
                      <Icon name="ExternalLink" size={14} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-surface transition-colors duration-200 text-sm font-medium"
                >
                  Rechazar no esenciales
                </button>
                <button
                  onClick={handleCustomize}
                  className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary-50 transition-colors duration-200 text-sm font-medium"
                >
                  Configurar
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 text-sm font-medium"
                >
                  Aceptar todas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl">
            {/* Modal Header */}
            <div className="bg-primary text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-heading font-bold mb-2">
                    Configuración de Cookies
                  </h2>
                  <p className="text-primary-100 text-sm">
                    Personaliza tus preferencias de cookies
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-primary-600 rounded-lg transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-6">
                {cookieTypes.map((type) => (
                  <div key={type.id} className="border border-border-light rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 bg-${type.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon name={type.icon} size={20} className={`text-${type.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-heading font-semibold text-text-primary mb-1">
                            {type.title}
                          </h3>
                          <p className="text-sm text-text-secondary">
                            {type.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0 ml-4">
                        {type.required ? (
                          <div className="bg-success-light text-success px-3 py-1 rounded-full text-xs font-medium">
                            Siempre activo
                          </div>
                        ) : (
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences[type.id]}
                              onChange={(e) => handlePreferenceChange(type.id, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-accent-50 rounded-lg border border-accent-200">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={16} className="text-accent mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-accent-700 mb-1">
                      Información importante
                    </p>
                    <p className="text-accent-600">
                      Puedes cambiar estas preferencias en cualquier momento usando el botón 
                      "Configuración de Cookies" en la parte inferior de la página.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-surface border-t border-border-light p-6">
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-background transition-colors duration-200"
                >
                  Rechazar no esenciales
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
                >
                  Guardar preferencias
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;