import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import LoadingSpinner from 'components/ui/LoadingSpinner';

const ShelterDashboard = () => {
  const navigate = useNavigate();
  const [shelterInfo, setShelterInfo] = useState({ name: 'Animales Felices' });
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const mockPets = [
    { id: 1, name: "Buddy", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCph9TB9b-7sPpmkch0uuQEBl6ZaJRSNWwzWZnQXJyCp0meHE5EmhG41-w7qZm53mGRS20S2rv7I9wa82ejjzMsLOCiSAfdEihFg9vIUE0NUchUmO1lI1bugU8R7uqBixe52iAupsyOMV8gs7hnVLRLbzMQyTDIELlfO-CMH-jGVij16q-vIYQyFLdZbUkcA75UYebohgcsVbgjA3AqGqJftC0tpNOYOCgIGWH77ncvBTCVgfyp0mNCk17IvVkmYMHAi3Zwv8ea5GM", status: 'Available' },
    { id: 2, name: "Luna", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGg7-fVK0MrCEqPGYP0899A0NW02_wQgSZyXulpqe2irflW3kSCNRz-62DYI4PcIQHUNZ5PGhO29hVq7-7J8nmtvGcFEMuf9saAxinFgcTF3TmjvGb4Lb3HFfFojjvWqk1i0inJDiB8YZvuV-Y6Tuj5lQ2iFaJlLRfQKShy5iwu2z7mscLfL5fBfdVgljsQW4-DjbYsCvr6uzvuUmFg6y8LXG8j07hhNk17yakzy6lr8yuCTqWRyvWc7D5hXMpA48L0ArvGJXPGx4", status: 'Pending Adoption' },
    { id: 3, name: "Charlie", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcwheNnTcxbRxbsijnKlXwHmIAqOZxpEwrZ2o-ik_JvMzF1P3QVIZypfrCEmXNYlZbhtcpk6q6e1uhKksM2NZfkJpHFnsX0r7OVeMyhhGFKN_XY6MPA7lqcYCjtlcCEoKYO-OSzhw-UQ0JQbSBVm7srwlf4dxurDOX4Xxii7Y43tdKdJq_ii-2W7vo0L0L02QXk0DnUpFFNxa7LpRqi9EI4a_zcVVrjHQM-ckuPTHWebyLU8TXnZP0m0GjBmCaSzSwtOsk2z9WM5o", status: 'Adopted' },
    { id: 4, name: "Snowball", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBcrICt3LFfe_PB4vcjajN211CjxVxQ2k4XG_A7PaSzAwRYtC0-EbW0B7u1rL_wAaeCKK93Rvr6UdsDQ5XVIdFGPy_FS37AQQpMIJ9McpSy7ueBeLb1PYrFjiHEn4jzEsyLAHbCznwYns5amvsr-Rfd-UUZu6NcD8dy9rYxuYYDjUHzq3Scigws4gdtzFBhsYAJUEUSV77qSJwu9tuQi-Ip4dGJKhoj7FuDzxM1y7bCJgg70AIbyPWySDvPbzSfncLTYVGg67yMn0M", status: 'Available' },
    { id: 5, name: "Max", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsf-PZ0wEo7Q-gZ3sjxIj60qnrouCkZxr1dM8FjX3eu3-D-XUwF1Rdb4QwYlHq9mqslt8HIdl6CHCYTaj48CELS8U-kxo1DuK5KEkgZ0qamN_WRe5FkbVfVppXB66624pvAfZu_4E-WWyUcyQ20q95Cnwjnpnv1gbIniYr0oPCg4_P3YAGfOBp0t0xMB5ywIM5cef1uKG7r5rZ6zzr05NMPvou5XiOLIdC_e6D8pOZt7k0ccGC_77rLceOWRMR8jzhj6geETKilA0", status: 'Available' },
  ];

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    if (!auth) {
      navigate('/authentication-login-register');
      return;
    }
    
    setTimeout(() => {
      setPets(mockPets);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      const searchMatch = searchTerm ? pet.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      const statusMatch = statusFilter !== 'all' ? pet.status.toLowerCase().replace(' ', '-') === statusFilter : true;
      return searchMatch && statusMatch;
    });
  }, [pets, searchTerm, statusFilter]);

  const stats = useMemo(() => ({
    totalPets: pets.length,
    activeListings: pets.filter(p => p.status === 'Available').length,
    profileViews: 2345 // static for now
  }), [pets]);

  const handleAddPet = () => navigate('/add-edit-pet-form');
  const handleEditPet = (id) => navigate(`/add-edit-pet-form?edit=true&id=${id}`);
  const handleDeletePet = (id) => {
      if(window.confirm('Are you sure you want to delete this pet?')) {
          setPets(prev => prev.filter(p => p.id !== id));
      }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading Dashboard..." />;
  }

  const Sidebar = () => (
    <div className="layout-content-container flex flex-col w-80">
        <div className="flex h-full min-h-[700px] flex-col justify-between bg-gray-50 p-4">
            <div className="flex flex-col gap-4">
                <h1 className="text-[#111618] text-base font-medium leading-normal">AdoptaEspaña</h1>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#eaeff0]"><Icon name="House" size={24} weight="fill" /> <p className="text-[#111618] text-sm font-medium leading-normal">Dashboard</p></div>
                    <div className="flex items-center gap-3 px-3 py-2"><Icon name="PawPrint" size={24} /> <p className="text-[#111618] text-sm font-medium leading-normal">Pets</p></div>
                    <div className="flex items-center gap-3 px-3 py-2"><Icon name="File" size={24} /> <p className="text-[#111618] text-sm font-medium leading-normal">Applications</p></div>
                    <div className="flex items-center gap-3 px-3 py-2"><Icon name="ChatCircleDots" size={24} /> <p className="text-[#111618] text-sm font-medium leading-normal">Messages</p></div>
                    <div className="flex items-center gap-3 px-3 py-2"><Icon name="User" size={24} /> <p className="text-[#111618] text-sm font-medium leading-normal">Profile</p></div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <button onClick={handleAddPet} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#4792a7] text-gray-50 text-sm font-bold leading-normal tracking-[0.015em]"><span className="truncate">Add New Pet</span></button>
                <div className="flex items-center gap-3 px-3 py-2"><Icon name="Question" size={24} /> <p className="text-[#111618] text-sm font-medium leading-normal">Help and Support</p></div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <Sidebar />
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111618] tracking-light text-[32px] font-bold leading-tight min-w-72">Welcome, {shelterInfo.name}</p>
            </div>
            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#eaeff0]"><p className="text-[#111618] text-base font-medium leading-normal">Total Pets</p><p className="text-[#111618] tracking-light text-2xl font-bold leading-tight">{stats.totalPets}</p></div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#eaeff0]"><p className="text-[#111618] text-base font-medium leading-normal">Active Listings</p><p className="text-[#111618] tracking-light text-2xl font-bold leading-tight">{stats.activeListings}</p></div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#eaeff0]"><p className="text-[#111618] text-base font-medium leading-normal">Profile Views</p><p className="text-[#111618] tracking-light text-2xl font-bold leading-tight">{stats.profileViews}</p></div>
            </div>
            <h2 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Your Pets</h2>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#d6dfe1] bg-gray-50">
                <table className="flex-1">
                  <thead><tr className="bg-gray-50"><th className="px-4 py-3 text-left text-[#111618] w-14 text-sm font-medium leading-normal">Pet</th><th className="px-4 py-3 text-left text-[#111618] w-[400px] text-sm font-medium leading-normal">Name</th><th className="px-4 py-3 text-left text-[#111618] w-60 text-sm font-medium leading-normal">Status</th><th className="px-4 py-3 text-left text-[#111618] w-60 text-[#607d85] text-sm font-medium leading-normal">Actions</th></tr></thead>
                  <tbody>
                    {filteredPets.map(pet => (
                      <tr key={pet.id} className="border-t border-t-[#d6dfe1]">
                        <td className="h-[72px] px-4 py-2 w-14 text-sm font-normal leading-normal"><div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10" style={{ backgroundImage: `url("${pet.image}")` }}></div></td>
                        <td className="h-[72px] px-4 py-2 w-[400px] text-[#111618] text-sm font-normal leading-normal">{pet.name}</td>
                        <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal"><button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-[#eaeff0] text-[#111618] text-sm font-medium leading-normal w-full"><span className="truncate">{pet.status}</span></button></td>
                        <td className="h-[72px] px-4 py-2 w-60 text-[#607d85] text-sm font-bold leading-normal tracking-[0.015em]">
                          <button onClick={() => handleEditPet(pet.id)} className="mr-2">Edit</button>
                          <button onClick={() => handleDeletePet(pet.id)} className="mr-2">Delete</button>
                          <button onClick={() => navigate(`/pet/${pet.id}`)}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterDashboard;