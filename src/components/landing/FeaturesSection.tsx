import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Zap, 
  FileSearch, 
  Users, 
  Download, 
  Lock,
  Eye,
  Clock
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Military-Grade Security',
    description: 'Your documents are protected with bank-level encryption and security protocols.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast Processing',
    description: 'Advanced AI algorithms redact documents in seconds while maintaining accuracy.',
  },
  {
    icon: FileSearch,
    title: 'Smart Detection',
    description: 'Automatically identify and redact sensitive information like SSNs, emails, and more.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together on redaction projects with role-based access and approval workflows.',
  },
  {
    icon: Download,
    title: 'Multiple Formats',
    description: 'Support for PDF, Word, Excel, images, and other common document formats.',
  },
  {
    icon: Lock,
    title: 'Compliance Ready',
    description: 'Meet GDPR, HIPAA, and other regulatory requirements with confidence.',
  },
  {
    icon: Eye,
    title: 'Preview & Review',
    description: 'Review redacted documents before finalizing to ensure accuracy and completeness.',
  },
  {
    icon: Clock,
    title: 'Version History',
    description: 'Track changes and maintain audit trails with comprehensive version control.',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="section-padding bg-white">
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
            Powerful features for{' '}
            <span className="gradient-text">professional redaction</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to redact sensitive information securely and efficiently.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-gray-50 rounded-2xl p-8 hover-lift card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-purple-50 rounded-2xl p-8">
            <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
            <div className="text-gray-600">Accuracy Rate</div>
          </div>
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="text-4xl font-bold text-blue-600 mb-2">50M+</div>
            <div className="text-gray-600">Documents Processed</div>
          </div>
          <div className="bg-green-50 rounded-2xl p-8">
            <div className="text-4xl font-bold text-green-600 mb-2">2.5s</div>
            <div className="text-gray-600">Average Processing Time</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;