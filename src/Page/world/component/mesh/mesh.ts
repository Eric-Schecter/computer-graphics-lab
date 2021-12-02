import { Generator } from "../generator";
import { Object3D } from "../object3D";

export abstract class Mesh extends Object3D{
  protected generator: Generator;
  public get geometry(){
    return this.generator.geometry;
  }
  public get material(){
    return this.generator.material;
  }
}