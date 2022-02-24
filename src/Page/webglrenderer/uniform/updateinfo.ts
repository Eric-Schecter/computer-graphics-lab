import { Updater } from ".";
import { UniformData } from "../../..";

export class UpdateInfo {
  constructor(public name: string, public updater: Updater<UniformData>) { }
}