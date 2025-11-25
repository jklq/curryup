'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // Dark theme for code blocks

interface ProblemViewProps {
  title: string;
  difficulty: string;
  instructions: string;
  examples: string;
}

const ProblemView: React.FC<ProblemViewProps> = ({ title, difficulty, instructions, examples }) => {
  return (
    <div className="h-full overflow-y-auto p-6 text-slate-700">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{title}</h1>
        <div className="flex gap-2 text-xs">
          <span className={`px-2 py-1 rounded-full ${
            difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
            difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {difficulty}
          </span>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Instructions</h2>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {instructions}
          </ReactMarkdown>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Examples</h2>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {examples}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ProblemView;
