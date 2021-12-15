import React, { useRef, useState } from 'react';
import { CameraProp } from "../types"

export const Camera = ({ position, lookat, rotation, fov }: CameraProp) => {
  const isStartRef = useRef(false);
  const pivotRef = useRef({ x: 0, y: 0 })
  const [lookatPoint, setLookatPoint] = useState(lookat);
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

  return <camera
    onMouseDown={down}
    onMouseMove={move}
    onMouseUp={up}
    position={position}
    lookat={lookatPoint}
    rotation={rotation}
    fov={fov}
  />
}