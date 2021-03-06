import { UniformDataType } from "../../../../types";
import { UniformObserverable } from "..";

export abstract class UniformData {
  constructor(protected _name: string, private _type: string) { }
  public abstract setData: (data: UniformDataType, key?: string) => void;
  public abstract setName: (name: string) => void;
  public abstract setObserverable: (ob: UniformObserverable) => void;
  public get name() {
    return this._name;
  }
  public get type() {
    return this._type;
  }
}