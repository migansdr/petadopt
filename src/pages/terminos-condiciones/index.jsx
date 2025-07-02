import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';

const TerminosCondiciones = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveHeader />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
                Términos y Condiciones de Uso
              </h1>
              <p className="text-lg text-text-secondary">
                Condiciones generales de uso de la plataforma AdoptaEspaña
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-surface rounded-xl p-8 shadow-sm border border-border-light">
            <div className="prose prose-lg max-w-none">
              
              {/* Aviso Legal */}
              <div className="mb-8 p-6 bg-warning-light rounded-lg border border-warning">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={24} className="text-warning flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-semibold text-warning-700 mb-2">
                      Aviso Legal Importante
                    </h3>
                    <p className="text-warning-700 text-sm">
                      <strong>Estos términos y condiciones son un documento de demostración.</strong> 
                      Antes de implementar en producción, es <strong>obligatorio consultar con un abogado especializado 
                      en derecho digital</strong> para asegurar el cumplimiento de la legislación española vigente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 1 - Información General */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Info" size={24} className="text-primary mr-3" />
                  1. Información general
                </h2>
                <div className="bg-background rounded-lg p-6 border border-border-light">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-text-primary">Titular del sitio web:</strong>
                      <p className="text-text-secondary">[Nombre comercial o razón social]</p>
                    </div>
                    <div>
                      <strong className="text-text-primary">CIF/NIF:</strong>
                      <p className="text-text-secondary">[Número de identificación fiscal]</p>
                    </div>
                    <div>
                      <strong className="text-text-primary">Domicilio social:</strong>
                      <p className="text-text-secondary">[Dirección completa]</p>
                    </div>
                    <div>
                      <strong className="text-text-primary">Correo electrónico:</strong>
                      <p className="text-text-secondary">[ejemplo@dominio.com]</p>
                    </div>
                    <div>
                      <strong className="text-text-primary">Dominio web:</strong>
                      <p className="text-text-secondary">[www.tudominio.com]</p>
                    </div>
                    <div>
                      <strong className="text-text-primary">Objeto del sitio:</strong>
                      <p className="text-text-secondary">Plataforma de adopción de animales y conexión entre usuarios y protectoras.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 2 - Objeto y ámbito */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Target" size={24} className="text-primary mr-3" />
                  2. Objeto y ámbito de aplicación
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Las presentes condiciones regulan el acceso, navegación y uso del sitio web, así como las responsabilidades 
                  derivadas de la utilización de sus contenidos. El acceso y uso del sitio implica la aceptación plena y sin 
                  reservas de estas condiciones.
                </p>
                <div className="bg-warning-light rounded-lg p-4 border border-warning">
                  <p className="text-warning-700 font-medium">
                    Si no estás de acuerdo, te pedimos que no utilices nuestros servicios.
                  </p>
                </div>
              </div>

              {/* Sección 3 - Condiciones de acceso */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Key" size={24} className="text-primary mr-3" />
                  3. Condiciones de acceso y uso
                </h2>
                <div className="space-y-4">
                  <p className="text-text-secondary leading-relaxed">
                    El acceso al sitio web es libre y gratuito, salvo para funcionalidades que requieran registro.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    El usuario se compromete a hacer un uso adecuado y lícito de los contenidos y servicios.
                  </p>
                  
                  <div className="bg-error-light rounded-lg p-4 border border-error">
                    <h4 className="font-semibold text-error mb-3">Se prohíbe:</h4>
                    <ul className="space-y-2 text-error-700 text-sm">
                      <li className="flex items-start space-x-2">
                        <Icon name="XCircle" size={16} className="mt-0.5 flex-shrink-0" />
                        <span>La reproducción o distribución no autorizada de contenidos.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="XCircle" size={16} className="mt-0.5 flex-shrink-0" />
                        <span>El uso del sitio con fines ilícitos, fraudulentos o lesivos para terceros.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <Icon name="XCircle" size={16} className="mt-0.5 flex-shrink-0" />
                        <span>La introducción de virus, malware o cualquier código malicioso.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sección 4 - Registro de usuario */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="UserPlus" size={24} className="text-primary mr-3" />
                  4. Registro de usuario
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Algunas funcionalidades (como enviar solicitudes de adopción o crear perfiles) requieren registro mediante formulario.
                </p>
                
                <div className="bg-background rounded-lg p-4 border border-border-light">
                  <h4 className="font-semibold text-text-primary mb-3">El usuario se compromete a:</h4>
                  <ul className="space-y-2 text-text-secondary">
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>Proporcionar información veraz y actualizada.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>Mantener la confidencialidad de sus credenciales.</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>Notificar cualquier uso no autorizado de su cuenta.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sección 5 - Responsabilidad */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="AlertTriangle" size={24} className="text-primary mr-3" />
                  5. Responsabilidad
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  El titular del sitio web no será responsable:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-background rounded-lg border border-border-light">
                    <Icon name="Minus" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">De interrupciones o errores en el acceso por causas técnicas ajenas a su control.</span>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-background rounded-lg border border-border-light">
                    <Icon name="Minus" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">De los contenidos enlazados desde sitios de terceros.</span>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-background rounded-lg border border-border-light">
                    <Icon name="Minus" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">De la veracidad o legalidad de los datos publicados por usuarios o protectoras colaboradoras.</span>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-background rounded-lg border border-border-light">
                    <Icon name="Minus" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">De las decisiones derivadas de la información mostrada en la plataforma (ej. adopciones).</span>
                  </div>
                </div>
              </div>

              {/* Sección 6 - Propiedad intelectual */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Copyright" size={24} className="text-primary mr-3" />
                  6. Propiedad intelectual e industrial
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Todos los contenidos del sitio (textos, imágenes, logos, diseño, código fuente, etc.) son propiedad del titular 
                  o cuentan con licencia expresa para su uso.
                </p>
                <div className="bg-error-light rounded-lg p-4 border border-error">
                  <p className="text-error-700 font-medium">
                    Queda prohibida su reproducción, distribución, transformación o comunicación pública sin autorización expresa y por escrito.
                  </p>
                </div>
              </div>

              {/* Sección 7 - Enlaces externos */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="ExternalLink" size={24} className="text-primary mr-3" />
                  7. Enlaces externos
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Este sitio puede contener enlaces a sitios de terceros. El titular no se responsabiliza del contenido, 
                  funcionamiento o disponibilidad de esos sitios, ni de posibles daños derivados de su uso.
                </p>
              </div>

              {/* Sección 8 - Protección de datos */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Shield" size={24} className="text-primary mr-3" />
                  8. Protección de datos personales
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  El tratamiento de datos personales se rige por nuestra Política de Privacidad, accesible en el siguiente enlace:
                </p>
                <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                  <button
                    onClick={() => window.open('/politica-privacidad', '_blank')}
                    className="flex items-center space-x-2 text-primary hover:text-primary-600 font-medium"
                  >
                    <Icon name="Shield" size={16} />
                    <span>Política de Privacidad</span>
                    <Icon name="ExternalLink" size={14} />
                  </button>
                </div>
              </div>

              {/* Sección 9 - Cookies */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Cookie" size={24} className="text-primary mr-3" />
                  9. Uso de cookies
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  El sitio utiliza cookies propias y de terceros con fines técnicos, analíticos y de personalización. 
                  Puedes consultar los detalles y configurar tus preferencias en la Política de Cookies.
                </p>
                <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                  <button
                    onClick={() => window.open('/politica-cookies', '_blank')}
                    className="flex items-center space-x-2 text-accent hover:text-accent-600 font-medium"
                  >
                    <Icon name="Cookie" size={16} />
                    <span>Política de Cookies</span>
                    <Icon name="ExternalLink" size={14} />
                  </button>
                </div>
              </div>

              {/* Sección 10 - Modificaciones */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="RefreshCw" size={24} className="text-primary mr-3" />
                  10. Modificaciones
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Nos reservamos el derecho de modificar en cualquier momento estas condiciones. Los cambios se comunicarán 
                  a los usuarios registrados o se publicarán en esta misma sección.
                </p>
                <div className="bg-warning-light rounded-lg p-4 border border-warning">
                  <p className="text-warning-700 font-medium">
                    El uso del sitio tras la publicación de cambios implica la aceptación de los mismos.
                  </p>
                </div>
              </div>

              {/* Sección 11 - Legislación */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Scale" size={24} className="text-primary mr-3" />
                  11. Legislación y jurisdicción
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier conflicto 
                  que pudiera derivarse, las partes se someten a los juzgados y tribunales del domicilio del titular del sitio, 
                  salvo que la legislación aplicable disponga lo contrario.
                </p>
              </div>

              {/* Fecha de actualización */}
              <div className="mb-8">
                <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                  <p className="text-accent-700 font-medium">
                    <strong>Última actualización:</strong> 15 de enero de 2025
                  </p>
                  <p className="text-accent-600 text-sm mt-1">
                    <strong>Próxima revisión programada:</strong> 15 de enero de 2026
                  </p>
                </div>
              </div>

              {/* Contacto */}
              <div className="mb-8 bg-primary-50 rounded-lg p-6 border border-primary-200">
                <h3 className="font-heading font-semibold text-primary mb-4 flex items-center">
                  <Icon name="Mail" size={20} className="mr-2" />
                  Contacto
                </h3>
                <p className="text-primary-700 mb-3">
                  Para cualquier consulta sobre estos términos y condiciones:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} className="text-primary" />
                    <span className="text-primary-700">info@adoptaespana.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-primary" />
                    <span className="text-primary-700">+34 900 123 456</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span className="text-primary-700">Calle Esperanza 123, 28001 Madrid, España</span>
                  </div>
                </div>
              </div>

              {/* Enlaces relacionados */}
              <div className="mb-8 bg-secondary-50 rounded-lg p-6 border border-secondary-200">
                <h3 className="font-heading font-semibold text-secondary mb-4">
                  Documentos relacionados
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => window.open('/politica-privacidad', '_blank')}
                    className="flex items-center space-x-2 text-secondary hover:text-secondary-600 transition-colors duration-200"
                  >
                    <Icon name="Shield" size={16} />
                    <span>Política de Privacidad</span>
                    <Icon name="ExternalLink" size={14} />
                  </button>
                  <button
                    onClick={() => window.open('/politica-cookies', '_blank')}
                    className="flex items-center space-x-2 text-secondary hover:text-secondary-600 transition-colors duration-200"
                  >
                    <Icon name="Cookie" size={16} />
                    <span>Política de Cookies</span>
                    <Icon name="ExternalLink" size={14} />
                  </button>
                </div>
              </div>

              {/* Botón de vuelta */}
              <div className="text-center pt-8 border-t border-border-light">
                <button
                  onClick={handleBackToHome}
                  className="btn-primary flex items-center space-x-2 mx-auto"
                >
                  <Icon name="ArrowLeft" size={20} />
                  <span>Volver al inicio</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TerminosCondiciones;