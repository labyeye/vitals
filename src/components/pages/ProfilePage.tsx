import React, { useState } from "react";
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  LogOut, 
  Crown, 
  Star, 
  Award,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CreditCard,
  Shield,
  Gift,
  TrendingUp,
  ShoppingBag,
  Eye,
  Edit
} from "lucide-react";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Mumbai, Maharashtra 400001",
    joinDate: "January 2024",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    totalOrders: 47,
    totalSpent: 12500,
    loyaltyPoints: 2840,
    currentTier: "Gold",
    nextTier: "Platinum",
    progressToNextTier: 75,
    pointsToNextTier: 160
  };

  // Milestone tiers
  const tiers = [
    { name: "Bronze", minPoints: 0, maxPoints: 999, color: "#CD7F32", icon: Star },
    { name: "Silver", minPoints: 1000, maxPoints: 2999, color: "#C0C0C0", icon: Award },
    { name: "Gold", minPoints: 3000, maxPoints: 9999, color: "#FFD700", icon: Crown },
    { name: "Platinum", minPoints: 10000, maxPoints: 29999, color: "#E5E4E2", icon: Crown },
    { name: "Diamond", minPoints: 30000, maxPoints: 999999, color: "#B9F2FF", icon: Crown }
  ];

  // Recent orders
  const recentOrders = [
    {
      id: "ORD-001",
      date: "2024-12-15",
      status: "Delivered",
      total: 1200,
      items: ["Chocolate Protein Shake", "Vanilla Protein Shake"]
    },
    {
      id: "ORD-002", 
      date: "2024-12-10",
      status: "In Transit",
      total: 800,
      items: ["Berry Protein Shake"]
    },
    {
      id: "ORD-003",
      date: "2024-12-05", 
      status: "Delivered",
      total: 1500,
      items: ["Chocolate Protein Shake", "Protein Bars"]
    }
  ];

  const getCurrentTier = () => tiers.find(tier => tier.name === user.currentTier);
  const getNextTier = () => tiers.find(tier => tier.name === user.nextTier);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F1E9] via-white to-[#B1D182]/10 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#688F4E]"
              />
              <button className="absolute -bottom-2 -right-2 bg-[#688F4E] text-white p-2 rounded-full hover:bg-[#5a7a42] transition-colors">
                <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-[#2B463C] mb-2">{user.name}</h1>
              <p className="text-gray-600 mb-2">{user.email}</p>
              <p className="text-gray-600 mb-4">Member since {user.joinDate}</p>
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 text-[#688F4E]">
                  <Package className="w-5 h-5" />
                  <span className="font-medium">{user.totalOrders} Orders</span>
                </div>
                <div className="flex items-center gap-2 text-[#688F4E]">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">₹{user.totalSpent.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loyalty Program Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-[#FFD700]" />
            <h2 className="text-2xl font-bold text-[#2B463C]">Loyalty Program</h2>
          </div>
          
          {/* Current Tier */}
          <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Current Tier: {user.currentTier}</h3>
                <p className="text-white/90">{user.loyaltyPoints} Points</p>
              </div>
              <Crown className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Progress to Next Tier */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-700 font-medium">Progress to {user.nextTier}</span>
              <span className="text-[#688F4E] font-bold">{user.progressToNextTier}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-[#688F4E] to-[#B1D182] h-3 rounded-full transition-all duration-500"
                style={{ width: `${user.progressToNextTier}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {user.pointsToNextTier} more points needed for {user.nextTier}
            </p>
          </div>

          {/* All Tiers */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              const isCurrentTier = tier.name === user.currentTier;
              const isUnlocked = user.loyaltyPoints >= tier.minPoints;
              
              return (
                <div 
                  key={tier.name}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    isCurrentTier 
                      ? 'border-[#FFD700] bg-[#FFD700]/10' 
                      : isUnlocked 
                        ? 'border-gray-300 bg-gray-50' 
                        : 'border-gray-200 bg-gray-100 opacity-50'
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-2 ${
                    isCurrentTier ? 'text-[#FFD700]' : 'text-gray-400'
                  }`} />
                  <h4 className="font-semibold text-sm">{tier.name}</h4>
                  <p className="text-xs text-gray-600">{tier.minPoints}+ pts</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { id: "overview", label: "Overview", icon: User },
              { id: "orders", label: "Orders", icon: Package },
              { id: "wishlist", label: "Wishlist", icon: Heart },
              { id: "settings", label: "Settings", icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#688F4E] border-b-2 border-[#688F4E]'
                      : 'text-gray-600 hover:text-[#688F4E]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-bold text-[#2B463C] mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-[#688F4E]" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-[#688F4E]" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg md:col-span-2">
                      <MapPin className="w-5 h-5 text-[#688F4E]" />
                      <div>
                        <p className="text-sm text-gray-600">Address</p>
                        <p className="font-medium">{user.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <h3 className="text-xl font-bold text-[#2B463C] mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-[#688F4E]/10 rounded-lg">
                      <ShoppingBag className="w-8 h-8 text-[#688F4E] mx-auto mb-2" />
                      <p className="text-2xl font-bold text-[#2B463C]">{user.totalOrders}</p>
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                    <div className="text-center p-4 bg-[#688F4E]/10 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-[#688F4E] mx-auto mb-2" />
                      <p className="text-2xl font-bold text-[#2B463C]">₹{user.totalSpent.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                    <div className="text-center p-4 bg-[#688F4E]/10 rounded-lg">
                      <Gift className="w-8 h-8 text-[#688F4E] mx-auto mb-2" />
                      <p className="text-2xl font-bold text-[#2B463C]">{user.loyaltyPoints}</p>
                      <p className="text-sm text-gray-600">Loyalty Points</p>
                    </div>
                    <div className="text-center p-4 bg-[#688F4E]/10 rounded-lg">
                      <Crown className="w-8 h-8 text-[#688F4E] mx-auto mb-2" />
                      <p className="text-2xl font-bold text-[#2B463C]">{user.currentTier}</p>
                      <p className="text-sm text-gray-600">Current Tier</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h3 className="text-xl font-bold text-[#2B463C] mb-4">Recent Orders</h3>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-[#2B463C]">{order.id}</h4>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'Delivered' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{order.date}</p>
                      <p className="text-gray-600 text-sm mb-2">
                        {order.items.join(", ")}
                      </p>
                      <p className="font-semibold text-[#2B463C]">₹{order.total}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <h3 className="text-xl font-bold text-[#2B463C] mb-4">My Wishlist</h3>
                <div className="text-center py-8">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">Your wishlist is empty</p>
                  <button className="mt-4 px-6 py-2 bg-[#688F4E] text-white rounded-lg hover:bg-[#5a7a42] transition-colors">
                    Start Shopping
                  </button>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#2B463C] mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <button className="flex items-center gap-3 w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <User className="w-5 h-5 text-[#688F4E]" />
                      <span className="text-left">Edit Profile</span>
                    </button>
                    <button className="flex items-center gap-3 w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Shield className="w-5 h-5 text-[#688F4E]" />
                      <span className="text-left">Privacy Settings</span>
                    </button>
                    <button className="flex items-center gap-3 w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <CreditCard className="w-5 h-5 text-[#688F4E]" />
                      <span className="text-left">Payment Methods</span>
                    </button>
                    <button className="flex items-center gap-3 w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Eye className="w-5 h-5 text-[#688F4E]" />
                      <span className="text-left">Notification Preferences</span>
                    </button>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <button className="flex items-center gap-3 w-full p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-red-600">
                    <LogOut className="w-5 h-5" />
                    <span className="text-left">Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 