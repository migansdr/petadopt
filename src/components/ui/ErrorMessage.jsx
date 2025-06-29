import React from 'react';
import Icon from '../AppIcon';

const ErrorMessage = ({ message, type = 'error', onDismiss, className = '' }) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-warning-light',
          border: 'border-warning',
          text: 'text-warning',
          icon: 'AlertTriangle'
        };
      case 'info':
        return {
          bg: 'bg-primary-100',
          border: 'border-primary',
          text: 'text-primary',
          icon: 'Info'
        };
      case 'success':
        return {
          bg: 'bg-success-light',
          border: 'border-success',
          text: 'text-success',
          icon: 'CheckCircle'
        };
      default:
        return {
          bg: 'bg-error-light',
          border: 'border-error',
          text: 'text-error',
          icon: 'AlertCircle'
        };
    }
  };

  const styles = getTypeStyles();

  if (!message) return null;

  return (
    <div className={`p-4 ${styles.bg} border ${styles.border} rounded-lg flex items-start space-x-3 animate-fade-in ${className}`}>
      <Icon name={styles.icon} size={20} className={`${styles.text} flex-shrink-0 mt-0.5`} />
      <div className="flex-1">
        <p className={`${styles.text} font-medium text-sm`}>
          {message}
        </p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`${styles.text} hover:opacity-70 transition-opacity duration-200 flex-shrink-0`}
        >
          <Icon name="X" size={16} />
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;