import { SingleObserver, StructureObserver, USingleData, UStructData } from "../../world/uniform";
import { World } from "../../world";
import { Instance } from "..";

export class Camera extends Instance {
  protected _parameters: StructureObserver;
  constructor(props: object, canvas: HTMLCanvasElement, world: World) {
    super(props, canvas, world);
    this._parameters = new StructureObserver('uCamera', 'Camera', new UStructData(
      new SingleObserver('position', 'vec3', new USingleData([0, 50, 250])),
      new SingleObserver('lookat', 'vec3', new USingleData([0, 50, 0])),
      new SingleObserver('rotation', 'float', new USingleData(0)),
      new SingleObserver('fov', 'float', new USingleData(50 / 180 * Math.PI)),
    ));
  }
}