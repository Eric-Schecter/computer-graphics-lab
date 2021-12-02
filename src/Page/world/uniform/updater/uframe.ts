import { USingleData } from "./usingledata";

export class UFrame extends USingleData<number>{
  private frame = 0;
  public get = () =>{
    this.frame++;
    return this.frame;
  }
}