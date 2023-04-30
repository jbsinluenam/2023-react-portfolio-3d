/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import CanvasLoader from '../Loader';

const Computers = ({ isMobile }) => {

  const computer = useGLTF('./desktop_pc/scene.gltf');

  return (
    <mesh>
      <hemisphereLight intensity={0.75} groundColor='pink' />
      <pointLight intensity={0.5} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />

      <primitive
        object={computer.scene}
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile ? [0, -2.5, -1.85] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]} />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the user is on a mobile device
  useEffect(() => {

    // Check if the user is on a mobile device by checking the screen width
    const mediaQuery = window.matchMedia('(max-width: 500px)');

    // Set the state of isMobile to true if the user is on a mobile device
    setIsMobile(mediaQuery.matches);

    // Add an event listener to check if the user changes the screen width
    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    }

    // Add the event listener for the media query change
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Remove the event listener when the component unmounts
    // This is a good practice to avoid memory leaks
    // Because the event listener will still be active even if the component unmounts
    // Components unmount when the user navigates to a different page
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    }
  }, [])

  return (
    <Canvas
      frameLoop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}>

      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2} />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />

    </Canvas>
  )
}

export default ComputersCanvas;