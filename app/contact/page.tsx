import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact & Support | College Admission Chances Calculator',
  description: 'Get help with our college admission calculator. Contact support for technical issues, billing questions, or feedback about our AI-powered analysis features.',
  robots: {
    index: true,
    follow: true,
  }
};

export default function ContactSupport() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact & Support</h1>
          
          <div className="space-y-8">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  For questions, technical support, or feedback about our college admission calculator, 
                  please reach out to us via email.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email Support</h3>
                    <p className="text-blue-600 font-medium">contact.admissionchances@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Legal Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="/privacy" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="font-medium text-gray-900 mb-1">Privacy Policy</h3>
                  <p className="text-sm text-gray-600">How we handle your data</p>
                </a>
                <a href="/terms" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="font-medium text-gray-900 mb-1">Terms of Service</h3>
                  <p className="text-sm text-gray-600">Usage terms and conditions</p>
                </a>
                <a href="/refund" className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="font-medium text-gray-900 mb-1">Refund Policy</h3>
                  <p className="text-sm text-gray-600">Payment and refund terms</p>
                </a>
                <div className="block p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-1">Support</h3>
                  <p className="text-sm text-gray-600">Help and assistance</p>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium text-gray-900 mb-2">How accurate are the admission predictions?</h3>
                  <p className="text-gray-600 text-sm">
                    Our predictions are based on official Common Data Set statistics and historical admission data. 
                    However, they are estimates only and actual admission decisions depend on many factors.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium text-gray-900 mb-2">What's included in Premium features?</h3>
                  <p className="text-gray-600 text-sm">
                    Premium includes AI-powered essay analysis, extracurricular evaluation, academic rigor assessment, 
                    and enhanced admission predictions that factor in these qualitative elements.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium text-gray-900 mb-2">Can I get a refund?</h3>
                  <p className="text-gray-600 text-sm">
                    No, all sales are final. We do not offer refunds for premium subscriptions. 
                    Please see our <a href="/refund" className="text-blue-600 underline">Refund Policy</a> for complete details.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium text-gray-900 mb-2">Is my personal information secure?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes, we use industry-standard encryption and security measures. We never share your personal 
                    essays or information with third parties. See our <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium text-gray-900 mb-2">Are payments recurring?</h3>
                  <p className="text-gray-600 text-sm">
                    No, all premium plans are one-time purchases. You will not be charged again when your premium access expires 
                    unless you manually purchase a new plan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}