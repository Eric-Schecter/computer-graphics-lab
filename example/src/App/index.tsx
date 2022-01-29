import Page, { Camera, useFrame } from '@youyouzone/react-sdf';
import { useRef } from 'react';

const Sphere = () => {
  const ref = useRef<any>();
  // useFrame((delta: number, time: number) => {
  //   if (ref.current) {
  //     ref.current.position[1] = Math.sin(time / 300) * 20;
  //   }
  // }) 
  return <sphere
    ref={ref}
    position={[50, -50, 0]}
    radius={50}
    color={[0.5, 0.3, 0.6]}
    emissive={[0, 0, 0]}
    roughness={0}
    specular={1}
    metallic={0}
  />
}

export const App = () => {
  const rawData = [
    { position: [0, 200, 0], size: [100, 0.01, 25], color: [1,0.9,0.7], emissive: [1,1,1], roughness: 1, specular: 0, metallic: 0 },
    { position: [0, 201, 0], size: [200, 1, 100], color: [0.7, 0.7, 0.7], emissive: [0, 0, 0], roughness: 1, specular: 0, metallic: 0 },
    { position: [-200, 50, 0], size: [1, 150, 100], color: [1, 0, 0], emissive: [0, 0, 0], roughness: 1, specular: 0, metallic: 0 },
    { position: [200, 50, 0], size: [1, 150, 100], color: [0, 1, 0], emissive: [0, 0, 0], roughness:0.1, specular: 1, metallic: 0 },
    { position: [0, 0, -100], size: [200, 200, 1], color: [0.7, 0.7, 0.7], emissive: [0, 0, 0], roughness: 0, specular: 1, metallic: 0 },
    { position: [0, -100, 0], size: [200, 1, 100], color: [0.7, 0.7, 0.7], emissive: [0, 0, 0], roughness: 1, specular: 0, metallic: 0 },
    { position: [-50, -40, 0], size: [30, 60, 30], color: [0.5, 0.3, 0.6], emissive: [0, 0, 0], roughness: 1, specular: 0, metallic: 0 },
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
        metallic={0}
      />
    )}
    <Sphere />
  </Page>
}

// export const App = () => {
//   const boards = [
//     { position: [0, 0, -60], size: [500, 500, 1], rotation: [0, 0, 0], color: [0.7, 0.7, 0.7], emissive: [0, 0, 0], roughness: 1, specular: 0, metallic: 0 },
//     { position: [0, 0, -100], size: [500, 1, 500], rotation: [0, 0, 0], color: [0.7, 0.7, 0.7], emissive: [0, 0, 0], roughness: 1, specular: 0, metallic: 0 },
//     // { position: [-200, 50, 0], size: [1, 150, 100], rotation: [0, 0, 0],color: [1, 0, 0], emissive: [0, 0, 0], roughness: 1, specular: 0, metallic: 0 },
//     // { position: [200, 50, 0], size: [1, 150, 100], rotation: [0, 0, 0],color: [0, 1, 0], emissive: [0, 0, 0], roughness: 0.3, specular: 0.7, metallic: 0 },
//   ]

//   const lights = [
//     { position: [-30, 50, 0], raidus: 1, color: [0, 0, 0], emissive: [100,100,100], roughness: 0.5, specular: 0, metallic: 0 },
//     { position: [-10, 50, 0], raidus: 2, color: [0.7, 0.7, 0.7], emissive: [100,100,100], roughness: 0.5, specular: 0, metallic: 0 },
//     { position: [10, 50, 0], raidus: 3, color: [1, 0, 0], emissive: [100,100,100], roughness: 1, specular: 0, metallic: 0 },
//     { position: [30, 50, 0], raidus: 5, color: [0, 1, 0], emissive: [100,100,100], roughness: 0.3, specular: 0.7, metallic: 0 },
//   ]

//   return <Page
//     style={{ width: '100%', height: '100vh' }}
//   >
//     <Camera
//       position={[0, 25, 50]}
//       lookat={[0, 25, 0]}
//       rotation={0}
//       fov={50 / 180 * Math.PI}
//     />
//     {boards.map(({ position, size, rotation, color, emissive, roughness, specular }, i) =>
//       <box
//         key={i}
//         position={position}
//         rotation={rotation}
//         size={size}
//         color={color}
//         emissive={emissive}
//         roughness={roughness}
//         specular={specular}
//         metallic={0}
//       />
//     )}
//     {lights.map(({ position, raidus, color, emissive, roughness, specular }, i) =>
//       <sphere
//         key={i}
//         position={position}
//         radius={raidus}
//         color={color}
//         emissive={emissive}
//         roughness={roughness}
//         specular={specular}
//         metallic={0}
//       />
//     )}
//   </Page>
// }