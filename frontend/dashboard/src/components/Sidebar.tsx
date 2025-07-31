import React from 'react';
import { 
  BarChart3, 
  Users, 
  ShoppingCart, 
  Package, 
  Megaphone, 
  Settings,
  Home,
  Shield,
  AlertTriangle,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const { user, logout } = useAuth();
  const menuItems = [
    { id: 'overview', icon: Home, label: 'Overview' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'customers', icon: Users, label: 'Customers' },
    { id: 'orders', icon: ShoppingCart, label: 'Orders' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'marketing', icon: Megaphone, label: 'Marketing' },
    { id: 'alerts', icon: AlertTriangle, label: 'Alerts' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="bg-white shadow-sm border-r border-gray-200 w-64 min-h-screen">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Commerce Hub</h1>
        <p className="text-sm text-gray-500 mt-1">Admin Dashboard</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left transition-all duration-200 hover:bg-gray-50 ${
                isActive 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      

      {/* User Info and Logout */}
      
    </div>
  );
};

export default Sidebar;