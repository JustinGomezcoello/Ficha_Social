import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { UserCircle, ClipboardList } from 'lucide-react';

export default function UserLayout() {
  const { user, logout } = useAuth();
  
  const menuItems = [
    { 
      label: 'Perfil', 
      path: '/user/profile', 
      icon: <UserCircle className="h-5 w-5" /> 
    },
    { 
      label: 'Encuestas', 
      path: '/user/surveys', 
      icon: <ClipboardList className="h-5 w-5" /> 
    }
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar menuItems={menuItems} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          title="Portal del Empleado" 
          username={user?.username || ''} 
          onLogout={logout} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}