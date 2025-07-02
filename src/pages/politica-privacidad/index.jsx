import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';

const PoliticaPrivacidad = () => {
  const navigate = useNavigate();
  const [showRightsForm, setShowRightsForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rightType: '',
    description: '',
    acceptTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitRightsForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // En producción, aquí se enviaría a la API
      console.log('Solicitud de derechos enviada:', formData);
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        rightType: '',
        description: '',
        acceptTerms: false
      });
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      alert('Error al enviar la solicitud. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const rightsOptions = [
    { value: 'access', label: 'Acceso a mis datos' },
    { value: 'rectification', label: 'Rectificación de datos incorrectos' },
    { value: 'deletion', label: 'Supresión de mis datos' },
    { value: 'limitation', label: 'Limitación del tratamiento' },
    { value: 'opposition', label: 'Oposición al tratamiento' },
    { value: 'portability', label: 'Portabilidad de datos' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdaptiveHeader />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
                Política de Privacidad
              </h1>
              <p className="text-lg text-text-secondary">
                Información sobre el tratamiento de datos personales en AdoptaEspaña
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
                      <strong>Esta política de privacidad es un documento de demostración.</strong> 
                      Antes de implementar en producción, es <strong>obligatorio consultar con un abogado especializado 
                      en protección de datos</strong> para asegurar el cumplimiento del RGPD y la legislación española vigente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sección 1 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Building2" size={24} className="text-primary mr-3" />
                  1. ¿Quién es el responsable del tratamiento de tus datos?
                </h2>
                <div className="bg-background rounded-lg p-6 border border-border-light">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong className="text-text-primary">Nombre del responsable:</strong>
                      <p className="text-text-secondary">AdoptaEspaña</p>
                    </div>
                    <div>
                      <strong className="text-text-primary">CIF/NIF:</strong>
                      <p className="text-text-secondary">[Pendiente de asignación]</p>
                    </div>
                    <div>
                      <strong className="text-text-primary">Domicilio social:</strong>
                      <p className="text-text-secondary">Calle Esperanza 123, 28001 Madrid, España</p>
                    </div>
                    <div>
                      <strong className="text-text-primary">Correo electrónico:</strong>
                      <p className="text-text-secondary">info@adoptaespana.com</p>
                    </div>
                    <div className="md:col-span-2">
                      <strong className="text-text-primary">Delegado de Protección de Datos (DPO):</strong>
                      <p className="text-text-secondary">dpo@adoptaespana.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 2 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Database" size={24} className="text-primary mr-3" />
                  2. ¿Qué datos personales recogemos y con qué finalidad?
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Dependiendo del uso de la web, recogemos los siguientes tipos de datos:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border-light rounded-lg">
                    <thead>
                      <tr className="bg-primary-50">
                        <th className="border border-border-light p-4 text-left font-heading font-semibold text-text-primary">
                          Tipo de dato
                        </th>
                        <th className="border border-border-light p-4 text-left font-heading font-semibold text-text-primary">
                          Finalidad
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border-light p-4 font-medium text-text-primary">
                          Datos identificativos
                        </td>
                        <td className="border border-border-light p-4 text-text-secondary">
                          Gestión de solicitudes de adopción, contacto, formularios web
                        </td>
                      </tr>
                      <tr className="bg-surface">
                        <td className="border border-border-light p-4 font-medium text-text-primary">
                          Datos de contacto (email, teléfono)
                        </td>
                        <td className="border border-border-light p-4 text-text-secondary">
                          Comunicaciones informativas, atención al usuario, procesos de adopción
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-border-light p-4 font-medium text-text-primary">
                          Datos de navegación (cookies)
                        </td>
                        <td className="border border-border-light p-4 text-text-secondary">
                          Análisis estadístico y mejora de la experiencia de usuario (ver Política de Cookies)
                        </td>
                      </tr>
                      <tr className="bg-surface">
                        <td className="border border-border-light p-4 font-medium text-text-primary">
                          Preferencias y afinidades con animales
                        </td>
                        <td className="border border-border-light p-4 text-text-secondary">
                          Personalización de la búsqueda de animales y adopción responsable
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sección 3 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Scale" size={24} className="text-primary mr-3" />
                  3. ¿Cuál es la base legal para el tratamiento?
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Tratamos tus datos personales conforme a las siguientes bases legales:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-4 bg-background rounded-lg border border-border-light">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                    <div>
                      <strong className="text-text-primary">Consentimiento explícito del usuario</strong>
                      <span className="text-text-secondary block text-sm">(formularios, suscripciones, cookies).</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-background rounded-lg border border-border-light">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                    <div>
                      <strong className="text-text-primary">Ejecución de un contrato o medidas precontractuales</strong>
                      <span className="text-text-secondary block text-sm">(en procesos de adopción o colaboración).</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-background rounded-lg border border-border-light">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                    <div>
                      <strong className="text-text-primary">Interés legítimo del responsable del tratamiento</strong>
                      <span className="text-text-secondary block text-sm">(mejora de la calidad del servicio, seguridad).</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-background rounded-lg border border-border-light">
                    <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                    <div>
                      <strong className="text-text-primary">Cumplimiento de obligaciones legales</strong>
                      <span className="text-text-secondary block text-sm">(fiscales, administrativas, sanitarias si aplica).</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 4 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Clock" size={24} className="text-primary mr-3" />
                  4. ¿Durante cuánto tiempo conservamos tus datos?
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 bg-background rounded-lg border border-border-light">
                    <Icon name="Mail" size={20} className="text-secondary mt-0.5" />
                    <div>
                      <strong className="text-text-primary">Datos de contacto:</strong>
                      <span className="text-text-secondary block text-sm">hasta que el usuario solicite su eliminación o hasta un máximo de 5 años desde la última interacción.</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-background rounded-lg border border-border-light">
                    <Icon name="Heart" size={20} className="text-accent mt-0.5" />
                    <div>
                      <strong className="text-text-primary">Datos de adopción:</strong>
                      <span className="text-text-secondary block text-sm">el tiempo necesario para cumplir obligaciones legales o contractuales (mínimo 6 años, según legislación aplicable).</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-background rounded-lg border border-border-light">
                    <Icon name="Cookie" size={20} className="text-warning mt-0.5" />
                    <div>
                      <strong className="text-text-primary">Cookies:</strong>
                      <span className="text-text-secondary block text-sm">según su naturaleza (ver Política de Cookies), máximo 24 meses.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 5 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Share2" size={24} className="text-primary mr-3" />
                  5. ¿A quién comunicamos tus datos?
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Solo se cederán tus datos a terceros en los siguientes supuestos:
                </p>
                <div className="space-y-4">
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <div className="flex items-start space-x-3">
                      <Icon name="Users" size={20} className="text-secondary mt-0.5" />
                      <div>
                        <strong className="text-text-primary">Entidades colaboradoras</strong>
                        <p className="text-text-secondary text-sm mt-1">
                          (protectoras, veterinarios, acogidas), en procesos de adopción con tu consentimiento.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <div className="flex items-start space-x-3">
                      <Icon name="Server" size={20} className="text-accent mt-0.5" />
                      <div>
                        <strong className="text-text-primary">Encargados del tratamiento</strong>
                        <p className="text-text-secondary text-sm mt-1">
                          (empresas de alojamiento web, plataformas CRM, herramientas de analítica), bajo contrato legal.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <div className="flex items-start space-x-3">
                      <Icon name="Building" size={20} className="text-warning mt-0.5" />
                      <div>
                        <strong className="text-text-primary">Administraciones públicas</strong>
                        <p className="text-text-secondary text-sm mt-1">
                          en cumplimiento de obligaciones legales.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <p className="text-primary-700 text-sm">
                    <strong>Importante:</strong> No realizamos transferencias internacionales de datos, salvo que se indique expresamente y con las garantías adecuadas.
                  </p>
                </div>
              </div>

              {/* Sección 6 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="UserCheck" size={24} className="text-primary mr-3" />
                  6. ¿Cuáles son tus derechos?
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Puedes ejercer los siguientes derechos en cualquier momento:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="Eye" size={18} className="text-primary" />
                      <strong className="text-text-primary">Acceso</strong>
                    </div>
                    <p className="text-text-secondary text-sm">conocer qué datos tuyos tratamos.</p>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="Edit" size={18} className="text-secondary" />
                      <strong className="text-text-primary">Rectificación</strong>
                    </div>
                    <p className="text-text-secondary text-sm">corregir datos inexactos.</p>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="Trash2" size={18} className="text-error" />
                      <strong className="text-text-primary">Supresión</strong>
                    </div>
                    <p className="text-text-secondary text-sm">eliminar tus datos cuando ya no sean necesarios.</p>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="Pause" size={18} className="text-warning" />
                      <strong className="text-text-primary">Limitación</strong>
                    </div>
                    <p className="text-text-secondary text-sm">del tratamiento.</p>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="X" size={18} className="text-error" />
                      <strong className="text-text-primary">Oposición</strong>
                    </div>
                    <p className="text-text-secondary text-sm">al tratamiento.</p>
                  </div>
                  <div className="bg-background rounded-lg p-4 border border-border-light">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="Download" size={18} className="text-accent" />
                      <strong className="text-text-primary">Portabilidad</strong>
                    </div>
                    <p className="text-text-secondary text-sm">de los datos.</p>
                  </div>
                </div>

                <div className="bg-accent-50 rounded-lg p-6 border border-accent-200">
                  <h4 className="font-heading font-semibold text-accent-700 mb-3 flex items-center">
                    <Icon name="Mail" size={20} className="mr-2" />
                    ¿Cómo ejercer tus derechos?
                  </h4>
                  <p className="text-accent-600 mb-3">
                    Puedes ejercerlos de las siguientes formas:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-accent-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Mail" size={16} className="text-accent" />
                        <strong className="text-accent-700">Email:</strong>
                        <span className="text-accent-700">info@adoptaespana.com</span>
                      </div>
                      <p className="text-accent-600 text-sm">
                        (adjuntando DNI o documento acreditativo)
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-accent-200">
                      <button
                        onClick={() => setShowRightsForm(true)}
                        className="flex items-center space-x-2 text-accent hover:text-accent-600 font-medium"
                      >
                        <Icon name="FileText" size={16} />
                        <span>Usar formulario online</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-accent-600 text-sm mt-3">
                    También puedes reclamar ante la <strong>Agencia Española de Protección de Datos (AEPD)</strong> si consideras que no hemos tratado adecuadamente tus datos.
                  </p>
                </div>
              </div>

              {/* Sección 7 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="Shield" size={24} className="text-primary mr-3" />
                  7. Seguridad y confidencialidad
                </h2>
                <div className="bg-background rounded-lg p-6 border border-border-light">
                  <p className="text-text-secondary leading-relaxed">
                    Aplicamos las medidas técnicas y organizativas necesarias para garantizar la confidencialidad, 
                    integridad y disponibilidad de los datos personales, evitando accesos no autorizados, pérdidas o alteraciones.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="text-center">
                      <Icon name="Lock" size={24} className="text-success mx-auto mb-2" />
                      <div className="text-sm font-medium text-text-primary">Cifrado SSL</div>
                      <div className="text-xs text-text-secondary">Conexiones seguras</div>
                    </div>
                    <div className="text-center">
                      <Icon name="Database" size={24} className="text-secondary mx-auto mb-2" />
                      <div className="text-sm font-medium text-text-primary">Backups seguros</div>
                      <div className="text-xs text-text-secondary">Copias de seguridad</div>
                    </div>
                    <div className="text-center">
                      <Icon name="UserCheck" size={24} className="text-accent mx-auto mb-2" />
                      <div className="text-sm font-medium text-text-primary">Acceso controlado</div>
                      <div className="text-xs text-text-secondary">Personal autorizado</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 8 */}
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 flex items-center">
                  <Icon name="RefreshCw" size={24} className="text-primary mr-3" />
                  8. Cambios en la política de privacidad
                </h2>
                <p className="text-text-secondary leading-relaxed mb-4">
                  Nos reservamos el derecho a modificar esta política para adaptarla a novedades legislativas o jurisprudenciales. 
                  Se notificará cualquier cambio relevante mediante la web o por email si procede.
                </p>
                <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                  <p className="text-accent-700 font-medium">
                    <strong>Última actualización:</strong> 15 de enero de 2025
                  </p>
                  <p className="text-accent-600 text-sm mt-1">
                    <strong>Próxima revisión programada:</strong> 15 de enero de 2026
                  </p>
                </div>
              </div>

              {/* Enlaces relacionados */}
              <div className="mb-8 bg-primary-50 rounded-lg p-6 border border-primary-200">
                <h3 className="font-heading font-semibold text-primary mb-4">
                  Documentos relacionados
                </h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => window.open('/politica-cookies', '_blank')}
                    className="flex items-center space-x-2 text-primary hover:text-primary-600 transition-colors duration-200"
                  >
                    <Icon name="Cookie" size={16} />
                    <span>Política de Cookies</span>
                    <Icon name="ExternalLink" size={14} />
                  </button>
                  <button
                    onClick={() => window.open('/terminos-condiciones', '_blank')}
                    className="flex items-center space-x-2 text-primary hover:text-primary-600 transition-colors duration-200"
                  >
                    <Icon name="FileText" size={16} />
                    <span>Términos y Condiciones</span>
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

      {/* Formulario de Ejercicio de Derechos */}
      {showRightsForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl">
            {/* Header */}
            <div className="bg-primary text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-heading font-bold mb-2">
                    Ejercicio de Derechos RGPD
                  </h2>
                  <p className="text-primary-100 text-sm">
                    Solicita el ejercicio de tus derechos de protección de datos
                  </p>
                </div>
                <button
                  onClick={() => setShowRightsForm(false)}
                  className="p-2 hover:bg-primary-600 rounded-lg transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-success-light rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-success" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-text-primary mb-2">
                    Solicitud enviada correctamente
                  </h3>
                  <p className="text-text-secondary mb-6">
                    Hemos recibido tu solicitud. Te responderemos en un plazo máximo de 30 días naturales.
                  </p>
                  <button
                    onClick={() => {
                      setShowRightsForm(false);
                      setSubmitSuccess(false);
                    }}
                    className="btn-primary"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitRightsForm} className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                      placeholder="tu@email.com"
                    />
                  </div>

                  {/* Tipo de derecho */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Derecho que deseas ejercer *
                    </label>
                    <select
                      name="rightType"
                      value={formData.rightType}
                      onChange={handleInputChange}
                      required
                      className="input-field"
                    >
                      <option value="">Selecciona un derecho</option>
                      {rightsOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Descripción */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Descripción de la solicitud
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Describe tu solicitud con el mayor detalle posible..."
                    />
                  </div>

                  {/* Términos */}
                  <div>
                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleInputChange}
                        required
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary-300 mt-1"
                      />
                      <span className="text-sm text-text-secondary">
                        Declaro que la información proporcionada es veraz y autorizo el tratamiento de mis datos 
                        para tramitar esta solicitud de ejercicio de derechos RGPD. *
                      </span>
                    </label>
                  </div>

                  {/* Info adicional */}
                  <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                    <div className="flex items-start space-x-3">
                      <Icon name="Info" size={16} className="text-accent mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-accent-700 mb-1">Información importante</p>
                        <ul className="text-accent-600 space-y-1">
                          <li>• Responderemos en un plazo máximo de 30 días naturales</li>
                          <li>• Podemos solicitar documentación adicional para verificar tu identidad</li>
                          <li>• El ejercicio de estos derechos es gratuito</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex space-x-3 justify-end pt-4 border-t border-border-light">
                    <button
                      type="button"
                      onClick={() => setShowRightsForm(false)}
                      className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-surface transition-colors duration-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.acceptTerms}
                      className="btn-primary flex items-center space-x-2 min-w-[120px] justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Enviando...</span>
                        </>
                      ) : (
                        <>
                          <Icon name="Send" size={16} />
                          <span>Enviar solicitud</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliticaPrivacidad;