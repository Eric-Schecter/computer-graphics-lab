import Page, { Camera, useFrame } from '@youyouzone/react-sdf';
import { useRef } from 'react';

const Sphere = () => {
  const ref = useRef<any>();
  useFrame((delta: number, time: number) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(time / 300) * 20;
    }
  })
  return <sphere
    ref={ref}
    position={[50, -50, 0]}
    radius={50}
    color={[0.5, 0.3, 0.6]}
    emissive={[0, 0, 0]}
    roughness={0}
    specular={1}
  />
}

export const App = () => {
  const rawData = [
    { position: [0, 200, 0], size: [100, 1, 50], color: [0.7, 0.7, 0.7], emissive: [1, 1, 1], roughness: 0, specular: 0 },
    { position: [0, 201, 0], size: [200, 1, 100], color: [0.7, 0.7, 0.7], emissive: [0, 0, 0], roughness: 0, specular: 0 },
    { position: [-200, 0, 0], size: [1, 200, 100], color: [1, 0, 0], emissive: [0, 0, 0], roughness: 1, specular: 1 },
    { position: [200, 0, 0], size: [1, 200, 100], color: [0, 1, 0], emissive: [0, 0, 0], roughness: 0.1, specular: 1 },
    { position: [0, 0, -100], size: [200, 200, 1], color: [0.7, 0.7, 0.7], emissive: [0, 0, 0], roughness: 0, specular: 1 },
    { position: [0, -100, 0], size: [200, 1, 100], color: [0.7, 0.7, 0.7], emissive: [0, 0, 0], roughness: 0, specular: 0 },
    { position: [-50, -20, 50], size: [30, 60, 30], color: [0.5, 0.3, 0.6], emissive: [0, 0, 0], roughness: 0, specular: 0 },
  ]

  return <Page
    style={{ width: '100%', height: '100vh' }}
  >
    <Camera
      position={[0, 50, 250]}
      lookat={[0, 50, 0]}
      rotation={0}
      fov={50 / 180 * Math.PI}
    />
    {rawData.map(({ position, size, color, emissive, roughness, specular }, i) =>
      <box
        key={i}
        position={position}
        size={size}
        color={color}
        emissive={emissive}
        roughness={roughness}
        specular={specular}
      />
    )}
    <Sphere />
  </Page>
}