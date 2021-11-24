import { UniformHandler } from "./uniformHandler";
import { UniformUpdateable } from "../updater";

interface Updateable {
  update(unifromHandler: UniformHandler): void;
}

export class Observer implements Updateable {
  constructor(private _name: string, private _type: string, private updater: UniformUpdateable) { }
  public update = (unifromHandler: UniformHandler) => {
    unifromHandler.update(this._name, this.updater.update());
  }
  public get name() {
    return this._name;
  }
  public get type() {
    return this._type;
  }
}

export class UniformObserverable implements Updateable {
  private observers = new Map<string, Observer>();
  constructor(private unifromHandler: UniformHandler) { }
  public update = () => {
    for (const observer of this.observers.values()) {
      observer.update(this.unifromHandler);
    }
  }
  public add = (observer: Observer) => {
    this.observers.set(observer.name, observer);
  }
  public remove = (name: string) => {
    this.observers.delete(name);
  }
  public get infos() {
    return Array.from(this.observers.values()).map(({ name, type }) => { return { name, type } });
  }
}