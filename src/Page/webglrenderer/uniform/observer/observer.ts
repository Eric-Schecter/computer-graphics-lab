import { UniformHandler } from "../uniformHandler";
import { UniformData } from "../../../../types";
import { USingleData } from "../updater";
import { UniformObserverable } from "..";

export abstract class Observer {
  constructor(protected _name: string, private _type: string) { }
  // public set = (observers: Map<string, Observer>, parent = '') => {
  //   const name = parent ? `${parent}.${this._name}` : this._name;
  //   observers.set(name, this);
  // }
  // public abstract update: (uniformHandler: UniformHandler, parent?: string) => void;
  public abstract setData: (data: UniformData, key?: string) => void;
  public get name() {
    return this._name;
  }
  public get type() {
    return this._type;
  }
  // public get updater() {
  //   return this._updater;
  // }
  public setName: (name: string) => void;
  public setObserverable: (ob: UniformObserverable) => void;
}