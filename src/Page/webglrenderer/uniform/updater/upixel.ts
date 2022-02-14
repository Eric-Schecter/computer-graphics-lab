import { USingleData } from "./usingledata";
import { ComputeProgram } from "../../program";

export class UPixelCurrent extends USingleData<ComputeProgram> {
  public update = () => {
    this._data.update();
    return this._data.current;
  }
}

export class UPixelPre extends USingleData<ComputeProgram> {
  public update = () => {
    return this._data.pre;
  }
}