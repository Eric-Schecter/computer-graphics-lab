import { World } from "../webglrenderer";
import { Instance } from "../instance";
import { TaskHandler } from "../webglrenderer/taskHandler";
import { InputSystem } from "../inputSystem";

export class Store {
  private _dataset = new Set<Instance>();
  private timer = 0;
  public inputSystem: InputSystem;
  constructor(public canvas: HTMLCanvasElement, public world: World, public taskHandler: TaskHandler) {
    this.inputSystem = new InputSystem(world);
  }
  public add = (instance: Instance) => {
    this._dataset.add(instance);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.world.updateShader(this);
    }, 0)
  }
  public get dataset() {
    return this._dataset;
  }
}