import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const AdaptiveHeader = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProfessional, setIsProfessional] = useState(false);
  const [shelterInfo, setShelterInfo] = useState(null);
  const [professionalInfo, setProfessionalInfo] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const professionalStatus = localStorage.getItem('isProfessional') === 'true';
    const shelter = JSON.parse(localStorage.getItem('shelterInfo') || 'null');
    const professional = JSON.parse(localStorage.getItem('professionalInfo') || 'null');
    
    setIsAuthenticated(authStatus);
    setIsProfessional(professionalStatus);
    setShelterInfo(shelter);
    setProfessionalInfo(professional);
  }, [location]);

  const handleLogin = () => {
    navigate('/authentication-login-register');
    setIsMobileMenuOpen(false);
  };

  const handleProfessionalLogin = () => {
    navigate('/professional-login');
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (isProfessional) {
      localStorage.removeItem('isProfessional');
      localStorage.removeItem('professionalInfo');
      setIsProfessional(false);
      setProfessionalInfo(null);
      navigate('/professionals');
    } else {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('shelterInfo');
      setIsAuthenticated(false);
      setShelterInfo(null);
      navigate('/public-pet-adoption-homepage');
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (isProfessional) {
      navigate('/professional-panel');
    } else if (isAuthenticated) {
      navigate('/shelter-dashboard');
    } else {
      navigate('/public-pet-adoption-homepage');
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getDisplayName = (name, isMobile = false) => {
    if (!name) return '';
    if (isMobile && name.length > 15) {
      return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 3);
    }
    return isMobile && name.length > 20 ? name.substring(0, 17) + '...' : name;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 text-primary hover:text-primary-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-lg p-1"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-text-primary">
                AdoptaEspaña
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAuthenticated && !isProfessional ? (
              <>
                <button
                  onClick={() => navigate('/professionals')}
                  className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200"
                >
                  <Icon name="Stethoscope" size={18} />
                  <span>Profesionales</span>
                </button>
                
                <button
                  onClick={handleLogin}
                  className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200"
                >
                  <Icon name="LogIn" size={18} />
                  <span>Refugios</span>
                </button>

                <button
                  onClick={handleProfessionalLogin}
                  className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-secondary-50 transition-all duration-200"
                >
                  <Icon name="User" size={18} />
                  <span>Profesionales</span>
                </button>
              </>
            ) : isProfessional ? (
              <div className="flex items-center space-x-4">
                {/* Professional Info */}
                <div className="flex items-center space-x-3 px-3 py-2 bg-surface rounded-lg">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="Stethoscope" size={16} color="white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">
                      {getDisplayName(professionalInfo?.name || 'Profesional')}
                    </span>
                    <span className="text-xs text-text-secondary">Profesional</span>
                  </div>
                </div>

                {/* Dashboard Link */}
                <button
                  onClick={() => handleNavigation('/professional-panel')}
                  className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-surface transition-all duration-200 ${
                    location.pathname === '/professional-panel' ? 'nav-link-active bg-secondary-50' : ''
                  }`}
                >
                  <Icon name="LayoutDashboard" size={18} />
                  <span>Panel</span>
                </button>

                {/* Directory Link */}
                <button
                  onClick={() => handleNavigation('/professionals')}
                  className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-surface transition-all duration-200"
                >
                  <Icon name="Search" size={18} />
                  <span>Directorio</span>
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-error-light hover:text-error transition-all duration-200"
                >
                  <Icon name="LogOut" size={18} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Shelter Info */}
                <div className="flex items-center space-x-3 px-3 py-2 bg-surface rounded-lg">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Building2" size={16} color="white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-primary">
                      {getDisplayName(shelterInfo?.name || 'Refugio')}
                    </span>
                    <span className="text-xs text-text-secondary">Refugio</span>
                  </div>
                </div>

                {/* Dashboard Link */}
                <button
                  onClick={() => handleNavigation('/shelter-dashboard')}
                  className={`nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-surface transition-all duration-200 ${
                    location.pathname === '/shelter-dashboard' ? 'nav-link-active bg-primary-50' : ''
                  }`}
                >
                  <Icon name="LayoutDashboard" size={18} />
                  <span>Panel</span>
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="nav-link flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-error-light hover:text-error transition-all duration-200"
                >
                  <Icon name="LogOut" size={18} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-surface transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border-light bg-background animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!isAuthenticated && !isProfessional ? (
                <>
                  <button
                    onClick={() => handleNavigation('/professionals')}
                    className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-text-secondary hover:text-primary hover:bg-surface transition-all duration-200"
                  >
                    <Icon name="Stethoscope" size={20} />
                    <span className="font-medium">Profesionales</span>
                  </button>

                  <button
                    onClick={handleLogin}
                    className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-text-secondary hover:text-primary hover:bg-surface transition-all duration-200"
                  >
                    <Icon name="LogIn" size={20} />
                    <span className="font-medium">Iniciar Sesión - Refugios</span>
                  </button>

                  <button
                    onClick={handleProfessionalLogin}
                    className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-text-secondary hover:text-secondary hover:bg-surface transition-all duration-200"
                  >
                    <Icon name="User" size={20} />
                    <span className="font-medium">Iniciar Sesión - Profesionales</span>
                  </button>
                </>
              ) : isProfessional ? (
                <div className="space-y-2">
                  {/* Mobile Professional Info */}
                  <div className="flex items-center space-x-3 px-3 py-3 bg-surface rounded-lg">
                    <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                      <Icon name="Stethoscope" size={18} color="white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">
                        {getDisplayName(professionalInfo?.name || 'Profesional', true)}
                      </span>
                      <span className="text-sm text-text-secondary">Profesional</span>
                    </div>
                  </div>

                  {/* Mobile Dashboard Link */}
                  <button
                    onClick={() => handleNavigation('/professional-panel')}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      location.pathname === '/professional-panel' ? 'nav-link-active bg-secondary-50 text-secondary' : 'text-text-secondary hover:text-secondary hover:bg-surface'
                    }`}
                  >
                    <Icon name="LayoutDashboard" size={20} />
                    <span className="font-medium">Panel de Control</span>
                  </button>

                  {/* Mobile Directory Link */}
                  <button
                    onClick={() => handleNavigation('/professionals')}
                    className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-text-secondary hover:text-secondary hover:bg-surface transition-all duration-200"
                  >
                    <Icon name="Search" size={20} />
                    <span className="font-medium">Directorio</span>
                  </button>

                  {/* Mobile Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-text-secondary hover:text-error hover:bg-error-light transition-all duration-200"
                  >
                    <Icon name="LogOut" size={20} />
                    <span className="font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Mobile Shelter Info */}
                  <div className="flex items-center space-x-3 px-3 py-3 bg-surface rounded-lg">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Building2" size={18} color="white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-text-primary">
                        {getDisplayName(shelterInfo?.name || 'Refugio', true)}
                      </span>
                      <span className="text-sm text-text-secondary">Refugio</span>
                    </div>
                  </div>

                  {/* Mobile Dashboard Link */}
                  <button
                    onClick={() => handleNavigation('/shelter-dashboard')}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                      location.pathname === '/shelter-dashboard' ? 'nav-link-active bg-primary-50 text-primary' : 'text-text-secondary hover:text-primary hover:bg-surface'
                    }`}
                  >
                    <Icon name="LayoutDashboard" size={20} />
                    <span className="font-medium">Panel de Control</span>
                  </button>

                  {/* Mobile Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-text-secondary hover:text-error hover:bg-error-light transition-all duration-200"
                  >
                    <Icon name="LogOut" size={20} />
                    <span className="font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdaptiveHeader;