
import React, { useState } from 'react';
import { useStore } from '../store';
import { Bell, Check, Trash2, X, Plus, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = ({ onClose }: { onClose: () => void }) => {
  const { notifications, markNotificationRead, clearNotifications, createReminder } = useStore();
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if(newTitle && newDate) {
      createReminder(newTitle, 'Custom Reminder', newDate);
      setNewTitle('');
      setNewDate('');
      setShowAdd(false);
    }
  };

  return (
    <div className="absolute top-16 right-4 w-96 bg-white rounded-2xl shadow-2xl border border-light-lavender z-50 overflow-hidden flex flex-col max-h-[80vh]">
      <div className="p-4 border-b border-light-lavender flex items-center justify-between bg-offwhite/50 backdrop-blur">
        <div className="flex items-center gap-2">
           <Bell size={18} className="text-purple" />
           <h3 className="font-bold text-gray-900">Notifications</h3>
           {unreadCount > 0 && (
             <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
               {unreadCount}
             </span>
           )}
        </div>
        <div className="flex items-center gap-2">
           <button onClick={() => setShowAdd(!showAdd)} className="text-gray-400 hover:text-purple p-1" title="Add Reminder">
              <Plus size={18} />
           </button>
           <button onClick={clearNotifications} className="text-gray-400 hover:text-red-500 p-1" title="Clear all">
              <Trash2 size={16} />
           </button>
           <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1">
              <X size={18} />
           </button>
        </div>
      </div>

      {showAdd && (
         <form onSubmit={handleAddReminder} className="p-4 bg-offwhite border-b border-light-lavender animate-fade-in">
            <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">New Reminder</h4>
            <input 
              type="text" 
              placeholder="Remind me to..." 
              className="w-full text-sm p-2 rounded-lg border border-gray-200 mb-2 focus:ring-1 focus:ring-purple focus:outline-none"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              autoFocus
            />
            <div className="flex gap-2">
               <input 
                 type="datetime-local" 
                 className="flex-1 text-sm p-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-purple focus:outline-none text-gray-500"
                 value={newDate}
                 onChange={(e) => setNewDate(e.target.value)}
               />
               <button type="submit" className="bg-purple text-white px-3 py-2 rounded-lg text-sm font-bold">Add</button>
            </div>
         </form>
      )}

      <div className="overflow-y-auto flex-1 p-2">
        {notifications.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Bell size={32} className="mb-2 opacity-20" />
              <p className="text-sm">No new notifications</p>
           </div>
        ) : (
           <div className="space-y-1">
              <AnimatePresence>
                {notifications.map(n => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-3 rounded-xl relative group transition-colors ${n.read ? 'bg-white text-gray-500' : 'bg-purple/5 text-gray-900'}`}
                  >
                    <div className="flex gap-3">
                       <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.read ? 'bg-gray-300' : 'bg-purple'}`} />
                       <div className="flex-1">
                          <p className="text-sm font-semibold mb-1">{n.title}</p>
                          <p className="text-xs opacity-80 leading-relaxed mb-1">{n.message}</p>
                          <div className="flex justify-between items-center text-[10px] text-gray-400">
                            <span>
                               {new Date(n.timestamp).toLocaleString(undefined, {
                                  hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric'
                               })}
                            </span>
                            {n.scheduledFor && (
                              <span className="flex items-center gap-1 text-purple">
                                <Calendar size={10} />
                                {new Date(n.scheduledFor).toLocaleString(undefined, {
                                   month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'
                                })}
                              </span>
                            )}
                          </div>
                       </div>
                       {!n.read && (
                          <button 
                             onClick={() => markNotificationRead(n.id)}
                             className="absolute top-3 right-3 text-purple opacity-0 group-hover:opacity-100 transition-opacity"
                             title="Mark as read"
                          >
                             <Check size={14} />
                          </button>
                       )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
