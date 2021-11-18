import { Instance, InstanceProps } from "..";
import { World } from "./world";


class Parameters {
  protected type = '';
  protected materialKeywords = new Set<string>(['color', 'emissive']);
  protected geometryKeywords = new Set<string>(['position']);
  constructor(protected id: number) { }
  public handleData = (key: string) => {
    if (this.materialKeywords.has(key)) {
      return `${this.type}[${this.id}].material.${key}`;
    }
    if (this.geometryKeywords.has(key)) {
      return `${this.type}[${this.id}].geometry.${key}`;
    }
    return '';
  }
}

class Sphere extends Parameters {
  protected type = 'spheres';
  constructor(protected id: number) {
    super(id);
    this.geometryKeywords.add('radius');
  }
}

class Box extends Parameters {
  protected type = 'boxes';
  constructor(protected id: number) {
    super(id);
    this.geometryKeywords.add('size');
  }
}

class ParametersFactory {
  public build = (type: Instance['type'], id: number) => {
    switch (type) {
      case 'box': {
        return new Box(id);
      }
      case 'sphere':{
        return new Sphere(id);
      }
    }
  }
}

export class DataHandler {
  private data = new Set<Instance>();
  private table = new Map();
  private factory = new ParametersFactory();
  public add = (instance: Instance) => {
    if (!this.data.has(instance)) {
      instance.id = this.data.size + 1;
      this.data.add(instance);
      const id = this.table.size + 1;
      this.table.set(instance.props, this.factory.build(instance.type, id))
    }
  }
  public clear = () => {
    this.data.clear();
  }
  private updateTable = (oldProps: InstanceProps, newProps: InstanceProps) => {
    const value = this.table.get(oldProps);
    this.table.set(newProps, value);
    this.table.delete(oldProps);
  }
  public updateParams = (world: World, oldProps: InstanceProps, newProps: InstanceProps, propsToUpdate: InstanceProps) => {
    const parameters = this.table.get(oldProps);
    for (const [key, data] of Object.entries(propsToUpdate)) {
      const name = parameters.handleData(key);
      world.updateParameters({ name, data });
    }
    this.updateTable(oldProps, newProps);
  }

  public update = (world: World) => {
    world.updateShader(this.data);
    for (const [props, parameters] of this.table.entries()) {
      for (const [key, data] of Object.entries(props)) {
        const name = parameters.handleData(key);
        if (name) {
          world.updateParameters({ name, data });
        }
      }
    }
  }
}