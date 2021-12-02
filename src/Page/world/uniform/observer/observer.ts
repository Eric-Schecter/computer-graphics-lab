import { UniformHandler } from "../uniformHandler";
import { UniformData } from "../../../types";
import { USingleData, UStructData } from "../updater";

export abstract class Observer {
  constructor(protected _name: string, private _type: string, protected updater: USingleData<UniformData> | UStructData) { }
  public set = (observers: Map<string, Observer>, parent = '') => {
    const name = parent ? `${parent}.${this._name}` : this._name;
    observers.set(name, this);
  }
  public abstract update: (unifromHandler: UniformHandler, parent?: string) => void;

  public get name() {
    return this._name;
  }
  public get type() {
    return this._type;
  }
  public get needUpdate() {
    return this.updater.needUpdate;
  }
}