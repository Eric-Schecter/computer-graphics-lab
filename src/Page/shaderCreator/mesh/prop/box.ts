import { InstanceProps, Size, Vector3 } from "../../../types";
import { Parameters } from "./parameters";
import * as sdf from '../../shader/sdf/box.glsl';

export class BoxParameters extends Parameters {
  protected _data = {
    id: 0,
    size: new Size(),
    position: new Vector3(),
    color: new Vector3(),
    diffuse: 1,
    specular: 0,
  }
  private uniformName = 'uBoxParams';
  protected _sdf = sdf;
  constructor(id:number,data: InstanceProps) {
    super();
    this.handleUndefined(id,data);
    this.generateUnifromStr();
    this.generateMaterialStr();
    this.generateGeometryStr();
  }
  protected generateMaterialStr = () => {
    const { color, diffuse, specular } = this._data;
    const c = Object.values(color).map(d => this.int2float(this.clamp(d, 0, 1)));
    this._material = `Material(vec3(${c[0]},${c[1]},${c[2]}),${this.int2float(diffuse)},${this.int2float(specular)})`;
  }
  protected generateGeometryStr = () => {
    const { position, size } = this._data;
    const [x, y, z] = Object.values(position).map(d => this.int2float(d));
    const [w, h, d] = Object.values(size).map(d => this.int2float(d));
    this._geometry = `sdBox(p-vec3(${x},${y},${z}),vec3(${w},${h},${d}))`;
  }
  protected generateUnifromStr = () => {
    const { id } = this._data;
    const size = 11;
    this._uniform = `uniform float[${size}] ${this.uniformName}${id};`;
  }
}