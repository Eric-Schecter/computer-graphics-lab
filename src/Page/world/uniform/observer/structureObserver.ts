import { UniformHandler } from "..";
import { UStructData } from "../updater";
import { Observer } from "./observer";

export class StructureObserver extends Observer {
  constructor(_name: string, _type: string, protected updater: UStructData) {
    super(_name, _type, updater);
  }
  public update = (unifromHandler: UniformHandler) => {
    this.updater.update(unifromHandler, this._name);
  }
}