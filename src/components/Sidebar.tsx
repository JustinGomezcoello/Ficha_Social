import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

export default function Sidebar({ menuItems }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-blue-600 text-white"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      
      {/* Sidebar */}
      <div 
        className={`bg-blue-700 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
      >
        <div className="flex items-center justify-center space-x-2 px-4">
          <img src="/src/assets/logo_empresa.jpg" alt="Logo Empresa" className="h-8 w-8 rounded-full" />
          <span className="text-xl font-bold">Ficha Social</span>
        </div>
        
        <nav className="mt-10">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center py-3 px-4 rounded-lg transition-colors duration-200
                ${isActive ? 'bg-blue-800 text-white' : 'text-blue-100 hover:bg-blue-600'}
                hover:text-white my-1
              `}
              onClick={() => {
                if (isOpen) setIsOpen(false);
              }}
            >
              <div className="mr-3">
                {item.icon}
              </div>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}