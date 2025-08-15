'use client';

import React, { useState } from 'react';

export default function ContactSupport() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Message Sent!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We'll get back to you soon.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  subject: '',
                  message: '',
                  category: 'general'
                });
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact & Support</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Contact Info */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email Support</h3>
                    <p className="text-gray-600 text-sm">Contact us anytime for support</p>
                  </div>
                </div>
                
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Quick Links</h3>
                <div className="space-y-2 text-sm">
                  <a href="/privacy" className="block text-blue-700 hover:text-blue-900 underline">
                    Privacy Policy
                  </a>
                  <a href="/terms" className="block text-blue-700 hover:text-blue-900 underline">
                    Terms of Service
                  </a>
                  <a href="/refund" className="block text-blue-700 hover:text-blue-900 underline">
                    Refund Policy
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing/Payment</option>
                    <option value="refund">Refund Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="bug">Bug Report</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your inquiry"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide as much detail as possible..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">How accurate are the admission predictions?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Our predictions are based on official Common Data Set statistics and historical admission data. 
                  However, they are estimates only and actual admission decisions depend on many factors.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">What's included in Premium features?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Premium includes AI-powered essay analysis, extracurricular evaluation, academic rigor assessment, 
                  and enhanced admission predictions that factor in these qualitative elements.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Can I get a refund?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  No, all sales are final. We do not offer refunds for premium subscriptions. 
                  Please see our <a href="/refund" className="text-blue-600 underline">Refund Policy</a> for complete details.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900">Is my personal information secure?</h3>
                <p className="text-gray-600 text-sm mt-1">
                  Yes, we use industry-standard encryption and security measures. We never share your personal 
                  essays or information with third parties. See our <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}