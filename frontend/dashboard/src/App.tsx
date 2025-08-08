import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Customers from './components/Customers';
import Orders from './components/Orders';
import Products from './components/Products';
import HeroManagement from './components/HeroManagement';
import Marketing from './components/Marketing';
import PromoCodes from './components/PromoCodes';
import ProductDetails from './components/ProductDetails';
import CustomerDetails from './components/CustomerDetails';
import OrderDetails from './components/OrderDetails';
import CampaignDetails from './components/CampaignDetails';
import Analytics from './components/Analytics';
import Login from './components/Login';
import { mockData } from './data/mockData';

function DashboardApp() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [currentView, setCurrentView] = useState<{
    section: string;
    view: 'list' | 'add' | 'details';
    itemId?: string;
  }>({ section: 'overview', view: 'list' });

  // If not authenticated, show login
  if (!user) {
    return <Login />;
  }

  // If not admin, show access denied
  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You don't have permission to access the admin dashboard.</p>
          <button
            onClick={logout}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    // Handle detailed views
    if (currentView.view === 'details') {
      switch (currentView.section) {
        case 'products':
          const product = mockData.products.find(p => p.id === currentView.itemId);
          if (product) {
            return (
              <ProductDetails
                product={product}
                onBack={() => setCurrentView({ section: 'products', view: 'list' })}
                onEdit={() => console.log('Edit product')}
                onDelete={() => console.log('Delete product')}
              />
            );
          }
          break;
        case 'customers':
          const customer = mockData.customers.find(c => c.id === currentView.itemId);
          if (customer) {
            return (
              <CustomerDetails
                customerId={currentView.itemId || ''}
                onBack={() => setCurrentView({ section: 'customers', view: 'list' })}
              />
            );
          }
          break;
        case 'orders':
          const order = mockData.orders.find(o => o.id === currentView.itemId);
          if (order) {
            return (
              <OrderDetails
                orderId={currentView.itemId || ''}
                onBack={() => setCurrentView({ section: 'orders', view: 'list' })}
              />
            );
          }
          break;
        case 'marketing':
          const campaign = mockData.campaigns.find(c => c.id === currentView.itemId);
          if (campaign) {
            return (
              <CampaignDetails
                campaign={campaign}
                onBack={() => setCurrentView({ section: 'marketing', view: 'list' })}
              />
            );
          }
          break;
      }
    }

    // Handle list views
    switch (currentView.section) {
      case 'overview':
        return <Overview />;
      case 'customers':
        return (
          <Customers
            onViewDetails={(customerId) => 
              setCurrentView({ section: 'customers', view: 'details', itemId: customerId })
            }
          />
        );
      case 'orders':
        return (
          <Orders
            onViewDetails={(orderId) => 
              setCurrentView({ section: 'orders', view: 'details', itemId: orderId })
            }
          />
        );
      case 'products':
        return (
          <Products
            onViewDetails={(productId) => 
              setCurrentView({ section: 'products', view: 'details', itemId: productId })
            }
          />
        );
      case 'marketing':
        return (
          <Marketing
            onViewDetails={(campaignId) => 
              setCurrentView({ section: 'marketing', view: 'details', itemId: campaignId })
            }
          />
        );
      case 'heroes':
        return <HeroManagement />;
      case 'promo-codes':
        return <PromoCodes />;
      case 'analytics':
        return <Analytics />;
      case 'alerts':
        return <div className="p-8 text-center text-gray-500">Alerts section coming soon...</div>;
      case 'security':
        return <div className="p-8 text-center text-gray-500">Security section coming soon...</div>;
      case 'settings':
        return <div className="p-8 text-center text-gray-500">Settings section coming soon...</div>;
      default:
        return <Overview />;
    }
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setCurrentView({ section, view: 'list' });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DashboardApp />
    </AuthProvider>
  );
}

export default App;