import { UniformData, SingleData } from "./unifromdata";
import { UniformHandler } from "./uniformHandler";
import { UpdateInfo } from "./updateinfo";

export class UniformObserverable {
  private observers = new Map<string, UniformData>();
  private updatequeue = new Set<SingleData>();
  constructor(private uniformHandler: UniformHandler) { }
  public update = () => {
    for (const observer of this.updatequeue) {
      const updater = observer.updater;
      if (updater.needupdate) {
        this.uniformHandler.update(new UpdateInfo(observer.uniformName, updater));
      }
    }
  }
  public add = (observer: UniformData) => {
    this.observers.set(observer.name, observer);
    observer.setObserverable(this);
  }
  public addUpdateQueue = (observer: SingleData) => {
    this.updatequeue.add(observer);
  }
  public reset = () => {
    this.observers.clear();
  }
  public get infos() {
    const a = Array.from(this.observers.values()).map(({ name, type }) => { return { name, type } });
    // console.log(a)
    return a;
  }
}