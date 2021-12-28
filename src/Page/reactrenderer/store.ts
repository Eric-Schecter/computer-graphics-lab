import { World } from "../webglrenderer";
import { Instance } from "../instance";
import { TaskHandler } from "../webglrenderer/taskHandler";

export class Store {
  private _dataset = new Set<Instance>();
  private timer = 0;
  constructor(public canvas: HTMLCanvasElement, public world: World, public taskHandler: TaskHandler) {  }
  public add = (instance: Instance) => {
    this._dataset.add(instance);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.world.updateShader(this);
    }, 0)
  }
  public get dataset(){
    return this._dataset;
  }
}