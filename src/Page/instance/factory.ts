import { Box, Camera, Sphere } from "./component";
import { World } from "../webglrenderer";
import { BoxProp, CameraProp, SphereProp } from "../..";

export class Factory {
  public table: { [prop: string]: number } = {
    'box': -1,
    'sphere': -1,
  }
  public build = (type: string, props: object, canvas: HTMLCanvasElement, world: World) => {
    if (type in this.table) {
      this.table[type]++;
    }
    switch (type) {
      case 'box': return new Box(props as BoxProp, canvas, world, this.table);
      case 'sphere': return new Sphere(props as SphereProp, canvas, world, this.table);
      case 'camera': return new Camera(props as CameraProp, canvas, world);
    }
  }
}