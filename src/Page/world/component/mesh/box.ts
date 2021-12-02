import { Mesh } from "./mesh";
import { Box as BoxParameters } from "../parameters";
import { BoxGenerator } from "../generator";
import { SingleObserver, StructureObserver, USingleData, UStructData } from "../../uniform";

export class Box extends Mesh {
  public type = 'box';
  protected uniformHandler = new BoxParameters();
  constructor(id: number) {
    super(id);
    this.generator = new BoxGenerator(id);
  }
  public getParameters = () => {
    return new StructureObserver(`boxes[${this.id}]`, 'Box', new UStructData(
      new SingleObserver('position', 'vec3', new USingleData([0, 0, 0])),
      new SingleObserver('position', 'vec3', new USingleData([0, 0, 0])),
      new SingleObserver('position', 'vec3', new USingleData([0, 0, 0])),
      new SingleObserver('position', 'vec3', new USingleData([0, 0, 0])),
    ))
  }
}