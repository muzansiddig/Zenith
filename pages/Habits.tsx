import React from 'react';
import { useStore } from '../store';
import { Check, Flame, Trophy } from 'lucide-react';

const Habits = () => {
  const { habits, toggleHabit } = useStore();
  const today = new Date();
  
  // Generate last 7 days
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));
    return d;
  });

  const getDayLabel = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'short' });
  const getDayNum = (date: Date) => date.getDate();
  const getISODate = (date: Date) => date.toISOString().split('T')[0];

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
         <div>
            <h1 className="text-3xl font-bold font-display text-black mb-2">Habit Tracker</h1>
            <p className="text-gray-500">Build consistency with daily tracking.</p>
         </div>
         <div className="bg-gradient-to-r from-purple to-soft-lavender text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
            <Trophy size={20} className="text-yellow-300" />
            <div>
               <p className="text-xs font-medium opacity-90">Current Streak</p>
               <p className="text-lg font-bold">12 Days 🔥</p>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-light-lavender overflow-hidden">
         <div className="grid grid-cols-[200px_1fr] border-b border-light-lavender bg-offwhite/50">
            <div className="p-4 font-semibold text-gray-500 flex items-center">Habit Name</div>
            <div className="grid grid-cols-7">
               {weekDays.map((d, i) => (
                  <div key={i} className={`p-4 text-center border-l border-light-lavender ${getISODate(d) === getISODate(today) ? 'bg-purple/5' : ''}`}>
                     <div className="text-xs text-gray-400 mb-1">{getDayLabel(d)}</div>
                     <div className={`text-sm font-bold ${getISODate(d) === getISODate(today) ? 'text-purple' : 'text-gray-700'}`}>{getDayNum(d)}</div>
                  </div>
               ))}
            </div>
         </div>
         
         <div className="divide-y divide-light-lavender">
            {habits.map(habit => (
               <div key={habit.id} className="grid grid-cols-[200px_1fr] hover:bg-offwhite/30 transition-colors">
                  <div className="p-4 flex items-center gap-3">
                     <div className="p-2 bg-light-lavender/50 rounded-lg text-purple">
                        <Flame size={18} />
                     </div>
                     <div>
                        <h3 className="font-semibold text-gray-900">{habit.name}</h3>
                        <span className="text-xs text-gray-400">{habit.streak} day streak</span>
                     </div>
                  </div>
                  <div className="grid grid-cols-7">
                     {weekDays.map((d, i) => {
                        const iso = getISODate(d);
                        const isCompleted = habit.completedDates.includes(iso);
                        return (
                           <div key={i} className="border-l border-light-lavender p-2 flex items-center justify-center">
                              <button 
                                 onClick={() => toggleHabit(habit.id, iso)}
                                 className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                    isCompleted 
                                       ? 'bg-purple text-white shadow-md shadow-purple/30 scale-100' 
                                       : 'bg-gray-100 text-gray-300 hover:bg-gray-200 scale-90'
                                 }`}
                              >
                                 <Check size={20} className={isCompleted ? 'opacity-100' : 'opacity-0'} />
                              </button>
                           </div>
                        );
                     })}
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Habits;
