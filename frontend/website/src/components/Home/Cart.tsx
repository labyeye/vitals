import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight, Tag, Check, AlertCircle, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';

export interface CartItem {
  id: string;
  name: string;
  packSize: number;
  quantity: number;
  price: number;
  image: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout?: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem, onProceedToCheckout }) => {
  const { 
    promoCode, 
    applyPromoCode, 
    removePromoCode, 
    promoCodeLoading, 
    promoCodeError,
    evolvPointsRedemption,
    applyEvolvPoints,
    removeEvolvPoints,
    evolvPointsLoading,
    evolvPointsError,
    userEvolvPoints,
    fetchUserEvolvPoints
  } = useCartContext();
  
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [evolvPointsInput, setEvolvPointsInput] = useState('');
  const [showEvolvPointsInput, setShowEvolvPointsInput] = useState(false);
  
  // Fetch user Thryv points when cart opens
  useEffect(() => {
    if (isOpen) {
      fetchUserEvolvPoints();
    }
  }, [isOpen, fetchUserEvolvPoints]);
  
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 50;
  const promoDiscount = promoCode?.discountAmount || 0;
  const evolvDiscount = evolvPointsRedemption?.discountAmount || 0;
  const totalDiscount = promoDiscount + evolvDiscount;
  const total = subtotal + shipping - totalDiscount;
  const navigate = useNavigate();

  const handleApplyPromoCode = async () => {
    if (!promoCodeInput.trim()) return;
    
    try {
      await applyPromoCode(promoCodeInput.trim());
      setPromoCodeInput('');
      setShowPromoInput(false);
    } catch (error) {
      // Error is handled in context
    }
  };

  const handleApplyEvolvPoints = async () => {
    const pointsToRedeem = parseInt(evolvPointsInput);
    if (!pointsToRedeem || pointsToRedeem <= 0) return;
    
    try {
      await applyEvolvPoints(pointsToRedeem);
      setEvolvPointsInput('');
      setShowEvolvPointsInput(false);
    } catch (error) {
      // Error is handled in context
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Cart Panel */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white/95 backdrop-blur-lg shadow-2xl transform transition-transform duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-[#688F4E]" />
            <h2 className="text-xl font-bold text-[#2B463C]">Your Cart</h2>
            <span className="bg-[#688F4E] text-white text-sm px-2 py-1 rounded-full">
              {items.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-[#B1D182] to-[#688F4E] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#2B463C] mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6">Add some delicious protein shakes to get started!</p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-[#2B463C] to-[#688F4E] text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.packSize}`}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#2B463C] truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600">Pack of {item.packSize}</p>
                    <p className="text-lg font-bold text-[#688F4E]">₹{item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onUpdateQuantity(`${item.id}-${item.packSize}`, Math.max(0, item.quantity - 1))}
                      className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-[#688F4E] flex items-center justify-center transition-colors duration-200"
                    >
                      <Minus className="w-4 h-4 text-[#2B463C]" />
                    </button>
                    <span className="w-8 text-center font-semibold text-[#2B463C]">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(`${item.id}-${item.packSize}`, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-[#688F4E] flex items-center justify-center transition-colors duration-200"
                    >
                      <Plus className="w-4 h-4 text-[#2B463C]" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(`${item.id}-${item.packSize}`)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Discount Options Section */}
            <div className="space-y-3">
              {/* Promo Code Section */}
              {!promoCode && !evolvPointsRedemption && !showPromoInput && !showEvolvPointsInput && (
                <div className="space-y-2">
                  <button
                    onClick={() => setShowPromoInput(true)}
                    className="flex items-center space-x-2 text-[#688F4E] hover:text-[#2B463C] transition-colors duration-200"
                  >
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-medium">Have a promo code?</span>
                  </button>
                  
                  {userEvolvPoints > 0 && (
                    <button
                      onClick={() => setShowEvolvPointsInput(true)}
                      className="flex items-center space-x-2 text-[#688F4E] hover:text-[#2B463C] transition-colors duration-200"
                    >
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        Redeem Thryv Points ({userEvolvPoints} available)
                      </span>
                    </button>
                  )}
                </div>
              )}

              {showPromoInput && !promoCode && !evolvPointsRedemption && (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#688F4E] focus:border-transparent text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyPromoCode()}
                    />
                    <button
                      onClick={handleApplyPromoCode}
                      disabled={promoCodeLoading || !promoCodeInput.trim()}
                      className="px-4 py-2 bg-[#688F4E] text-white rounded-lg hover:bg-[#2B463C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
                    >
                      {promoCodeLoading ? 'Loading...' : 'Apply'}
                    </button>
                  </div>
                  {promoCodeError && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{promoCodeError}</span>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setShowPromoInput(false);
                      setPromoCodeInput('');
                    }}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {showEvolvPointsInput && !promoCode && !evolvPointsRedemption && (
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={evolvPointsInput}
                      onChange={(e) => setEvolvPointsInput(e.target.value)}
                      placeholder={`Enter points (max ${userEvolvPoints})`}
                      max={userEvolvPoints}
                      min="1"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#688F4E] focus:border-transparent text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyEvolvPoints()}
                    />
                    <button
                      onClick={handleApplyEvolvPoints}
                      disabled={evolvPointsLoading || !evolvPointsInput || parseInt(evolvPointsInput) <= 0}
                      className="px-4 py-2 bg-[#688F4E] text-white rounded-lg hover:bg-[#2B463C] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-sm font-medium"
                    >
                      {evolvPointsLoading ? 'Loading...' : 'Redeem'}
                    </button>
                  </div>
                  {evolvPointsError && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{evolvPointsError}</span>
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    1 Thryv Point = ₹1 discount
                  </div>
                  <button
                    onClick={() => {
                      setShowEvolvPointsInput(false);
                      setEvolvPointsInput('');
                    }}
                    className="text-gray-500 hover:text-gray-700 text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}

              {promoCode && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        {promoCode.code} applied
                      </span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-green-600 hover:text-green-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-xs text-green-600 mt-1">{promoCode.description}</p>
                </div>
              )}

              {evolvPointsRedemption && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">
                        {evolvPointsRedemption.pointsToRedeem} Thryv Points redeemed
                      </span>
                    </div>
                    <button
                      onClick={removeEvolvPoints}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    ₹{evolvPointsRedemption.discountAmount} discount applied
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              
              {promoCode && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({promoCode.code})</span>
                  <span>-₹{promoDiscount.toFixed(0)}</span>
                </div>
              )}

              {evolvPointsRedemption && (
                <div className="flex justify-between text-blue-600">
                  <span>Thryv Points Discount</span>
                  <span>-₹{evolvDiscount.toFixed(0)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
              </div>
              
              {subtotal < 1000 && (
                <p className="text-sm text-[#688F4E]">
                  Add ₹{1000 - subtotal} more for free shipping!
                </p>
              )}
              
              <div className="flex justify-between text-lg font-bold text-[#2B463C] pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>₹{Math.max(0, total).toFixed(0)}</span>
              </div>
            </div>

            <button
              className="w-full bg-gradient-to-r from-[#2B463C] to-[#688F4E] text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              onClick={() => {
                if (onProceedToCheckout) {
                  onProceedToCheckout();
                } else {
                  onClose();
                  navigate('/checkout');
                }
              }}
              disabled={items.length === 0}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <div className="text-center">
              <button
                onClick={onClose}
                className="text-[#688F4E] hover:text-[#2B463C] font-medium transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;