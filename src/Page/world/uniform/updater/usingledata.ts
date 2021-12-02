import { UniformData } from "../../../types";
import { UData } from "./udata";

export class USingleData<T extends UniformData> extends UData {
  constructor(protected data: T, needUpdate = true) {
    super(needUpdate);
  }
  public get = (): UniformData => {
    return this.data;
  }
  public set set(data: T) {
    this.data = data;
  }
}