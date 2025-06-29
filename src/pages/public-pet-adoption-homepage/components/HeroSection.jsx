import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary"></div>
        <div className="absolute top-32 right-20 w-16 h-16 rounded-full bg-secondary"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 rounded-full bg-accent"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 rounded-full bg-primary"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6 leading-tight">
              Adopta una mascota{' '}
              <span className="text-primary">cerca de ti</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0">
              Encuentra tu compañero perfecto entre miles de mascotas que buscan un hogar amoroso en toda España.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => {
                  const statsSection = document.getElementById('stats-section');
                  if (statsSection) {
                    statsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="btn-outline flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <Icon name="Heart" size={20} />
                <span>Conoce Más</span>
              </button>
            </div>

            {/* Stats */}
            <div id="stats-section" className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border-light">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-1">
                  500+
                </div>
                <div className="text-sm text-text-secondary">
                  Mascotas Adoptadas
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-secondary mb-1">
                  50+
                </div>
                <div className="text-sm text-text-secondary">
                  Refugios Activos
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-heading font-bold text-accent mb-1">
                  17
                </div>
                <div className="text-sm text-text-secondary">
                  Provincias
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop"
                alt="Perro y gato juntos esperando adopción"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-md p-4 animate-gentle-bounce">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} color="white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">Verificado</div>
                  <div className="text-xs text-text-secondary">Refugio oficial</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-md p-4 animate-gentle-bounce" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Heart" size={16} color="white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-text-primary">Adopción</div>
                  <div className="text-xs text-text-secondary">Gratuita</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;