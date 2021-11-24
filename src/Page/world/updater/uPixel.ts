import { ComputeProgram } from "../program";
import { UniformUpdateable } from "./updateable";

export class UPixelUpdater implements UniformUpdateable{
  constructor(private program:ComputeProgram){}
  public update = () =>{
    this.program.update();
    return this.program.current;
  }
}

export class UPixelData implements UniformUpdateable{
  constructor(private program:ComputeProgram){}
  public update = () =>{
    return this.program.pre;
  }
}