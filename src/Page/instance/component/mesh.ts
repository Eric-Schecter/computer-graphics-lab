import { Instance } from "../";

export abstract class Mesh extends Instance {
  protected _name:string;
  public abstract readonly hitInfo:string;
}