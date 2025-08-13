'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PRICING_TIERS = {
  '2-weeks': { name: '2 Weeks', price: 5, duration: 14 },
  '1-month': { name: '1 Month', price: 8, duration: 30 },
  '3-months': { name: '3 Months', price: 15, duration: 90 }
};

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userEmail: string;
  selectedTier?: '2-weeks' | '1-month' | '3-months' | null;
}

function CheckoutForm({ onSuccess, onClose, userEmail }: { onSuccess: () => void; onClose: () => void; userEmail: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || 'Payment failed');
      setIsLoading(false);
      return;
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (confirmError) {
      setError(confirmError.message || 'Payment failed');
    } else {
      onSuccess();
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </form>
  );
}

export default function PaymentModal({ isOpen, onClose, onSuccess, userEmail, selectedTier: initialTier }: PaymentModalProps) {
  const [step, setStep] = useState<'plan' | 'payment'>(initialTier ? 'payment' : 'plan');
  const [selectedTier, setSelectedTier] = useState<'2-weeks' | '1-month' | '3-months' | null>(initialTier || null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanConfirm = async () => {
    if (!selectedTier) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: selectedTier, email: userEmail }),
      });
      
      const data = await response.json();
      setClientSecret(data.clientSecret);
      setStep('payment');
    } catch (error) {
      console.error('Payment intent creation failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setStep('plan');
    setClientSecret(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 max-w-md w-full my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        {step === 'plan' ? (
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <div className="text-sm text-blue-800">
                Account: <span className="font-semibold">{userEmail}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose Your Plan
              </label>
              <div className="space-y-3">
                {Object.entries(PRICING_TIERS).map(([key, tier]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTier(key as any)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedTier === key
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-lg">{tier.name}</div>
                        <div className="text-sm text-gray-600">{tier.duration} days of premium access</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">${tier.price}</div>
                        <div className="text-xs text-gray-500">one-time</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePlanConfirm}
                disabled={!selectedTier || isLoading}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Setting up...' : 'Continue to Payment'}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <div className="text-sm text-blue-800">
                {selectedTier && PRICING_TIERS[selectedTier].name} - ${selectedTier && PRICING_TIERS[selectedTier].price} • {userEmail}
              </div>
            </div>
            
            <Elements stripe={stripePromise} options={{ clientSecret: clientSecret! }}>
              <CheckoutForm onSuccess={onSuccess} onClose={handleBack} userEmail={userEmail} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
}
