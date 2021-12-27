import { UniformHandler } from "../uniformHandler";
import { Observer } from "./observer";
import { USingleData } from '../updater';
import { UniformData } from "../../../../types";

export class SingleObserver extends Observer {
  constructor(_name: string, _type: string, protected _updater: USingleData<UniformData>) {
    super(_name, _type, _updater);
  }
  public update = (uniformHandler: UniformHandler, parent = '') => {
    const name = parent ? `${parent}.${this._name}` : this._name;
    uniformHandler.update(name, this._updater.update());
  }
  public setData = (data:UniformData)=>{
    this._updater.data = data;
  }
}
