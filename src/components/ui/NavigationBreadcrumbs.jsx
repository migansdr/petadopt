import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const NavigationBreadcrumbs = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    
    const breadcrumbs = [
      { label: 'Inicio', path: '/', icon: 'Home' }
    ];

    if (path.startsWith('/pet/')) {
      breadcrumbs.push(
        { label: 'Mascotas', path: '/', icon: 'Heart' },
        { label: 'Detalle', path: null, icon: 'Eye' }
      );
    } else if (path.startsWith('/professional/')) {
      breadcrumbs.push(
        { label: 'Profesionales', path: '/professionals', icon: 'Stethoscope' },
        { label: 'Detalle', path: null, icon: 'Eye' }
      );
    } else if (path === '/professionals') {
      breadcrumbs.push(
        { label: 'Profesionales', path: null, icon: 'Stethoscope' }
      );
    } else if (path === '/compare') {
      const type = searchParams.get('type');
      if (type === 'pets') {
        breadcrumbs.push(
          { label: 'Mascotas', path: '/', icon: 'Heart' },
          { label: 'Comparar', path: null, icon: 'GitCompare' }
        );
      } else {
        breadcrumbs.push(
          { label: 'Profesionales', path: '/professionals', icon: 'Stethoscope' },
          { label: 'Comparar', path: null, icon: 'GitCompare' }
        );
      }
    } else if (path === '/adopter-panel') {
      breadcrumbs.push(
        { label: 'Mi Panel', path: null, icon: 'User' }
      );
    } else if (path === '/shelter-dashboard') {
      breadcrumbs.push(
        { label: 'Panel Refugio', path: null, icon: 'LayoutDashboard' }
      );
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="bg-surface border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-text-muted mx-2" 
                />
              )}
              
              {crumb.path ? (
                <button
                  onClick={() => navigate(crumb.path)}
                  className="flex items-center space-x-1.5 text-text-secondary hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded px-2 py-1"
                >
                  <Icon name={crumb.icon} size={16} />
                  <span className="font-medium">{crumb.label}</span>
                </button>
              ) : (
                <div className="flex items-center space-x-1.5 text-text-primary">
                  <Icon name={crumb.icon} size={16} className="text-primary" />
                  <span className="font-semibold">{crumb.label}</span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default NavigationBreadcrumbs;