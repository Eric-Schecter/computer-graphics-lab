import { Observer, SingleObserver } from "./observer";
import { UniformHandler } from "./uniformHandler";
import { UniformData } from "../../../types";
import { UpdateInfo } from "./updateinfo";

export class UniformObserverable {
  private observers = new Map<string, Observer>();
  private updatequeue = new Set<UpdateInfo>();
  constructor(private uniformHandler: UniformHandler) { }
  public update = () => {
    if (this.updatequeue.size > 0) {
      for (const updateInfo of this.updatequeue) {
        this.uniformHandler.update(updateInfo);
        // if (!updateInfo.needupdate) {
        //   this.updatequeue.delete(updateInfo);
        // }
      }
    }
    // console.log(this.updatequeue)
    // console.log(this.updatequeue,this.observers)
    // for (const observer of this.observers.values()) {
    //   observer.update(this.uniformHandler)
    // }
  }
  public add = (observer: Observer) => {
    this.observers.set(observer.name,observer);
    observer.setObserverable(this);
  }
  public addUpdateQueue = (info: UpdateInfo) => {
    this.updatequeue.add(info);
  }
  // public remove = (name: string) => {
  //   this.observers.delete(name);
  // }
  public reset = () => {
    this.observers.clear();
  }
  // public setData = (data: UniformData, name: string) => {
  //   for (const observer of this.observers.values()) {
  //     observer.name === name && observer.setData(data, name);
  //   }
  // }
  public get infos() {
    const a = Array.from(this.observers.values()).map(({ name, type }) => { return { name, type } });
    // console.log(a)
    return a;
  }
}