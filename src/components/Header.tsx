import React, { useState } from "react";
import { ShoppingCart, Menu, X, Search, Heart, User } from "lucide-react";
import bg from "../assets/images/bg-navbar.jpg";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/20"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#home"
                className="text-white hover:text-[#688F4E] transition-colors duration-300 font-medium"
              >
                Home
              </a>
              <a
                href="#products"
                className="text-white hover:text-[#688F4E] transition-colors duration-300 font-medium"
              >
                Products
              </a>
              <a
                href="#about"
                className="text-white hover:text-[#688F4E] transition-colors duration-300 font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-white hover:text-[#688F4E] transition-colors duration-300 font-medium"
              >
                Contact
              </a>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-white hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-white hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 text-white hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-white hover:text-[#688F4E] transition-all duration-300 hover:bg-[#F4F1E9] rounded-full group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#688F4E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#688F4E] transition-colors duration-300"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 border-b border-white/20 shadow-lg">
            <nav className="px-4 py-6 space-y-4">
              <a
                href="#home"
                className="block text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300 font-medium"
              >
                Home
              </a>
              <a
                href="#products"
                className="block text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300 font-medium"
              >
                Products
              </a>
              <a
                href="#about"
                className="block text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300 font-medium"
              >
                About
              </a>
              <a
                href="#contact"
                className="block text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300 font-medium"
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
                <button
                  onClick={onCartClick}
                  className="relative p-2 text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#688F4E] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
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