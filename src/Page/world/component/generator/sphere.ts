import { Generator } from ".";
import { Vector3 } from "../../../types";

export class SphereGenerator extends Generator {
  public type = 'sphere';
  protected _data = {
    id: 0,
    radius: 1,
    position: new Vector3(),
    color: new Vector3(),
    diffuse: 1,
    specular: 0,
  }
  constructor(id:number) {
    super();
    this._data.id = id;
    // this.handleUndefined(id,data);
    // this.generateUnifromStr();
    this.generateMaterialStr();
    this.generateGeometryStr();
  }
  protected generateGeometryStr = () => {
    const { id } = this._data;
    const name = `spheres[${id}].geometry.`;
    this._geometry = `sphIntersection(ray,${name}position,${name}radius)`;
  }
  protected generateMaterialStr = () =>{
    const { id } = this._data;
    const name = `spheres[${id}].material.`;
    this._material = `Material(${name}color,${name}emissive)`;
  }
}
