
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Mail, Lock, User as UserIcon, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { User, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  onLoginSuccess?: (user: User) => void;
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login', onLoginSuccess }: AuthModalProps) {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CUSTOMER);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap and ESC close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email address";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Min 6 characters required";

    if (mode === 'signup' && !name.trim()) {
      newErrors.name = "Full name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      
      // Simulate API call and role-based routing
      setTimeout(() => {
        const simulatedUser: User = {
          id: 'u-' + Math.random().toString(36).substr(2, 9),
          name: mode === 'signup' ? name : 'Demo User',
          role: role,
          avatar: `https://picsum.photos/seed/${email}/200`,
          isVerified: true
        };

        setIsLoading(false);
        if (onLoginSuccess) onLoginSuccess(simulatedUser);
        
        // Final routing logic
        if (simulatedUser.role === UserRole.TRANSPORTER) {
          navigate('/dashboard');
        } else {
          navigate('/marketplace');
        }
        
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0B1020]/80 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div 
        ref={modalRef}
        className="bg-white w-full max-w-md rounded-[2.5rem] p-8 lg:p-12 relative z-10 animate-in zoom-in-95 duration-300 shadow-2xl overflow-hidden"
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-[#2A3346]/40 hover:text-[#C86B4A] transition-colors p-2"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#C86B4A]/10 rounded-2xl flex items-center justify-center text-[#C86B4A] mx-auto mb-6">
            {mode === 'login' ? <Lock className="w-8 h-8" /> : <UserIcon className="w-8 h-8" />}
          </div>
          <h3 className="text-3xl font-serif font-bold mb-3 text-[#0B1020]">
            {mode === 'login' ? 'Welcome Back' : 'Join PawsPath'}
          </h3>
          <p className="text-[#2A3346]/60 text-sm font-medium">
            {mode === 'login' ? 'Sign in to your dashboard' : 'Start your journey with us today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <div className="relative">
              <label className="text-xs font-bold text-[#2A3346]/40 uppercase tracking-widest mb-1.5 block">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A3346]/30" />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className={`w-full bg-[#F7F1E8] pl-11 pr-4 py-4 rounded-xl border-2 transition-all text-sm font-bold ${errors.name ? 'border-red-300' : 'border-transparent focus:border-[#C86B4A] focus:ring-4 focus:ring-[#C86B4A]/5'}`}
                />
              </div>
              {errors.name && <p className="mt-1 text-[10px] font-bold text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
            </div>
          )}

          <div className="relative">
            <label className="text-xs font-bold text-[#2A3346]/40 uppercase tracking-widest mb-1.5 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A3346]/30" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className={`w-full bg-[#F7F1E8] pl-11 pr-4 py-4 rounded-xl border-2 transition-all text-sm font-bold ${errors.email ? 'border-red-300' : 'border-transparent focus:border-[#C86B4A] focus:ring-4 focus:ring-[#C86B4A]/5'}`}
              />
            </div>
            {errors.email && <p className="mt-1 text-[10px] font-bold text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
          </div>

          <div className="relative">
            <label className="text-xs font-bold text-[#2A3346]/40 uppercase tracking-widest mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A3346]/30" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-[#F7F1E8] pl-11 pr-4 py-4 rounded-xl border-2 transition-all text-sm font-bold ${errors.password ? 'border-red-300' : 'border-transparent focus:border-[#C86B4A] focus:ring-4 focus:ring-[#C86B4A]/5'}`}
              />
            </div>
            {errors.password && <p className="mt-1 text-[10px] font-bold text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.password}</p>}
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-[#2A3346]/40 uppercase tracking-widest mb-1.5 block">Login as</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole(UserRole.CUSTOMER)}
                className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${role === UserRole.CUSTOMER ? 'bg-[#0B1020] text-white' : 'bg-[#F7F1E8] text-[#2A3346]/40 hover:text-[#0B1020]'}`}
              >
                Pet Parent
              </button>
              <button
                type="button"
                onClick={() => setRole(UserRole.TRANSPORTER)}
                className={`py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${role === UserRole.TRANSPORTER ? 'bg-[#C86B4A] text-white' : 'bg-[#F7F1E8] text-[#2A3346]/40 hover:text-[#C86B4A]'}`}
              >
                Transporter
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#0B1020] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#C86B4A] transition-all shadow-xl shadow-[#0B1020]/10 flex items-center justify-center gap-3 disabled:opacity-70 group"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                {mode === 'login' ? 'Sign In' : 'Create Account'} 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-[#F7F1E8] text-center">
          <p className="text-sm text-[#2A3346]/50 font-medium">
            {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setErrors({});
              }} 
              className="ml-2 font-bold text-[#C86B4A] hover:underline"
            >
              {mode === 'login' ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
