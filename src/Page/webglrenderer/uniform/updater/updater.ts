import { UniformDataType } from "../../../../types";

export class Updater<T extends UniformDataType> {
  public needupdate = true;
  constructor(protected _data: T) {}
  public update = (): UniformDataType => {
    this.needupdate = false;
    return this._data;
  }
  public get data() {
    return this._data;
  }
  public set data(data: T) {
    this.needupdate = true;
    this._data = data;
  }
}