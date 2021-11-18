export interface UniformUpdateable {
  update(): number
}

export class UTimeUpdater implements UniformUpdateable{
  public update = () =>{
    return performance.now();
  }
}

export class UFrameUpdater implements UniformUpdateable {
  private frame = 0;
  public update = () =>{
    this.frame++;
    return this.frame;
  }
}