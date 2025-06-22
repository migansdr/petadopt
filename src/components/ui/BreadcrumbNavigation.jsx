import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbItems = () => {
    const path = location.pathname;
    const searchParams = new URLSearchParams(location.search);
    const isEdit = searchParams.get('edit') === 'true' || searchParams.get('id');

    switch (path) {
      case '/add-edit-pet-form':
        return [
          { label: 'Panel', path: '/shelter-dashboard', icon: 'LayoutDashboard' },
          { 
            label: isEdit ? 'Editar Mascota' : 'Añadir Mascota', 
            path: null, 
            icon: isEdit ? 'Edit' : 'Plus' 
          }
        ];
      default:
        return [];
    }
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems.length === 0) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6 animate-fade-in" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-text-muted mx-2" 
              />
            )}
            
            {item.path ? (
              <button
                onClick={() => handleNavigation(item.path)}
                className="flex items-center space-x-1.5 text-text-secondary hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded px-2 py-1"
              >
                <Icon name={item.icon} size={16} />
                <span className="font-medium">{item.label}</span>
              </button>
            ) : (
              <div className="flex items-center space-x-1.5 text-text-primary">
                <Icon name={item.icon} size={16} className="text-primary" />
                <span className="font-semibold">{item.label}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadcrumbNavigation;