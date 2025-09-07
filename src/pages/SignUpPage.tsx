import React from 'react';
import { SignUp } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Shield, FileText, Check, Star } from 'lucide-react';

const benefits = [
  'Start with 5 free document redactions',
  'Advanced AI-powered detection',
  'Bank-level security & encryption',
  'Multiple export formats',
  'Email support included',
];

const SignUpPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-purple-50 via-blue-50 to-gray-50 flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Sign Up Form */}
        <motion.div
          className="flex justify-center lg:justify-start order-2 lg:order-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <SignUp 
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

        {/* Right Side - Content */}
        <motion.div
          className="text-center lg:text-left order-1 lg:order-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">RedactPro</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Start redacting documents{' '}
            <span className="gradient-text">securely today</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join thousands of professionals who trust RedactPro for their 
            document security and compliance needs.
          </p>

          {/* Benefits */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What's included in your free account:
            </h3>
            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                >
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Trust Badge */}
          <motion.div
            className="bg-white rounded-xl p-6 border border-gray-200 inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <div>
                <div className="font-semibold text-gray-900">4.9/5 rating</div>
                <div className="text-sm text-gray-600">from 2,500+ reviews</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;