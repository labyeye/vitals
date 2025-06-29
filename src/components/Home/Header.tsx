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
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/20"
      style={{
        backgroundColor: "#f4f1e9",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation (Desktop) */}
          <div className="flex items-center space-x-8 ml-[-290px]">
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="home"
                className="text-BLACK text-xl hover:text-[#688F4E] transition-colors duration-300 font-large"
              >
                Home
              </a>
              <a
                href="products"
                className="text-BLACK text-xl hover:text-[#688F4E] transition-colors duration-300 font-large"
              >
                Products
              </a>
              <a
                href="about"
                className="text-BLACK text-xl hover:text-[#688F4E] transition-colors duration-300 font-large"
              >
                About
              </a>
              <a
                href="contact"
                className="text-BLACK text-xl hover:text-[#688F4E] transition-colors duration-300 font-large"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Centered Logo with Vertical Text */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
            <a href="#home" className="flex items-center">
              <img src={logo} alt="Company Logo" className="h-20 w-auto" />
            </a>
            <div className="flex flex-col justify-center border-l border-[#688F4E] pl-4">
              <span className="text-2xl font-bold text-[#688F4E] uppercase tracking-wider vertical-rl ">
                Vital
              </span>
              <span className="text-s text-BLACK mt-0 vertical-rl ">
                Fresh feasts, great treats
              </span>
            </div>
          </div>

          {/* Right Navigation (Desktop) */}
          <div className="hidden md:flex items-center space-x-4 mr-[-180px]">
            <button className="p-2 text-BLACK hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
              <Search className="w-7 h-7" />
            </button>
            <button className="p-2 text-BLACK hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
              <Heart className="w-7 h-7" />
            </button>
            <button className="p-2 text-BLACK hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
              <User className="w-7 h-7" />
            </button>
            <button
              onClick={onCartClick}
              className="relative p-2 text-BLACK hover:text-[#688F4E] transition-all duration-300 hover:bg-[#F4F1E9] rounded-full group"
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

        {/* Mobile Menu (unchanged) */}
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
