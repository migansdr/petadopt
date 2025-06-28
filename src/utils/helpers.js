import { VALIDATION_RULES, SPANISH_PROVINCES } from './constants';

// Date formatting utilities
export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options
  };
  
  return new Date(dateString).toLocaleDateString('es-ES', defaultOptions);
};

export const formatTimeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Hace menos de 1 hora';
  } else if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
  }
};

// Text utilities
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9 -]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim('-'); // Remove leading/trailing hyphens
};

// Validation utilities
export const validateEmail = (email) => {
  return VALIDATION_RULES.EMAIL.PATTERN.test(email);
};

export const validatePassword = (password) => {
  return password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH;
};

export const validatePetName = (name) => {
  const trimmedName = name.trim();
  return trimmedName.length >= VALIDATION_RULES.PET_NAME.MIN_LENGTH && 
         trimmedName.length <= VALIDATION_RULES.PET_NAME.MAX_LENGTH;
};

export const validateDescription = (description) => {
  const trimmedDescription = description.trim();
  return trimmedDescription.length >= VALIDATION_RULES.DESCRIPTION.MIN_LENGTH && 
         trimmedDescription.length <= VALIDATION_RULES.DESCRIPTION.MAX_LENGTH;
};

export const validateImageFile = (file) => {
  const errors = [];
  
  if (file.size > VALIDATION_RULES.IMAGE.MAX_SIZE) {
    errors.push('El archivo es demasiado grande (máximo 5MB)');
  }
  
  if (!VALIDATION_RULES.IMAGE.ALLOWED_TYPES.includes(file.type)) {
    errors.push('Formato de archivo no válido (solo JPG, PNG, WebP)');
  }
  
  return errors;
};

// Array utilities
export const removeDuplicates = (array, key) => {
  if (key) {
    return array.filter((item, index, self) => 
      index === self.findIndex(t => t[key] === item[key])
    );
  }
  return [...new Set(array)];
};

export const sortByProperty = (array, property, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[property];
    const bVal = b[property];
    
    if (direction === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
};

// Local storage utilities
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}":`, error);
    return false;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
    return false;
  }
};

// URL utilities
export const generateWhatsAppUrl = (phone, message) => {
  const cleanPhone = phone.replace(/\s+/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

export const generateEmailUrl = (email, subject, body) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
};

// Pet utilities
export const getSpeciesLabel = (species) => {
  const labels = {
    'Dog': 'Perro',
    'Cat': 'Gato',
    'Other': 'Otro'
  };
  return labels[species] || species;
};

export const getSizeLabel = (size) => {
  const labels = {
    'Small': 'Pequeño',
    'Medium': 'Mediano',
    'Large': 'Grande'
  };
  return labels[size] || size;
};

export const getAgeLabel = (age) => {
  const labels = {
    'Puppy': 'Cachorro',
    'Adult': 'Adulto',
    'Senior': 'Senior'
  };
  return labels[age] || age;
};

export const getStatusLabel = (status) => {
  const labels = {
    'active': 'Activo',
    'pending': 'Pendiente',
    'adopted': 'Adoptado'
  };
  return labels[status] || status;
};

// Form utilities
export const createFormData = (data, files = []) => {
  const formData = new FormData();
  
  // Add regular form fields
  Object.keys(data).forEach(key => {
    if (data[key] !== null && data[key] !== undefined) {
      if (typeof data[key] === 'object') {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    }
  });
  
  // Add files
  files.forEach((file, index) => {
    formData.append(`image_${index}`, file);
  });
  
  return formData;
};

// Error handling utilities
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  return 'Ha ocurrido un error inesperado';
};

// Number utilities
export const formatNumber = (num) => {
  return new Intl.NumberFormat('es-ES').format(num);
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Province utilities
export const isValidProvince = (province) => {
  return SPANISH_PROVINCES.includes(province);
};

export const normalizeProvinceName = (province) => {
  return SPANISH_PROVINCES.find(p => 
    p.toLowerCase() === province.toLowerCase()
  ) || province;
};