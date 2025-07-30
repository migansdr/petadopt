import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import LoadingSpinner from 'components/ui/LoadingSpinner';
import ConfirmDialog from 'components/ui/ConfirmDialog';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('moderation');
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState(null);

  const [pendingPets, setPendingPets] = useState([
    { id: 'pet_001', name: 'Luna', shelter: 'Refugio Esperanza', status: 'Pending' },
    { id: 'pet_002', name: 'Max', shelter: 'Refugio Valencia', status: 'Reported' },
  ]);
  const [users, setUsers] = useState([
      { id: 'user_001', name: 'Refugio Esperanza', type: 'Shelter', status: 'Active' },
      { id: 'user_002', name: 'Maria Garcia', type: 'Adopter', status: 'Active' },
  ]);
  const [statistics, setStatistics] = useState({
    activePets: 142,
    activeShelters: 23,
    pendingReports: 5,
  });

  useEffect(() => {
    const isAdmin = true; // localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      navigate('/');
      return;
    }
    setTimeout(() => setIsLoading(false), 1000);
  }, [navigate]);

  const handleApprovePet = (petId) => {
    setPendingPets(prev => prev.filter(p => p.id !== petId));
  };

  const handleRejectPet = (petId) => {
    setActionToConfirm({ type: 'reject_pet', id: petId, title: 'Reject Pet?', message: 'This will notify the shelter.' });
    setShowConfirmDialog(true);
  };

  const handleSuspendUser = (userId) => {
    setActionToConfirm({ type: 'suspend_user', id: userId, title: 'Suspend User?', message: 'This will suspend their account.' });
    setShowConfirmDialog(true);
  };

  const handleConfirmAction = () => {
    if (!actionToConfirm) return;
    if (actionToConfirm.type === 'reject_pet') {
      setPendingPets(prev => prev.filter(p => p.id !== actionToConfirm.id));
    } else if (actionToConfirm.type === 'suspend_user') {
      setUsers(prev => prev.map(u => u.id === actionToConfirm.id ? { ...u, status: 'Suspended' } : u));
    }
    setShowConfirmDialog(false);
    setActionToConfirm(null);
  };

  if (isLoading) return <LoadingSpinner text="Loading Admin Panel..." />;

  const Sidebar = () => (
    <div className="layout-content-container flex flex-col w-80">
      <div className="flex h-full min-h-[700px] flex-col justify-between bg-gray-50 p-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-[#111618] text-base font-medium leading-normal">AdoptaEspaña Admin</h1>
          <div className="flex flex-col gap-2">
            <button onClick={() => setActiveTab('moderation')} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activeTab === 'moderation' ? 'bg-[#eaeff0]' : ''}`}>
              <Icon name="Shield" size={24} />
              <p className="text-[#111618] text-sm font-medium leading-normal">Moderation</p>
            </button>
            <button onClick={() => setActiveTab('users')} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activeTab === 'users' ? 'bg-[#eaeff0]' : ''}`}>
              <Icon name="Users" size={24} />
              <p className="text-[#111618] text-sm font-medium leading-normal">Users</p>
            </button>
            <button onClick={() => setActiveTab('statistics')} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${activeTab === 'statistics' ? 'bg-[#eaeff0]' : ''}`}>
              <Icon name="BarChart3" size={24} />
              <p className="text-[#111618] text-sm font-medium leading-normal">Statistics</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
      switch(activeTab) {
          case 'moderation':
              return (
                  <div>
                    <h2 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Content Moderation</h2>
                    {pendingPets.length > 0 ? pendingPets.map(pet => (
                        <div key={pet.id} className="p-4 border-b">
                            <p>{pet.name} from {pet.shelter} - Status: {pet.status}</p>
                            <button onClick={() => handleApprovePet(pet.id)} className="bg-green-500 text-white p-2 rounded mr-2">Approve</button>
                            <button onClick={() => handleRejectPet(pet.id)} className="bg-red-500 text-white p-2 rounded">Reject</button>
                        </div>
                    )) : <p className="p-4">No pets pending moderation.</p>}
                  </div>
              );
          case 'users':
              return (
                  <div>
                    <h2 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">User Management</h2>
                    {users.map(user => (
                        <div key={user.id} className="p-4 border-b">
                            <p>{user.name} ({user.type}) - Status: {user.status}</p>
                            {user.status === 'Active' && <button onClick={() => handleSuspendUser(user.id)} className="bg-yellow-500 text-white p-2 rounded">Suspend</button>}
                        </div>
                    ))}
                  </div>
              );
          case 'statistics':
               return (
                  <div>
                    <h2 className="text-[#111618] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Platform Statistics</h2>
                    <div className="flex flex-wrap gap-4 p-4">
                        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#eaeff0]"><p>Active Pets</p><p className="text-2xl font-bold">{statistics.activePets}</p></div>
                        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#eaeff0]"><p>Active Shelters</p><p className="text-2xl font-bold">{statistics.activeShelters}</p></div>
                        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-[#eaeff0]"><p>Pending Reports</p><p className="text-2xl font-bold">{statistics.pendingReports}</p></div>
                    </div>
                  </div>
              );
          default: return null;
      }
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-gray-50 group/design-root overflow-x-hidden" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <Sidebar />
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111618] tracking-light text-[32px] font-bold leading-tight min-w-72">Admin Dashboard</p>
            </div>
            {renderContent()}
          </div>
        </div>
      </div>
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={handleConfirmAction}
        title={actionToConfirm?.title || ''}
        message={actionToConfirm?.message || ''}
        type="warning"
      />
    </div>
  );
};

export default AdminPanel;