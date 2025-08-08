'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'account'>('loading');
  const [accountData, setAccountData] = useState({
    name: '',
    email: searchParams.get('email') || ''
  });
  
  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    
    if (paymentIntent && paymentIntentClientSecret) {
      // Payment successful, now need to create account
      setStatus('account');
    } else {
      setStatus('error');
    }
  }, [searchParams]);

  const handleCreateAccount = () => {
    // Store premium access in localStorage (simple approach)
    localStorage.setItem('isPremium', 'true');
    localStorage.setItem('premiumAccount', JSON.stringify({
      name: accountData.name,
      email: accountData.email,
      activatedAt: new Date().toISOString(),
      paymentIntent: searchParams.get('payment_intent')
    }));
    
    // Redirect to main page with premium access
    router.push('/?premium=activated');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying payment...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Failed</h1>
          <p className="text-gray-600 mb-6">
            There was an issue processing your payment. Please try again or contact support.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Return to Calculator
          </Link>
        </div>
      </div>
    );
  }

  if (status === 'account') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <div className="text-green-500 text-6xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">
              Create your account to access premium features
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={accountData.name}
                onChange={(e) => setAccountData({...accountData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={accountData.email}
                onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Enter your email"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">Email from payment (cannot be changed)</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Premium Features Unlocked:</h3>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• AI essay analysis and feedback</li>
                <li>• Extracurricular activity evaluation</li>
                <li>• Academic rigor assessment</li>
                <li>• Enhanced admission predictions</li>
              </ul>
            </div>

            <button
              onClick={handleCreateAccount}
              disabled={!accountData.name.trim()}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Account & Access Premium
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Premium!</h1>
        <p className="text-gray-600 mb-6">
          Your account has been created successfully. You now have access to all premium features.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Start Enhanced Analysis
        </Link>
      </div>
    </div>
  );
}
