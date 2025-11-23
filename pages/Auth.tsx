
import React, { useState } from 'react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login, register } = useStore();
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl grid md:grid-cols-2 overflow-hidden min-h-[600px]">
        
        {/* Left Side: Brand */}
        <div className="bg-purple text-white p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-purple font-bold text-xl mb-6">Z</div>
            <h1 className="text-4xl font-bold font-display mb-4">Zenith Productivity</h1>
            <p className="text-purple-100">
              Your all-in-one workspace for tasks, habits, and financial goals. Powered by AI.
            </p>
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="p-4 bg-white/10 backdrop-blur rounded-xl border border-white/10">
              <p className="text-sm">"The automated templates saved me hours every week. A game changer."</p>
              <div className="flex gap-2 mt-2 text-xs font-bold text-purple-200">
                <span>⭐ 5.0</span>
                <span>• Sarah J.</span>
              </div>
            </div>
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-soft-lavender rounded-full blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black rounded-full blur-3xl opacity-20 transform -translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Right Side: Form */}
        <div className="p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold font-display text-black mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-500 mb-8">
            {isLogin ? 'Enter your details to access your workspace.' : 'Start your journey to better productivity today.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                <input 
                  type="text" 
                  required={!isLogin}
                  className="w-full bg-offwhite border border-light-lavender rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full bg-offwhite border border-light-lavender rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
              <input 
                type="password" 
                required
                className="w-full bg-offwhite border border-light-lavender rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white rounded-xl py-4 font-bold text-lg hover:bg-purple transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
              >
                {loading && <Loader2 className="animate-spin" size={20} />}
                {isLogin ? 'Sign In' : 'Get Started'}
                {!loading && <ArrowRight size={20} />}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-bold text-purple hover:underline"
            >
              {isLogin ? 'Sign up free' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
