import { Updater } from ".";
import { UniformDataType } from "../../..";

export class UpdateInfo {
  constructor(public name: string, public updater: Updater<UniformDataType>) { }
}