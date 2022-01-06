import { Vector3 } from ".";
import { Vec3 } from "../..";

export class Matrix4 {
  protected _data = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
  ]
  public lookat = (position: Vec3, target: Vec3) => {
    const rotation = 0;
    const forward = new Vector3().subVectors(target, position).normalize();
    const orientation = new Vector3(Math.sin(rotation), Math.cos(rotation), 0);
    const left = new Vector3().crossVectors(forward, orientation).normalize();
    const up = new Vector3().crossVectors(left, forward).normalize();
    return [
      left.x, left.y, left.z, 0,
      up.x, up.y, up.z, 0,
      forward.x, forward.y, forward.z, 0,
      0, 0, 0, 0,
    ];
  }
  public get data() {
    return this._data;
  }
}