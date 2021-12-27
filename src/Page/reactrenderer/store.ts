import { World } from "../webglrenderer";
import { Instance } from "../instance";
import { MeshGenerator } from "../webglrenderer/shaderCreator/mesh";
import { Mesh } from "../instance/component";
import { TaskHandler } from "../webglrenderer/taskHandler";

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
  public get dataset(){
    return this._dataset;
  }
}