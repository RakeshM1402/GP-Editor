"use client";

import React, { useState, useEffect } from "react";
import ThreeCanvas from "@/components/ThreeCanvas";
import UploadOverlay from "@/components/UploadOverlay";
import LoginOverlay from "@/components/LoginOverlay";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simple persistence for Demo user sessions
  useEffect(() => {
    const authFlag = localStorage.getItem("demo_authenticated");
    if (authFlag === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("demo_authenticated", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("demo_authenticated");
    setIsLoggedIn(false);
  };

  return (
    <main className="w-screen h-screen relative bg-slate-950 overflow-hidden font-sans">
      {/* Persistent 3D Canvas Background underneath the UI */}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas />
      </div>

      {/* Conditionally render 2D UI Overlays based on auth state */}
      {isLoggedIn ? (
        <UploadOverlay onLogout={handleLogout} />
      ) : (
        <LoginOverlay onLogin={handleLogin} />
      )}
    </main>
  );
}
