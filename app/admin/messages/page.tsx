'use client';

import React, { useState, useEffect } from 'react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
  createdAt: string;
  read: boolean;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const response = await fetch('/api/admin/messages/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: messageId, read: true }),
      });
      
      if (response.ok) {
        setMessages(messages.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        ));
      }
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  const openMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.read) {
      markAsRead(message.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
          <div className="text-sm text-gray-500">
            {messages.filter(m => !m.read).length} unread
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Messages List */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200">
              {messages.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No messages yet
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => openMessage(message)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${
                      !message.read ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 truncate">
                        {message.subject}
                      </h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        message.category === 'technical' ? 'bg-red-100 text-red-800' :
                        message.category === 'billing' ? 'bg-yellow-100 text-yellow-800' :
                        message.category === 'refund' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {message.category}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      From: {message.name} ({message.email})
                    </div>
                    <div className="text-sm text-gray-500 truncate mb-2">
                      {message.message}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(message.createdAt).toLocaleDateString()} at{' '}
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="bg-white rounded-lg shadow">
            {selectedMessage ? (
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div><strong>From:</strong> {selectedMessage.name}</div>
                    <div><strong>Email:</strong> {selectedMessage.email}</div>
                    <div><strong>Category:</strong> {selectedMessage.category}</div>
                    <div><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Message:</h3>
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Reply via Email
                  </a>
                  {!selectedMessage.read && (
                    <button
                      onClick={() => markAsRead(selectedMessage.id)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}