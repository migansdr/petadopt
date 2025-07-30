import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthenticationLoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    shelterName: '',
    email: '',
    password: '',
    confirmPassword: '',
    location: '',
    phone: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const mockCredentials = {
    email: 'refugio@ejemplo.com',
    password: 'refugio123'
  };

  useEffect(() => {
    setFormData({
      shelterName: '', email: '', password: '', confirmPassword: '',
      location: '', phone: '', description: ''
    });
    setErrors({});
  }, [isLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin && !formData.shelterName.trim()) newErrors.shelterName = 'Shelter name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!isLogin && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

    if (isLogin) {
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/shelter-dashboard');
      } else {
        setErrors({ general: 'Invalid credentials' });
      }
    } else {
      // Mock registration success
      alert('Registration successful! Please log in.');
      setIsLogin(true);
    }
    setIsLoading(false);
  };

  const LoginForm = () => (
    <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
      <h2 className="text-[#0d151b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">Welcome back</h2>
      <div className="pb-3">
        <div className="flex border-b border-[#cfdde7] px-4 gap-8">
          <button onClick={() => setIsLogin(true)} className="flex flex-col items-center justify-center border-b-[3px] border-b-[#1287e7] text-[#0d151b] pb-[13px] pt-4">
            <p className="text-[#0d151b] text-sm font-bold leading-normal tracking-[0.015em]">Login</p>
          </button>
          <button onClick={() => setIsLogin(false)} className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-[#4c779a] pb-[13px] pt-4">
            <p className="text-[#4c779a] text-sm font-bold leading-normal tracking-[0.015em]">Register</p>
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {errors.general && <p className="text-red-500 px-4 py-2">{errors.general}</p>}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#0d151b] text-base font-medium leading-normal pb-2">Email</p>
            <input name="email" type="email" onChange={handleInputChange} placeholder="Enter your email" className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d151b] focus:outline-0 focus:ring-0 border ${errors.email ? 'border-red-500' : 'border-[#cfdde7]'} bg-slate-50 h-14 placeholder:text-[#4c779a] p-[15px] text-base font-normal leading-normal`} />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#0d151b] text-base font-medium leading-normal pb-2">Password</p>
            <input name="password" type="password" onChange={handleInputChange} placeholder="Enter your password" className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0d151b] focus:outline-0 focus:ring-0 border ${errors.password ? 'border-red-500' : 'border-[#cfdde7]'} bg-slate-50 h-14 placeholder:text-[#4c779a] p-[15px] text-base font-normal leading-normal`} />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </label>
        </div>
        <p className="text-[#4c779a] text-sm font-normal leading-normal pb-3 pt-1 px-4 underline cursor-pointer">Forgot Password?</p>
        <div className="flex px-4 py-3">
          <button type="submit" disabled={isLoading} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 bg-[#1287e7] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">{isLoading ? 'Logging in...' : 'Login'}</span>
          </button>
        </div>
        <p onClick={() => setIsLogin(false)} className="text-[#4c779a] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline cursor-pointer">Don't have an account? Register</p>
      </form>
    </div>
  );

  const RegisterForm = () => (
    <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
        <h2 className="text-[#0e151b] tracking-light text-[28px] font-bold leading-tight px-4 text-left pb-3 pt-5">Register your shelter</h2>
        <form onSubmit={handleSubmit}>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e151b] text-base font-medium leading-normal pb-2">Shelter Name</p>
                <input name="shelterName" onChange={handleInputChange} placeholder="Enter your shelter's name" className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e151b] focus:outline-0 focus:ring-0 border ${errors.shelterName ? 'border-red-500' : 'border-[#d0dce7]'} bg-slate-50 h-14 placeholder:text-[#4e7697] p-[15px] text-base font-normal leading-normal`} />
                {errors.shelterName && <p className="text-red-500 text-sm mt-1">{errors.shelterName}</p>}
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e151b] text-base font-medium leading-normal pb-2">Contact Email</p>
                <input name="email" type="email" onChange={handleInputChange} placeholder="Enter your contact email" className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e151b] focus:outline-0 focus:ring-0 border ${errors.email ? 'border-red-500' : 'border-[#d0dce7]'} bg-slate-50 h-14 placeholder:text-[#4e7697] p-[15px] text-base font-normal leading-normal`} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </label>
            </div>
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e151b] text-base font-medium leading-normal pb-2">Password</p>
                <input name="password" type="password" onChange={handleInputChange} placeholder="Create a password" className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e151b] focus:outline-0 focus:ring-0 border ${errors.password ? 'border-red-500' : 'border-[#d0dce7]'} bg-slate-50 h-14 placeholder:text-[#4e7697] p-[15px] text-base font-normal leading-normal`} />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </label>
            </div>
             <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-[#0e151b] text-base font-medium leading-normal pb-2">Confirm Password</p>
                <input name="confirmPassword" type="password" onChange={handleInputChange} placeholder="Confirm your password" className={`form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e151b] focus:outline-0 focus:ring-0 border ${errors.confirmPassword ? 'border-red-500' : 'border-[#d0dce7]'} bg-slate-50 h-14 placeholder:text-[#4e7697] p-[15px] text-base font-normal leading-normal`} />
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </label>
            </div>
            <div className="flex justify-stretch">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 justify-end">
                <button type="button" onClick={() => setIsLogin(true)} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#e7eef3] text-[#0e151b] text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">Back to Login</span>
                </button>
                <button type="submit" disabled={isLoading} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1989e5] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="truncate">{isLoading ? 'Registering...' : 'Register'}</span>
                </button>
              </div>
            </div>
        </form>
    </div>
  );

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden" style={{fontFamily: 'Inter, "Noto Sans", sans-serif'}}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7eef3] px-10 py-3">
            <div onClick={() => navigate('/')} className="flex items-center gap-4 text-[#0d151b] cursor-pointer">
              <div className="size-4">
                  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_6_319)"><path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path></g>
                      <defs><clipPath id="clip0_6_319"><rect width="48" height="48" fill="white"></rect></clipPath></defs>
                  </svg>
              </div>
              <h2 className="text-[#0d151b] text-lg font-bold leading-tight tracking-[-0.015em]">AdoptaEspaña</h2>
            </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
            {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLoginRegister;