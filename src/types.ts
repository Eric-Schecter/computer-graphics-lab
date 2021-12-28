import React, { Key, ReactNode, Ref } from "react";
import { Store } from "./page/reactrenderer/store";

class Vector3 {
  public x = 0;
  public y = 0;
  public z = 0;
}

type Material = {
  color: Vector3,
  emissive: Vector3,
  roughness: number,
  specular: number,
}

type MyEvent = {
  x: number,
  y: number,
}

type Basic = {
  position: Vector3,
  onMouseDown?: (e: React.MouseEvent<HTMLCanvasElement>) => void,
  onMouseMove?: (e: React.MouseEvent<HTMLCanvasElement>) => void,
  onMouseUp?: (e: React.MouseEvent<HTMLCanvasElement>) => void,
}

type Props = {
  key: Key,
  ref: Ref<ReactNode>
} & Basic & Material

type SphereProp = {
  radius: number
} & Props

type CameraProp = {
  lookat: Vector3,
  rotation: number,
  fov: number,
} & Basic

class Size {
  public width = 1;
  public height = 1;
  public depth = 1;
}

type BoxProp = {
  size: Size
} & Props

type SphereInstance = {
  type: 'sphere',
  props: SphereProp,
}

type BoxInstance = {
  type: 'box',
  props: BoxProp,
}

type BasicInstance = {
  // id: number,
  store?: Store,
}

type LightProp = {

}

type MeshInstance = SphereInstance | BoxInstance;

// type LightInstance = {
//   type: 'light',
//   props: LightProp
// };
type CameraInstance = {
  type: 'camera',
  props: CameraProp
}

type InstanceType = BasicInstance & (MeshInstance | CameraInstance );

type EventHandlers = {
  onClick?: (event: React.MouseEvent) => void
  onContextMenu?: (event: React.MouseEvent) => void
  onDoubleClick?: (event: React.MouseEvent) => void
  onPointerUp?: (event: React.PointerEvent) => void
  onPointerDown?: (event: React.PointerEvent) => void
  onPointerOver?: (event: React.PointerEvent) => void
  onPointerOut?: (event: React.PointerEvent) => void
  onPointerEnter?: (event: React.PointerEvent) => void
  onPointerLeave?: (event: React.PointerEvent) => void
  onPointerMove?: (event: React.PointerEvent) => void
  onPointerMissed?: (event: React.PointerEvent) => void
  onPointerCancel?: (event: React.PointerEvent) => void
  onWheel?: (event: React.WheelEvent) => void
  onMouseUp?: (event: React.MouseEvent) => void
  onMouseDown?: (event: React.MouseEvent) => void
  onMouseOver?: (event: React.MouseEvent) => void
  onMouseOut?: (event: React.MouseEvent) => void
  onMouseEnter?: (event: React.MouseEvent) => void
  onMouseLeave?: (event: React.MouseEvent) => void
  onMouseMove?: (event: React.MouseEvent) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  onKeyUp?: (event: React.KeyboardEvent) => void
  onKeyPress?: (event: React.KeyboardEvent) => void
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphere: Partial<SphereProp & EventHandlers>,
      box: Partial<BoxProp & EventHandlers>,
      camera: Partial<CameraProp & EventHandlers>,
    }
  }
}

type UniformData = number[] | number | { [prop: string]: number } | WebGLTexture;

export { Vector3, Size };
export type { InstanceType, SphereProp, BoxProp, Props, SphereInstance, UniformData, CameraProp, MyEvent };