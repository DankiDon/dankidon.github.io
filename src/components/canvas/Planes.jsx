import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Planes = ({ isMobile }) => {
  const plane = useGLTF("./models/Plane.gltf");

  return (
    <mesh>
      <pointLight intensity={120} position={[-1,1,-2]}/>
      <primitive
        object={plane.scene}
        scale={isMobile ? 0.04 : 0.045}
        position={isMobile ? [-5.2 -3.2, -2.2] : [-5, -3, 2]}
        rotation={[0.4, 0.4, -0.7]}
      />
    </mesh>
  );
};

const PlanesCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Planes isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default PlanesCanvas;