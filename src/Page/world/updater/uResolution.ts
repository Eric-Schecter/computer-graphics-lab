import { UniformUpdateable } from "./updateable";

export class UResolution implements UniformUpdateable {
  constructor(private width: number, private height: number) { }
  public update = () => {
    return [this.width, this.height];
  }
}