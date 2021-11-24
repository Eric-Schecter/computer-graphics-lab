import { UniformUpdateable } from "./updateable";

export class UTimeUpdater implements UniformUpdateable{
  public update = () =>{
    return performance.now();
  }
}