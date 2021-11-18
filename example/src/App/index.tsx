import { useEffect, useRef, useState } from 'react';
import Page from '@youyouzone/react-sdf';

export const App = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const sample: any[] = [
      { position: { x: 180, y: 90, z: 0 }, radius: 90, color: { x: Math.random(), y: Math.random(), z: Math.random() }, emissive: { x: 0, y: 0, z: 0 } },
      { position: { x: -180, y: 90, z: 0 }, radius: 90, color: { x: Math.random(), y: Math.random(), z: Math.random() }, emissive: { x: 0, y: 0, z: 0 } },
      { position: { x: 0, y: 90, z: 0 }, radius: 90, color: { x: Math.random(), y: Math.random(), z: Math.random() }, emissive: { x: 0.7, y: 0.7, z: 0.7 } },
      { position: { x: 0, y: -10000, z: 0 }, radius: 10000, color: { x: Math.random(), y: Math.random(), z: Math.random() }, emissive: { x: 0, y: 0, z: 0 } },
    ];
    const outterRadius = 300;
    const radius = 20;
    const count = 0;
    const random = (min: number, max: number) => Math.random() * (max - min) + min;
    const randomBalls = new Array(count).fill(0).map((d, i) => {
      const theta = Math.PI * 2 / count * i;
      return {
        position: { x: Math.cos(theta) * outterRadius + random(-1, 1) * radius, y: radius, z: Math.sin(theta) * outterRadius + random(-1, 1) * radius },
        radius: radius, color: { x: Math.random(), y: Math.random(), z: Math.random() }, emissive: { x: 0, y: 0, z: 0 }
      };
    })
    setData([...sample, ...randomBalls]);
  }, [])

  return <Page style={{ width: '100%', height: '100vh' }}>
    {data.map(({ position, radius, color, emissive}) => <sphere
      position={position}
      radius={radius}
      color={color}
      emissive={emissive}
    />)}
  </Page>
}