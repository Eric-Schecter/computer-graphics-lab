import React, { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import Renderer from './renderer';
import { World } from './World';

type Props = {
  children?: ReactNode,
  style?: CSSProperties,
  className?: string
}

export const Page = ({ children, style, className }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const refBoard = useRef<World>();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) { return }
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    refBoard.current = new World(canvas);
    return () => refBoard.current?.destory();
  }, [ref])

  useEffect(() => {
    if (!refBoard.current) { return; }
    Renderer.render(children, refBoard.current);
  }, [children, refBoard])

  return <div
    style={style}
    className={className}
  >
    <canvas ref={ref} style={{ width: '100%', height: '100%' }} />
  </div>
}