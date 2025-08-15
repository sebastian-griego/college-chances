import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Chance Me Calculator | College Admission Questions Answered',
  description: 'Frequently asked questions about our chance me calculator. Learn how to calculate your college admission chances, what factors matter, and how accurate our predictions are.',
  keywords: 'chance me calculator FAQ, college admission calculator questions, how accurate is chance me calculator, what are my chances of getting into college, college admission probability',
  robots: {
    index: true,
    follow: true,
  }
};

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
          <p className="text-gray-600 mb-8">
            Everything you need to know about our chance me calculator and college admission predictions.
          </p>
          
          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">What is a chance me calculator?</h2>
              <p className="text-gray-700">
                A chance me calculator is a tool that estimates your probability of getting accepted to colleges based on your academic credentials. 
                Our calculator uses your GPA, SAT/ACT scores, and with premium features, analyzes your essays and extracurricular activities to provide 
                accurate admission probability estimates for 40+ top universities.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">How accurate is the chance me calculator?</h2>
              <p className="text-gray-700">
                Our chance me calculator uses official Common Data Set (CDS) statistics and historical admission data from each university. 
                While our estimates are based on real data, actual admission decisions depend on many factors including essays, recommendations, 
                extracurricular activities, interviews, and institutional priorities. Use our calculator as one tool in your college planning process.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">What are my chances of getting into Harvard?</h2>
              <p className="text-gray-700">
                Harvard University has an acceptance rate of approximately 3-4%. Your chances depend on your GPA, SAT/ACT scores, essay quality, 
                extracurricular activities, and other factors. Use our chance me calculator to get a personalized estimate based on your specific 
                academic profile and Harvard's official admission statistics.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">What colleges can I calculate my chances for?</h2>
              <p className="text-gray-700">
                Our chance me calculator includes 40+ top universities including all Ivy League schools (Harvard, Yale, Princeton, Columbia, 
                University of Pennsylvania, Brown, Cornell, Dartmouth), top private universities (Stanford, MIT, Duke, Northwestern, University of Chicago), 
                and top public universities (UC Berkeley, UCLA, University of Michigan, University of Virginia, UNC Chapel Hill).
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">What factors does the chance me calculator consider?</h2>
              <p className="text-gray-700">
                Our free calculator considers GPA and SAT/ACT scores. Premium features include AI-powered analysis of:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                <li>Essay quality and content analysis</li>
                <li>Extracurricular activities and leadership</li>
                <li>Academic rigor (AP, IB, honors courses)</li>
                <li>Course difficulty and grade trends</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Is the chance me calculator free?</h2>
              <p className="text-gray-700">
                Yes! Our basic chance me calculator is completely free and includes admission probability calculations for 40+ universities based on 
                GPA and test scores. Premium features ($5-15 one-time payment) include AI essay analysis and enhanced predictions that factor in 
                qualitative elements like extracurricular activities.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">How do I improve my chances of getting into college?</h2>
              <p className="text-gray-700">
                To improve your college admission chances:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                <li>Maintain a high GPA (3.7+ for top schools)</li>
                <li>Achieve competitive SAT/ACT scores</li>
                <li>Write compelling personal essays</li>
                <li>Develop meaningful extracurricular activities</li>
                <li>Take challenging courses (AP, IB, honors)</li>
                <li>Secure strong letters of recommendation</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">What's the difference between reach, target, and safety schools?</h2>
              <p className="text-gray-700">
                Our chance me calculator categorizes schools based on your admission probability:
              </p>
              <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1">
                <li><strong>Safety schools:</strong> 70%+ chance of admission</li>
                <li><strong>Target schools:</strong> 30-70% chance of admission</li>
                <li><strong>Reach schools:</strong> 10-30% chance of admission</li>
                <li><strong>Far reach schools:</strong> Less than 10% chance of admission</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Can international students use the chance me calculator?</h2>
              <p className="text-gray-700">
                Yes! International students can use our chance me calculator. However, keep in mind that admission rates for international students 
                are typically lower than domestic students at most US universities. Our calculator provides estimates based on overall admission 
                statistics, so international students should consider their chances may be somewhat lower than calculated.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">How often is the chance me calculator updated?</h2>
              <p className="text-gray-700">
                We update our chance me calculator annually with the latest Common Data Set statistics and admission data from each university. 
                This ensures our probability calculations reflect the most current admission trends and acceptance rates.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ready to Calculate Your Chances?</h2>
            <p className="text-gray-600 mb-6">
              Use our free chance me calculator to see your admission probability at 40+ top universities.
            </p>
            <a 
              href="/" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Your Chance Me Calculation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}