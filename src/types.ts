import { Key, ReactNode, Ref } from "react";
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

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphere: Partial<SphereProp>,
      box: Partial<BoxProp>,
      camera: Partial<CameraProp>,
    }
  }
}

type UniformData = number[] | number | { [prop: string]: number } | WebGLTexture;

export { Vector3, Size };
export type { InstanceType, SphereProp, BoxProp, Props, SphereInstance, UniformData, CameraProp, MyEvent };