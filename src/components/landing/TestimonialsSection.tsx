import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Legal Compliance Officer',
    company: 'TechCorp Inc.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'RedactPro has revolutionized how we handle sensitive documents. The accuracy is incredible and it saves us hours of manual work.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Data Protection Manager',
    company: 'Healthcare Solutions',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'The compliance features are exactly what we needed for HIPAA requirements. Outstanding software with excellent support.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Information Security Lead',
    company: 'Financial Services Ltd.',
    image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Bank-level security with enterprise features. This tool has become essential for our document processing workflow.',
    rating: 5,
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="section-padding bg-white">
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
            Trusted by <span className="gradient-text">professionals</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See what security professionals and compliance teams are saying about RedactPro.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-gray-50 rounded-2xl p-8 hover-lift card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Rating */}
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          className="mt-20 flex flex-wrap justify-center items-center space-x-8 opacity-60"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-lg font-semibold text-gray-500">TRUSTED BY:</div>
          <div className="text-lg font-medium text-gray-500">SOC 2 Compliant</div>
          <div className="text-lg font-medium text-gray-500">HIPAA Ready</div>
          <div className="text-lg font-medium text-gray-500">GDPR Compliant</div>
          <div className="text-lg font-medium text-gray-500">ISO 27001</div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;