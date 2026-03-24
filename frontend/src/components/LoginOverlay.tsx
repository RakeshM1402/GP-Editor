"use client";

import React from "react";

interface LoginOverlayProps {
  onLogin: () => void;
}

export default function LoginOverlay({ onLogin }: LoginOverlayProps) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 pointer-events-none">
      
      {/* Brand Watermark / Title */}
      <div className="absolute top-10 left-10 pointer-events-auto">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-md tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <span className="text-white font-bold text-2xl leading-none">G</span>
          </div>
          Gurupadigam<span className="text-blue-500">.</span>
        </h1>
      </div>

      {/* Main Login Card */}
      <div className="pointer-events-auto bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-12 rounded-[2rem] shadow-2xl w-full max-w-md transform transition-all hover:border-white/10 group">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Sign in to edit your Gurupadigam PDF templates.</p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Supabase / Google Sign In Button */}
          <button 
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3.5 rounded-xl transition-all shadow-md active:scale-[0.98]"
            onClick={() => alert("Supabase Google Auth will be wired here!")}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-slate-700/50"></div>
            <span className="flex-shrink-0 mx-4 text-slate-500 text-sm">or</span>
            <div className="flex-grow border-t border-slate-700/50"></div>
          </div>

          {/* Demo Bypass Button */}
          <button 
            type="button"
            onClick={onLogin}
            className="w-full flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg active:scale-[0.98] border border-slate-700"
          >
            Try Demo Version
          </button>
        </div>

        <p className="text-center text-slate-500 text-xs mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
