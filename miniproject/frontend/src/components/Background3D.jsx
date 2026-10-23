import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const CCTVCamera = () => {
  const groupRef = useRef();
  
  // Rotate the camera slowly over time to simulate a scanning motion
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base Mount */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.2, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Arm connecting base to main body */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1.0, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Camera Body Bracket (U-shape approximation) */}
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 0.6, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Camera Main Body */}
      <mesh position={[0, 0.3, 0.4]} rotation={[Math.PI / 8, 0, 0]}>
        <boxGeometry args={[0.8, 0.6, 1.5]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.7} roughness={0.3} />
        
        {/* Antigravity glowing stripe or accent */}
        <mesh position={[0, 0.31, 0]}>
          <planeGeometry args={[0.8, 1.4]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>

        {/* Camera Lens Housing */}
        <mesh position={[0, 0, 0.8]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
        </mesh>
        
        {/* Camera Lens Glass */}
        <mesh position={[0, 0, 0.91]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
          <meshPhysicalMaterial 
            color="#000000" 
            metalness={0.9} 
            roughness={0.1} 
            transparent 
            opacity={0.8} 
            envMapIntensity={2} 
            clearcoat={1} 
          />
        </mesh>

        {/* Glowing Lens Ring (Antigravity vibe neon) */}
        <mesh position={[0, 0, 0.85]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.26, 0.28, 32]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </mesh>
    </group>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-zinc-950">
      <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <CCTVCamera />
        </Float>
        
        {/* Ambient floating technological dust */}
        <Sparkles count={150} scale={10} size={2} speed={0.4} opacity={0.3} color="#38bdf8" />
        
        <Environment preset="city" />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      {/* Overlay gradient to blend bottom of 3d scene smoothly into UI */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
    </div>
  );
};

export default Background3D;
