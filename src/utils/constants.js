// Application constants
export const APP_CONFIG = {
  name: 'AdoptaEspaña',
  description: 'Plataforma de adopción de mascotas en España',
  version: '1.0.0',
  author: 'AdoptaEspaña Team',
  contact: {
    email: 'info@adoptaespana.com',
    phone: '+34 900 123 456'
  }
};

// Pet related constants
export const PET_SPECIES = {
  DOG: 'Dog',
  CAT: 'Cat',
  OTHER: 'Other'
};

export const PET_SIZES = {
  SMALL: 'Small',
  MEDIUM: 'Medium',
  LARGE: 'Large'
};

export const PET_AGES = {
  PUPPY: 'Puppy',
  ADULT: 'Adult',
  SENIOR: 'Senior'
};

export const PET_STATUS = {
  ACTIVE: 'active',
  PENDING: 'pending',
  ADOPTED: 'adopted'
};

// Spanish provinces
export const SPANISH_PROVINCES = [
  'A Coruña', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz',
  'Baleares', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real',
  'Córdoba', 'Cuenca', 'Girona', 'Granada', 'Guadalajara', 'Gipuzkoa', 'Huelva', 'Huesca',
  'Jaén', 'La Rioja', 'Las Palmas', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Murcia',
  'Navarra', 'Ourense', 'Palencia', 'Pontevedra', 'Salamanca', 'Santa Cruz de Tenerife',
  'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid',
  'Vizcaya', 'Zamora', 'Zaragoza'
];

// Form validation
export const VALIDATION_RULES = {
  PET_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50
  },
  DESCRIPTION: {
    MIN_LENGTH: 50,
    MAX_LENGTH: 1000
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 6
  },
  IMAGE: {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    MAX_COUNT: 6
  }
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'isAuthenticated',
  SHELTER_INFO: 'shelterInfo',
  PET_DRAFTS: 'petDrafts',
  PUBLISHED_PETS: 'publishedPets'
};

// API endpoints (for future backend integration)
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout'
  },
  PETS: {
    LIST: '/api/pets',
    CREATE: '/api/pets',
    UPDATE: '/api/pets/:id',
    DELETE: '/api/pets/:id'
  },
  SHELTERS: {
    PROFILE: '/api/shelters/profile',
    UPDATE: '/api/shelters/profile'
  }
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK: 'Error de conexión. Por favor, inténtalo de nuevo.',
  UNAUTHORIZED: 'No tienes permisos para realizar esta acción.',
  NOT_FOUND: 'El recurso solicitado no fue encontrado.',
  VALIDATION: 'Por favor, revisa los datos introducidos.',
  GENERIC: 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  PET_CREATED: 'Mascota creada exitosamente',
  PET_UPDATED: 'Mascota actualizada exitosamente',
  PET_DELETED: 'Mascota eliminada exitosamente',
  DRAFT_SAVED: 'Borrador guardado correctamente',
  LOGIN_SUCCESS: 'Inicio de sesión exitoso',
  REGISTER_SUCCESS: 'Registro exitoso'
};