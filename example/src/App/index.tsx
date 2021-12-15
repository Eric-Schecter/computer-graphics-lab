import Page, { Camera, useFrame, SphereProp } from '@youyouzone/react-sdf';
import { useEffect, useRef, useState } from 'react';

const rawData = [
  { position: { x: 0, y: 200, z: 0 }, size: { width: 100, height: 1, depth: 50 }, color: { x: 0.7, y: 0.7, z: 0.7 }, emissive: { x: 1, y: 1, z: 1 }, roughness: 0, specular: 0 },
  { position: { x: 0, y: 201, z: 0 }, size: { width: 200, height: 1, depth: 100 }, color: { x: 0.7, y: 0.7, z: 0.7 }, emissive: { x: 0, y: 0, z: 0 }, roughness: 0, specular: 0 },
  { position: { x: -200, y: 0, z: 0 }, size: { width: 1, height: 200, depth: 100 }, color: { x: 1, y: 0., z: 0. }, emissive: { x: 0, y: 0, z: 0 }, roughness: 1, specular: 1 },
  { position: { x: 200, y: 0, z: 0 }, size: { width: 1, height: 200, depth: 100 }, color: { x: 0., y: 1, z: 0. }, emissive: { x: 0, y: 0, z: 0 }, roughness: 0.1, specular: 1 },
  { position: { x: 0, y: 0, z: -100 }, size: { width: 200, height: 200, depth: 1 }, color: { x: 0.7, y: 0.7, z: 0.7 }, emissive: { x: 0, y: 0, z: 0 }, roughness: 0, specular: 1 },
  { position: { x: 0, y: -100, z: 0 }, size: { width: 200, height: 1, depth: 100 }, color: { x: 0.7, y: 0.7, z: 0.7 }, emissive: { x: 0, y: 0, z: 0 }, roughness: 0, specular: 0 },
  { position: { x: -50, y: -20, z: 50 }, size: { width: 30, height: 60, depth: 30 }, color: { x: 0.5, y: 0.3, z: 0.6 }, emissive: { x: 0, y: 0, z: 0 }, roughness: 0, specular: 0 },
]

const Sphere = () => {
  const ref = useRef<SphereProp>();
  // useFrame((delta: number,time:number) => {
  //   if (ref.current){
  //     (ref.current.position as any).setData([50,Math.sin(time/1000) * 100,0],'position');
  //     // ref.current.position.y = Math.sin(delta) * 100;
  //   }
  // });

  return <sphere
    ref={ref}
    position={{ x: 50, y: -50, z: 0 }}
    radius={50}
    color={{ x: 0.5, y: 0.3, z: 0.6 }}
    emissive={{ x: 0., y: 0., z: 0. }}
    roughness={0}
    specular={1}
  />
}

export const App = () => {
  return <Page
    style={{ width: '100%', height: '100vh' }}
  >
    <Camera
      position={{ x: 0, y: 50, z: 250 }}
      lookat={{ x: 0, y: 50, z: 0 }}
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