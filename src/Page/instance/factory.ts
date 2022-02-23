import { Box, Camera, Sphere, Model } from "./component";
import { World } from "../webglrenderer";
import { ModelProp, BoxProp, CameraProp, SphereProp } from "../..";

export class Factory {
  public table: { [prop: string]: number } = {
    'box': -1,
    'sphere': -1,
  }
  public build = (type: string, props: object, canvas: HTMLCanvasElement, world: World) => {
    if (type in this.table) {
      this.table[type]++;
    }
    const id = this.table[type];
    switch (type) {
      case 'box': return new Box(props as BoxProp, canvas, world, id);
      case 'sphere': return new Sphere(props as SphereProp, canvas, world, id);
      case 'camera': return new Camera(props as CameraProp, canvas, world);
      case 'model': return new Model(props as ModelProp, canvas, world);
    }
  }
  public get getUniforms() {
    const uniforms = [];
    for (const key in this.table) {
      const value = this.table[key];
      if (value >= 0) {
        const type = key[0].toUpperCase() + key.slice(1);
        uniforms.push(`uniform ${type} ${key}[${value + 1}];`);
      }
    }
    return uniforms;
  }
}