import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | College Admission Chances Calculator',
  description: 'Privacy policy for our college admission calculator. Learn how we protect your personal information, essays, and academic data with industry-standard security.',
  robots: {
    index: true,
    follow: true,
  }
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Email address (for account creation)</li>
              <li>Academic information (GPA, test scores)</li>
              <li>Essays and personal statements (premium users)</li>
              <li>Extracurricular activities information</li>
              <li>Payment information (processed securely by Stripe)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Usage Information</h3>
            <p className="text-gray-700 mb-4">
              We automatically collect certain information about your use of our Service:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Log information (IP address, browser type, pages visited)</li>
              <li>Device information</li>
              <li>Usage patterns and preferences</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Provide and improve our college admission probability calculations</li>
              <li>Analyze essays and extracurricular activities (premium feature)</li>
              <li>Process payments and manage subscriptions</li>
              <li>Send important updates about your account</li>
              <li>Improve our Service and develop new features</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Information Sharing</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following limited circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li><strong>Service Providers:</strong> With trusted third parties who help us operate our Service (e.g., Stripe for payments, hosting providers)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale, or transfer of assets</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure authentication systems</li>
              <li>Regular security assessments</li>
              <li>Limited access to personal data</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We retain your personal information for as long as necessary to provide our Service and fulfill the purposes outlined in this policy. Premium content (essays, analyses) is cached for up to 24 hours for performance optimization and deleted thereafter unless you have an active subscription.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Your Rights</h2>
            <p className="text-gray-700 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of non-essential communications</li>
              <li>Request a copy of your data</li>
              <li>Lodge a complaint with data protection authorities</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Remember your preferences and login status</li>
              <li>Analyze site usage and improve our Service</li>
              <li>Provide personalized content</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You can control cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              Our Service integrates with third-party services:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li><strong>Stripe:</strong> For secure payment processing</li>
              <li><strong>AI Services:</strong> For essay analysis (premium feature)</li>
            </ul>
            <p className="text-gray-700 mb-4">
              These services have their own privacy policies and we encourage you to review them.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our Service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you are a parent and believe your child has provided us with personal information, please contact us.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. International Data Transfers</h2>
            <p className="text-gray-700 mb-4">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your personal information in accordance with this policy.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us through our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}