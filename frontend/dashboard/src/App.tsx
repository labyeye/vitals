import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Customers from './components/Customers';
import Orders from './components/Orders';
import Products from './components/Products';
import Marketing from './components/Marketing';
import AddProduct from './components/AddProduct';
import ProductDetails from './components/ProductDetails';
import CustomerDetails from './components/CustomerDetails';
import OrderDetails from './components/OrderDetails';
import CampaignDetails from './components/CampaignDetails';
import { mockData } from './data/mockData';

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [currentView, setCurrentView] = useState<{
    section: string;
    view: 'list' | 'add' | 'details';
    itemId?: string;
  }>({ section: 'overview', view: 'list' });

  const renderContent = () => {
    // Handle detailed views
    if (currentView.view === 'add' && currentView.section === 'products') {
      return (
        <AddProduct
          onBack={() => setCurrentView({ section: 'products', view: 'list' })}
          onSave={(product) => {
            console.log('Saving product:', product);
            setCurrentView({ section: 'products', view: 'list' });
          }}
        />
      );
    }

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
                customer={customer}
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
                order={order}
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
            onAddProduct={() => setCurrentView({ section: 'products', view: 'add' })}
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
      case 'analytics':
        return <div className="p-8 text-center text-gray-500">Analytics section coming soon...</div>;
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

export default App;