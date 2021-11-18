import { useEffect, useRef, useState } from 'react';
import Page from '@youyouzone/react-sdf';

export const App = () => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const sample: any[] = [
      { position: { x: 180, y: 90, z: 0 }, radius: 90, color: { x: Math.random(), y: Math.random(), z: Math.random() }, diffuse: 1, specular: 0.01 },
      { position: { x: -180, y: 90, z: 0 }, radius: 90, color: { x: Math.random(), y: Math.random(), z: Math.random()}, diffuse: 1, specular: 0.01 },
      { position: { x: 0, y: 90, z: 0 }, radius: 90, color: {x: Math.random(), y: Math.random(), z: Math.random() }, diffuse: 1, specular: 0.01 },
      { position: { x: 0, y: -10000, z: 0 }, radius: 10000, color: { x: Math.random(), y: Math.random(), z: Math.random()}, diffuse: 1, specular: 0.01 },
    ];
    const outterRadius = 300;
    const radius = 20;
    const count = 0;
    const random = (min: number, max: number) => Math.random() * (max - min) + min;
    const randomBalls = new Array(count).fill(0).map((d, i) => {
      const theta = Math.PI * 2 / count * i;
      return {
        position: { x: Math.cos(theta) * outterRadius + random(-1, 1) * radius, y: radius, z: Math.sin(theta) * outterRadius + random(-1, 1) * radius },
        radius: radius, color: { x: Math.random(), y: Math.random(), z: Math.random() }, diffuse: 1, specular: 0.01
      };
    })
    setData([...sample, ...randomBalls]);
  }, [])

  return <Page style={{ width: '100%', height: '100vh' }}>
    {data.map(({ position, radius, color, diffuse, specular }) => <sphere
      position={position}
      radius={radius}
      color={color}
      diffuse={diffuse}
      specular={specular}
    />)}
  </Page>
}