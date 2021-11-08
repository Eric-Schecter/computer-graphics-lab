import { InstanceProps, Vector3 } from "../../../types";

export abstract class Parameters {
  protected _data = {
    color: new Vector3(),
    diffuse: 1,
    specular: 0,
  };
  protected _sdf = '';
  protected _geometry = '';
  protected _material = '';
  constructor() { }
  protected int2float = (data: number) => {
    return Number.isInteger(data) ? data.toFixed(1) : data;
  }
  protected clamp = (num: number, min: number, max: number) => {
    return num > max
      ? max
      : num < min
        ? min
        : num;
  }
  protected handleUndefined = (data: InstanceProps) => {
    const keys = Object.keys(this._data);
    const self = this._data as InstanceProps;
    keys.forEach(key => self[key] = data[key] !== undefined ? data[key] : self[key]);
  }
  protected generateMaterialStr = () => {
    const { color, diffuse, specular } = this._data;
    const c = Object.values(color).map(d => this.int2float(this.clamp(d, 0, 1)));
    this._material = `Material(vec3(${c[0]},${c[1]},${c[2]}),${this.int2float(diffuse)},${this.int2float(specular)})`;
  }
  protected abstract generateGeometryStr: () => void;
  public get sdf(){
    return this._sdf;
  }
  public get geometry() {
    return this._geometry;
  }
  public get material() {
    return this._material;
  }
}