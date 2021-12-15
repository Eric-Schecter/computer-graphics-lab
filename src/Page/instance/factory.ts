import { Box, Camera, Sphere } from "./component";
import { World } from "../world";

export class Factory {
  private static id = -1; // todo: remove id 
  public static build = (type: string, props: object, canvas: HTMLCanvasElement,world:World) => {
    const id = Factory.id++;
    switch (type) {
      case 'box': return new Box(props,canvas,id,world);
      case 'sphere': return new Sphere(props,canvas,id,world);
      case 'camera': return new Camera(props,canvas, world);
    }
  }
}