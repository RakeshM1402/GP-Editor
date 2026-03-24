"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";

export default function DocumentModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);
  const meshRef3 = useRef<THREE.Mesh>(null);

  // Smooth abstract rotation
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.x = -t * 0.15;
      meshRef2.current.rotation.y = -t * 0.25;
      meshRef2.current.position.y = Math.sin(t * 0.5) * 0.5 - 0.5;
    }
    if (meshRef3.current) {
      meshRef3.current.rotation.z = t * 0.1;
      meshRef3.current.position.x = Math.cos(t * 0.4) * 1.5;
      meshRef3.current.position.z = Math.sin(t * 0.4) * 1.5 - 1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={[0, 0, 0]}>
        
        {/* Main Center Geometry - TorusKnot */}
        <mesh ref={meshRef} position={[0, 0.5, 0]} castShadow>
          <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={1.5}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0.1}
            clearcoat={1}
            attenuationDistance={0.5}
            attenuationColor="#ffffff"
            color="#ffffff"
          />
        </mesh>

        {/* Floating Ring background */}
        <mesh ref={meshRef2} position={[-2, -1, -2]} castShadow receiveShadow>
          <torusGeometry args={[1.5, 0.1, 32, 64]} />
          <meshPhysicalMaterial 
            color="#3b82f6" 
            metalness={0.8} 
            roughness={0.1} 
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Small floating sphere */}
        <mesh ref={meshRef3} position={[2, 1, -1]} castShadow receiveShadow>
          <icosahedronGeometry args={[0.5, 2]} />
          <meshPhysicalMaterial 
            color="#ec4899" 
            metalness={0.9} 
            roughness={0.2} 
            clearcoat={1}
          />
        </mesh>

      </group>
    </Float>
  );
}
