import { UniformUpdateable } from "./updateable";

export class UFrameUpdater implements UniformUpdateable {
  private frame = 0;
  public update = () =>{
    this.frame++;
    return this.frame;
  }
}