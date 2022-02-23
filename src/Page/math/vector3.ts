import { Vec3 } from "../..";

export class Vector3 {
  public x: number;
  public y: number;
  public z: number;
  constructor(...args: any) {
    const [first, second, third] = args;
    if (first instanceof Vector3) {
      this.copy(first);
    } else {
      this.set(
        this.handleUndefined(first),
        this.handleUndefined(second),
        this.handleUndefined(third)
      )
    }
  }
  private handleUndefined = (n: any, defaultValue = 0) => {
    return n !== undefined ? n : defaultValue;
  }
  public copy = (v: Vector3) => {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }
  public set = (x?: number, y?: number, z?: number) => {
    this.x = this.handleUndefined(x, this.x);
    this.y = this.handleUndefined(y, this.y);
    this.z = this.handleUndefined(z, this.z);
    return this;
  }
  public setSmallerByPoint = (x: number, y: number, z: number) => {
    this.x = Math.min(this.x, x);
    this.y = Math.min(this.y, y);
    this.z = Math.min(this.z, z);
    return this;
  }
  public setSmallerByVector = (v: Vector3) => {
    this.x = Math.min(this.x, v.x);
    this.y = Math.min(this.y, v.y);
    this.z = Math.min(this.z, v.z);
    return this;
  }
  public setBiggerByPoint = (x: number, y: number, z: number) => {
    this.x = Math.max(this.x, x);
    this.y = Math.max(this.y, y);
    this.z = Math.max(this.z, z);
    return this;
  }
  public setBiggerByVector = (v: Vector3) => {
    this.x = Math.max(this.x, v.x);
    this.y = Math.max(this.y, v.y);
    this.z = Math.max(this.z, v.z);
    return this;
  }
  public crossVectors = (a: Vector3, b: Vector3) => {

    const ax = a.x, ay = a.y, az = a.z;
    const bx = b.x, by = b.y, bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

    return this;
  }
  public add = (v: Vector3 | Vec3) => {
    if (v instanceof Vector3) {
      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
    } else {
      const [x, y, z] = v;
      this.x += x;
      this.y += y;
      this.z += z;
    }
    return this;
  }
  public sub = (v: Vector3) => {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }
  public subVectors = (v1: Vec3, v2: Vec3) => {
    this.x = v1[0] - v2[0];
    this.y = v1[1] - v2[1];
    this.z = v1[2] - v2[2];
    return this;
  }
  public multiplyScale = (scale: number) => {
    this.x *= scale;
    this.y *= scale;
    this.z *= scale;
    return this;
  }
  public divideScale = (scale: number) => {
    if (scale !== 0) {
      this.multiplyScale(1 / scale);
    }
    return this;
  }
  public normalize = () => {
    const length = this.length();
    if (length === 0) {
      console.log('can not divide by 0');
      return this;
    }
    return this.divideScale(length);
  }
  public length = () => {
    return Math.sqrt(this.lengthSq());
  }
  public lengthSq = () => {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }
}