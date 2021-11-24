import { InstanceProps, Size, Vector3 } from "../../../../types";
import { Parameters } from "./parameters";

export class BoxParameters extends Parameters {
  protected _data = {
    id: 0,
    size: new Size(),
    position: new Vector3(),
    color: new Vector3(),
    diffuse: 1,
    specular: 0,
  }
  constructor(id:number) {
    super();
    this._data.id = id;
    // this.handleUndefined(id);
    // this.generateUnifromStr();
    this.generateMaterialStr();
    this.generateGeometryStr();
  }
  protected generateGeometryStr = () => {
    const { id } = this._data;
    const name = `boxes[${id}].geometry.`;
    this._geometry = `boxIntersection(ray,${name}position,${name}size)`;
  }
  protected generateMaterialStr = () =>{
    const { id } = this._data;
    const name = `boxes[${id}].material.`;
    this._material = `Material(${name}color,${name}emissive)`;
  }
}