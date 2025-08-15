export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund Policy</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. No Refunds Policy</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-red-800 mb-2">Important Notice</h3>
              <p className="text-red-700 font-medium">
                All sales are final. We do not offer refunds for any premium subscriptions or services purchased.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. One-Time Payment Structure</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-800 mb-2">No Recurring Charges</h3>
              <p className="text-blue-700">
                All premium plans are <strong>one-time purchases</strong>. You will only be charged once for the selected time period. 
                There are no automatic renewals or recurring billing. When your premium access expires, you will not be charged again 
                unless you manually purchase a new premium plan.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Premium Access Expiration</h2>
            <p className="text-gray-700 mb-4">
              When your premium access period ends:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Your account will automatically revert to the free tier</li>
              <li>You will retain access to basic admission calculations</li>
              <li>Premium features (AI analysis) will no longer be available</li>
              <li>No additional charges will be made</li>
              <li>You can purchase a new premium plan at any time if desired</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Technical Issues</h2>
            <p className="text-gray-700 mb-4">
              If you experience technical problems that prevent you from accessing paid features:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Contact us immediately through our <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">support page</a></li>
              <li>We will work to resolve technical issues promptly</li>
              <li>We may extend your subscription period to compensate for downtime caused by technical issues on our end</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Billing Errors</h2>
            <p className="text-gray-700 mb-4">
              If you believe you have been charged in error:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Contact us within 30 days of the charge</li>
              <li>Provide documentation of the billing error</li>
              <li>We will investigate and correct legitimate billing errors</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Service Nature</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">Service Disclaimer</h3>
              <p className="text-yellow-700 text-sm">
                Our service provides admission probability estimates and AI analysis for informational purposes only. 
                Results do not guarantee college admission. We do not offer refunds based on dissatisfaction with 
                analysis results, admission outcomes, or changes of mind about needing the service.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about billing, technical issues, or this policy:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Visit our <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">Contact & Support page</a></li>
              <li>Response time: Within 2 business days</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify this refund policy at any time. Changes will be effective immediately 
              upon posting. The updated policy will apply to purchases made after the change date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}