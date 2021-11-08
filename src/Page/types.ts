class Vector3 {
  public x = 0;
  public y = 0;
  public z = 0;
}

type Material = {
  color: Vector3,
  diffuse: number,
  specular: number,
}

type Props = {
  position: Vector3,
} & Material

type SphereProp = {
  radius: number
} & Props

class Size {
  public width = 1;
  public height = 1;
  public depth = 1;
}

type BoxProp = {
  size: Size
} & Props

type Instance = SphereInstance | BoxInstance;

type SphereInstance = {
  type: 'sphere',
  props: SphereProp,
}

type BoxInstance = {
  type: 'box',
  props: BoxProp,
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphere: Partial<SphereProp>,
      box: Partial<BoxProp>,
    }
  }
}

type InstanceProps = { [prop: string]: any };

export { Vector3,Size };
export type { Instance, SphereProp, BoxProp, SphereInstance, InstanceProps };