import React from 'react';
import { mockData } from '../data/mockData';
import { Search, Filter, Plus, AlertTriangle, Package, Edit } from 'lucide-react';

interface ProductsProps {
  onAddProduct: () => void;
  onViewDetails: (productId: string) => void;
}

const Products: React.FC<ProductsProps> = ({ onAddProduct, onViewDetails }) => {
  const getStockStatus = (status: string) => {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const lowStockProducts = mockData.products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product & Inventory</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog and track inventory levels</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Package className="w-4 h-4" />
            <span>Bulk Edit</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
          <button 
            onClick={onAddProduct}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Stock Alerts */}
      {lowStockProducts.length > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-red-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h2 className="font-semibold text-yellow-900">Stock Alerts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${product.stock === 0 ? 'text-red-600' : 'text-yellow-600'}`}>
                    {product.stock === 0 ? 'Out of Stock' : `${product.stock} units left`}
                  </p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Restock</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-gray-900">487</div>
          <div className="text-sm text-gray-600">Total Products</div>
          <div className="text-xs text-green-600 mt-1">+23 this month</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-gray-900">456</div>
          <div className="text-sm text-gray-600">In Stock</div>
          <div className="text-xs text-green-600 mt-1">93.6%</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-yellow-600">29</div>
          <div className="text-sm text-gray-600">Low Stock</div>
          <div className="text-xs text-yellow-600 mt-1">Needs attention</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="text-2xl font-bold text-red-600">2</div>
          <div className="text-sm text-gray-600">Out of Stock</div>
          <div className="text-xs text-red-600 mt-1">Urgent restock</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products by name, SKU, or category..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Product Catalog</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profit Margin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockData.products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.profit}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockStatus(product.status)}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onViewDetails(product.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;