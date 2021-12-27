import { UniformHandler } from "..";
import { UniformData } from "../../../../types";
import { UStructData } from "../updater";
import { Observer } from "./observer";

export class StructureObserver extends Observer {
  constructor(_name: string, _type: string, protected _updater: UStructData) {
    super(_name, _type, _updater);
  }
  public update = (uniformHandler: UniformHandler,parent = '') => {
    const name = parent ? `${parent}.${this._name}` : this._name;
    this.updater.update(uniformHandler, name);
  }
  public setData = (data: UniformData, name: string) => {
    this._updater.setData(data,name);
  }
}