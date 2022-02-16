
import { RADIUS } from "../../../parameters";
import { DefaultValueHandler } from "./default";

export class SphereDefaultValueHandler extends DefaultValueHandler{
  constructor(){
    super();
    this.defaultValue.set('radius',RADIUS)
  }
}