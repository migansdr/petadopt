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
              
              {/* Sección 1 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Info" size={24} className="text-primary mr-3" />
                  1. Objeto y ámbito de aplicación
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Los presentes términos y condiciones regulan el uso de la plataforma web AdoptaEspaña, 
                  destinada a facilitar la adopción responsable de mascotas mediante la conexión entre 
                  refugios, protectoras y personas interesadas en adoptar.
                </p>
              </div>

              {/* Sección 2 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Users" size={24} className="text-primary mr-3" />
                  2. Usuarios de la plataforma
                </h2>
                <div className="space-y-4">
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <h3 className="font-heading font-semibold text-text-primary mb-2 flex items-center">
                      <Icon name="Building2" size={18} className="text-secondary mr-2" />
                      Refugios y Protectoras
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Organizaciones dedicadas al cuidado y protección de animales que publican mascotas disponibles para adopción.
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <h3 className="font-heading font-semibold text-text-primary mb-2 flex items-center">
                      <Icon name="Heart" size={18} className="text-accent mr-2" />
                      Adoptantes
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Personas físicas interesadas en adoptar una mascota de forma responsable.
                    </p>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <h3 className="font-heading font-semibold text-text-primary mb-2 flex items-center">
                      <Icon name="Stethoscope" size={18} className="text-primary mr-2" />
                      Profesionales
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Veterinarios, peluquerías caninas y otros servicios profesionales relacionados con el cuidado animal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 3 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="UserCheck" size={24} className="text-primary mr-3" />
                  3. Registro y responsabilidades del usuario
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Para utilizar ciertas funcionalidades de la plataforma, los usuarios deberán registrarse proporcionando información veraz y actualizada.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                    <span className="text-text-secondary">Proporcionar información veraz y actualizada</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                    <span className="text-text-secondary">Mantener la confidencialidad de sus credenciales de acceso</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                    <span className="text-text-secondary">Usar la plataforma de forma responsable y conforme a la ley</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                    <span className="text-text-secondary">No publicar contenido falso, ofensivo o que infrinja derechos de terceros</span>
                  </div>
                </div>
              </div>

              {/* Sección 4 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Shield" size={24} className="text-primary mr-3" />
                  4. Uso prohibido
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Queda expresamente prohibido:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="XCircle" size={20} className="text-error mt-0.5" />
                    <span className="text-text-secondary">Utilizar la plataforma para fines comerciales no autorizados</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="XCircle" size={20} className="text-error mt-0.5" />
                    <span className="text-text-secondary">Publicar información falsa sobre mascotas o refugios</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="XCircle" size={20} className="text-error mt-0.5" />
                    <span className="text-text-secondary">Realizar actividades que puedan dañar o sobrecargar la plataforma</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="XCircle" size={20} className="text-error mt-0.5" />
                    <span className="text-text-secondary">Acosar, amenazar o molestar a otros usuarios</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="XCircle" size={20} className="text-error mt-0.5" />
                    <span className="text-text-secondary">Promover el maltrato animal o prácticas irresponsables</span>
                  </div>
                </div>
              </div>

              {/* Sección 5 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Copyright" size={24} className="text-primary mr-3" />
                  5. Propiedad intelectual
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Todos los contenidos de la plataforma (textos, imágenes, logotipos, código fuente, etc.) 
                  están protegidos por derechos de propiedad intelectual e industrial.
                </p>
                <div className="bg-warning-light rounded-lg p-4 border border-warning">
                  <p className="text-warning-700 text-sm">
                    <strong>Importante:</strong> Los usuarios conservan los derechos sobre las imágenes y contenidos 
                    que publican, pero otorgan a AdoptaEspaña una licencia para mostrarlos en la plataforma 
                    con fines de facilitar la adopción.
                  </p>
                </div>
              </div>

              {/* Sección 6 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="AlertTriangle" size={24} className="text-primary mr-3" />
                  6. Limitación de responsabilidad
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  AdoptaEspaña actúa como intermediario entre refugios y adoptantes. No nos hacemos responsables de:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="Minus" size={20} className="text-warning mt-0.5" />
                    <span className="text-text-secondary">La veracidad de la información publicada por los usuarios</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Minus" size={20} className="text-warning mt-0.5" />
                    <span className="text-text-secondary">El estado de salud o comportamiento de las mascotas</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Minus" size={20} className="text-warning mt-0.5" />
                    <span className="text-text-secondary">Los acuerdos o contratos entre refugios y adoptantes</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Minus" size={20} className="text-warning mt-0.5" />
                    <span className="text-text-secondary">Interrupciones temporales del servicio por mantenimiento</span>
                  </div>
                </div>
              </div>

              {/* Sección 7 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Scale" size={24} className="text-primary mr-3" />
                  7. Legislación aplicable y jurisdicción
                </h2>
                <p className="text-text-secondary leading-relaxed">
                  Estos términos se rigen por la legislación española. Para cualquier controversia, 
                  las partes se someten a los juzgados y tribunales de Madrid, renunciando expresamente 
                  a cualquier otro fuero que pudiera corresponderles.
                </p>
              </div>

              {/* Sección 8 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="RefreshCw" size={24} className="text-primary mr-3" />
                  8. Modificaciones
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  AdoptaEspaña se reserva el derecho a modificar estos términos y condiciones en cualquier momento. 
                  Los cambios serán notificados a través de la plataforma y entrarán en vigor inmediatamente.
                </p>
                <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                  <p className="text-accent-700 font-medium">
                    <strong>Última actualización:</strong> junio 2025
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