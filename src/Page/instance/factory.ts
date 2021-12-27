import { Box, Camera, Sphere } from "./component";
import { World } from "../webglrenderer";
import { BoxProp, CameraProp, SphereProp } from "../..";

export class Factory {
  public static build = (type: string, props: object, canvas: HTMLCanvasElement, world: World) => {
    switch (type) {
      case 'box': return new Box(props as BoxProp, canvas, world);
      case 'sphere': return new Sphere(props as SphereProp, canvas, world);
      case 'camera': return new Camera(props as CameraProp, canvas, world);
    }
  }
}