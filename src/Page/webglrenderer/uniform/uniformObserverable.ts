import { USingleData, UStructData } from "./updater";
import { Observer } from "./observer";
import { UniformHandler } from "./uniformHandler";
import { UniformData } from "../../../types";

export class UniformObserverable {
  private observers = new Map<string, Observer>();
  constructor(private uniformHandler: UniformHandler) { }
  public update = () => {
    for (const observer of this.observers.values()) {
      observer.update(this.uniformHandler)
    }
  }
  public add = (observer: Observer) => {
    observer.set(this.observers);
  }
  public remove = (name: string) => {
    this.observers.delete(name);
  }
  public reset = () =>{
    this.observers.clear();
  }
  public setData = (data: UniformData, name: string) => {
    for (const observer of this.observers.values()) {
      observer.name === name && observer.setData(data, name);
    }
  }
  public get infos() {
    return Array.from(this.observers.values()).map(({ name, type }) => { return { name, type } });
  }
}