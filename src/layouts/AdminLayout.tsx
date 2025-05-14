import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { Users, BarChart } from 'lucide-react';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  
  const menuItems = [
    { 
      label: 'Employees', 
      path: '/admin/employees', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      label: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: <BarChart className="h-5 w-5" /> 
    }
  ];
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar menuItems={menuItems} />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          title="Admin Panel" 
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