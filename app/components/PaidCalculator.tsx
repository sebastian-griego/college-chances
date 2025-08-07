'use client';

import { useState } from 'react';

interface PaidCalculatorProps {
  onAnalysisComplete: (scores: any) => void;
}

export default function PaidCalculator({ onAnalysisComplete }: PaidCalculatorProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    essay: '',
    extracurriculars: [''],
    apScores: [''],
    ibScores: [''],
    honorsClasses: 0
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[];
      return {
        ...prev,
        [field]: currentArray.map((item: string, i: number) => 
          i === index ? value : item
        )
      };
    });
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[];
      return {
        ...prev,
        [field]: [...currentArray, '']
      };
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[];
      return {
        ...prev,
        [field]: currentArray.filter((_: string, i: number) => i !== index)
      };
    });
  };

  const handleAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Generate a simple user ID (in real app, this would come from auth)
      const userId = `user_${Date.now()}`;
      
      const response = await fetch('/api/analyze/essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          essay: formData.essay,
          extracurriculars: formData.extracurriculars.filter(ec => ec.trim()),
          apScores: formData.apScores.filter(score => score.trim()).map(Number),
          ibScores: formData.ibScores.filter(score => score.trim()).map(Number),
          honorsClasses: formData.honorsClasses
        })
      });

      if (response.ok) {
        const result = await response.json();
        onAnalysisComplete({ ...result.scores, userId });
      } else {
        console.error('Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Enhanced Analysis (Paid Feature)
      </h2>
      
      <div className="space-y-6">
        {/* Essay Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Essay
          </label>
          <textarea
            value={formData.essay}
            onChange={(e) => handleInputChange('essay', e.target.value)}
            placeholder="Paste your personal essay here (500-650 words recommended)..."
            className="w-full h-40 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            Word count: {formData.essay.split(' ').filter(word => word.trim()).length}
          </p>
        </div>

        {/* Extracurricular Activities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Extracurricular Activities
          </label>
          {formData.extracurriculars.map((activity, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={activity}
                onChange={(e) => handleArrayChange('extracurriculars', index, e.target.value)}
                placeholder="e.g., President of Science Club, 2 years, 5 hours/week"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {formData.extracurriculars.length > 1 && (
                <button
                  onClick={() => removeArrayItem('extracurriculars', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem('extracurriculars')}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Activity
          </button>
        </div>

        {/* AP Scores */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            AP Scores (1-5 scale)
          </label>
          {formData.apScores.map((score, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="number"
                min="1"
                max="5"
                value={score}
                onChange={(e) => handleArrayChange('apScores', index, e.target.value)}
                placeholder="AP Score (1-5)"
                className="w-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {formData.apScores.length > 1 && (
                <button
                  onClick={() => removeArrayItem('apScores', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem('apScores')}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add AP Score
          </button>
        </div>

        {/* IB Scores */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            IB Scores (1-7 scale)
          </label>
          {formData.ibScores.map((score, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="number"
                min="1"
                max="7"
                value={score}
                onChange={(e) => handleArrayChange('ibScores', index, e.target.value)}
                placeholder="IB Score (1-7)"
                className="w-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              {formData.ibScores.length > 1 && (
                <button
                  onClick={() => removeArrayItem('ibScores', index)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() => addArrayItem('ibScores')}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add IB Score
          </button>
        </div>

        {/* Honors Classes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Honors/AP Classes Taken
          </label>
          <input
            type="number"
            min="0"
            value={formData.honorsClasses}
            onChange={(e) => handleInputChange('honorsClasses', parseInt(e.target.value) || 0)}
            className="w-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Analysis Button */}
        <button
          onClick={handleAnalysis}
          disabled={isAnalyzing}
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze My Profile'}
        </button>
      </div>
    </div>
  );
}
