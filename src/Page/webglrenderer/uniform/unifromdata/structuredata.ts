import { SingleData } from ".";
import { UniformObserverable } from "..";
import { UniformDataType } from "../../../../types";
import { UniformData } from "./abstractdata";

export class StructureData extends UniformData {
  constructor(_name: string, _type: string, protected observers: Array<StructureData | SingleData>) {
    super(_name, _type);
    observers.forEach(observer => observer.setName(_name));
  }
  public setData = (data: UniformDataType, key: string) => {
    this.observers.forEach(observer => {
      if (observer instanceof SingleData) {
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