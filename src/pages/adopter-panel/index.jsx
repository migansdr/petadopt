import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdaptiveHeader from 'components/ui/AdaptiveHeader';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import Icon from 'components/AppIcon';

const AdopterPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [applications, setApplications] = useState([]);

  const mockUser = {
      name: "Elena Ramirez",
      bio: "Animal lover and advocate",
      joined: "2021",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr63A8lXJEbwce2E9JOvpz6fALz8UMpELjA0jf7dbZj12qVtF4ZNB9RFQYjG2r0WgLItLwuoXFGvzyRMYhO8C-7cOfXQAQAu-SSNpVZ-_veHjOlukh1O-sgRvTr1gXbMj6ICbYZQ7uTkBHVJwcFIvdtjKUK61L_5hc0HGiN7EQ2CFGa6OeFwlMxk1itlHYfZ_kUN24mgLWJbiopPHPMpkPQl6nyFX-AiZsDGKifzqaoC_2Scz88o1MnDJWDm11tmbL_A2Bz64lozg"
  };

  const mockFavoritesList = [
    { id: '1', name: 'Buddy', description: 'Golden Retriever, 2 years old', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC0iMbLwJrUtcQXscQ3k8x-0szlLYBP4sascAPVkE-TWuLigUGZGUoDzq7l82I9IY7bVcD6KBztbTTYVYmBZS_4MM6bdRxE8YXrwmqfYs0bOFLuFZia0tm0a1U-o_KtSy63C9UZXBbwXCY40gFZW4FVNODuDYd80beaNyMn3YoPysCRt_OSc5aWk-v3MNsTBvrPW-hLPjM8Do-9iojKRDkAcIqudrMZwQT3HuShtQIwbeeE0Tt4v0BNxs34UXLFtkiGHl0gNQeh4w' },
    { id: '2', name: 'Luna', description: 'Siamese cat, 1 year old', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2-r4hDaAnC7Bbq2p9vhc3iXHXo6pSrta4XzBiZwyhX597gj1hw7aRclD_Vh4oXCZrfZ9bPvMmXKL5UKNc7BwD_ZBWmztVdG22zX5bETelDU7vR9ZI0u0HBWiT8hg7YyaP4CNdAf-X8cu9FnkenoQFqZkEtmePbUYFNQbGSVEcU33GWEzyjxN27S1zxxdmN5ZzA_s2HzajdhyeuoDDQ0GnjIGbomnM2qcGhkjYPD9mF0azz3hogveSZWg9syJwFXLdTLIUsEjp9MI' },
    { id: '3', name: 'Charlie', description: 'Beagle, 3 years old', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2RKxGw2FhxMYrOHcNA4-Dv7cdsQDJOojzoZrpuntCJPgLltglUfmw9O-FDnAcLkcZIpq_a8_lCEvxkiRJXC2Er8HcbDjEW4drG2pugmCIM_GSRjEiLqvmv_DwaBBJst4QGrxbeNoSF_FCotDKmt7iUmzLCoJ_I2BHdZStuP5ksbdMKo_2uB2gFJPqSCMzWIKsGB7Ncer8ueRL20KgJyESM7LEUqJrIQIRFKtN20LUhW0yGG2Zpy_TBMgMClsHsnwdjTxZjWvWOQE' },
  ];

  const mockApplicationsList = [
      { id: 1, pet: 'Max, Labrador Retriever', status: 'Pending', date: '2023-08-15' },
      { id: 2, pet: 'Bella, Persian Cat', status: 'Approved', date: '2023-07-20' },
  ];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setFavorites(mockFavoritesList);
      setApplications(mockApplicationsList);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleRemoveFavorite = (id) => {
      setFavorites(currentFavorites => currentFavorites.filter(f => f.id !== id));
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'favorites':
        return (
          <>
            <h2 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">My Favorites</h2>
            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-3">
                {favorites.map(fav => (
                  <div key={fav.id} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                    <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col" style={{ backgroundImage: `url("${fav.image}")` }}></div>
                    <div>
                      <p className="text-[#111618] text-base font-medium leading-normal">{fav.name}</p>
                      <p className="text-[#607d85] text-sm font-normal leading-normal">{fav.description}</p>
                      <button onClick={() => handleRemoveFavorite(fav.id)} className="text-red-500 text-sm">Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 'applications':
        return (
          <>
            <h2 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">My Applications</h2>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-xl border border-[#d6dfe1] bg-gray-50">
                <table className="flex-1">
                  <thead><tr className="bg-gray-50"><th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Pet</th><th className="px-4 py-3 text-left text-[#111618] w-60 text-sm font-medium leading-normal">Status</th><th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Date Applied</th></tr></thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id} className="border-t border-t-[#d6dfe1]">
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">{app.pet}</td>
                        <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal"><button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#eaeff0] text-[#111618] text-sm font-medium leading-normal w-full"><span className="truncate">{app.status}</span></button></td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#607d85] text-sm font-normal leading-normal">{app.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        );
      default: // Overview
        return (
            <>
            {/* Placeholder for Overview content, can be combination of favorites and applications */}
            <h2 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Welcome, {mockUser.name}!</h2>
            <p className="px-4">This is your dashboard overview. Here you can see a summary of your recent activity.</p>
            </>
        );
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading your panel..." />;
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <AdaptiveHeader />
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex p-4 @container">
              <div className="flex w-full flex-col gap-4 items-center">
                <div className="flex gap-4 flex-col items-center">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32" style={{ backgroundImage: `url("${mockUser.avatar}")` }}></div>
                  <div className="flex flex-col items-center justify-center justify-center">
                    <p className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">{mockUser.name}</p>
                    <p className="text-[#607d85] text-base font-normal leading-normal text-center">{mockUser.bio}</p>
                    <p className="text-[#607d85] text-base font-normal leading-normal text-center">Joined {mockUser.joined}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-3">
              <div className="flex border-b border-[#d6dfe1] px-4 gap-8">
                <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'overview' ? 'border-b-[#4792a7] text-[#111618]' : 'border-b-transparent text-[#607d85]'}`}><p className="text-sm font-bold leading-normal tracking-[0.015em]">Overview</p></button>
                <button onClick={() => setActiveTab('favorites')} className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'favorites' ? 'border-b-[#4792a7] text-[#111618]' : 'border-b-transparent text-[#607d85]'}`}><p className="text-sm font-bold leading-normal tracking-[0.015em]">Favorites</p></button>
                <button onClick={() => setActiveTab('applications')} className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${activeTab === 'applications' ? 'border-b-[#4792a7] text-[#111618]' : 'border-b-transparent text-[#607d85]'}`}><p className="text-sm font-bold leading-normal tracking-[0.015em]">Applications</p></button>
              </div>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdopterPanel;