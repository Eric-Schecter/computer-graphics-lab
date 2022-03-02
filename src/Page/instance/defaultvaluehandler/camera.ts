
import { DefaultValueHandler } from ".";
import { LOOKAT,FOV } from "../../../parameters";

export class CameraDefaultValueHandler extends DefaultValueHandler{
  constructor(){
    super();
    this.defaultValue.set('lookat',LOOKAT);
    this.defaultValue.set('fov',FOV);
  }
}