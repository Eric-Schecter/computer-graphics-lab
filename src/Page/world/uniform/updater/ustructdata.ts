import { UniformHandler } from "../uniformHandler";
import { Observer } from "../observer";
import { UData } from "./udata";

export class UStructData extends UData {
  private observers: Observer[]
  constructor(...observers: Observer[]) {
    super();
    this.observers = observers;
  }
  public update = (unifromHandler: UniformHandler, name: string) => {
    this.observers.forEach(updater => updater.needUpdate && updater.update(unifromHandler, name));
  }
  public set = (observers: Map<string, Observer>, parent: string) => {
    this.observers.forEach(observer => observer.set(observers, parent));
  }
}