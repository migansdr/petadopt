import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';
import LoadingSpinner from 'components/ui/LoadingSpinner';

const ProfessionalsDirectory = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [professionals, setProfessionals] = useState([]);
  const [filters, setFilters] = useState({
    search: 'Veterinarian in Madrid',
    service: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 4;

  const mockProfessionals = [
      {
        id: 'prof_001',
        name: 'Dr. Ana Rodriguez',
        type: 'Veterinarian',
        location: 'Madrid',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9oCbKhiGLcrjqwEybnNUOEyWRRjHmQ2ymaQkW3w-bSXUgTpqPxCHEVKN0KKUXSI4wRwacbs_Myc74Oz1iUHrwQSO96D8R1YyNkUS7X2hldUTjWk-l9p1RC1r--EM_4ZiLlCswlIiYZfETL_jD7aKOiLjuePTCa4noYhd7J4NUoY4geO5a1bBWprRU-QJyFuOfzF7TpMJJc5Jp9ZbgYQNASpnDEkJG0nkIy2-En6Lt8_vimt-u68ZLxHglXKcYcypTKviu2ALIOVc'
      },
      {
        id: 'prof_002',
        name: 'Clínica Veterinaria San Jorge',
        type: 'Veterinarian',
        location: 'Madrid',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC00WJefwxRnIlIx3jM4ICOik5bh60SR0m9cQ0WuB5W8RsvpmOtLvr3E2Sd8R8VBSL27oLI2_A6396ba3HFTzHaBPdO26Ky-gGEspXXkd17qCoi3lG0M2lFC287i0Mfd_F-thPwOOqyjE2nqkg441x0-w5R8rT-9HI9-3aA-o-5KE7YABbH2hkkFFQ5MwgkNpVwrFMPNqHsfqrWdg6VV6SdjQnUsJUdpWvZTV1gVWdTxxzxIp-hQQwx-YYemwSkEpyq-8hizrNnkMs'
      },
      {
        id: 'prof_003',
        name: 'Peluquería Canina Estilo',
        type: 'Groomer',
        location: 'Madrid',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPxf1xa-h4WY8U0Flnl5er7uCDGJtrjaxFmBJHoefbzsvjVVRcM38V5v0aBSLfaTqTPN5Ba19nidqlBzw2c6m1KphFbWDxuQK2mATqagkEt_4vdn5ST6YAX43kOsQZu-KzLEunAc8j4QCyvC5_CrBCYUyKiJjI9j1Xfva_SYCsumE9pQ1TVA-mM5qpbHiXmTjGiAnkFEZbbE-J8ZC-YP9PEJStWHHd4aLMZDXDWCEwVp4X0m9WylZNyNvGuLc-isNcLw9u_JN--Nk'
      },
      {
        id: 'prof_004',
        name: 'Paseos Caninos Urbanos',
        type: 'Dog Walker',
        location: 'Madrid',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_sGbCLxq_GKTMUjkBXkfLm3G29j_iRVXwhOoGFaPdxBxcprfdKXDfskfltzL-SKdA64oRs8qx5JCxrxVmu7c37_qjHLG8pNkBUugX9rhiL5ibfoRq7UrLixysBgQkX9qC0OcDpghAqOZjoKBxNnfurh3u56x26DOlraxLrPksbQPHxT6A2rfD-nZByC6cCH9X5B-zOEtS6FQf4ULgPWJb51OaDhmFAQDsEI1MoVhxOsKgheXG42neOr30LvK8kQN1U1EdIVyORZI'
      }
  ];

  const serviceOptions = ['Veterinarian', 'Groomer', 'Dog Walker'];

  useEffect(() => {
    const loadProfessionals = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setProfessionals(mockProfessionals);
      setIsLoading(false);
    };
    loadProfessionals();
  }, []);

  const filteredProfessionals = useMemo(() => {
    let filtered = professionals;
    const searchTerm = filters.search.toLowerCase();
    const serviceFilter = filters.service.toLowerCase();

    if (searchTerm) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.type.toLowerCase().includes(searchTerm) ||
            p.location.toLowerCase().includes(searchTerm)
        );
    }

    if (serviceFilter) {
        filtered = filtered.filter(p => p.type.toLowerCase() === serviceFilter);
    }

    return filtered;
  }, [filters, professionals]);

  const totalPages = Math.ceil(filteredProfessionals.length / resultsPerPage);
  const currentProfessionals = filteredProfessionals.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
      if(page > 0 && page <= totalPages) {
          setCurrentPage(page);
      }
  }

  const renderPagination = () => {
      let pages = [];
      for(let i = 1; i <= totalPages; i++) {
          pages.push(
              <button key={i} onClick={() => handlePageChange(i)} className={`text-sm font-normal leading-normal flex size-10 items-center justify-center rounded-full ${currentPage === i ? 'bg-[#eaeef1] font-bold' : ''}`}>
                  {i}
              </button>
          )
      }
      return pages;
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <AdaptiveHeader />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="px-4 py-3">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div className="text-[#5c778a] flex border-none bg-[#eaeef1] items-center justify-center pl-4 rounded-l-xl border-r-0">
                    {/* Search Icon */}
                  </div>
                  <input
                    placeholder="Search"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101518] focus:outline-0 focus:ring-0 border-none bg-[#eaeef1] focus:border-none h-full placeholder:text-[#5c778a] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                  <div className="flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#eaeef1] pr-2 pr-4">
                    <button onClick={() => handleFilterChange('search', '')} className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-[#101518] gap-2 text-base font-bold leading-normal tracking-[0.015em] h-auto min-w-0 px-0">
                        {/* Clear Icon */}
                    </button>
                  </div>
                </div>
              </label>
            </div>
            <h2 className="text-[#101518] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Results</h2>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {serviceOptions.map(service => (
                  <button key={service} onClick={() => handleFilterChange('service', service)} className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full pl-4 pr-4 ${filters.service === service ? 'bg-blue-500 text-white' : 'bg-[#eaeef1]'}`}>
                    <p className="text-sm font-medium leading-normal">{service}</p>
                  </button>
              ))}
               <button onClick={() => handleFilterChange('service', '')} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-gray-300 pl-4 pr-4">
                    <p className="text-sm font-medium leading-normal">Clear</p>
                </button>
            </div>

            {isLoading ? <LoadingSpinner /> : (
                currentProfessionals.map(prof => (
                    <div key={prof.id} className="p-4">
                        <div className="flex items-stretch justify-between gap-4 rounded-xl">
                            <div className="flex flex-[2_2_0px] flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <p className="text-[#101518] text-base font-bold leading-tight">{prof.name}</p>
                                    <p className="text-[#5c778a] text-sm font-normal leading-normal">{prof.type} in {prof.location}</p>
                                </div>
                                <button onClick={() => navigate(`/professional/${prof.id}`)} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 flex-row-reverse bg-[#eaeef1] text-[#101518] text-sm font-medium leading-normal w-fit">
                                    <span className="truncate">View Profile</span>
                                </button>
                            </div>
                            <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1" style={{ backgroundImage: `url("${prof.image}")` }}></div>
                        </div>
                    </div>
                ))
            )}

            <div className="flex items-center justify-center p-4">
                <button onClick={() => handlePageChange(currentPage - 1)} className="flex size-10 items-center justify-center">
                    {/* CaretLeft Icon */}
                </button>
                {renderPagination()}
                <button onClick={() => handlePageChange(currentPage + 1)} className="flex size-10 items-center justify-center">
                    {/* CaretRight Icon */}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalsDirectory;