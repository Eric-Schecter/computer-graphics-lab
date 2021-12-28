import React, { useRef, useState } from 'react';
import { useStore } from '../hooks/useStore';
import { CameraProp } from "../types"

export const Camera = ({ position, lookat, rotation, fov }: CameraProp) => {
  const isStartRef = useRef(false);
  const pivotRef = useRef({ x: 0, y: 0 })
  const [lookatPoint, setLookatPoint] = useState(lookat);
  const [pos, setPos] = useState(position);
  const keyRef = useRef(false);
  const down = ({ clientX, clientY }: React.MouseEvent<HTMLCanvasElement>) => {
    isStartRef.current = true;
    pivotRef.current = { x: clientX, y: clientY }
  }

  const move = ({ clientX, clientY }: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isStartRef.current) { return }
    setLookatPoint(pre => {
      return { x: (clientX - pivotRef.current.x) + pre.x, y: (clientY - pivotRef.current.y) + pre.y, z: pre.z }
    })
    pivotRef.current = { x: clientX, y: clientY }
  }
  const up = () => {
    isStartRef.current = false;
  }
  const keydown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    const speed = 10;
    switch (e.key) {
      case 'w': { setPos(pre => { return { ...pre, ...{ y: pre.y + speed } } }); break };
      case 'a': { setPos(pre => { return { ...pre, ...{ x: pre.x - speed } } }); break };
      case 's': { setPos(pre => { return { ...pre, ...{ y: pre.y - speed } } }); break };
      case 'd': { setPos(pre => { return { ...pre, ...{ x: pre.x + speed } } }); break };
    }
  }
  return <camera
    onMouseDown={down}
    onMouseMove={move}
    onMouseUp={up}
    onKeyDown={keydown}
    position={pos}
    lookat={lookatPoint}
    rotation={rotation}
    fov={fov}
  />
}