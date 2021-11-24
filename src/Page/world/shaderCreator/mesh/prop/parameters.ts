import { InstanceProps, Vector3 } from "../../../../types";

export abstract class Parameters {
  protected _data = {
    id: 0,
    color: new Vector3(),
    diffuse: 1,
    specular: 0,
  };
  protected _geometry = '';
  protected _material = '';
  protected _uniform = '';
  protected count = 0;
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
  protected handleUndefined = (id: number) => {
    this._data.id = id;
    // const keys = Object.keys(this._data);
    // const self = this._data as InstanceProps;
    // keys.forEach(key => self[key] = data[key] !== undefined ? data[key] : self[key]);
  }
  protected abstract generateGeometryStr: () => void;
  protected abstract generateUnifromStr: () => void;
  protected abstract generateMaterialStr: () => void;
  public get geometry() {
    return this._geometry;
  }
  public get material() {
    return this._material;
  }
  public get uniform() {
    return this._uniform;
  }
}