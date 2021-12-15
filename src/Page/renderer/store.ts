import { World } from "../world";
import { Instance } from "../instance";
import { MeshGenerator } from "../world/shaderCreator/mesh";
import { Camera, Mesh, Sphere } from "../instance/component";
import { UniformObserverable } from "../world/uniform";
import { TaskHandler } from "../world/taskHandler";

export class Store {
  private _dataset = new Set<Instance>();
  private meshgenerator = new MeshGenerator();
  private timer = 0;
  constructor(public canvas: HTMLCanvasElement, public world: World, public taskHandler: TaskHandler) {  }
  public add = (instance: Instance) => {
    this._dataset.add(instance);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.world.updateShader(this);
      for (const member of this._dataset.values()) {
        member.init();
      }
    }, 0)
  }
  public generate = () => {
    const meshes = [];
    for (const instance of this._dataset.values()) {
      if (instance instanceof Mesh) {
        meshes.push(instance);
      }
    }
    return this.meshgenerator.generate(meshes);
  }
  // public register = (uniformObserverable: UniformObserverable) => {
  //   for (const instance of this._dataset.values()) {
  //     uniformObserverable.add(instance.parameters);
  //   }
  // }
  public get dataset(){
    return this._dataset;
  }
}