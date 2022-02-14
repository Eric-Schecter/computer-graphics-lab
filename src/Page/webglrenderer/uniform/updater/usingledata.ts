import { UniformData } from "../../../../types";

export class USingleData<T extends UniformData> {
  constructor(protected _data: T) { }
  public update = (): UniformData => {
    return this._data;
  }
  public get data(){
    return this._data;
  }
  public set data(data: T) {
    this._data = data;
  }
}