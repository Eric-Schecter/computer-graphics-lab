import { Instance } from "../";
import { Generator } from "./generator";

export abstract class Mesh extends Instance{
  protected generator: Generator;
  public get geometry(){
    return this.generator.geometry;
  }
  public get material(){
    return this.generator.material;
  }
}