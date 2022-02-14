import { Vec3 } from "../..";

export class Vector3 {
  constructor(public x = 0, public y = 0, public z = 0) { }
  public crossVectors(a: Vector3, b: Vector3) {

    const ax = a.x, ay = a.y, az = a.z;
    const bx = b.x, by = b.y, bz = b.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;

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
  public normalize = () => {
    const length = this.length();
    if (length === 0) {
      console.log('can not divide by 0');
      return this;
    }
    return this.multiplyScale(1 / this.length());
  }
  public length = () => {
    return Math.sqrt(this.lengthSq());
  }
  public lengthSq = () => {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }
}