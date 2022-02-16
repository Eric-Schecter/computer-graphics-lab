
import { SIZE } from "../../../parameters";
import { DefaultValueHandler } from "./default";

export class BoxDefaultValueHandler extends DefaultValueHandler{
  constructor(){
    super();
    this.defaultValue.set('size',SIZE)
  }
}