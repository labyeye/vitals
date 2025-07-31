import React, { useState } from "react";
import { ShoppingCart, Menu, X, Search, Heart, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/logoblack.png";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-[#f4f1e9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
          {/* Left Navigation (Desktop) */}
          <div className="hidden md:flex items-center flex-1">
            <nav className="flex items-center space-x-3 lg:space-x-4 xl:space-x-5">
              <a
                href="/"
                className="text-black text-sm lg:text-base xl:text-m hover:text-[#688F4E] transition-colors duration-300 font-medium"
              >
                Home
              </a>
              <a
                href="about"
                className="text-black text-sm lg:text-base xl:text-m hover:text-[#688F4E] transition-colors duration-300 font-medium"
              >
                About
              </a>
              <a
                href="products"
                className="text-black text-sm lg:text-base xl:text-m hover:text-[#688F4E] transition-colors duration-300 font-medium"
              >
                Products
              </a>
              <a
                href="blogs"
                className="text-black text-sm lg:text-base xl:text-m hover:text-[#688F4E] transition-colors duration-300 font-medium"
              >
                Blogs
              </a>
              <a
                href="contact"
                className="text-black text-sm lg:text-base xl:text-m hover:text-[#688F4E] transition-colors duration-300 font-medium"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Centered Logo with Vertical Text */}
          <div className="flex items-center justify-center md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
            <a href="#home" className="flex items-center">
              <img
                src={logo}
                alt="Company Logo"
                className="h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20 w-auto"
              />
            </a>
            <div className="hidden md:flex flex-col justify-center border-l border-[#688F4E] pl-2 lg:pl-3 xl:pl-4">
              <span className="text-base lg:text-lg xl:text-xl font-bold text-[#688F4E] uppercase tracking-wider vertical-rl">
                Vital
              </span>
              <span className="text-xs lg:text-xs xl:text-sm text-black mt-0 vertical-rl">
                Fresh feasts, great treats
              </span>
            </div>
          </div>

          {/* Right Navigation (Desktop) */}
          <div className="hidden md:flex items-center justify-end flex-1 space-x-2 lg:space-x-3 xl:space-x-4">
            <button className="p-1 lg:p-1.5 xl:p-2 text-black hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
              <Search className="w-5 h-5 lg:w-6 lg:h-6 xl:w-6 xl:h-7" />
            </button>
            <button className="p-1 lg:p-1.5 xl:p-2 text-black hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
              <Heart className="w-5 h-5 lg:w-6 lg:h-6 xl:w-6 xl:h-7" />
            </button>
            {user ? (
              <div className="relative group">
                <button className="p-1 lg:p-1.5 xl:p-2 text-black hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
                  <User className="w-5 h-5 lg:w-6 lg:h-6 xl:w-6 xl:h-7" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#B1D182]/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm text-[#2B463C] border-b border-[#B1D182]/20">
                      Welcome, {user.firstName}!
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-[#2B463C] hover:bg-[#f4f1e9] transition-colors duration-300"
                    >
                      Profile
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-[#2B463C] hover:bg-[#f4f1e9] transition-colors duration-300"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-300 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="p-1 lg:p-1.5 xl:p-2 text-black hover:text-[#688F4E] transition-colors duration-300 hover:bg-[#F4F1E9] rounded-full">
                <User className="w-5 h-5 lg:w-6 lg:h-6 xl:w-6 xl:h-7" />
              </Link>
            )}
            <button
              onClick={onCartClick}
              className="relative p-1 lg:p-1.5 xl:p-2 text-black hover:text-[#688F4E] transition-all duration-300 hover:bg-[#F4F1E9] rounded-full group"
            >
              <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 xl:w-6 xl:h-7 group-hover:scale-110 transition-transform duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#688F4E] text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={onCartClick}
              className="relative p-1 text-black hover:text-[#688F4E] transition-all duration-300 rounded-full"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#688F4E] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 text-black hover:text-[#688F4E] transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 border-b border-white/20 shadow-lg">
            <nav className="px-4 py-4 space-y-3">
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
                href="updates"
                className="block text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Updates
              </a>
              <a
                href="blogs"
                className="block text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
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
              <div className="flex items-center space-x-3 pt-3 border-t border-[#B1D182]/30">
                <button className="p-1 text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300">
                  <Search className="w-4 h-4" />
                </button>
                <button className="p-1 text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300">
                  <Heart className="w-4 h-4" />
                </button>
                {user ? (
                  <div className="flex flex-col space-y-2">
                    <div className="px-4 py-2 text-sm text-[#2B463C] border-b border-[#B1D182]/20">
                      Welcome, {user.firstName}!
                    </div>
                    <Link
                      to="/profile"
                      className="p-1 text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/dashboard"
                        className="text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300 text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="text-left text-red-600 hover:text-red-700 transition-colors duration-300 text-sm flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="p-1 text-[#2B463C] hover:text-[#688F4E] transition-colors duration-300">
                    <User className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
