import { InstanceProps, Vector3 } from "../../../../types";
import { Parameters } from "./parameters";
import * as sdf from '../../shader/sdf/sphere.glsl';

export class SphereParameters extends Parameters {
  protected _data = {
    id: 0,
    radius: 1,
    position: new Vector3(),
    color: new Vector3(),
    diffuse: 1,
    specular: 0,
  }
  private uniformName = 'uSphereParams';
  protected _sdf = sdf;
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
  protected generateUnifromStr = () => {
    const { id } = this._data;
    this.uniformName = this.uniformName + id;
    this._uniform = `uniform Material ${this.uniformName};`;
  }
  protected generateMaterialStr = () =>{
    const { id } = this._data;
    const name = `spheres[${id}].material.`;
    this._material = `Material(${name}color,${name}emissive)`;
  }
}
