import React from 'react';
import Icon from '../AppIcon';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = '¿Estás seguro?',
  message = 'Esta acción no se puede deshacer.',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'danger' // 'danger', 'warning', 'info'
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'AlertTriangle',
          iconColor: 'text-error',
          iconBg: 'bg-error-light',
          confirmBtn: 'bg-error hover:bg-error-600 text-white'
        };
      case 'warning':
        return {
          icon: 'AlertCircle',
          iconColor: 'text-warning',
          iconBg: 'bg-warning-light',
          confirmBtn: 'bg-warning hover:bg-warning-600 text-white'
        };
      default:
        return {
          icon: 'Info',
          iconColor: 'text-primary',
          iconBg: 'bg-primary-100',
          confirmBtn: 'bg-primary hover:bg-primary-600 text-white'
        };
    }
  };

  const styles = getTypeStyles();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-background rounded-xl p-6 max-w-md w-full shadow-xl animate-fade-in">
        <div className="flex items-start space-x-4 mb-6">
          <div className={`w-12 h-12 rounded-full ${styles.iconBg} flex items-center justify-center flex-shrink-0`}>
            <Icon name={styles.icon} size={24} className={styles.iconColor} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
              {title}
            </h3>
            <p className="text-text-secondary">
              {message}
            </p>
          </div>
        </div>

        <div className="flex space-x-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border text-text-secondary rounded-lg hover:bg-surface transition-colors duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${styles.confirmBtn}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;