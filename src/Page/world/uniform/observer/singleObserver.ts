import { UniformHandler } from "../uniformHandler";
import { Observer } from "./observer";
import { USingleData } from '../updater';
import { UniformData } from "../../../types";

export class SingleObserver extends Observer {
  constructor(_name: string, _type: string, protected updater: USingleData<UniformData>) {
    super(_name, _type, updater);
  }
  public update = (unifromHandler: UniformHandler, parent = '') => {
    const name = parent ? `${parent}.${this._name}` : this._name;
    unifromHandler.update(name, this.updater.get());
  }
}
