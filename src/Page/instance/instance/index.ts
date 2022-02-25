import { World } from "../../webglrenderer";
import { UniformData } from "../../webglrenderer/uniform";
import { DefaultValueHandler } from "../defaultvaluehandler";

export abstract class Instance {
  protected _parameters: UniformData;
  protected _intersection: string;
  protected defaultValueHandler:DefaultValueHandler;
  constructor(protected _props: object, protected _world: World) {}
  public update = (props: object) => {
    for (const [key, data] of Object.entries(props)) {
      this._parameters.setData(data, key);
    }
  }
  public get intersection() {
    return this._intersection;
  };
  public get parameters() {
    return this._parameters;
  }
  public get props() {
    return this._props;
  }
}
