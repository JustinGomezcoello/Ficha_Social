import { LogOut } from 'lucide-react';

interface HeaderProps {
  title: string;
  username: string;
  onLogout: () => void;
}

export default function Header({ title, username, onLogout }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      
      <div className="flex items-center">
        <span className="mr-4 text-sm text-gray-600 hidden sm:inline-block">
          Welcome, {username}
        </span>
        <button
          onClick={onLogout}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          title="Logout"
        >
          <LogOut className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}