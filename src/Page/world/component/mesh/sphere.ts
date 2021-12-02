import { Mesh } from "./mesh";
import { Sphere as SphereParameters } from "../parameters";
import { SphereGenerator } from "../generator/sphere";
import { SingleObserver, StructureObserver, USingleData, UStructData } from "../../uniform";

export class Sphere extends Mesh {
  public type = 'sphere';
  protected uniformHandler = new SphereParameters();
  constructor(id: number) {
    super(id);
    this.generator = new SphereGenerator(id);
  }
  public getParameters = () => {
    return new StructureObserver(`spheres[${this.id}]`, 'Sphere', new UStructData(
      new SingleObserver('position', 'vec3', new USingleData([0, 0, 0])),
      new SingleObserver('position', 'vec3', new USingleData([0, 0, 0])),
      new SingleObserver('position', 'vec3', new USingleData([0, 0, 0])),
      new SingleObserver('position', 'vec3', new USingleData([0, 0, 0])),
    ))
  }
}