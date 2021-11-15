import { UniformData } from "../types";
import { UniformHandler } from "./uniformHandler";

interface Updateable {
  update(unifromHandler: UniformHandler): void;
}

export class Observer implements Updateable {
  constructor(private _name: string, private cb: () => UniformData) { }
  public update = (unifromHandler: UniformHandler) => {
    unifromHandler.update(this._name, this.cb());
  }
  public get name() {
    return this._name;
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
}