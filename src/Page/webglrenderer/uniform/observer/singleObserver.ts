import { Observer } from "./observer";
import { Updater } from '../updater';
import { UniformData } from "../../../../types";
import { UniformObserverable } from "..";
import { UpdateInfo } from "../updateinfo";

export class SingleObserver extends Observer {
  private _uniformName: string;
  private _observerable: UniformObserverable;
  constructor(_name: string, _type: string, protected _updater: Updater<UniformData>) {
    super(_name, _type);
    this._uniformName = _name;
  }
  public setData = (data: UniformData) => {
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
