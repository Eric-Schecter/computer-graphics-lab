import React, { ReactNode, useEffect, useRef } from 'react';
import Renderer from './renderer';
import { Board } from './board';

type Props = {
  children?: ReactNode
}

export const Page = ({ children }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const refBoard = useRef<Board>();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) { return }
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    refBoard.current = new Board(canvas);
    return () => refBoard.current?.stop();
  }, [ref])

  useEffect(() => {
    if (!refBoard.current) { return; }
    Renderer.render(children, refBoard.current);
  }, [children, refBoard])

  return <div
    style={{ width: '100vw', height: '100vh' }}
  >
    <canvas ref={ref} style={{ width: '100%', height: '100%' }} />
  </div>
}