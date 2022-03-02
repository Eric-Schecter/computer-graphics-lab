import { Box, Camera, Sphere, Model, Group, Cylinder } from "./component";
import { World } from "../webglrenderer";
import { ModelProp, BoxProp, CameraProp, SphereProp, GroupProp, CylinderProp } from "../..";
import { Store } from "../reactrenderer/store";

export class Factory {
  public table: { [prop: string]: number } = {
    'box': -1,
    'sphere': -1,
    'cylinder': -1,
  }
  public build = (type: string, props: object, world: World, store: Store) => {
    if (type in this.table) {
      this.table[type]++;
    }
    const id = this.table[type];
    switch (type) {
      case 'box': return new Box(props as BoxProp, store, id);
      case 'sphere': return new Sphere(props as SphereProp, store, id);
      case 'cylinder': return new Cylinder(props as CylinderProp, store, id);
      case 'camera': return new Camera(props as CameraProp, store);
      case 'group': return new Group(props as GroupProp, store);
      case 'model': return new Model(props as ModelProp, world, store);
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