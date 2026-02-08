'use client';

import { useState } from 'react';
import { useCompletion } from 'ai/react';

interface BlogSummarizerProps {
  postContent: string;
}

export default function BlogSummarizer({ postContent }: BlogSummarizerProps) {
  const [summaryStyle, setSummaryStyle] = useState<'concise' | 'detailed'>('concise');
  const [isOpen, setIsOpen] = useState(false);
  
  const { completion, isLoading, complete } = useCompletion({
    api: '/api/summarize',
  });

  const handleGenerate = async () => {
    setIsOpen(true);
    await complete('', {
      body: { content: postContent, style: summaryStyle }
    });
  };

  return (
    <div className="my-8">
      {/* Summary Button */}
      {!isOpen && (
        <button
          onClick={handleGenerate}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg"
        >
          ✨ Generate AI Summary
        </button>
      )}

      {/* Summary Panel */}
      {isOpen && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">AI-Generated Summary</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          {/* Style Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSummaryStyle('concise')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                summaryStyle === 'concise'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Concise
            </button>
            <button
              onClick={() => setSummaryStyle('detailed')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                summaryStyle === 'detailed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              Detailed
            </button>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition mb-4"
          >
            {isLoading ? '⏳ Generating Summary...' : '🚀 Generate Summary'}
          </button>

          {/* Summary Display */}
          {completion && (
            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {completion}
              </p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && !completion && (
            <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
              <div className="flex items-center gap-2">
                <div className="animate-spin">⚙️</div>
                <p className="text-gray-600">Generating your summary...</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
