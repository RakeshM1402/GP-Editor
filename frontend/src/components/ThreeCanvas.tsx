"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, Sparkles } from "@react-three/drei";
import React, { Suspense } from "react";
import DocumentModel from "./DocumentModel";

export default function ThreeCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} className="w-full h-full pointer-events-auto">
      <color attach="background" args={["#020617"]} /> {/* Slate 950 Deep professional dark */}

      {/* Rich Studio Lighting Setup */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
      <spotLight position={[0, 10, 0]} intensity={1} angle={0.2} penumbra={1} castShadow />
      
      <Environment preset="studio" />
      
      <Suspense fallback={null}>
        <DocumentModel />
        <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.3} color="#ffffff" />
        <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
