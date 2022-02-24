import { UniformHandler } from "../uniformHandler";
import { Observer } from "./observer";
import { USingleData } from '../updater';
import { UniformData } from "../../../../types";
import { UniformObserverable } from "..";
import { UpdateInfo } from "../updateinfo";

export class SingleObserver extends Observer {
  private _uniformName: string;
  private _observerable: UniformObserverable;
  constructor(_name: string, _type: string, protected _updater: USingleData<UniformData>) {
    super(_name, _type);
    this._uniformName = _name;
  }
  public setData = (data: UniformData) => {
    this._updater.data = data;
    const value = this._updater.update();
    this._observerable.addUpdateQueue(new UpdateInfo(this._uniformName, value, this._updater.needupdate));
  }
  public setName = (name: string) => {
    this._uniformName = `${name}.${this._uniformName}`;
  }
  public setObserverable = (ob: UniformObserverable) => {
    this._observerable = ob;
    const value = this._updater.update();
    this._observerable.addUpdateQueue(new UpdateInfo(this._uniformName, value, this._updater.needupdate));
  }
}
