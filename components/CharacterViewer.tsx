
import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const PlaceholderModel = () => {
  const meshRef = React.useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshStandardMaterial 
        color="#0891b2" 
        emissive="#0e7490" 
        emissiveIntensity={0.5}
        roughness={0.2} 
        metalness={0.8} 
        wireframe
      />
    </mesh>
  );
};


export const CharacterViewer: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 1, 7], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.5} 
        color="#ffffff"
      />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#0891b2" />
      <Suspense fallback={null}>
          <PlaceholderModel />
      </Suspense>
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI * (2/3)}
      />
    </Canvas>
  );
};
