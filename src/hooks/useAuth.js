import { useState, useEffect, useContext, createContext } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../utils/constants';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(STORAGE_KEYS.AUTH_TOKEN, false);
  const [shelterInfo, setShelterInfo] = useLocalStorage(STORAGE_KEYS.SHELTER_INFO, null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = async () => {
      try {
        // In a real app, you would validate the token with your backend
        await new Promise(resolve => setTimeout(resolve, 500));
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      const mockCredentials = {
        email: 'refugio@ejemplo.com',
        password: 'refugio123'
      };

      if (credentials.email === mockCredentials.email && 
          credentials.password === mockCredentials.password) {
        
        const mockShelterInfo = {
          id: 'shelter_001',
          name: 'Refugio Esperanza',
          email: credentials.email
        };

        setIsAuthenticated(true);
        setShelterInfo(mockShelterInfo);
        
        return { success: true };
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Error de autenticación' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock registration success
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Error en el registro' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setShelterInfo(null);
  };

  const updateShelterInfo = (newInfo) => {
    setShelterInfo(prev => ({ ...prev, ...newInfo }));
  };

  const value = {
    isAuthenticated,
    shelterInfo,
    isLoading,
    login,
    register,
    logout,
    updateShelterInfo
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};