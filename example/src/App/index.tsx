import { useEffect, useRef, useState } from 'react';
import Page from '@youyouzone/react-sdf';

const rawData = [
  { position: { x: 0, y: 200, z: 0 }, size: { width: 100, height: 1, depth: 50 }, color: { x: 0.7, y: 0.7, z: 0.7 }, emissive: { x: 1, y: 1, z: 1 } },
  { position: { x: 0, y: 201, z: 0 }, size: { width: 200, height: 1, depth: 100 }, color: { x: 0.7, y: 0.7, z: 0.7 }, emissive: { x: 0, y: 0, z: 0 } },
  { position: { x: -200, y: 0, z: 0 }, size: { width: 1, height: 200, depth: 100 }, color: { x: 1, y: 0., z: 0. }, emissive: { x: 0, y: 0, z: 0 } },
  { position: { x: 200, y: 0, z: 0 }, size: { width: 1, height: 200, depth: 100 }, color: { x: 0., y: 1, z: 0. }, emissive: { x: 0, y: 0, z: 0 } },
  { position: { x: 0, y: 0, z: -100 }, size: { width: 200, height: 200, depth: 1 }, color: { x: 0.7, y: 0.7, z: 0.7 }, emissive: { x: 0, y: 0, z: 0 } },
  { position: { x: 0, y: -100, z: 0 }, size: { width: 200, height: 1, depth: 100 }, color: { x: 0.7, y: 0.7, z: 0.7 }, emissive: { x: 0, y: 0, z: 0 }},
  { position: { x: -50, y: 0, z: 50 }, size: { width: 30, height: 60, depth: 30 }, color: { x: 0.5, y: 0.3, z: 0.6 }, emissive: { x: 0, y: 0, z: 0 } },
]

export const App = () => {

  return <Page style={{ width: '100%', height: '100vh' }}>
    {rawData.map(({ position, size, color, emissive }, i) =>
      <box
        key={i}
        position={position}
        size={size}
        color={color}
        emissive={emissive}
      />
    )}
    {/* <sphere
        position={{ x: 0, y: 0, z: 0 }}
        radius={10}
        color={{ x: 0.7, y: 0.7, z: 0.7 } }
        emissive={{ x: 0.7, y: 0.7, z: 0.7 } }
        /> */}
  </Page>
}