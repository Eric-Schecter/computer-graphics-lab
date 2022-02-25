import { Updater } from ".";
import { UniformDataType } from "../../../../types";

export class UpdaterKeep extends Updater<UniformDataType>{
  public update = (): UniformDataType => {
    return this._data;
  }
}