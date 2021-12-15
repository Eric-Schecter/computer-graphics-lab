import { USingleData } from "./usingledata";

export class UFrame extends USingleData<number>{
  public update = () =>{
    this._data++;
    return this._data;
  }
}