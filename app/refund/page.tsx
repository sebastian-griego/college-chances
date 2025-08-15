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

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. General Refund Policy</h2>
            <p className="text-gray-700 mb-4">
              We want you to be satisfied with our Premium features. If you are not completely satisfied with your purchase, 
              we offer refunds under the conditions outlined below.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. Refund Eligibility</h2>
            <p className="text-gray-700 mb-4">
              You may be eligible for a refund if:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>You request a refund within <strong>7 days</strong> of your purchase</li>
              <li>You have not used more than 3 AI analyses</li>
              <li>Technical issues prevent you from accessing premium features</li>
              <li>You were charged in error or billed incorrectly</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Non-Refundable Situations</h2>
            <p className="text-gray-700 mb-4">
              Refunds will not be provided in the following cases:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>More than 7 days have passed since purchase</li>
              <li>You have extensively used the premium features (more than 3 AI analyses)</li>
              <li>You are dissatisfied with AI analysis results or admission predictions</li>
              <li>You change your mind about needing the service</li>
              <li>Your subscription has expired (refunds only apply to unused time)</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. How to Request a Refund</h2>
            <p className="text-gray-700 mb-4">
              To request a refund:
            </p>
            <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">
              <li>Contact us through our support page within 7 days of purchase</li>
              <li>Provide your email address associated with the account</li>
              <li>Include your reason for requesting a refund</li>
              <li>Include any relevant details about technical issues (if applicable)</li>
            </ol>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Refund Processing</h2>
            <p className="text-gray-700 mb-4">
              <strong>Processing Time:</strong> Approved refunds will be processed within 5-10 business days.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Refund Method:</strong> Refunds will be issued to the original payment method used for the purchase.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Partial Refunds:</strong> For subscriptions used partially, we may issue prorated refunds based on unused time.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Subscription Cancellation</h2>
            <p className="text-gray-700 mb-4">
              You can cancel your subscription at any time. Upon cancellation:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>You will retain access to premium features until the end of your billing period</li>
              <li>No further charges will be made</li>
              <li>Cancellation does not automatically qualify you for a refund</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Technical Issues</h2>
            <p className="text-gray-700 mb-4">
              If you experience technical problems:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Contact us immediately for troubleshooting assistance</li>
              <li>We will work to resolve technical issues promptly</li>
              <li>If we cannot resolve the issue, you may be eligible for a full refund</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Important Disclaimers</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-yellow-800 mb-2">Service Nature Disclaimer</h3>
              <p className="text-yellow-700 text-sm">
                Our service provides admission probability estimates and AI analysis for informational purposes only. 
                Results do not guarantee college admission. Refund requests based solely on disagreement with 
                analysis results or admission outcomes will not be approved.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. Dispute Resolution</h2>
            <p className="text-gray-700 mb-4">
              If you disagree with our refund decision:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>You may escalate the matter by contacting us again with additional information</li>
              <li>We will review escalated cases within 5 business days</li>
              <li>Our decision on escalated cases is final</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For refund requests or questions about this policy:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
              <li>Visit our <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">Contact/Support page</a></li>
              <li>Include "Refund Request" in your subject line</li>
              <li>Response time: Within 2 business days</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Changes to This Policy</h2>
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