import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Menu, X, FileText, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <motion.nav 
      className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">RedactPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-purple-600 ${
                  isActive(item.path) ? 'text-purple-600' : 'text-gray-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <img
                    src={user?.imageUrl}
                    alt={user?.firstName || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                  <button
                    onClick={() => signOut()}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-sm"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block text-base font-medium transition-colors hover:text-purple-600 ${
                    isActive(item.path) ? 'text-purple-600' : 'text-gray-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {isSignedIn ? (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <Link
                    to="/dashboard"
                    className="block text-base font-medium text-gray-600 hover:text-purple-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="block text-base font-medium text-red-600 hover:text-red-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="block text-base font-medium text-gray-600 hover:text-purple-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary text-sm inline-block"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;