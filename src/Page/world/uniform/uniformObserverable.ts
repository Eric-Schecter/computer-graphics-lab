import { USingleData, UStructData } from "./updater";
import { Observer } from "./observer";
import { UniformHandler } from "./uniformHandler";
import { UniformData } from "../../types";

export class UniformObserverable {
  private observers = new Map<string, Observer>();

  private updaters = new Map<string,USingleData<UniformData> | UStructData>();

  constructor(private uniformHandler: UniformHandler) { }
  public update = () => {
    for (const observer of this.observers.values()) {
      observer.needUpdate && observer.update(this.uniformHandler)
    }
  }
  public add = (observer: Observer) => {
    observer.set(this.observers);
  }
  public remove = (name: string) => {
    this.observers.delete(name);
  }
  public get infos() {
    return Array.from(this.observers.values()).map(({ name, type }) => { return { name, type } });
  }
}