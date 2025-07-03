import React, { useState } from "react";
import { ShoppingCart, Menu, X, Search, Heart, User } from "lucide-react";
import logo from "../../assets/images/logoblack.png";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-[#f4f1e9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation (Desktop) */}
          <div className="hidden md:flex items-center flex-1">
            <nav className="flex items-center space-x-8">
              <a
                href="/"
                className="text-black text-xl hover:text-[#688F4E] transition-colors duration-300 font-large"
              >
                Home
              </a>
              <a
                href="products"
                className="text-black text-xl hover:text-[#688F4E] transition-colors duration-300 font-large"
              >
                Products
              </a>
              <a
                href="about"
                className="text-black text-xl hover:text-[#688F4E] transition-colors duration-300 font-large"
              >
                About
              </a>
              <a
                href="contact"
                className="text-black text-xl hover:text-[#688F4E] transition-colors duration-300 font-large"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Centered Logo with Vertical Text */}
          <div className="flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <a href="#home" className="flex items-center">
              <img src={logo} alt="Company Logo" className="h-20 w-auto" />
            </a>
            <div className="hidden md:flex flex-col justify-center border-l border-[#688F4E] pl-4">
              <span className="text-2xl font-bold text-[#688F4E] uppercase tracking-wider vertical-rl">
                Vital
              </span>
              <span className="text-s text-black mt-0 vertical-rl">
                Fresh feasts, great treats
              </span>
            </div>
          </div>

          {/* Right Navigation (Desktop) */}
          <div className="hidden md:flex items-center justify-end flex-1 space-x-4">
            <button className="p-2 text-black hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
              <Search className="w-7 h-7" />
            </button>
            <button className="p-2 text-black hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
              <Heart className="w-7 h-7" />
            </button>
            <button className="p-2 text-black hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
              <User className="w-7 h-7" />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-black hover:text-[#688F4E] transition-all duration-300 hover:bg-[#F4F1E9] rounded-full group"
            >
              <ShoppingCart className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#688F4E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-black hover:text-[#688F4E] transition-all duration-300 rounded-full"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#688F4E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-black hover:text-[#688F4E] transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 border-b border-white/20 shadow-lg">
            <nav className="px-4 py-6 space-y-4">
              <a
                href="/"
                className="block text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="products"
                className="block text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </a>
              <a
                href="about"
                className="block text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="contact"
                className="block text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <div className="flex items-center space-x-4 pt-4 border-t border-[#B1D182]/30">
                <button className="p-2 text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300">
                  <User className="w-5 h-5" />
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
