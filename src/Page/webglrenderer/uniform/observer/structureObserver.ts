import { SingleObserver } from ".";
import { UniformHandler, UniformObserverable } from "..";
import { UniformData } from "../../../../types";
// import { UStructData } from "../updater";
import { Observer } from "./observer";

export class StructureObserver extends Observer {
  constructor(_name: string, _type: string, protected observers: Array<StructureObserver | SingleObserver>) {
    super(_name, _type);
    observers.forEach(observer => observer.setName(_name));
  }
  public setData = (data: UniformData, key: string) => {
    this.observers.forEach(observer => {
      if (observer instanceof SingleObserver) {
        if (observer.name === key) {
          observer.setData(data)
        }
      } else {
        observer.setData(data, key);
      }
    })
  }
  public setObserverable = (ob: UniformObserverable) => {
    this.observers.forEach(observer => observer.setObserverable(ob));
  }
  public setName = (name: string) => {
    this.observers.forEach(observer => observer.setName(name));
  }
}