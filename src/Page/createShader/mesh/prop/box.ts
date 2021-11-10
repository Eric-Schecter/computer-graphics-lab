import { InstanceProps, Size, Vector3 } from "../../../types";
import { Parameters } from "./parameters";
import * as sdf from '../../shader/sdf/box.glsl';

export class BoxParameters extends Parameters {
  protected _data = {
    size: new Size(),
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
    const { position, size } = this._data;
    const [x, y, z] = Object.values(position).map(d => this.int2float(d));
    const [w, h, d] = Object.values(size).map(d => this.int2float(d));
    this._geometry = `sdBox(p-vec3(${x},${y},${z}),vec3(${w},${h},${d}))`;
  }
}