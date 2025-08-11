'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    const paymentIntent = searchParams.get('payment_intent');
    const paymentIntentClientSecret = searchParams.get('payment_intent_client_secret');
    
    if (paymentIntent && paymentIntentClientSecret) {
      // Get user email from localStorage (user should be logged in)
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const email = userData.email;
      
      if (!email) {
        setStatus('error');
        return;
      }
      
      setUserEmail(email);
      
      // Automatically upgrade the user to premium
      handleUpgradePremium(email, paymentIntent);
    } else {
      setStatus('error');
    }
  }, [searchParams]);

  const handleUpgradePremium = async (email: string, paymentIntent: string) => {
    try {
      const response = await fetch('/api/auth/upgrade-premium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          paymentIntent: paymentIntent
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store updated user data
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('isPremium', 'true');
        
        setStatus('success');
      } else {
        console.error('Upgrade error:', data.error);
        setStatus('error');
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      setStatus('error');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Activating your premium access...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="text-red-500 text-6xl mb-4 font-bold">ERROR</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Payment Processing Error</h1>
          <p className="text-gray-600 mb-6">
            Your payment was successful, but there was an issue activating your premium access. 
            Please contact support if this persists.
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

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="text-green-500 text-6xl mb-4 font-bold">SUCCESS</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Premium!</h1>
          <p className="text-gray-600 mb-6">
            Your premium access has been activated successfully. You now have access to all enhanced features.
          </p>
          
          <div className="bg-purple-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-purple-900 mb-2">Premium Features Unlocked:</h3>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• AI essay analysis and feedback</li>
              <li>• Extracurricular activity evaluation</li>
              <li>• Academic rigor assessment</li>
              <li>• Enhanced admission predictions</li>
            </ul>
          </div>
          
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

  return null;
}
