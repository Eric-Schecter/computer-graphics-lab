import { InstanceProps, Vector3 } from "../../../types";
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
  constructor(id:number,data: InstanceProps) {
    super();
    this.handleUndefined(id,data);
    // this.generateUnifromStr();
    this.generateGeometryStr();
    // this.generateMaterialStr();
  }
  protected generateMaterialStr = () => {
    const { color, diffuse, specular,id } = this._data;
    // const c = Object.values(color).map(d => this.int2float(this.clamp(d, 0, 1)));
    const c = this.uniformName;
    // this._material = `materials[${id}] =Material(vec3(0.1,0.1,0.1),0.1,0.1);`;
    this._material = `materials[${id}] =Material(vec3(${c}[${this.count++}],${c}[${this.count++}],${c}[${this.count++}]),${c}[${this.count++}],${c}[${this.count++}]);`;
  }
  protected generateGeometryStr = () => {
    const { id } = this._data;
    const name = `geometries[${id}].`;
    // const { position, radius } = this._data;
    // const [x, y, z] = Object.values(position).map(d => this.int2float(d));;
    // const r = this.int2float(radius);
    this._geometry = `sdSphere(p-vec3(${name}position),${name}radius)`;
  }
  protected generateUnifromStr = () => {
    const { id } = this._data;
    const size = 9;
    this.uniformName = this.uniformName + id;
    this._uniform = `uniform Material ${this.uniformName};`;
  }
}
