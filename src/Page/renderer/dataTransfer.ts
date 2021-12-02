//handle data from react side to renderer side
//1. transfer react data to webgl scene
//2. generate shader
//3. support update uniform

import { Instance, InstanceProps } from "../types";
import { World } from "../world";
import { Scene } from "../world/scene";
import { Box, Sphere, Camera, Object3D } from "../world/component";

class ComponentFactory {
  public build = (type: Instance['type'], id: number) => {
    switch (type) {
      case 'box': return new Box(id);
      case 'sphere': return new Sphere(id);
      case 'light': return new Box(id);
      case 'camera': return new Camera(id);
    }
  }
}

export class DataTransfer {
  private scene: Scene;
  // private data = new Set<Instance>();
  // private table = new Map<InstanceProps, { type: Instance['type'], id: number }>();
  private table1 = new Map<InstanceProps, Object3D>();
  private factory = new ComponentFactory();
  constructor(world: World) {
    this.scene = new Scene(world);
  }
  public add = (instance: Instance) => {
    // if (!this.data.has(instance)) {
    // instance.id = this.data.size + 1;
    // this.data.add(instance);
    const id = this.table1.size + 1; // todo: change to index of uniform array
    const { props, type } = instance;
    const mesh = this.factory.build(type, id)

    this.scene.add(mesh);
    // this.table.set(props, { type, id });
    this.table1.set(props, mesh);
    // }
  }
  public clear = () => {
    this.scene.clear();
  }
  private updateTable = (oldProps: InstanceProps, newProps: InstanceProps) => {
    const value = this.table1.get(oldProps);
    if (!value) { return }
    this.table1.set(newProps, value);
    this.table1.delete(oldProps);
  }
  private updateParameter = (world:World,object: Object3D, props: InstanceProps) => {
    for (const [key, data] of Object.entries(props)) {
      // object.update(key, data);
      const name = object.getUniform(key);
      world.updateParameter(name,data)
    }
  }
  public updateParams = (world:World,oldProps: InstanceProps, newProps: InstanceProps, propsToUpdate: InstanceProps) => {
    const mesh = this.table1.get(oldProps);
    if (!mesh) { return }
    this.updateParameter(world,mesh, propsToUpdate);
    this.updateTable(oldProps, newProps);
  }
  public update = (world:World) => {
    // this.scene.update();
    world.updateShader(this.scene);
    for (const [props, mesh] of this.table1.entries()) {
      this.updateParameter(world,mesh, props);
    }
  }
}