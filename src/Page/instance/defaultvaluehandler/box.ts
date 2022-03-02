
import { SIZE } from "../../../parameters";
import { MeshValueHandler } from "./mesh";

export class BoxDefaultValueHandler extends MeshValueHandler{
  constructor(){
    super();
    this.defaultValue.set('size',SIZE)
  }
}