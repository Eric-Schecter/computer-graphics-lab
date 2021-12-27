import React, { useEffect, useRef, HTMLAttributes } from 'react';
// import mergeRefs from 'react-merge-refs';
import Renderer from './reactrenderer';

interface Props extends HTMLAttributes<HTMLCanvasElement> { }

export const Page = ({ children, style, className, ...props }: Props) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) { return }
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  }, [ref])

  useEffect(() => {
    if (!ref.current) { return; }
    Renderer.render(children, ref.current);
  }, [children, ref])

  return <div
    style={{ width: '100%', height: '100vh', ...style }}
    className={className}
  >
    <canvas
      ref={ref}
      style={{ width: '100%', height: '100%' }}
      {...props}
    />
  </div>
}