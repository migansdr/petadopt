import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const CookieSettingsButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    personalization: false,
    advertising: false
  });

  useEffect(() => {
    // Only show button if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
      setShowButton(true);
      setPreferences(JSON.parse(cookieConsent));
    }
  }, []);

  const applyCookieSettings = (prefs) => {
    // Same logic as in CookieConsent component
    if (prefs.analytics) {
      console.log('Analytics cookies enabled');
    } else {
      console.log('Analytics cookies disabled');
    }

    if (prefs.personalization) {
      console.log('Personalization cookies enabled');
    }

    if (prefs.advertising) {
      console.log('Advertising cookies enabled');
    }
  };

  const savePreferences = (prefs) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setPreferences(prefs);
    applyCookieSettings(prefs);
    setShowModal(false);
  };

  const handlePreferenceChange = (type, value) => {
    setPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
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

  if (!showButton) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-6 left-6 bg-white border-2 border-primary text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 z-40 group"
        title="Configuración de Cookies"
      >
        <Icon name="Settings" size={20} />
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-text-primary text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          Configuración de Cookies
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-text-primary"></div>
        </div>
      </button>

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
                    Actualiza tus preferencias de cookies
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

              {/* Current Settings Summary */}
              <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
                <h4 className="font-medium text-primary mb-2">Configuración actual:</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name={preferences.analytics ? "CheckCircle" : "XCircle"} size={16} className={preferences.analytics ? "text-success" : "text-error"} />
                    <span>Análisis: {preferences.analytics ? 'Activado' : 'Desactivado'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name={preferences.personalization ? "CheckCircle" : "XCircle"} size={16} className={preferences.personalization ? "text-success" : "text-error"} />
                    <span>Personalización: {preferences.personalization ? 'Activado' : 'Desactivado'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name={preferences.advertising ? "CheckCircle" : "XCircle"} size={16} className={preferences.advertising ? "text-success" : "text-error"} />
                    <span>Publicidad: {preferences.advertising ? 'Activado' : 'Desactivado'}</span>
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
                  Solo necesarias
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieSettingsButton;