import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { 
  ArrowLeft, 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  Home, 
  XCircle,
  CreditCard,
  Gift,
  Star,
  Award,
  Crown,
  Loader2
} from "lucide-react";

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token) {
        setError('Authentication required');
        setLoading(false);
        return;
      }

      if (!id) {
        setError('Order ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        
        const response = await fetch(`http://localhost:3500/api/customer/orders/${id}/details`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch order');
        }

        const data = await response.json();
        setOrder(data.data);
      } catch (err: any) {
        console.error('Fetch order error:', err);
        setError(err.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, token]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'shipped': return <Truck className="w-5 h-5 text-purple-500" />;
      case 'delivered': return <Home className="w-5 h-5 text-green-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/10 pt-24">
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#688F4E]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/10 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => navigate('/orders')}
              className="px-6 py-2 bg-[#688F4E] text-white rounded-lg hover:bg-[#5a7a42] transition-colors"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/10 pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-[#2B463C] mb-4">Order Not Found</h2>
            <button
              onClick={() => navigate('/orders')}
              className="px-6 py-2 bg-[#688F4E] text-white rounded-lg hover:bg-[#5a7a42] transition-colors"
            >
              Back to Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/10 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#688F4E] mb-6 hover:text-[#2B463C] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Orders</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-[#2B463C]">Order #{order.order.orderNumber}</h1>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.order.status)}`}>
                {order.order.status.charAt(0).toUpperCase() + order.order.status.slice(1)}
              </span>
              <span className="text-gray-600 text-sm">
                Placed on {new Date(order.order.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#2B463C] mb-4">Order Timeline</h2>
            <div className="space-y-4">
              {order.order.timeline.map((entry: any, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex flex-col items-center pt-1">
                    {getStatusIcon(entry.status)}
                    {index < order.order.timeline.length - 1 && (
                      <div className="w-0.5 h-6 bg-gray-300 my-1"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#2B463C]">
                      {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                    </p>
                    <p className="text-gray-600 text-sm">{entry.message}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(entry.date || order.order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Shipping Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#2B463C] mb-3">Shipping Information</h3>
              <p className="text-gray-700">{order.order.shippingAddress?.street}</p>
              <p className="text-gray-700">
                {order.order.shippingAddress?.city}, {order.order.shippingAddress?.state}
              </p>
              <p className="text-gray-700">{order.order.shippingAddress?.zipCode}</p>
              <p className="text-gray-700">{order.order.shippingAddress?.country}</p>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#2B463C] mb-3">Payment Information</h3>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-[#688F4E]" />
                <span className="capitalize">{order.order.payment?.method?.replace(/_/g, ' ')}</span>
              </div>
              <p className="text-gray-700">
                Status: <span className="capitalize">{order.order.payment?.status}</span>
              </p>
              {order.order.payment?.transactionId && (
                <p className="text-gray-700 text-sm mt-2">
                  Transaction ID: {order.order.payment.transactionId}
                </p>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-[#2B463C] mb-3">Order Summary</h3>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">₹{order.order.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">₹{order.order.shipping?.cost?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Tax:</span>
                <span className="font-medium">₹{order.order.tax?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-[#2B463C]">
                <span>Total:</span>
                <span>₹{order.order.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-[#2B463C] mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.order.items.map((item: any) => (
                <div key={item._id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <img 
                    src={item.product?.images?.[0] || 'https://via.placeholder.com/80'} 
                    alt={item.product?.name} 
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-[#2B463C]">{item.product?.name}</h4>
                    <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    <p className="text-gray-600 text-sm">Price: ₹{item.price?.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loyalty Points Earned */}
          {order.loyaltyInfo && (
            <div className="bg-[#688F4E]/10 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-[#2B463C] mb-4">Loyalty Points</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current Tier */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    {order.loyaltyInfo.currentTier === 'bronze' && <Star className="w-6 h-6 text-[#CD7F32]" />}
                    {order.loyaltyInfo.currentTier === 'silver' && <Award className="w-6 h-6 text-[#C0C0C0]" />}
                    {order.loyaltyInfo.currentTier === 'gold' && <Crown className="w-6 h-6 text-[#FFD700]" />}
                    <h3 className="font-semibold capitalize">{order.loyaltyInfo.currentTier} Tier</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    You have {order.loyaltyInfo.currentPoints} points
                  </p>
                </div>

                {/* Points from this order */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Gift className="w-6 h-6 text-[#688F4E]" />
                    <h3 className="font-semibold">Points Earned</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Purchase Points:</span>
                      <span className="font-medium">+{order.pointsEarned}</span>
                    </div>
                    {order.order.status === 'delivered' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Delivery Bonus:</span>
                        <span className="font-medium">+{order.deliveryBonusPoints}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-[#2B463C]">
                      <span>Total Points:</span>
                      <span>+{order.totalPointsFromOrder}</span>
                    </div>
                  </div>
                </div>

                {/* Progress to next tier */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-3">Progress to Next Tier</h3>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-[#688F4E] to-[#B1D182] h-2 rounded-full" 
                      style={{ width: `${order.loyaltyInfo.progressToNextTier}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {order.loyaltyInfo.nextTierPoints - order.loyaltyInfo.currentPoints} points needed for next tier
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Order Actions */}
          {order.order.status === 'pending' && (
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                Cancel Order
              </button>
              {order.order.payment?.method !== 'cash_on_delivery' && (
                <button className="px-6 py-3 bg-[#688F4E] text-white rounded-lg hover:bg-[#5a7a42] transition-colors">
                  Pay Now
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;