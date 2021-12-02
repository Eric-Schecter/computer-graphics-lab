import { USingleData } from "./usingledata";
import { ComputeProgram } from "../../program";

export class UPixelCurrent extends USingleData<ComputeProgram> {
  public get = () => {
    this.data.update();
    return this.data.current;
  }
}

export class UPixelPre extends USingleData<ComputeProgram> {
  public get = () => {
    return this.data.pre;
  }
}