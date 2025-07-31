import React from 'react';
import MetricCard from './MetricCard';
import { mockData } from '../data/mockData';
import { AlertTriangle, TrendingUp, Package, Users } from 'lucide-react';

const Overview: React.FC = () => {
  const topProducts = mockData.products
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 3);

  const urgentAlerts = [
    { type: 'Low Stock', message: 'Smart Fitness Tracker - Only 8 units left', priority: 'high' },
    { type: 'Out of Stock', message: 'USB-C Power Bank - Restocking needed', priority: 'critical' },
    { type: 'High Returns', message: 'USB-C Power Bank - 3.5% return rate', priority: 'medium' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Urgent Alerts */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <h2 className="font-semibold text-red-900">Urgent Alerts</h2>
        </div>
        <div className="space-y-2">
          {urgentAlerts.map((alert, index) => (
            <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  alert.priority === 'critical' ? 'bg-red-500' :
                  alert.priority === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                }`} />
                <span className="text-sm font-medium text-gray-900">{alert.type}</span>
                <span className="text-sm text-gray-600">{alert.message}</span>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Core Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockData.metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Products</h3>
          </div>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.sales} sales</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${product.price}</p>
                  <p className="text-sm text-green-600">{product.profit}% profit</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Customer Segments</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full" />
                <span className="text-gray-700">VIP Customers</span>
              </div>
              <span className="font-semibold text-gray-900">12%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-gray-700">Regular Customers</span>
              </div>
              <span className="font-semibold text-gray-900">58%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-gray-700">New Customers</span>
              </div>
              <span className="font-semibold text-gray-900">23%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-gray-700">At-Risk Customers</span>
              </div>
              <span className="font-semibold text-gray-900">7%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;