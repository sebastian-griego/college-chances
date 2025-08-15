export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing or using the College Chances Calculator ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-700 mb-4">
              College Chances Calculator provides estimates of college admission probabilities based on academic credentials and statistical data. Premium features include AI-powered analysis of essays and extracurricular activities.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-4">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Premium Services</h2>
            <p className="text-gray-700 mb-4">
              Premium features are available through paid subscriptions. Payment terms and pricing are displayed at the time of purchase. All fees are non-refundable unless otherwise specified.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              <strong>IMPORTANT:</strong> This Service provides estimates for informational purposes only. Results do not guarantee college admission. Actual admission decisions depend on numerous factors including essays, recommendations, extracurricular activities, interviews, and institutional priorities.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. User Content</h2>
            <p className="text-gray-700 mb-4">
              You retain ownership of content you submit (essays, personal information). By using our Service, you grant us the right to process this content to provide our services. We will not share your personal content with third parties without your consent.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">
              You may not use our Service for any unlawful purpose or to violate any laws. You may not attempt to reverse engineer, hack, or disrupt our services.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account at any time for violations of these Terms. You may terminate your account by contacting us.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Service constitutes acceptance of the modified Terms.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to conflict of law principles.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms, please contact us through our website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}