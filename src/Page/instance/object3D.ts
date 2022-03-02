import { Store } from "../reactrenderer/store";
import { DefaultValueHandler } from "./defaultvaluehandler";

export abstract class Object3D{
  protected children:Object3D[] = [];
  protected defaultValueHandler: DefaultValueHandler;
  constructor(protected _props: object,public root:Store){
    // this.children.forEach(child=>child.)
  }
  public add = (child:Object3D) =>{
    this.children.push(child);
  }
  public get props() {
    return this._props;
  }
}