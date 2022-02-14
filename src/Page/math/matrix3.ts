import { Vector3 } from ".";
import { Vec3 } from "../..";

export class Matrix3 {
  protected _data = [
    1, 0, 0,
    0, 1, 0,
    0, 0, 1,
  ]
  public get data() {
    return this._data;
  }
}