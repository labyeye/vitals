import React from 'react';
import { ArrowLeft, Mail, Phone, MapPin, CreditCard, Package, TrendingUp, Calendar } from 'lucide-react';
import { Customer } from '../types/dashboard';

interface CustomerDetailsProps {
  customer: Customer;
  onBack: () => void;
}

const CustomerDetails: React.FC<CustomerDetailsProps> = ({ customer, onBack }) => {
  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'VIP': return 'bg-purple-100 text-purple-800';
      case 'Regular': return 'bg-blue-100 text-blue-800';
      case 'New': return 'bg-green-100 text-green-800';
      case 'At-Risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const recentOrders = [
    { id: 'ORD-001', date: '2024-01-15', total: 125.99, status: 'Delivered', items: 3 },
    { id: 'ORD-002', date: '2024-01-10', total: 89.99, status: 'Shipped', items: 2 },
    { id: 'ORD-003', date: '2024-01-05', total: 199.99, status: 'Delivered', items: 4 },
    { id: 'ORD-004', date: '2023-12-28', total: 45.50, status: 'Delivered', items: 1 },
    { id: 'ORD-005', date: '2023-12-20', total: 299.99, status: 'Delivered', items: 5 }
  ];

  const activityLog = [
    { action: 'Placed order ORD-001', date: '2024-01-15 10:30 AM', type: 'order' },
    { action: 'Added items to wishlist', date: '2024-01-14 3:45 PM', type: 'wishlist' },
    { action: 'Viewed product: Wireless Headphones', date: '2024-01-14 2:20 PM', type: 'view' },
    { action: 'Opened email campaign', date: '2024-01-13 9:15 AM', type: 'email' },
    { action: 'Updated shipping address', date: '2024-01-12 4:30 PM', type: 'profile' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
            <p className="text-gray-600 mt-1">{customer.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSegmentColor(customer.segment)}`}>
            {customer.segment}
          </span>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Mail className="w-4 h-4" />
            <span>Send Email</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Lifetime Value</p>
                    <p className="text-2xl font-bold text-blue-900">${customer.lifetimeValue.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Package className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">Total Orders</p>
                    <p className="text-2xl font-bold text-green-900">{customer.totalOrders}</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Avg. Order Value</p>
                    <p className="text-2xl font-bold text-purple-900">${(customer.lifetimeValue / customer.totalOrders).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Order History</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{order.items}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">${order.total.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        <button className="text-blue-600 hover:text-blue-900">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {activityLog.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'order' ? 'bg-green-500' :
                    activity.type === 'email' ? 'bg-blue-500' :
                    activity.type === 'view' ? 'bg-purple-500' :
                    'bg-gray-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">{customer.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <div className="text-sm text-gray-900">
                  <p>123 Main Street</p>
                  <p>New York, NY 10001</p>
                  <p>United States</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Customer Statistics</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">First Order</span>
                <span className="text-sm font-medium text-gray-900">Dec 15, 2023</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Activity</span>
                <span className="text-sm font-medium text-gray-900">{new Date(customer.lastActivity).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Order Frequency</span>
                <span className="text-sm font-medium text-gray-900">Every 12 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Return Rate</span>
                <span className="text-sm font-medium text-green-600">2.1%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Email Open Rate</span>
                <span className="text-sm font-medium text-blue-600">68%</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Payment Methods</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                  <p className="text-xs text-gray-500">Expires 12/25</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Primary</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">•••• •••• •••• 8888</p>
                  <p className="text-xs text-gray-500">Expires 08/26</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                Send Marketing Email
              </button>
              <button className="w-full text-left px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                Create Discount Code
              </button>
              <button className="w-full text-left px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                Add to VIP List
              </button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                View Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;