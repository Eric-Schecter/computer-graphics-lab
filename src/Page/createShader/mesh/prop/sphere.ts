import { InstanceProps, Vector3 } from "../../../types";
import { Parameters } from "./parameters";
import * as sdf from '../../shader/sdf/sphere.glsl';

export class SphereParameters extends Parameters {
  protected _data = {
    radius: 1,
    position: new Vector3(),
    color: new Vector3(),
    diffuse: 1,
    specular: 0,
  }
  protected _sdf = sdf;
  constructor(data: InstanceProps) {
    super();
    this.handleUndefined(data);
    this.generateGeometryStr();
    this.generateMaterialStr();
  }
  protected generateGeometryStr = () => {
    const { position, radius } = this._data;
    const [x, y, z] = Object.values(position).map(d => this.int2float(d));;
    const r = this.int2float(radius);
    this._geometry = `sdSphere(p-vec3(${x},${y},${z}),${r})`;
  }
}
