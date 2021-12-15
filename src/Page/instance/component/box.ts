import { Mesh } from "./mesh";
import { BoxGenerator } from "./generator";
import { SingleObserver, StructureObserver, USingleData, UStructData } from "../../world/uniform";
import { World } from "../../world";

export class Box extends Mesh {
  protected _parameters: StructureObserver;
  constructor(props: object, canvas: HTMLCanvasElement, id: number, world: World) {
    super(props, canvas, world);
    this._parameters = new StructureObserver(`boxes[${id}]`, 'Box', new UStructData(
      new StructureObserver('geometry', 'BoxGeometry', new UStructData(
        new SingleObserver('position', 'vec3', new USingleData([0, 0, 0])),
        new SingleObserver('size', 'vec3', new USingleData([0, 0, 0])),
      )),
      new StructureObserver('material', 'Material', new UStructData(
        new SingleObserver('color', 'vec3', new USingleData([0, 0, 0])),
        new SingleObserver('emissive', 'vec3', new USingleData([0, 0, 0])),
        new SingleObserver('roughness', 'float', new USingleData(0)),
        new SingleObserver('specular', 'float', new USingleData(0)),
      )),
    ))
    this.generator = new BoxGenerator(id);
  }
}