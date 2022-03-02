import { Store } from "../../reactrenderer/store";
import { UniformData } from "../../webglrenderer/uniform";
import { Object3D } from "../object3D";

// class Paramters {

//   public translate = () =>{

//   }
//   public rotate = () =>{

//   }
//   public 
// }

export abstract class Instance extends Object3D {
  protected _parameters: UniformData;
  protected _intersection: string;
  constructor(_props: object, root: Store) {
    super(_props, root);
  }
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

}
