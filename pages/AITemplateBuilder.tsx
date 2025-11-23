import React, { useState } from 'react';
import { generateTemplate } from '../geminiService';
import { AITemplateResponse } from '../types';
import { Sparkles, Loader2, Download, Table, FileSpreadsheet } from 'lucide-react';

const AITemplateBuilder = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AITemplateResponse | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setResult(null);
    const data = await generateTemplate(prompt);
    setResult(data);
    setLoading(false);
  };

  const handleExport = (type: 'csv' | 'json') => {
     if(!result) return;
     const content = type === 'json' ? JSON.stringify(result, null, 2) : 
        [result.structure.columns.join(','), ...result.structure.data.map(row => row.join(','))].join('\n');
     
     const blob = new Blob([content], { type: type === 'json' ? 'application/json' : 'text/csv' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = `${result.title.replace(/\s+/g, '_').toLowerCase()}.${type}`;
     document.body.appendChild(a);
     a.click();
     document.body.removeChild(a);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 mb-12">
        <div className="w-16 h-16 bg-purple rounded-2xl flex items-center justify-center text-white mx-auto shadow-xl shadow-purple/20">
          <Sparkles size={32} />
        </div>
        <h1 className="text-4xl font-bold font-display text-black">AI Template Architect</h1>
        <p className="text-gray-500 max-w-lg mx-auto">
          Describe what you need — a budget planner, student schedule, or workout tracker — and our AI will build the perfect structure for you.
        </p>
      </div>

      <div className="bg-white p-2 rounded-2xl shadow-lg border border-light-lavender flex gap-2">
        <input 
          type="text" 
          className="flex-1 px-6 py-4 rounded-xl focus:outline-none text-lg text-gray-800 placeholder-gray-400"
          placeholder="e.g., A weekly meal planner with calorie tracking and grocery list..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <button 
          onClick={handleGenerate}
          disabled={loading || !prompt}
          className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
          <span>Generate</span>
        </button>
      </div>

      {result && (
        <div className="animate-fade-in space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-light-lavender overflow-hidden">
             <div className="p-6 border-b border-light-lavender bg-offwhite/30 flex justify-between items-start">
               <div>
                  <h2 className="text-2xl font-bold font-display mb-2">{result.title}</h2>
                  <p className="text-gray-600">{result.description}</p>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => handleExport('csv')} className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50">
                     <FileSpreadsheet size={16} /> Excel / CSV
                  </button>
                  <button onClick={() => handleExport('json')} className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50">
                     <Download size={16} /> JSON
                  </button>
               </div>
             </div>
             
             <div className="p-6 overflow-x-auto">
               <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        {result.structure.columns.map((col, idx) => (
                          <th key={idx} className="px-6 py-4 font-semibold text-gray-900">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {result.structure.data.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-gray-50/50">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-6 py-4 text-gray-600">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
             </div>

             <div className="p-6 bg-purple/5 border-t border-purple/10">
                <h3 className="font-bold text-purple mb-3 flex items-center gap-2">
                   <Sparkles size={16} /> AI Suggestions
                </h3>
                <ul className="space-y-2">
                   {result.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-gray-700">
                         <span className="w-5 h-5 rounded-full bg-purple/20 text-purple flex items-center justify-center text-xs font-bold shrink-0">
                           {idx + 1}
                         </span>
                         {suggestion}
                      </li>
                   ))}
                </ul>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITemplateBuilder;
