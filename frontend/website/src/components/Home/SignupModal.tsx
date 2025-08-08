import React, { useState } from 'react';
import { X, Gift, Star, Zap } from 'lucide-react';

interface SignupModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isVisible, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store that user has signed up
    localStorage.setItem('vitalsSignupComplete', 'true');
    
    setIsSubmitting(false);
    onClose();
    
    // Show success message (you can integrate with your notification system)
    alert('Welcome to Thryv! Check your email for exclusive offers.');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full mx-4 relative overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1 shadow-md"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-[#688F4E] to-[#2B463C] text-white p-8 text-center">
          <div className="mb-4">
            <Gift className="w-16 h-16 mx-auto mb-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Welcome to Thryv! 🎉
          </h2>
          <p className="text-white/90">
            Join thousands who've transformed their nutrition
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Benefits */}
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-3">
              <Star className="w-5 h-5 text-[#688F4E]" />
              <span className="text-gray-700">Exclusive 20% OFF your first order</span>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-5 h-5 text-[#688F4E]" />
              <span className="text-gray-700">Early access to new flavors</span>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <Gift className="w-5 h-5 text-[#688F4E]" />
              <span className="text-gray-700">Free nutrition guide & recipes</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#688F4E]/50 focus:border-[#688F4E]"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#688F4E]/50 focus:border-[#688F4E]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#688F4E] to-[#2B463C] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Joining...' : 'Get My 20% OFF 🎯'}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              No spam, unsubscribe anytime. By signing up, you agree to our terms.
            </p>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="bg-gray-50 px-8 py-4 text-center border-t">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div>10,000+ Happy Customers</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
