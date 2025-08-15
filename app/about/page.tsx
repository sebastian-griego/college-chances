import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Our Chance Me Calculator | Free College Admission Calculator",
  description: "Learn about our free chance me calculator for college admissions. Calculate your chances of getting into Harvard, Stanford, MIT, and 40+ top universities. Get accurate admission probability estimates.",
  keywords: "chance me calculator, about chance me, college admission calculator, admission chances calculator, what are my chances, chance me for college, college chance calculator, admission probability calculator",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Our Chance Me Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Free chance me calculator for college admissions - calculate your chances at 40+ top universities
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What is a Chance Me Calculator?
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 mb-6">
              A chance me calculator is a free tool that helps students estimate their probability of getting accepted to colleges. 
              Our chance me calculator provides accurate admission probability estimates for Harvard, Stanford, MIT, Yale, Princeton, 
              and 40+ other top universities based on official Common Data Set statistics.
            </p>
            <p className="text-gray-700 mb-6">
              Simply enter your GPA, SAT or ACT scores, and select your target college. Our algorithm compares your academic profile 
              against the college's official admission data to calculate your chance me results. For even more accurate predictions, 
              try our AI-powered enhanced analysis that evaluates your essay, extracurriculars, and academic rigor.
            </p>
            <p className="text-gray-700 mb-6">
              Whether you're asking "What are my chances of getting into college?" or need a comprehensive chance me assessment, 
              our calculator provides instant, data-driven results to help with your college planning.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            How Our Calculator Works
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Calculation</h3>
              <p className="text-gray-700 mb-4">
                Our algorithm uses your GPA and SAT/ACT scores to calculate your percentile ranking compared to admitted students. 
                We then adjust this based on the college's admission rate to give you a realistic probability estimate.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• Compares your scores to 25th/75th percentiles</li>
                <li>• Uses official Common Data Set statistics</li>
                <li>• Accounts for admission rate and selectivity</li>
                <li>• Provides instant, accurate estimates</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Enhanced Analysis</h3>
              <p className="text-gray-700 mb-4">
                For more accurate predictions, our AI-powered analysis evaluates your essay, extracurricular activities, 
                and academic rigor to provide a comprehensive assessment of your application strength.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li>• AI essay evaluation and feedback</li>
                <li>• Extracurricular activity assessment</li>
                <li>• Academic rigor analysis</li>
                <li>• Detailed improvement suggestions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Our Data Sources
          </h2>
          <p className="text-gray-700 mb-4">
            All our calculations are based on official college data from the Common Data Set (CDS), which is the standard 
            format used by colleges to report their admission statistics. This ensures our estimates are as accurate as possible.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Colleges & Universities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">Official</div>
              <div className="text-gray-600">Common Data Set</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">2023-2024</div>
              <div className="text-gray-600">Latest Data</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What are my chances of getting into Stanford?
              </h3>
              <p className="text-gray-700">
                Use our calculator by entering your GPA and SAT/ACT scores. Our algorithm will compare your academic profile 
                against Stanford's official admission data to give you an accurate probability estimate.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How likely am I to get accepted to Harvard?
              </h3>
              <p className="text-gray-700">
                Our calculator uses Harvard's official Common Data Set statistics to estimate your admission probability. 
                Simply input your academic credentials and receive a realistic assessment of your chances.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What are my admission chances for MIT?
              </h3>
              <p className="text-gray-700">
                Calculate your MIT admission probability using our free tool. Enter your GPA, test scores, and get an estimate 
                based on MIT's official admission statistics and acceptance rates.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Calculator */}
        <div className="text-center mt-8">
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Try the Calculator
          </a>
        </div>
      </div>
    </div>
  );
}
