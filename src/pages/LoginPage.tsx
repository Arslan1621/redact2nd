import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Shield, FileText } from 'lucide-react';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-purple-50 via-blue-50 to-gray-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Content */}
        <motion.div
          className="text-center lg:text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">RedactPro</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome back to{' '}
            <span className="gradient-text">secure redaction</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Sign in to continue protecting sensitive information with our 
            professional-grade redaction tools.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center space-x-2 text-gray-600">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <FileText className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">GDPR Ready</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Sign In Form */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'btn-primary w-full',
                  card: 'shadow-none border-none',
                  headerTitle: 'text-2xl font-bold text-gray-900',
                  headerSubtitle: 'text-gray-600',
                  socialButtonsIconButton: 'border-gray-200 hover:border-purple-300',
                  formFieldInput: 'border-gray-200 focus:border-purple-500 focus:ring-purple-500',
                  footerActionLink: 'text-purple-600 hover:text-purple-700',
                }
              }}
              redirectUrl="/dashboard"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;