import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Crown, 
  Activity, 
  Download,
  Clock,
  Shield,
  ArrowRight,
  Plus,
  TrendingUp,
  Check,
  FileImage,
  X
} from 'lucide-react';

// Mock data - in real app this would come from your backend
const mockUserData = {
  currentPlan: 'Free',
  redactionsUsed: 3,
  redactionsLimit: 5,
  documentsProcessed: 12,
  savedHours: 24,
};

const mockRecentDocuments = [
  { name: 'Legal_Contract_2025.pdf', status: 'Completed', date: '2 hours ago', redactions: 15 },
  { name: 'HR_Report_Jan.docx', status: 'Processing', date: '1 day ago', redactions: 8 },
  { name: 'Financial_Statement.xlsx', status: 'Completed', date: '2 days ago', redactions: 22 },
];

const DashboardPage: React.FC = () => {
  const { user } = useUser();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showUploadPopup, setShowUploadPopup] = useState(false);

  const usagePercentage = (mockUserData.redactionsUsed / mockUserData.redactionsLimit) * 100;
  const isNearLimit = usagePercentage >= 80;

  const handleUpgrade = (planName: string) => {
    // Redirect to PayPal for payment
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=your-paypal-email&item_name=RedactPro ${planName} Plan&amount=${planName === 'Starter' ? '29' : planName === 'Professional' ? '79' : '199'}&currency_code=USD&return=https://yoursite.com/dashboard?upgrade=success`;
    window.open(paypalUrl, '_blank');
  };

  const handleUploadOption = (type: 'pdf' | 'docs') => {
    setShowUploadPopup(false);
    // Navigate to respective pages
    window.location.href = `/${type}`;
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="container-custom py-12">
        {/* Welcome Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'User'}!
          </h1>
          <p className="text-lg text-gray-600">
            Manage your redaction projects and monitor your usage below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Usage Overview */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Usage Overview</h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  mockUserData.currentPlan === 'Free' ? 'bg-gray-100 text-gray-700' : 'gradient-bg text-white'
                }`}>
                  {mockUserData.currentPlan} Plan
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {mockUserData.redactionsUsed}/{mockUserData.redactionsLimit}
                  </div>
                  <div className="text-sm text-gray-600">Redactions Used</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {mockUserData.documentsProcessed}
                  </div>
                  <div className="text-sm text-gray-600">Documents Processed</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {mockUserData.savedHours}h
                  </div>
                  <div className="text-sm text-gray-600">Time Saved</div>
                </div>
              </div>

              {/* Usage Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Monthly Usage</span>
                  <span className={`text-sm font-medium ${isNearLimit ? 'text-red-600' : 'text-gray-500'}`}>
                    {usagePercentage.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      isNearLimit ? 'bg-red-500' : 'bg-gradient-to-r from-purple-500 to-blue-500'
                    }`}
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  ></div>
                </div>
                {isNearLimit && (
                  <p className="text-sm text-red-600 mt-2">
                    You're approaching your monthly limit. Consider upgrading for unlimited access.
                  </p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => setShowUploadPopup(true)}
                  className="btn-primary flex items-center justify-center space-x-2 flex-1 hover:shadow-lg transition-all duration-200"
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Document</span>
                </button>
                {mockUserData.currentPlan === 'Free' && (
                  <button 
                    onClick={() => setShowUpgrade(true)}
                    className="btn-secondary flex items-center justify-center space-x-2 flex-1"
                  >
                    <Crown className="w-5 h-5" />
                    <span>Upgrade Plan</span>
                  </button>
                )}
              </div>
            </motion.div>

            {/* Recent Documents */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Documents</h2>
                <button className="text-purple-600 hover:text-purple-700 font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {mockRecentDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{doc.name}</div>
                        <div className="text-sm text-gray-600">{doc.redactions} redactions • {doc.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        doc.status === 'Completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {doc.status}
                      </span>
                      {doc.status === 'Completed' && (
                        <Download className="w-5 h-5 text-gray-400 hover:text-purple-600 cursor-pointer transition-colors" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upgrade Card */}
            {mockUserData.currentPlan === 'Free' && (
              <motion.div
                className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="text-center">
                  <Crown className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Unlock More Power</h3>
                  <p className="text-purple-100 mb-6">
                    Upgrade to process unlimited documents with advanced features.
                  </p>
                  <button 
                    onClick={() => setShowUpgrade(true)}
                    className="w-full bg-white text-purple-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Choose Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Quick Stats */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6">This Month</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600">Documents</span>
                  </div>
                  <span className="font-semibold text-gray-900">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">Avg. Time</span>
                  </div>
                  <span className="font-semibold text-gray-900">2.3s</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-600">Accuracy</span>
                  </div>
                  <span className="font-semibold text-gray-900">99.8%</span>
                </div>
              </div>
            </motion.div>

            {/* Security Notice */}
            <motion.div
              className="bg-green-50 rounded-2xl p-6 border border-green-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-2">Secure & Compliant</h4>
                  <p className="text-sm text-green-700">
                    All documents are processed with bank-level encryption and automatically deleted after processing.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Upload Options Popup */}
        {showUploadPopup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowUploadPopup(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Document Type</h2>
                <p className="text-gray-600">Select the type of document you want to upload and redact.</p>
              </div>

              <div className="space-y-4">
                {/* PDF Option */}
                <button
                  onClick={() => handleUploadOption('pdf')}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-100 group-hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors">
                      <FileImage className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                        PDF Documents
                      </h3>
                      <p className="text-sm text-gray-600">
                        Upload and redact PDF files with advanced OCR
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors ml-auto" />
                  </div>
                </button>

                {/* Docs Option */}
                <button
                  onClick={() => handleUploadOption('docs')}
                  className="w-full p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">
                        Word Documents
                      </h3>
                      <p className="text-sm text-gray-600">
                        Upload and redact DOC, DOCX, and text files
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors ml-auto" />
                  </div>
                </button>
              </div>

              <div className="text-center mt-6">
                <button
                  onClick={() => setShowUploadPopup(false)}
                  className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Upgrade Modal */}
        {showUpgrade && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
                <p className="text-gray-600">Upgrade to unlock unlimited redactions and advanced features.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Starter', 'Professional', 'Enterprise'].map((plan) => (
                  <div key={plan} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan}</h3>
                    <div className="text-3xl font-bold text-purple-600 mb-4">
                      ${plan === 'Starter' ? '29' : plan === 'Professional' ? '79' : '199'}
                      <span className="text-sm text-gray-500 font-normal">/month</span>
                    </div>
                    <ul className="space-y-2 mb-6 text-sm text-gray-600">
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>{plan === 'Starter' ? '100' : plan === 'Professional' ? '500' : 'Unlimited'} redactions/month</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Advanced AI detection</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span>Priority support</span>
                      </li>
                    </ul>
                    <button
                      onClick={() => handleUpgrade(plan)}
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        plan === 'Professional'
                          ? 'gradient-bg text-white hover:shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Upgrade to {plan}
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
