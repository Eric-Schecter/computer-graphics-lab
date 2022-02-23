import { Vector3 } from "..";

export class BVHNode {
  public min = new Vector3(Infinity, Infinity, Infinity);
  public max = new Vector3(-Infinity, -Infinity, -Infinity);
  constructor(public id: number, public parentID: number, public leftchildID: number, public rightchildID: number) { }
  private getPoint = (aabb: Float32Array, index: number) => {
    return new Vector3(...aabb.slice(index, index + 3));
  }
  public buildFromPointsClamped = (min: Vector3, max: Vector3) => {
    this.min.setSmallerByVector(min);
    this.max.setBiggerByVector(max);
    return this;
  }
  private getMinMax = (aabb: Float32Array, index: number) => {
    const min = this.getPoint(aabb, index * 9);
    const max = this.getPoint(aabb, index * 9 + 3);
    return { min, max };
  }
  public buildFromAABBMultiple = (aabb: Float32Array, indexes: number[]) => {
    const minmax = indexes.map(index => this.getMinMax(aabb, index));
    const minV = new Vector3(Infinity, Infinity, Infinity);
    const maxV = new Vector3(-Infinity, -Infinity, -Infinity);
    for (let i = 0; i < minmax.length; i++) {
      const { min, max } = minmax[i];
      minV.setSmallerByVector(min);
      maxV.setBiggerByVector(max);
    }
    this.buildFromPoints(minV, maxV);
    return this;
  }
  public buildFromAABB = (aabb: Float32Array, index: number) => {
    const { min, max } = this.getMinMax(aabb, index);
    this.buildFromPoints(min, max);
    return this;
  }
  public buildFromPoints = (min: Vector3, max: Vector3) => {
    this.min.copy(min);
    this.max.copy(max);
    return this;
  }
  public add2Nodes = (nodes: BVHNode[]) => {
    nodes.push(this);
    return this;
  }
  public link2ParentIfRightchild = (isRight: boolean, nodes: BVHNode[]) => {
    if (isRight) {
      nodes[this.parentID].rightchildID = this.id;
    }
    return this;
  }
}