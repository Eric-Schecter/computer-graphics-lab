import React, { Key, ReactNode, Ref } from "react";
import { Store } from "./page/reactrenderer/store";

export type Vec3 = number[];
type Size = Vec3;

type Material = {
  color: Vec3,
  emissive: Vec3,
  roughness: number,
  metallic: number,
  specTrans: number,
  specColor: Vec3,
  clearcoat: number,
  clearcoatGloss: number,
  specular: number,
}

export type MyEvent = {
  x: number,
  y: number,
}

type Basic = {
  position: Vec3,
}

export type MeshProps = Basic & Material;

type Props = {
  key: Key,
  ref: Ref<ReactNode>
} & MeshProps

export type SphereProp = {
  radius: number
} & Props

export type CameraProp = {
  lookat: Vec3,
  rotation: number,
  fov: number,
  ref: Ref<ReactNode>
} & Basic

export type BoxProp = {
  size: Size,
  rotation: Vec3,
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

export type LightProp = {

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

export type InstanceType = BasicInstance & (MeshInstance | CameraInstance);
export type UniformData = number[] | number | { [prop: string]: number } | WebGLTexture;

export type EventHandlers = {
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