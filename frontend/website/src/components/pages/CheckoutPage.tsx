import React, { useState, useEffect } from 'react';
import { useCartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Check, Lock, Shield, Truck, CreditCard, MapPin, User, Mail, Phone, Download } from 'lucide-react';

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart, isLoading } = useCartContext();
  const { token, user } = useAuth();
  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    street: '', city: '', state: '', zipCode: '', country: 'India'
  });
  const [billing, setBilling] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    street: '', city: '', state: '', zipCode: '', country: 'India'
  });
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) return;
      
      try {
        setLoadingProfile(true);
        const response = await fetch('http://localhost:3500/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUserProfile(data.user);
          
          // Auto-populate shipping address from user profile
          if (data.user) {
            const userData = data.user;
            const addressData = {
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              email: userData.email || '',
              phone: userData.phone || '',
              street: userData.address?.street || '',
              city: userData.address?.city || '',
              state: userData.address?.state || '',
              zipCode: userData.address?.zipCode || '',
              country: userData.address?.country || 'India'
            };
            
            setShipping(addressData);
            setBilling(addressData);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  // Debug: Log cart items when they change
  useEffect(() => {
    console.log('Cart items in checkout:', cartItems);
    console.log('Cart loading state:', isLoading);
    console.log('Cart items length:', cartItems.length);
    console.log('Cart items details:', JSON.stringify(cartItems, null, 2));
  }, [cartItems, isLoading]);

  // Auto-fill billing address when useSameAddress is true
  useEffect(() => {
    if (useSameAddress) {
      setBilling(shipping);
    }
  }, [shipping, useSameAddress]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, type: 'shipping' | 'billing') => {
    const { name, value } = e.target;
    if (type === 'shipping') setShipping((prev) => ({ ...prev, [name]: value }));
    else setBilling((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Check if user is authenticated
    if (!token) {
      setError('You must be logged in to place an order. Please log in and try again.');
      setLoading(false);
      navigate('/login');
      return;
    }
    
    // Frontend validation
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 'street', 'city', 'state', 'zipCode', 'country'
    ];
    for (const field of requiredFields) {
      if (!(shipping as any)[field]) {
        setError(`Shipping address: ${field} is required.`);
        setLoading(false);
        return;
      }
      if (!useSameAddress && !(billing as any)[field]) {
        setError(`Billing address: ${field} is required.`);
        setLoading(false);
        return;
      }
    }
    for (const item of cartItems) {
      if (!item.id || typeof item.id !== 'string' || item.id.length < 12) {
        setError('Invalid product in cart.');
        setLoading(false);
        return;
      }
      if (!item.quantity || item.quantity < 1) {
        setError('Invalid quantity for a cart item.');
        setLoading(false);
        return;
      }
    }
    
    const payload = {
      items: cartItems.map(item => ({ product: item.id, quantity: item.quantity })),
      shippingAddress: shipping,
      billingAddress: useSameAddress ? shipping : billing,
      payment: { method: paymentMethod },
    };
    
    // Debug logging
    console.log('Token being sent:', token);
    console.log('Token length:', token ? token.length : 0);
    console.log('Order payload:', payload);
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    console.log('Request headers:', headers);
    
    try {
      const res = await fetch('http://localhost:3500/api/customer/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        credentials: 'include',
      });
      
      console.log('Response status:', res.status);
      const data = await res.json();
      console.log('Response data:', data);
      
      if (!res.ok) throw new Error(data.message || 'Order failed');
      setSuccess(true);
      clearCart();
      setTimeout(() => navigate('/'), 3000);
    } catch (err: any) {
      console.error('Order error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while cart is being initialized
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#688F4E] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase. You will receive an email confirmation shortly.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#688F4E] text-white px-6 py-3 rounded-lg hover:bg-[#2B463C] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-[#688F4E]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-[#688F4E] text-white' : 'bg-gray-200'}`}>
                {currentStep > 1 ? <Check className="w-5 h-5" /> : '1'}
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-[#688F4E]' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-[#688F4E]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-[#688F4E] text-white' : 'bg-gray-200'}`}>
                {currentStep > 2 ? <Check className="w-5 h-5" /> : '2'}
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
            <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-[#688F4E]' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${currentStep >= 3 ? 'text-[#688F4E]' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-[#688F4E] text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some products to your cart to continue with checkout.</p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-[#688F4E] text-white px-6 py-3 rounded-lg hover:bg-[#2B463C] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Address */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <MapPin className="w-6 h-6 text-[#688F4E] mr-3" />
                      <h3 className="text-xl font-bold text-gray-900">Shipping Address</h3>
                    </div>
                    {userProfile && (
                      <button
                        type="button"
                        onClick={() => {
                          // Re-populate from user profile
                          if (userProfile) {
                            const addressData = {
                              firstName: userProfile.firstName || '',
                              lastName: userProfile.lastName || '',
                              email: userProfile.email || '',
                              phone: userProfile.phone || '',
                              street: userProfile.address?.street || '',
                              city: userProfile.address?.city || '',
                              state: userProfile.address?.state || '',
                              zipCode: userProfile.address?.zipCode || '',
                              country: userProfile.address?.country || 'India'
                            };
                            setShipping(addressData);
                            if (useSameAddress) {
                              setBilling(addressData);
                            }
                          }
                        }}
                        className="flex items-center space-x-2 text-sm text-[#688F4E] hover:text-[#2B463C] transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Use Saved Address</span>
                      </button>
                    )}
                  </div>
                  
                  {loadingProfile && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#688F4E]"></div>
                        <span className="text-sm text-blue-700">Loading your saved address...</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input 
                        required 
                        name="firstName" 
                        placeholder="Enter first name" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                        value={shipping.firstName} 
                        onChange={e => handleInput(e, 'shipping')} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input 
                        required 
                        name="lastName" 
                        placeholder="Enter last name" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                        value={shipping.lastName} 
                        onChange={e => handleInput(e, 'shipping')} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input 
                        required 
                        name="email" 
                        type="email"
                        placeholder="Enter email address" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                        value={shipping.email} 
                        onChange={e => handleInput(e, 'shipping')} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input 
                        required 
                        name="phone" 
                        placeholder="Enter phone number" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                        value={shipping.phone} 
                        onChange={e => handleInput(e, 'shipping')} 
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                      <input 
                        required 
                        name="street" 
                        placeholder="Enter street address" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                        value={shipping.street} 
                        onChange={e => handleInput(e, 'shipping')} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input 
                        required 
                        name="city" 
                        placeholder="Enter city" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                        value={shipping.city} 
                        onChange={e => handleInput(e, 'shipping')} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input 
                        required 
                        name="state" 
                        placeholder="Enter state" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                        value={shipping.state} 
                        onChange={e => handleInput(e, 'shipping')} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input 
                        required 
                        name="zipCode" 
                        placeholder="Enter ZIP code" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                        value={shipping.zipCode} 
                        onChange={e => handleInput(e, 'shipping')} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                      <input 
                        required 
                        name="country" 
                        placeholder="Enter country" 
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                        value={shipping.country} 
                        onChange={e => handleInput(e, 'shipping')} 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Billing Address */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <CreditCard className="w-6 h-6 text-[#688F4E] mr-3" />
                      <h3 className="text-xl font-bold text-gray-900">Billing Address</h3>
                    </div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={useSameAddress}
                        onChange={(e) => setUseSameAddress(e.target.checked)}
                        className="rounded border-gray-300 text-[#688F4E] focus:ring-[#688F4E]"
                      />
                      <span className="ml-2 text-sm text-gray-600">Same as shipping address</span>
                    </label>
                  </div>
                  
                  {!useSameAddress && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input 
                          required 
                          name="firstName" 
                          placeholder="Enter first name" 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                          value={billing.firstName} 
                          onChange={e => handleInput(e, 'billing')} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input 
                          required 
                          name="lastName" 
                          placeholder="Enter last name" 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                          value={billing.lastName} 
                          onChange={e => handleInput(e, 'billing')} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input 
                          required 
                          name="email" 
                          type="email"
                          placeholder="Enter email address" 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                          value={billing.email} 
                          onChange={e => handleInput(e, 'billing')} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input 
                          required 
                          name="phone" 
                          placeholder="Enter phone number" 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                          value={billing.phone} 
                          onChange={e => handleInput(e, 'billing')} 
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                        <input 
                          required 
                          name="street" 
                          placeholder="Enter street address" 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                          value={billing.street} 
                          onChange={e => handleInput(e, 'billing')} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input 
                          required 
                          name="city" 
                          placeholder="Enter city" 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                          value={billing.city} 
                          onChange={e => handleInput(e, 'billing')} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input 
                          required 
                          name="state" 
                          placeholder="Enter state" 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                          value={billing.state} 
                          onChange={e => handleInput(e, 'billing')} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                        <input 
                          required 
                          name="zipCode" 
                          placeholder="Enter ZIP code" 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                          value={billing.zipCode} 
                          onChange={e => handleInput(e, 'billing')} 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <input 
                          required 
                          name="country" 
                          placeholder="Enter country" 
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent" 
                          value={billing.country} 
                          onChange={e => handleInput(e, 'billing')} 
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Payment Method */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center mb-6">
                    <CreditCard className="w-6 h-6 text-[#688F4E] mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Payment Method</h3>
                  </div>
                  <select 
                    value={paymentMethod} 
                    onChange={e => setPaymentMethod(e.target.value)} 
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#688F4E] focus:border-transparent"
                  >
                    <option value="cash_on_delivery">Cash on Delivery</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="stripe">Stripe</option>
                  </select>
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="w-full bg-[#688F4E] text-white py-4 rounded-lg font-semibold hover:bg-[#2B463C] transition-colors disabled:bg-gray-400 flex items-center justify-center space-x-2" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Placing Order...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Place Order Securely</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.packSize}`} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Pack of {item.packSize} x {item.quantity}</p>
                      <p className="text-sm font-medium text-[#688F4E]">₹{(item.price * item.quantity).toFixed(0)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
                  <span>Total</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">Secure Checkout</span>
                </div>
                <p className="text-xs text-green-700 mt-1">Your payment information is encrypted and secure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;