import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-gray-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container-custom section-padding">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span>Secure Document Redaction</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Redact sensitive data with{' '}
            <span className="gradient-text">confidence</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Professional-grade document redaction software that ensures complete privacy and 
            compliance. Protect sensitive information with advanced AI-powered redaction tools.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/signup"
              className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/pricing"
              className="text-lg text-gray-600 hover:text-purple-600 transition-colors underline"
            >
              View Pricing Plans
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Bank-Level Security</h3>
              <p className="text-gray-600">Military-grade encryption for maximum protection</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Lightning Fast</h3>
              <p className="text-gray-600">Process documents in seconds, not hours</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Team Collaboration</h3>
              <p className="text-gray-600">Work together on sensitive documents safely</p>
            </div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div
          className="mt-20 relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Document Redaction Interface"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          {/* Floating Elements */}
          <motion.div
            className="absolute -top-4 -left-4 w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center animate-float"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.div
            className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <Zap className="w-8 h-8 text-white" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;