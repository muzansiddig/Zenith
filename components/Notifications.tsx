
import React from 'react';
import { useStore } from '../store';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Notifications = ({ onClose }: { onClose: () => void }) => {
  const { notifications, markNotificationRead, clearNotifications } = useStore();

  const unreadCount = notifications.filter(n => !n.read).length;

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
           <button onClick={clearNotifications} className="text-gray-400 hover:text-red-500 p-1" title="Clear all">
              <Trash2 size={16} />
           </button>
           <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1">
              <X size={18} />
           </button>
        </div>
      </div>

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
                          <p className="text-xs opacity-80 leading-relaxed">{n.message}</p>
                          <p className="text-[10px] mt-2 text-gray-400">
                             {new Date(n.timestamp).toLocaleString(undefined, {
                                hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric'
                             })}
                          </p>
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
