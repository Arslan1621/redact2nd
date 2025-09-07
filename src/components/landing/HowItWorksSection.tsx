import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Search, Download, Check } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Document',
    description: 'Upload your sensitive document in any supported format (PDF, Word, Excel, images).',
  },
  {
    icon: Search,
    step: '02',
    title: 'AI Detection',
    description: 'Our AI automatically identifies sensitive information that needs to be redacted.',
  },
  {
    icon: Check,
    step: '03',
    title: 'Review & Edit',
    description: 'Review detected items and make manual adjustments to ensure complete accuracy.',
  },
  {
    icon: Download,
    step: '04',
    title: 'Export Securely',
    description: 'Download your fully redacted document with complete audit trail and compliance.',
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How it <span className="gradient-text">works</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Simple, secure, and fast document redaction in just four steps.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Step Number */}
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 rounded-lg text-lg font-bold text-gray-600 mb-6">
                {step.step}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 left-full w-full h-0.5 bg-gray-200 transform -translate-y-1/2">
                  <div className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-500 opacity-50"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Demo Image */}
        <motion.div
          className="mt-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/4491459/pexels-photo-4491459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Document Redaction Process"
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;