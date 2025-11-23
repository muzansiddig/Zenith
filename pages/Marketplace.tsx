import React from 'react';
import { Template } from '../types';
import { ShoppingBag, Star, Download, Search } from 'lucide-react';

const mockTemplates: Template[] = [
  {
    id: '1',
    title: 'Ultimate Student Planner 2024',
    description: 'Track assignments, grades, and exams in one place.',
    price: 15,
    author: 'Sarah Design',
    type: 'Notion',
    tags: ['Education', 'Productivity'],
  },
  {
    id: '2',
    title: 'Startup Financial Model',
    description: '5-year projection sheets with automated charts.',
    price: 49,
    author: 'FinanceWiz',
    type: 'Spreadsheet',
    tags: ['Business', 'Finance'],
  },
  {
    id: '3',
    title: 'Minimal Habit Tracker',
    description: 'Clean PDF printable for daily tracking.',
    price: 5,
    author: 'ZenithOfficial',
    type: 'PDF',
    tags: ['Health', 'Lifestyle'],
  },
];

const Marketplace = () => {
  return (
    <div className="space-y-8">
      <div className="bg-purple rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <h1 className="text-4xl font-bold font-display mb-4">Discover Premium Templates</h1>
          <p className="text-purple-100 mb-8">Boost your productivity with handcrafted tools from community experts.</p>
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20 flex gap-3">
             <Search className="text-white/60 ml-2" />
             <input type="text" placeholder="Search templates..." className="bg-transparent w-full text-white placeholder-white/60 focus:outline-none" />
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-2xl shadow-sm border border-light-lavender overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
             <div className="h-48 bg-offwhite relative flex items-center justify-center">
                {/* Mock Preview Image */}
                <img 
                   src={`https://picsum.photos/seed/${template.id}/400/300`} 
                   alt={template.title} 
                   className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                   {template.type}
                </div>
             </div>
             <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-lg text-black group-hover:text-purple transition-colors">{template.title}</h3>
                   <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold bg-yellow-50 px-2 py-1 rounded-full">
                      <Star size={12} fill="currentColor" /> 4.8
                   </div>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{template.description}</p>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-light-lavender">
                   <span className="text-xl font-bold text-black">${template.price}</span>
                   <button className="bg-black text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-purple transition-colors flex items-center gap-2">
                      <ShoppingBag size={16} /> Buy Now
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
