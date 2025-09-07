import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Smartphone, Monitor } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative container-custom section-padding">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main CTA */}
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to secure your{' '}
            <span className="text-yellow-300">sensitive data?</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-purple-100 mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Start your free trial today and experience the power of professional document redaction.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/signup"
              className="bg-white text-purple-600 hover:text-purple-700 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              to="/pricing"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 flex items-center space-x-2"
            >
              <span>View Pricing</span>
            </Link>
          </motion.div>

          {/* App Download Section */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Available on all platforms
            </h3>
            <p className="text-purple-100 mb-6">
              Access RedactPro from anywhere with our web, desktop, and mobile applications.
            </p>
            
            <div className="flex justify-center space-x-6">
              <button className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Smartphone className="w-5 h-5" />
                <span className="text-sm font-medium">Mobile App</span>
              </button>
              <button className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Monitor className="w-5 h-5" />
                <span className="text-sm font-medium">Desktop App</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full"></div>
    </section>
  );
};

export default CTASection;