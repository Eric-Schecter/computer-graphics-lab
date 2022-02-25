import { UniformData } from "./abstractdata";
import { Updater } from '../updater';
import { UniformDataType } from "../../../../types";
import { UniformObserverable } from "..";

export class SingleData extends UniformData {
  private _uniformName: string;
  private _observerable: UniformObserverable;
  constructor(_name: string, _type: string, protected _updater: Updater<UniformDataType>) {
    super(_name, _type);
    this._uniformName = _name;
  }
  public setData = (data: UniformDataType) => {
    this._updater.data = data;
    this._observerable.addUpdateQueue(this);
  }
  public setName = (name: string) => {
    this._uniformName = `${name}.${this._uniformName}`;
  }
  public setObserverable = (ob: UniformObserverable) => {
    this._observerable = ob;
    this._observerable.addUpdateQueue(this);
  }
  public get uniformName() {
    return this._uniformName;
  }
  public get updater(){
    return this._updater;
  }
}
