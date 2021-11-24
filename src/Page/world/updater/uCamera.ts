import { UniformUpdateable } from "./updateable";

export class UCamera implements UniformUpdateable{
  constructor(){}
  public update = () =>{
    return [0,400,600];
  }
}