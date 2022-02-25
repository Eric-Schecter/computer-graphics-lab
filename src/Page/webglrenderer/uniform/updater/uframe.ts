import { Updater } from "./updater";

export class UFrame extends Updater<number>{
  public update = () =>{
    this._data++;
    return this._data;
  }
}