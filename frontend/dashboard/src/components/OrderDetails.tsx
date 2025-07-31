import React from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, MapPin, CreditCard, User, Calendar } from 'lucide-react';
import { Order } from '../types/dashboard';

interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order, onBack }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const orderItems = [
    { id: '1', name: 'Wireless Bluetooth Headphones', sku: 'WBH-001', quantity: 1, price: 129.99, image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100' },
    { id: '2', name: 'USB-C Charging Cable', sku: 'UCC-005', quantity: 2, price: 19.99, image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=100' }
  ];

  const timeline = [
    { status: 'Order Placed', date: '2024-01-15 10:30 AM', completed: true, icon: Package },
    { status: 'Payment Confirmed', date: '2024-01-15 10:32 AM', completed: true, icon: CreditCard },
    { status: 'Processing', date: '2024-01-15 2:15 PM', completed: true, icon: Package },
    { status: 'Shipped', date: '2024-01-16 9:00 AM', completed: order.status !== 'Pending' && order.status !== 'Processing', icon: Truck },
    { status: 'Delivered', date: 'Expected: 2024-01-18', completed: order.status === 'Delivered', icon: CheckCircle }
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
            <h1 className="text-2xl font-bold text-gray-900">Order {order.id}</h1>
            <p className="text-gray-600 mt-1">Placed on {new Date(order.date).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
            {order.status}
          </span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Timeline</h3>
            <div className="space-y-4">
              {timeline.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${step.completed ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.status}
                      </p>
                      <p className="text-sm text-gray-500">{step.date}</p>
                    </div>
                    {step.completed && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Items</h3>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">SKU: {item.sku}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${(order.total - 10).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">$10.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-gray-200">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Shipping Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Shipping Address</h4>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">{order.customer}</p>
                    <p>123 Main Street</p>
                    <p>New York, NY 10001</p>
                    <p>United States</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Shipping Method</h4>
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">Standard Shipping</p>
                    <p>3-5 business days</p>
                    <p className="text-blue-600">Tracking: 1Z999AA1234567890</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Customer Information</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-500">sarah.j@email.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-900">Customer since</p>
                  <p className="text-sm text-gray-500">December 2023</p>
                </div>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <button className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                  View Customer Profile
                </button>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Payment Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-500">Visa ending in 4242</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Payment Status: <span className="text-green-600 font-medium">Paid</span></p>
                <p>Transaction ID: txn_1234567890</p>
              </div>
            </div>
          </div>

          {/* Order Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Order Actions</h4>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                Update Status
              </button>
              <button className="w-full text-left px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                Add Tracking Info
              </button>
              <button className="w-full text-left px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
                Send Update Email
              </button>
              <button className="w-full text-left px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
                Process Refund
              </button>
              <button className="w-full text-left px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                Print Invoice
              </button>
            </div>
          </div>

          {/* Order Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Order Notes</h4>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">Customer requested expedited shipping</p>
                <p className="text-xs text-yellow-600 mt-1">Added by John Doe - Jan 15, 2024</p>
              </div>
              <textarea
                placeholder="Add a note..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={3}
              />
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Add Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;