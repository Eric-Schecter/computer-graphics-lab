import { World } from "..";
import { UniformData } from "../../types";
import { Observer } from "../uniform/observer";
import { Parameters } from "./parameters";

// observer for generate uniform
// special for mesh to genereate shader
// genearte uniform info for update

export abstract class Object3D {
  protected _world: World;
  public type = '';
  protected uniformHandler: Parameters;
  constructor(protected id: number) { }
  //generate observer
  public register = () => {

  }
  //update uniform data
  public update = (key: string, data: UniformData) => {
    const name = this.uniformHandler.getUniform(key, this.id);
    console.log(name,data)
    this._world.updateParameter(name, data);
  }
  public getUniform = (key: string) =>{
    return this.uniformHandler.getUniform(key, this.id);
  }
  public abstract getParameters: () => Observer
  public set world(world: World) {
    this._world = world;
  }
}