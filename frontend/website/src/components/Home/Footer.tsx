import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  Award,
  Shield,
  Leaf
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-[#2B463C] via-[#2B463C] to-[#688F4E] text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Stay Fueled with Updates</h3>
            <p className="text-white/80 mb-8">
              Get the latest nutrition tips, exclusive offers, and new flavor launches delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
              />
              <button className="bg-white text-[#2B463C] px-8 py-3 rounded-2xl font-semibold hover:bg-white/90 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>Subscribe</span>
              </button>
            </div>
            <p className="text-xs text-white/60 mt-4">
              No spam, just pure nutrition goodness. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#2B463C] font-bold text-lg">V</span>
              </div>
              <span className="text-2xl font-bold">Evolv</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Protein that tastes like dessert. Made in India, formulated for your success. 
              No scooping, no mixing, no compromise.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300">
                <Youtube className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Products</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Strawberry Protein Shake
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Chocolate Protein Shake
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Vanilla Protein Shake
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Coffee Protein Shake
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Variety Pack
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Nutrition Science
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Quality Promise
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3 mb-6">
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Nutrition Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-white transition-colors duration-200">
                  Contact Us
                </a>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/80">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@Evolv.in</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-white/10 mt-16 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <Award className="w-8 h-8" />
              </div>
              <h5 className="font-semibold mb-1">Quality Tested</h5>
              <p className="text-xs text-white/60">Rigorously tested for purity</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <Shield className="w-8 h-8" />
              </div>
              <h5 className="font-semibold mb-1">Safe & Secure</h5>
              <p className="text-xs text-white/60">100% secure payments</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <Leaf className="w-8 h-8" />
              </div>
              <h5 className="font-semibold mb-1">Clean Ingredients</h5>
              <p className="text-xs text-white/60">No artificial additives</p>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                <div className="w-8 h-6 bg-gradient-to-b from-orange-500 via-white via-50% to-green-500 rounded-sm"></div>
              </div>
              <h5 className="font-semibold mb-1">Made in India</h5>
              <p className="text-xs text-white/60">Proudly Indian brand</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-white/80">
              <span>&copy; {currentYear} Thryv Protein Shakes. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-white/80 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-white/80 hover:text-white text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <a href="https://pixelatenest.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors duration-200">
               Developed by Pixelate Nest</a>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;