
import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { ArrowUpRight, CheckCircle2, DollarSign, Calendar, Target, Clock } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, change, trend }: { title: string, value: string, icon: any, change: string, trend: 'up' | 'down' }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-lavender hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-offwhite rounded-xl text-purple">
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
        trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}>
        {change}
        <ArrowUpRight size={12} className={trend === 'down' ? 'rotate-90' : ''} />
      </div>
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold font-display text-black">{value}</p>
  </div>
);

const Dashboard = () => {
  const { user, tasks, habits, transactions, logs } = useStore();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  // Clock & Greeting
  useEffect(() => {
    const updateTime = () => {
      if (user?.timezone) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
           timeZone: user.timezone, 
           hour: 'numeric', 
           minute: '2-digit' 
        });
        setCurrentTime(timeString);

        const hour = parseInt(now.toLocaleTimeString('en-US', { timeZone: user.timezone, hour12: false, hour: 'numeric' }));
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
      }
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, [user]);

  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const totalBalance = transactions.reduce((acc, curr) => curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0);
  const activeHabits = habits.length;

  // Mock data for charts
  const activityData = [
    { name: 'Mon', tasks: 4, focus: 85 },
    { name: 'Tue', tasks: 6, focus: 90 },
    { name: 'Wed', tasks: 8, focus: 65 },
    { name: 'Thu', tasks: 5, focus: 80 },
    { name: 'Fri', tasks: 9, focus: 95 },
    { name: 'Sat', tasks: 3, focus: 70 },
    { name: 'Sun', tasks: 2, focus: 60 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <div className="flex items-center gap-2 text-purple font-medium mb-1">
              <Clock size={16} />
              <span>{currentTime}</span>
           </div>
          <h1 className="text-4xl font-bold font-display text-black mb-2">
            {greeting}, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-500">Here's your daily productivity snapshot.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white border border-light-lavender text-black px-4 py-3 rounded-xl font-bold text-sm hover:bg-offwhite transition-colors">
             View Reports
           </button>
           <button className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-purple transition-colors shadow-lg shadow-purple/10">
             + Quick Add
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Balance" 
          value={`$${totalBalance}`} 
          icon={DollarSign} 
          change="+12.5%" 
          trend="up" 
        />
        <StatCard 
          title="Tasks Completed" 
          value={completedTasks.toString()} 
          icon={CheckCircle2} 
          change="+8.2%" 
          trend="up" 
        />
        <StatCard 
          title="Active Habits" 
          value={activeHabits.toString()} 
          icon={Target} 
          change="+2 new" 
          trend="up" 
        />
        <StatCard 
          title="Focus Score" 
          value="87/100" 
          icon={Calendar} 
          change="-2.4%" 
          trend="down" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-lavender">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-bold font-display">Productivity Flow</h2>
                 <select className="bg-offwhite border-none rounded-lg text-xs font-bold text-gray-500 py-2 px-3 focus:ring-0">
                    <option>This Week</option>
                    <option>Last Week</option>
                 </select>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6C4A74" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6C4A74" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9DCEC" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="focus" 
                      stroke="#6C4A74" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorFocus)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-lavender">
               <h2 className="text-lg font-bold font-display mb-4">Recent Activity</h2>
               <div className="space-y-4">
                  {logs.slice(0, 5).map(log => (
                     <div key={log.id} className="flex items-center gap-3 p-2 hover:bg-offwhite rounded-lg transition-colors">
                        <div className="w-8 h-8 rounded-full bg-light-lavender flex items-center justify-center text-purple text-xs font-bold">
                           {log.action.charAt(0)}
                        </div>
                        <div className="flex-1">
                           <p className="text-sm font-semibold text-gray-900">{log.action}</p>
                           {log.details && <p className="text-xs text-gray-500">{log.details}</p>}
                        </div>
                        <span className="text-[10px] text-gray-400">
                           {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                     </div>
                  ))}
               </div>
            </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-lavender">
              <h2 className="text-lg font-bold font-display mb-6">Task Output</h2>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9DCEC" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 10}} />
                    <Tooltip 
                      cursor={{fill: '#F7EFEA'}}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                    />
                    <Bar dataKey="tasks" fill="#C79BCF" radius={[4, 4, 0, 0]} barSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-purple text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                 <h2 className="text-xl font-bold font-display mb-2">Pro Tip</h2>
                 <p className="text-purple-100 text-sm mb-4">Users who track habits daily are 42% more likely to achieve their goals.</p>
                 <button className="bg-white text-purple px-4 py-2 rounded-lg text-sm font-bold hover:bg-opacity-90 transition-opacity">
                    Check Habits
                 </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
