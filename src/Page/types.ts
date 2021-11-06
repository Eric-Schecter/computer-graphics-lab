type Vector3 = {
  x: number,
  y: number,
  z: number,
}

type Props = {
  position: Vector3,
  color: Vector3,
  diffuse: number,
  specular: number,
}

type SphereProp = {
  radius: number
} & Props

type Instance = {
  type: string,
  props: SphereProp,
}

type Object3D = Partial<SphereProp>

declare global {
  namespace JSX {
    interface IntrinsicElements {
      sphere: Object3D
    }
  }
}

export type { Vector3, Instance };