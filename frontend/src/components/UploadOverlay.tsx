"use client";

import React, { useState, useEffect } from "react";
import { UploadCloud, FileText, CheckCircle2, Loader2, Download, Settings, X, LogOut } from "lucide-react";

interface UploadOverlayProps {
  onLogout: () => void;
}

export default function UploadOverlay({ onLogout }: UploadOverlayProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [studentText, setStudentText] = useState("I will improve");
  const [parentText, setParentText] = useState("My son will improve");

  useEffect(() => {
    const savedStudent = localStorage.getItem("gurupadigam_student_text");
    const savedParent = localStorage.getItem("gurupadigam_parent_text");
    if (savedStudent) setStudentText(savedStudent);
    if (savedParent) setParentText(savedParent);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("gurupadigam_student_text", studentText);
    localStorage.setItem("gurupadigam_parent_text", parentText);
    setShowSettings(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setSuccessStatus(false);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("student_text", studentText);
      formData.append("parent_text", parentText);

      // Connect to FastAPI backend
      const res = await fetch("http://localhost:8000/api/pdf/process", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to process PDF");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Gurupadigam_${file.name}`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      setSuccessStatus(true);
      setFile(null);
    } catch (err) {
      console.error(err);
      setError("Failed to process PDF. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6 pointer-events-auto">
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 flex items-center justify-center">
            <span className="text-white font-bold text-2xl leading-none">G</span>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Gurupadigam<span className="text-blue-500">.</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSettings(true)}
            className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 text-slate-300 hover:text-white transition-all backdrop-blur-md shadow-xl"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 transition-all backdrop-blur-md shadow-xl font-medium"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </nav>

      {/* Main Drag and Drop Interface */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/40 backdrop-blur-2xl border border-white/5 p-10 rounded-[2rem] shadow-2xl w-full max-w-lg transform transition-all hover:border-white/10 group mt-16">
          
          {successStatus ? (
            <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Processing Complete</h2>
              <p className="text-slate-400 mb-8 text-lg">Your configured document has been saved to your device.</p>
              <button 
                onClick={() => setSuccessStatus(false)}
                className="w-full px-6 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors border border-white/10 font-medium"
              >
                Process Another Document
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="text-center mb-2">
                <h2 className="text-2xl font-semibold text-white mb-2">Process Document</h2>
                <p className="text-slate-400 text-sm">Upload your PDF template to automatically inject configured commitments.</p>
              </div>

              <div>
                <label className="flex flex-col items-center justify-center w-full h-48 border border-slate-700/50 border-dashed rounded-2xl cursor-pointer bg-slate-950/20 hover:bg-blue-500/5 hover:border-blue-500/50 transition-all group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.1)] relative overflow-hidden">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {file ? (
                      <div className="p-4 bg-blue-500/10 rounded-full mb-3">
                        <FileText className="w-10 h-10 text-blue-400" />
                      </div>
                    ) : (
                      <div className="p-4 bg-white/5 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                        <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-blue-400 transition-colors" />
                      </div>
                    )}
                    <span className="text-slate-200 font-medium text-lg">
                      {file ? file.name : "Select PDF Template"}
                    </span>
                    <span className="text-slate-500 text-sm mt-1">
                      {file ? "Click to change file" : "or drag and drop here"}
                    </span>
                  </div>
                  <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
                </label>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading || !file}
                className="relative overflow-hidden w-full flex items-center justify-center gap-2 bg-white text-slate-950 hover:bg-slate-100 disabled:opacity-50 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed font-semibold py-4 rounded-xl transition-all shadow-xl active:scale-[0.98] group"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                    Process & Download
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Settings Modal Layer */}
      {showSettings && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm pointer-events-auto animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" />
                Configuration
              </h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex flex-col gap-5">
              <p className="text-sm text-slate-400 mb-2">
                Configure the default texts that will be injected into your Gurupadigam PDF template.
              </p>

              <div>
                <label className="block text-sm text-slate-300 font-medium mb-1.5">Student Commitment Text</label>
                <input 
                  type="text" 
                  value={studentText}
                  onChange={e => setStudentText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-lg px-4 py-3 text-white outline-none transition-colors"
                  placeholder="I will improve"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 font-medium mb-1.5">Parent Commitment Text</label>
                <input 
                  type="text" 
                  value={parentText}
                  onChange={e => setParentText(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-lg px-4 py-3 text-white outline-none transition-colors"
                  placeholder="My son will improve"
                />
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-end gap-3">
              <button 
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={saveSettings}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors font-medium shadow-lg shadow-blue-500/20"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
