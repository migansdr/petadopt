import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { mockPets } from 'utils/mockData';

const PublicPetAdoptionHomepage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    species: '',
    age: '',
    size: '',
    province: '',
    breed: '',
    healthStatus: '',
    gender: '',
    sterilized: '',
    tags: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 9; // Adjusted to better fit the new design's grid

  const filteredPets = useMemo(() => {
    let filtered = mockPets;
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(pet =>
        pet.name.toLowerCase().includes(searchTerm) ||
        pet.breed.toLowerCase().includes(searchTerm) ||
        pet.description.toLowerCase().includes(searchTerm)
      );
    }
    if (filters.species) filtered = filtered.filter(pet => pet.species === filters.species);
    if (filters.age) {
        if (filters.age === 'Puppy') filtered = filtered.filter(pet => pet.age.includes('meses') || (pet.age.includes('año') && parseInt(pet.age) <= 1));
        else if (filters.age === 'Adult') filtered = filtered.filter(pet => pet.age.includes('año') && parseInt(pet.age) >= 2 && parseInt(pet.age) <= 6);
        else if (filters.age === 'Senior') filtered = filtered.filter(pet => pet.age.includes('año') && parseInt(pet.age) >= 7);
    }
    if (filters.size) filtered = filtered.filter(pet => pet.size === filters.size);
    if (filters.province) filtered = filtered.filter(pet => pet.province === filters.province);

    return filtered;
  }, [filters]);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPets.length]);

  const totalPages = Math.ceil(filteredPets.length / petsPerPage);
  const startIndex = (currentPage - 1) * petsPerPage;
  const currentPets = filteredPets.slice(startIndex, startIndex + petsPerPage);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Optional: scroll to top of pet grid
    document.getElementById('pet-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = () => navigate('/authentication-login-register');
  const handleRegister = () => navigate('/authentication-login-register'); // Assuming register is on the same page

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#eaeff0] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111618]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_6_319)">
                  <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                </g>
                <defs><clipPath id="clip0_6_319"><rect width="48" height="48" fill="white"></rect></clipPath></defs>
              </svg>
            </div>
            <h2 className="text-[#111618] text-lg font-bold leading-tight tracking-[-0.015em]">AdoptaEspaña</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/public-pet-adoption-homepage'); }} className="text-[#111618] text-sm font-medium leading-normal">Find a Pet</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[#111618] text-sm font-medium leading-normal">How to Adopt</a>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/shelter-dashboard'); }} className="text-[#111618] text-sm font-medium leading-normal">Shelters</a>
              <a href="#" onClick={(e) => e.preventDefault()} className="text-[#111618] text-sm font-medium leading-normal">Resources</a>
            </div>
            <div className="flex gap-2">
              <button onClick={handleRegister} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#4792a7] text-gray-50 text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Sign Up</span>
              </button>
              <button onClick={handleLogin} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#eaeff0] text-[#111618] text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="truncate">Log In</span>
              </button>
            </div>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-center justify-center p-4"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCveh65eyKtHuLIm2SWh9vuJWh6IRqmmhD8XVeqeYXnTbDTCU9dGCv8W8qBhjS3gBs2NNfUBOHOOoHtwxRcuUrmBqfH6enlrqqXSwozEWax_IMv4W-5x__fUKVAP-WNl7AtaqVAzIGWTB7wHhvEo46qDhsmesU6BOXIVb-uAyFXkZOBH668w_JPm9kscj0VWxLeFblJoofm5YHWvaJDLpB2exw0En4ohU7D5Frq_V8UWdw8chJ8ScGS8SgdMWmEvnPQz48kxZGPLio")'
                  }}
                >
                  <div className="flex flex-col gap-2 text-center">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                      Find Your Perfect Pet Companion
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Connect with shelters across Spain and discover pets waiting for a loving home.
                    </h2>
                  </div>
                  <button onClick={() => document.getElementById('pet-grid')?.scrollIntoView({ behavior: 'smooth' })} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#4792a7] text-gray-50 text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                    <span className="truncate">Start Your Search</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Simplified Filters - for demonstration. A more complex implementation would use dropdowns. */}
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {/* Species Filter */}
              <select onChange={(e) => handleFilterChange('species', e.target.value)} value={filters.species} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#eaeff0] pl-4 pr-2 text-[#111618] text-sm font-medium leading-normal">
                <option value="">Species</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
              </select>
              {/* Age Filter */}
              <select onChange={(e) => handleFilterChange('age', e.target.value)} value={filters.age} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#eaeff0] pl-4 pr-2 text-[#111618] text-sm font-medium leading-normal">
                <option value="">Age</option>
                <option value="Puppy">Puppy</option>
                <option value="Adult">Adult</option>
                <option value="Senior">Senior</option>
              </select>
              {/* Size Filter */}
              <select onChange={(e) => handleFilterChange('size', e.target.value)} value={filters.size} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#eaeff0] pl-4 pr-2 text-[#111618] text-sm font-medium leading-normal">
                <option value="">Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
              </select>
              {/* Province Filter */}
              <input type="text" placeholder="Province" onChange={(e) => handleFilterChange('province', e.target.value)} value={filters.province} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#eaeff0] pl-4 pr-2 text-[#111618] text-sm font-medium leading-normal" />
            </div>

            <div id="pet-grid" className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {isLoading ? (
                <p>Loading pets...</p>
              ) : currentPets.length > 0 ? (
                currentPets.map(pet => (
                  <div key={pet.id} className="flex flex-col gap-3 pb-3 cursor-pointer" onClick={() => navigate(`/pet/${pet.id}`)}>
                    <div
                      className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg"
                      style={{ backgroundImage: `url(${pet.image})` }}
                    ></div>
                    <div>
                      <p className="text-[#111618] text-base font-medium leading-normal">{pet.name}</p>
                      <p className="text-[#607d85] text-sm font-normal leading-normal">{pet.species}, {pet.age}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p>No pets match your criteria.</p>
                </div>
              )}
            </div>

            {!isLoading && totalPages > 1 && (
                <div className="flex items-center justify-center p-4">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="flex size-10 items-center justify-center">
                        <Icon name="CaretLeft" size={18} />
                    </button>
                    {[...Array(totalPages).keys()].map(pageNumber => (
                        <button key={pageNumber + 1} onClick={() => handlePageChange(pageNumber + 1)} className={`text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center rounded-full ${currentPage === pageNumber + 1 ? 'bg-[#eaeff0] text-[#111618]' : 'text-[#111618]'}`}>
                            {pageNumber + 1}
                        </button>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="flex size-10 items-center justify-center">
                        <Icon name="CaretRight" size={18} />
                    </button>
                </div>
            )}

          </div>
        </div>
        <footer className="flex justify-center">
          <div className="flex max-w-[960px] flex-1 flex-col">
            <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
              <div className="flex flex-wrap items-center justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
                <a href="/terminos-condiciones" className="text-[#607d85] text-base font-normal leading-normal min-w-40">Legal</a>
                <a href="#" className="text-[#607d85] text-base font-normal leading-normal min-w-40">Contact</a>
                <a href="/shelter-dashboard" className="text-[#607d85] text-base font-normal leading-normal min-w-40">Shelters</a>
                <a href="/professionals" className="text-[#607d85] text-base font-normal leading-normal min-w-40">Professionals</a>
              </div>
              <p className="text-[#607d85] text-base font-normal leading-normal">© {new Date().getFullYear()} AdoptaEspaña. All rights reserved.</p>
            </footer>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PublicPetAdoptionHomepage;