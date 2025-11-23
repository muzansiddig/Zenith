
import React, { useState } from 'react';
import { useStore } from '../store';
import { User, MapPin, Clock, Shield, Save, Camera, History, Calendar, Smartphone } from 'lucide-react';

const Profile = () => {
  const { user, logs, updateProfile } = useStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    city: user?.city || '',
    country: user?.country || '',
  });

  if (!user) return null;

  const handleSave = () => {
    updateProfile(formData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold font-display text-black">Account Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-lavender text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full rounded-full object-cover border-4 border-offwhite"
              />
              <button className="absolute bottom-0 right-0 bg-black text-white p-2 rounded-full hover:bg-purple transition-colors">
                <Camera size={14} />
              </button>
            </div>
            <h2 className="text-xl font-bold font-display">{user.name}</h2>
            <p className="text-gray-500 text-sm mb-4">{user.email}</p>
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 bg-offwhite py-2 px-4 rounded-full mx-auto w-fit">
              <Shield size={12} /> Pro Member
            </div>
            <div className="mt-4 text-xs text-gray-400 flex items-center justify-center gap-1">
               <Calendar size={12} /> Joined {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-lavender space-y-4">
             <div className="flex items-center gap-3 text-sm text-gray-600">
               <Clock size={16} className="text-purple" />
               <div className="flex-1">
                 <p className="font-semibold">Timezone</p>
                 <p className="text-xs text-gray-400">{user.timezone}</p>
               </div>
             </div>
             <div className="flex items-center gap-3 text-sm text-gray-600">
               <MapPin size={16} className="text-purple" />
               <div className="flex-1">
                 <p className="font-semibold">Location</p>
                 <p className="text-xs text-gray-400">{user.city}, {user.country}</p>
               </div>
             </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-light-lavender">
            <h3 className="font-bold text-lg mb-6">Personal Information</h3>
            <div className="space-y-4">
              <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 bg-offwhite rounded-xl border border-light-lavender focus:ring-1 focus:ring-purple focus:outline-none"
                  />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                  <input 
                    type="text" 
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    className="w-full p-3 bg-offwhite rounded-xl border border-light-lavender focus:ring-1 focus:ring-purple focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Country</label>
                  <input 
                    type="text" 
                    value={formData.country}
                    onChange={e => setFormData({...formData, country: e.target.value})}
                    className="w-full p-3 bg-offwhite rounded-xl border border-light-lavender focus:ring-1 focus:ring-purple focus:outline-none"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                  className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-400 cursor-not-allowed"
                />
                <p className="text-[10px] text-gray-400 mt-1 ml-1">Contact support to change email.</p>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  onClick={handleSave}
                  className="bg-black text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-purple transition-colors flex items-center gap-2"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-light-lavender">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                   <History className="text-purple" size={20} />
                   <h3 className="font-bold text-lg">Activity Log</h3>
                </div>
                <button className="text-xs text-purple font-bold hover:underline">Download CSV</button>
             </div>
             
             <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {logs.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-4">No recent activity.</p>
                ) : (
                  logs.map(log => (
                    <div key={log.id} className="flex items-start gap-4 p-4 border border-light-lavender/50 rounded-xl hover:bg-offwhite transition-colors text-sm group">
                      <div className="w-8 h-8 rounded-full bg-light-lavender flex items-center justify-center text-purple text-xs font-bold shrink-0 mt-0.5">
                         {log.action.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                           <p className="font-semibold text-gray-900">{log.action}</p>
                           <p className="text-xs text-gray-400">{new Date(log.timestamp).toLocaleString()}</p>
                        </div>
                        {log.details && <p className="text-gray-500 text-xs mt-1">{log.details}</p>}
                        <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Smartphone size={10} /> {log.device}
                        </div>
                      </div>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
