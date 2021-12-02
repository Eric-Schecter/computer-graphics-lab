import { World } from "./World";

class Vector3 {
  public x = 0;
  public y = 0;
  public z = 0;
}

type Material = {
  color: Vector3,
  emissive: Vector3,
}

type Props = {
  key: number,
  position: Vector3,
} & Material

type SphereProp = {
  radius: number
} & Props

type CameraProp = {
  lookat: Vector3,
  rotation: number,
  fov: number,
} & Props

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
  id: number,
  world?: World,
}

type LightProp = {

}

type MeshInstance = SphereInstance | BoxInstance;

type LightInstance = {
  type: 'light',
  props: LightProp
};
type CameraInstance = {
  type: 'camera',
  props: CameraProp
}

type Instance = BasicInstance & (MeshInstance | CameraInstance | LightInstance);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphere: Partial<SphereProp>,
      box: Partial<BoxProp>,
      camera: Partial<CameraProp>,
    }
  }
}

type InstanceProps = { [prop: string]: any };

type UniformData = number[] | number | { [prop: string]: number } | WebGLTexture;

export { Vector3, Size };
export type { Instance, SphereProp, BoxProp, SphereInstance, InstanceProps, UniformData };