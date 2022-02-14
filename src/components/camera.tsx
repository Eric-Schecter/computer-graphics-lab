import React, { useRef, useState } from 'react';
import { useStore } from '../hooks/useStore';
import { CameraProp, EventHandlers } from "../types"

export const Camera = ({ position=[0,0,0], lookat = [0, 0, 0], rotation, fov }: Partial<CameraProp>) => {
  const isStartRef = useRef(false);
  const pivotRef = useRef({ x: 0, y: 0 })
  const [lookatPoint, setLookatPoint] = useState(lookat);
  const posRef = useRef(position);
  const [rot, setRot] = useState(rotation);
  const keyRef = useRef(false);
  const ref = useRef<Partial<CameraProp & EventHandlers>>(null);
  const down = ({ clientX, clientY }: React.MouseEvent<HTMLCanvasElement>) => {
    isStartRef.current = true;
    pivotRef.current = { x: clientX, y: clientY }
  }

  const move = ({ clientX, clientY }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isStartRef.current) { return }
    setLookatPoint(pre => {
      const [x, y, z] = pre;
      return [(clientX - pivotRef.current.x) + x, (clientY - pivotRef.current.y) + y, z];
    })
    pivotRef.current = { x: clientX, y: clientY }
  }
  const up = () => {
    isStartRef.current = false;
  }
  const keydown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (!ref.current) { return }
    const speed = 10;
    switch (e.key) {
      case 'w': { posRef.current[1] += speed; break };
      case 'a': { posRef.current[0] -= speed; break };
      case 's': { posRef.current[1] -= speed; break };
      case 'd': { posRef.current[0] += speed; break };
      // case 'w': { if (ref.current.position) { ref.current.position[1] += speed; break } };
      // case 'a': { posRef.current[0] -= speed; break };
      // case 's': { posRef.current[1] -= speed; break };
      // case 'd': { posRef.current[0] += speed; break };
      // case 'ArrowUp': { setRot(pre => { return { ...pre, ...{ y: pre.y + speed } } }); break };
      // case 'ArrowDown': { setRot(pre => { return { ...pre, ...{ x: pre.x - speed } } }); break };
      // case 'ArrowLeft': { setRot(pre => { return { ...pre, ...{ y: pre.y - speed } } }); break };
      // case 'ArrowRight': { setRot(pre => { return { ...pre, ...{ x: pre.x + speed } } }); break };
    }
  }
  return <camera
    ref={ref}
    onMouseDown={down}
    onMouseMove={move}
    onMouseUp={up}
    onKeyDown={keydown}
    position={posRef.current}
    lookat={lookatPoint}
    rotation={rotation}
    fov={fov}
  />
}