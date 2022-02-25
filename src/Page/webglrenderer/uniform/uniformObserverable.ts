import { Observer, SingleObserver } from "./observer";
import { UniformHandler } from "./uniformHandler";
import { UpdateInfo } from "./updateinfo";

export class UniformObserverable {
  private observers = new Map<string, Observer>();
  private updatequeue = new Set<SingleObserver>();
  constructor(private uniformHandler: UniformHandler) { }
  public update = () => {
    for (const observer of this.updatequeue) {
      const updater = observer.updater;
      if (updater.needupdate) {
        this.uniformHandler.update(new UpdateInfo(observer.uniformName, updater));
      }
    }
  }
  public add = (observer: Observer) => {
    this.observers.set(observer.name, observer);
    observer.setObserverable(this);
  }
  public addUpdateQueue = (observer: SingleObserver) => {
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