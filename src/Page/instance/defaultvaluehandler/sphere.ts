
import { RADIUS } from "../../../parameters";
import { MeshValueHandler } from "./mesh";

export class SphereDefaultValueHandler extends MeshValueHandler{
  constructor(){
    super();
    this.defaultValue.set('radius',RADIUS)
  }
}