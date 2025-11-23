import React from 'react';
import { useStore } from '../store';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react';

const COLORS = ['#6C4A74', '#C79BCF', '#E9DCEC', '#9CA3AF', '#FCD34D'];

const Budget = () => {
  const { transactions } = useStore();

  const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);

  // Group by category for chart
  const dataMap = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
       acc[t.category] = (acc[t.category] || 0) + t.amount;
       return acc;
    }, {} as Record<string, number>);
  
  const chartData = Object.keys(dataMap).map(key => ({ name: key, value: dataMap[key] }));

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-display text-black">Financial Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-black text-white p-6 rounded-2xl shadow-xl">
            <p className="text-gray-400 text-sm mb-1">Total Balance</p>
            <h2 className="text-4xl font-bold font-display mb-4">${income - expense}</h2>
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
               <div className="bg-purple h-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">75% of monthly goal reached</p>
         </div>

         <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-lavender flex items-center justify-between">
            <div>
               <p className="text-gray-500 text-sm mb-1">Income</p>
               <h2 className="text-2xl font-bold text-green-600">+ ${income}</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
               <ArrowUpCircle size={24} />
            </div>
         </div>

         <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-lavender flex items-center justify-between">
            <div>
               <p className="text-gray-500 text-sm mb-1">Expenses</p>
               <h2 className="text-2xl font-bold text-red-600">- ${expense}</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
               <ArrowDownCircle size={24} />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-lavender">
            <h3 className="font-bold text-lg mb-6">Expense Breakdown</h3>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {chartData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                     </Pie>
                     <Tooltip />
                     <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-lavender">
            <h3 className="font-bold text-lg mb-6">Recent Transactions</h3>
            <div className="space-y-4">
               {transactions.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-3 hover:bg-offwhite rounded-xl transition-colors cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                           t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                           <DollarSign size={18} />
                        </div>
                        <div>
                           <p className="font-semibold text-gray-900">{t.description}</p>
                           <p className="text-xs text-gray-500">{t.category} • {t.date}</p>
                        </div>
                     </div>
                     <span className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-black'}`}>
                        {t.type === 'income' ? '+' : '-'}${t.amount}
                     </span>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Budget;