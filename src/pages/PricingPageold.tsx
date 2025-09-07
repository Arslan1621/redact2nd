import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Star, Shield, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: 0,
    yearlyPrice: 0,
    description: 'Perfect for trying out our service',
    features: [
      '5 document redactions',
      'Basic AI detection',
      'Standard export formats',
      'Email support',
      '24-hour processing',
    ],
    limitations: [
      'No team collaboration',
      'No custom templates',
      'No priority support',
      'No audit trails',
    ],
    popular: false,
    color: 'gray',
  },
  {
    name: 'Starter',
    price: 29,
    yearlyPrice: 24,
    description: 'Great for individual professionals',
    features: [
      '100 document redactions/month',
      'Advanced AI detection',
      'All export formats',
      'Priority email support',
      'Real-time processing',
      'Custom redaction templates',
      'Basic audit trails',
    ],
    limitations: [
      'No team collaboration',
      'Limited integrations',
    ],
    popular: false,
    color: 'blue',
  },
  {
    name: 'Professional',
    price: 79,
    yearlyPrice: 63,
    description: 'Perfect for small teams',
    features: [
      '500 document redactions/month',
      'AI + manual review workflow',
      'Team collaboration (up to 5 users)',
      'All export formats + API',
      'Priority support + live chat',
      'Custom templates & rules',
      'Complete audit trails',
      'Integration with popular tools',
      'Bulk processing',
    ],
    limitations: [],
    popular: true,
    color: 'purple',
  },
  {
    name: 'Enterprise',
    price: 199,
    yearlyPrice: 159,
    description: 'For large organizations',
    features: [
      'Unlimited redactions',
      'Custom AI model training',
      'Unlimited team members',
      'White-label solution',
      'Dedicated account manager',
      '24/7 priority support',
      'Custom integrations',
      'Advanced security controls',
      'Compliance reporting',
      'SLA guarantees',
    ],
    limitations: [],
    popular: false,
    color: 'indigo',
  },
];

const PricingPage: React.FC = () => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-purple-50 via-blue-50 to-gray-50">
        <div className="container-custom text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Simple, transparent{' '}
            <span className="gradient-text">pricing</span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose the perfect plan for your document redaction needs. Start free and upgrade anytime.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="flex items-center justify-center space-x-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className={`text-lg font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              className="relative w-16 h-8 bg-gray-200 rounded-full transition-colors duration-300 focus:outline-none"
              onClick={() => setIsYearly(!isYearly)}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                  isYearly ? 'translate-x-8' : ''
                }`}
              />
              {isYearly && (
                <div className="absolute inset-0 gradient-bg rounded-full opacity-80" />
              )}
            </button>
            <span className={`text-lg font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className={`relative rounded-3xl p-8 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white transform scale-105' 
                    : 'bg-gray-50 border border-gray-200'
                } hover-lift card-hover`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.popular ? 'text-purple-100' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className={`text-5xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    ${isYearly ? plan.yearlyPrice : plan.price}
                  </div>
                  <div className={`text-sm ${plan.popular ? 'text-purple-100' : 'text-gray-600'}`}>
                    {plan.price === 0 ? 'Forever free' : `per month${isYearly ? ', billed annually' : ''}`}
                  </div>
                  {isYearly && plan.price > 0 && (
                    <div className={`text-sm mt-1 ${plan.popular ? 'text-purple-100' : 'text-gray-500'}`}>
                      <span className="line-through">${plan.price}</span> regular price
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-8">
                  <div className={`text-sm font-semibold mb-4 ${plan.popular ? 'text-purple-100' : 'text-gray-600'}`}>
                    INCLUDED FEATURES:
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-green-300' : 'text-green-500'}`} />
                        <span className={`text-sm ${plan.popular ? 'text-white' : 'text-gray-700'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.limitations.length > 0 && (
                    <div className="mt-6">
                      <ul className="space-y-3">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start space-x-3 opacity-60">
                            <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />
                            <span className={`text-sm ${plan.popular ? 'text-purple-100' : 'text-gray-500'}`}>
                              {limitation}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  to={plan.price === 0 ? '/signup' : '/signup'}
                  className={`block w-full text-center font-bold py-4 px-6 rounded-2xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-white text-purple-600 hover:bg-gray-50 hover:shadow-lg'
                      : 'gradient-bg text-white hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {plan.price === 0 ? 'Start Free' : 'Get Started'}
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ Preview */}
          <motion.div
            className="mt-20 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Questions about our plans?
            </h3>
            <p className="text-gray-600 mb-8">
              All plans include bank-level security, compliance features, and 24/7 uptime monitoring.
            </p>
            <div className="flex flex-wrap justify-center space-x-8">
              <div className="flex items-center space-x-2 text-gray-600">
                <Shield className="w-5 h-5 text-green-500" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="w-5 h-5 text-purple-500" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;