import { UniformData } from "../../../../types";

export class USingleData<T extends UniformData> {
  public needupdate = true;
  private count =0;
  constructor(protected _data: T) { }
  public update = (): UniformData => {
    this.count++;
    if(this.count>1){
      this.needupdate = false;
    }
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