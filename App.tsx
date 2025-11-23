
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Target, 
  PieChart, 
  Sparkles, 
  Store, 
  Settings, 
  Menu,
  Bell,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { useStore } from './store';
import Notifications from './components/Notifications';

// Pages
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Habits from './pages/Habits';
import Budget from './pages/Budget';
import AITemplateBuilder from './pages/AITemplateBuilder';
import Marketplace from './pages/Marketplace';
import Auth from './pages/Auth';
import Profile from './pages/Profile';

const NavItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-purple text-white shadow-lg shadow-purple/20' 
        : 'text-gray-500 hover:bg-light-lavender hover:text-purple'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </Link>
);

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) => {
  const location = useLocation();
  const { user, logout } = useStore();
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-offwhite border-r border-light-lavender transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-8 h-8 rounded-lg bg-purple flex items-center justify-center text-white font-bold font-display">
              Z
            </div>
            <h1 className="text-xl font-bold font-display text-black tracking-tight">Zenith</h1>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem to="/" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/'} />
            <NavItem to="/tasks" icon={CheckSquare} label="Tasks" active={location.pathname === '/tasks'} />
            <NavItem to="/habits" icon={Target} label="Habits" active={location.pathname === '/habits'} />
            <NavItem to="/budget" icon={PieChart} label="Budget" active={location.pathname === '/budget'} />
            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Create</p>
              <NavItem to="/ai-builder" icon={Sparkles} label="AI Builder" active={location.pathname === '/ai-builder'} />
              <NavItem to="/marketplace" icon={Store} label="Marketplace" active={location.pathname === '/marketplace'} />
            </div>
          </nav>

          <div className="mt-auto pt-6 border-t border-light-lavender">
             {user && (
               <div className="flex items-center gap-3 px-2 mb-4">
                 <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                 <div className="flex-1 min-w-0">
                   <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                   <p className="text-xs text-gray-500 truncate">Pro Member</p>
                 </div>
                 <button onClick={logout} className="text-gray-400 hover:text-red-500" title="Logout">
                    <LogOut size={18} />
                 </button>
               </div>
             )}
             <Link to="/profile" className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:text-purple w-full rounded-lg hover:bg-light-lavender">
               <Settings size={20} />
               <span className="font-medium">Settings</span>
             </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { user, notifications } = useStore();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        
        <Route path="/*" element={
          <ProtectedRoute>
            <div className="flex h-screen overflow-hidden bg-beige">
              <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
              
              <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <header className="h-16 flex items-center justify-between px-6 lg:px-8 border-b border-light-lavender bg-offwhite/50 backdrop-blur-md z-30">
                  <div className="flex items-center gap-4">
                     <button 
                       className="lg:hidden p-2 -ml-2 text-gray-600"
                       onClick={() => setSidebarOpen(true)}
                     >
                       <Menu size={24} />
                     </button>
                     {/* Mobile logo only */}
                     <span className="lg:hidden text-lg font-bold font-display">Zenith</span>
                  </div>

                   <div className="flex items-center gap-6">
                     {/* Notifications Trigger */}
                     <div className="relative">
                        <button 
                          className="relative p-2 text-gray-500 hover:bg-light-lavender rounded-full transition-colors"
                          onClick={() => setNotifOpen(!notifOpen)}
                        >
                          <Bell size={20} />
                          {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                          )}
                        </button>
                        {notifOpen && <Notifications onClose={() => setNotifOpen(false)} />}
                     </div>

                     <div className="hidden md:flex items-center gap-3 pl-6 border-l border-light-lavender">
                        <div className="text-right">
                          <p className="text-xs font-bold text-gray-900">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric'})}</p>
                          <p className="text-[10px] text-gray-500 uppercase tracking-wider">{user?.location}</p>
                        </div>
                     </div>
                   </div>
                </header>

                <div className="flex-1 overflow-auto p-4 lg:p-8">
                  <div className="max-w-7xl mx-auto">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/tasks" element={<Tasks />} />
                      <Route path="/habits" element={<Habits />} />
                      <Route path="/budget" element={<Budget />} />
                      <Route path="/ai-builder" element={<AITemplateBuilder />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </div>
                </div>
              </main>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </HashRouter>
  );
}

export default App;
