import { Instance } from "..";
import { World } from "./world";

export class DataHandler {
  private data = new Set<Instance>();
  private table = new Map();
  public add = (instance: Instance) => {
    if (!this.data.has(instance)) {
      instance.id = this.data.size + 1;
      this.data.add(instance);
      const id = this.table.size + 1;
      this.table.set(instance.props, id)
    }
  }
  public clear = () => {
    this.data.clear();
  }
  private updateTable = (oldProps: { [prop: string]: any }, newProps: { [prop: string]: any }) => {
    const value = this.table.get(oldProps);
    this.table.set(newProps, value);
    this.table.delete(oldProps);
  }
  public updateParams = (world: World, oldProps: { [prop: string]: any }, newProps: { [prop: string]: any }, propsToUpdate: { [prop: string]: any }) => {
    const id = this.table.get(oldProps);
    for (const [key, data] of Object.entries(propsToUpdate)) {
      const name = this.handleData(key, id);
      world.updateParameters({ name, data });
    }
    this.updateTable(oldProps, newProps);
  }

  private handleData = (key: string, id: number) => {
    switch (key) {
      case 'position':
      case 'radius': {
        return `spheres[${id}].geometry.${key}`;
      }
      case 'color':
      case 'diffuse':
      case 'specular': {
        return `spheres[${id}].material.${key}`;
      }
    }
    return '';
  }

  public update = (world: World) => {
    world.updateShader(this.data);
    for (const [props, id] of this.table.entries()) {
      for (const [key, data] of Object.entries(props)) {
        const name = this.handleData(key, id);
        if (name) {
          world.updateParameters({ name, data });
        }
      }
    }
  }
}