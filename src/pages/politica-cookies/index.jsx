import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';

const PoliticaCookies = () => {
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
                Política de Cookies
              </h1>
              <p className="text-lg text-text-secondary">
                Información sobre el uso de cookies en AdoptaEspaña
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-surface rounded-xl p-8 shadow-sm border border-border-light">
            <div className="prose prose-lg max-w-none">
              
              {/* Sección 1 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Info" size={24} className="text-primary mr-3" />
                  1. ¿Qué son las cookies?
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Una cookie es un pequeño archivo de texto que los sitios web almacenan en el dispositivo del usuario (ordenador, móvil, tablet, etc.) al navegar por la web. Sirve para recordar información sobre su visita, como idioma preferido, inicio de sesión o configuración de visualización.
                </p>
              </div>

              {/* Sección 2 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Settings" size={24} className="text-primary mr-3" />
                  2. Tipos de cookies que utilizamos
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  En nuestra página web utilizamos cookies propias y de terceros para mejorar la experiencia del usuario, garantizar el correcto funcionamiento del sitio y recopilar estadísticas anónimas.
                </p>

                {/* Subsecciones */}
                <div className="space-y-6">
                  <div className="bg-background rounded-lg p-6 border border-border-light">
                    <h3 className="text-xl font-heading font-semibold text-text-primary mb-3 flex items-center">
                      <Icon name="Shield" size={20} className="text-success mr-2" />
                      A. Cookies técnicas o necesarias
                    </h3>
                    <p className="text-text-secondary mb-2">
                      Estas cookies son esenciales para el funcionamiento de la web y no requieren consentimiento del usuario.
                    </p>
                    <p className="text-text-muted text-sm">
                      <strong>Ejemplo:</strong> recordar la selección de idioma o permitir la navegación segura.
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-6 border border-border-light">
                    <h3 className="text-xl font-heading font-semibold text-text-primary mb-3 flex items-center">
                      <Icon name="BarChart3" size={20} className="text-secondary mr-2" />
                      B. Cookies de análisis o medición
                    </h3>
                    <p className="text-text-secondary mb-2">
                      Permiten conocer el comportamiento de los usuarios en la web y mejorar su rendimiento.
                    </p>
                    <p className="text-text-muted text-sm">
                      <strong>Herramientas utilizadas:</strong> Google Analytics (datos anonimizados).
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-6 border border-border-light">
                    <h3 className="text-xl font-heading font-semibold text-text-primary mb-3 flex items-center">
                      <Icon name="User" size={20} className="text-accent mr-2" />
                      C. Cookies de personalización
                    </h3>
                    <p className="text-text-secondary">
                      Permiten al usuario acceder con características predeterminadas como idioma o tipo de navegador.
                    </p>
                  </div>

                  <div className="bg-background rounded-lg p-6 border border-border-light">
                    <h3 className="text-xl font-heading font-semibold text-text-primary mb-3 flex items-center">
                      <Icon name="Target" size={20} className="text-warning mr-2" />
                      D. Cookies publicitarias (si aplica)
                    </h3>
                    <p className="text-text-secondary mb-2">
                      Recogen información sobre los hábitos de navegación para mostrar publicidad personalizada.
                    </p>
                    <p className="text-text-muted text-sm">
                      <strong>Herramientas utilizadas:</strong> Meta Pixel, Google Ads (solo si se activan campañas).
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 3 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Globe" size={24} className="text-primary mr-3" />
                  3. Cookies de terceros
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  En algunos casos, compartimos información con servicios externos que instalan sus propias cookies desde nuestros dominios, como:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4">
                  <li>Google Analytics</li>
                  <li>YouTube (para incrustación de vídeos)</li>
                  <li>Meta (si usamos píxeles publicitarios)</li>
                  <li>Stripe o PayPal (si se ofrece pasarela de pago)</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mt-4">
                  Cada uno de ellos tiene sus propias políticas de cookies y privacidad, que puedes consultar en sus respectivas páginas.
                </p>
              </div>

              {/* Sección 4 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Settings2" size={24} className="text-primary mr-3" />
                  4. ¿Cómo puedes configurar o rechazar las cookies?
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Al acceder a nuestro sitio web, se muestra un banner de configuración de cookies que permite:
                </p>
                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-4 mb-4">
                  <li>Aceptar todas las cookies.</li>
                  <li>Rechazar todas las cookies no esenciales.</li>
                  <li>Configurar tus preferencias de manera granular.</li>
                </ul>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Además, puedes cambiar la configuración de cookies en cualquier momento desde el botón flotante "Configuración de Cookies" situado en la parte inferior de la página.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  También puedes gestionar tus preferencias directamente desde tu navegador:
                </p>
                <div className="bg-background rounded-lg p-4 border border-border-light">
                  <ul className="space-y-2 text-text-secondary">
                    <li className="flex items-center">
                      <Icon name="Chrome" size={16} className="text-primary mr-2" />
                      <strong>Chrome:</strong> 
                      <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600 ml-2">
                        https://support.google.com/chrome/answer/95647
                      </a>
                    </li>
                    <li className="flex items-center">
                      <Icon name="Firefox" size={16} className="text-primary mr-2" />
                      <strong>Firefox:</strong> 
                      <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600 ml-2">
                        https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web
                      </a>
                    </li>
                    <li className="flex items-center">
                      <Icon name="Safari" size={16} className="text-primary mr-2" />
                      <strong>Safari:</strong> 
                      <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-600 ml-2">
                        https://support.apple.com/es-es/guide/safari/sfri11471/mac
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sección 5 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Clock" size={24} className="text-primary mr-3" />
                  5. Tiempo de conservación
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Las cookies se conservarán durante el tiempo estrictamente necesario para las finalidades para las que han sido recopiladas. En ningún caso se conservarán más de 24 meses, según la categoría y proveedor.
                </p>
              </div>

              {/* Sección 6 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Scale" size={24} className="text-primary mr-3" />
                  6. Base legal para el uso de cookies
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                    <div>
                      <strong className="text-text-primary">Cookies técnicas:</strong>
                      <span className="text-text-secondary"> interés legítimo del responsable del tratamiento.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                    <div>
                      <strong className="text-text-primary">Resto de cookies:</strong>
                      <span className="text-text-secondary"> consentimiento del usuario expresado a través del banner o panel de configuración.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 7 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="RefreshCw" size={24} className="text-primary mr-3" />
                  7. Actualizaciones de esta política
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Esta política de cookies puede modificarse en función de exigencias legislativas o instrucciones de la Agencia Española de Protección de Datos. Te recomendamos revisarla periódicamente.
                </p>
                <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                  <p className="text-accent-700 font-medium">
                    <strong>Última actualización:</strong> junio 2025
                  </p>
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

export default PoliticaCookies;