import { Updater } from ".";
import { UniformData } from "../../../../types";

export class UpdaterKeep extends Updater<UniformData>{
  public update = (): UniformData => {
    return this._data;
  }
}