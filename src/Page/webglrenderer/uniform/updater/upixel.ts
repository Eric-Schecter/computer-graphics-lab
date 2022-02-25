import { Updater } from "./updater";
import { ComputeProgram } from "../../program";

export class UPixelCurrent extends Updater<ComputeProgram> {
  public update = () => {
    this._data.update(); 
    return this._data.current;
  }
}

export class UPixelPre extends Updater<ComputeProgram> {
  public update = () => {
    return this._data.pre;
  }
}