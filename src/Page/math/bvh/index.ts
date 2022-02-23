//refer to https://pbr-book.org/3ed-2018/Primitives_and_Intersection_Acceleration/Bounding_Volume_Hierarchies
//refer to https://github.com/erichlof/THREE.js-PathTracing-Renderer/blob/gh-pages/js/BVH_Acc_Structure_Iterative_SAH_Builder.js

import { Vector3 } from "..";
import { Vec3 } from "../../..";
import { BVHNode } from "./bvhnode";
import { SAH } from "./sah";
import { Axis } from "./types";

/**
 * return 
 * 1. triangles:Float32Array - store render infos 
 * 2. aabb:Float32Array - infos for intersection test  
 * 
 * objective: build tree structure and then transfer to flat array for traversal
 * 
 * logic: 
 * 1. nodes are sorted according to dps from root to left side, 
 * 2. leftchildID is negative if it was an inner node, positive if it was a leaf node
 */
export class BVH {
  private sah = new SAH();
  public triangles: Float32Array;
  public aabb: Float32Array;
  private nodes: BVHNode[] = [];
  private leftWorkLists: Array<Uint32Array | undefined> = [];
  private rightWorkLists: Array<Uint32Array | undefined> = [];
  constructor(size: number) {
    this.triangles = new Float32Array(size);
    this.aabb = new Float32Array(size);
  }
  private setTriangle = (p: Vector3[], n: Vector3[], index: number, step: number) => {
    const [p1, p2, p3] = p;
    const [n1, n2, n3] = n;
    this.triangles[index * step + 0] = p1.x;
    this.triangles[index * step + 1] = p1.y;
    this.triangles[index * step + 2] = p1.z;
    this.triangles[index * step + 3] = p2.x;
    this.triangles[index * step + 4] = p2.y;
    this.triangles[index * step + 5] = p2.z;
    this.triangles[index * step + 6] = p3.x;
    this.triangles[index * step + 7] = p3.y;
    this.triangles[index * step + 8] = p3.z;
    this.triangles[index * step + 9] = n1.x;
    this.triangles[index * step + 10] = n1.y;
    this.triangles[index * step + 11] = n1.z;
    this.triangles[index * step + 12] = n2.x;
    this.triangles[index * step + 13] = n2.y;
    this.triangles[index * step + 14] = n2.z;
    this.triangles[index * step + 15] = n3.x;
    this.triangles[index * step + 16] = n3.y;
    this.triangles[index * step + 17] = n3.z;
  }
  private setAABB = (pmin: Vector3, pmax: Vector3, center: Vector3, i: number) => {
    this.aabb[i + 0] = pmin.x;
    this.aabb[i + 1] = pmin.y;
    this.aabb[i + 2] = pmin.z;
    this.aabb[i + 3] = pmax.x;
    this.aabb[i + 4] = pmax.y;
    this.aabb[i + 5] = pmax.z;
    this.aabb[i + 6] = center.x;
    this.aabb[i + 7] = center.y;
    this.aabb[i + 8] = center.z;
  }
  private resetAABB = () => {
    const length = this.nodes.length;
    for (let i = 0; i < length; i++) {
      this.aabb[8 * i + 0] = this.nodes[i].leftchildID;
      this.aabb[8 * i + 1] = this.nodes[i].min.x;
      this.aabb[8 * i + 2] = this.nodes[i].min.y;
      this.aabb[8 * i + 3] = this.nodes[i].min.z;

      this.aabb[8 * i + 4] = this.nodes[i].rightchildID;
      this.aabb[8 * i + 5] = this.nodes[i].max.x;
      this.aabb[8 * i + 6] = this.nodes[i].max.y;
      this.aabb[8 * i + 7] = this.nodes[i].max.z;
    }
  }
  private buildNodeIfOne = (worklist: Uint32Array, parentID: number, isLeft: boolean) => {
    const index = worklist[0];
    new BVHNode(this.nodes.length, parentID, -index - 1, -1)
      .buildFromAABB(this.aabb, index)
      .add2Nodes(this.nodes)
      .link2ParentIfRightchild(!isLeft, this.nodes);
  }
  private buildNodeIfTwo = (worklist: Uint32Array, parentID: number, isLeft: boolean) => {
    const [leftIndex, rightIndex] = worklist;
    const length = this.nodes.length;
    const leftNode = new BVHNode(length + 1, length, -leftIndex - 1, -1)
      .buildFromAABB(this.aabb, leftIndex)
      .add2Nodes(this.nodes)

    const rightNode = new BVHNode(length + 2, length, -rightIndex - 1, -1)
      .buildFromAABB(this.aabb, rightIndex)
      .add2Nodes(this.nodes)

    new BVHNode(length, parentID, leftNode.id, rightNode.id)
      .buildFromAABBMultiple(this.aabb, [leftIndex, rightIndex])
      .add2Nodes(this.nodes)
      .link2ParentIfRightchild(!isLeft, this.nodes);
  }
  /**split equally*/
  private handleNotHasBestSplit = (worklist: Uint32Array, stackIndex: number) => {
    const length = worklist.length;
    const leftWorkList = new Uint32Array(Math.ceil(length / 2));
    const rightWorkList = new Uint32Array(Math.floor(length / 2));
    this.leftWorkLists[stackIndex] = leftWorkList;
    this.rightWorkLists[stackIndex] = rightWorkList;

    for (let i = 0; i < length; i++) {
      const index = worklist[i];
      if (i % 2 === 0) {
        leftWorkList[i / 2] = index;
      } else {
        rightWorkList[Math.floor(i / 2)] = index;
      }
    }
  }
  private getCountBySplit = (worklist: Uint32Array, bestAxis: Axis, split: number) => {
    const leftWork = [];
    const rightWork = [];
    const mid = new Vector3();
    const length = worklist.length;
    for (let i = 0; i < length; i++) {
      const index = worklist[i];
      mid.set(this.aabb[index * 9 + 6], this.aabb[index * 9 + 7], this.aabb[index * 9 + 8]);
      if (mid[bestAxis] < split) {
        leftWork.push(index);
      } else {
        rightWork.push(index);
      }
    }
    return { leftWork, rightWork };
  }
  /**split by bestAxis*/
  private handleHasBestSplit = (worklist: Uint32Array, stackIndex: number, bestAxis: Axis, split: number) => {
    const { leftWork, rightWork } = this.getCountBySplit(worklist, bestAxis, split);

    const leftWorkList = new Uint32Array(leftWork.length);
    leftWorkList.set(leftWork);
    const rightWorkList = new Uint32Array(rightWork.length);
    rightWorkList.set(rightWork);
    this.leftWorkLists[stackIndex] = leftWorkList;
    this.rightWorkLists[stackIndex] = rightWorkList;
  }
  private getParams = (aabb: Float32Array, worklist: Uint32Array) => {
    const centroid = new Vector3();
    const min = new Vector3(Infinity, Infinity, Infinity);
    const max = new Vector3(-Infinity, -Infinity, -Infinity);
    const mid = new Vector3();
    const length = worklist.length;
    for (let i = 0; i < length; i++) {
      const index = worklist[i];
      min.setSmallerByPoint(aabb[index * 9 + 0], aabb[index * 9 + 1], aabb[index * 9 + 2]);
      max.setBiggerByPoint(aabb[index * 9 + 3], aabb[index * 9 + 4], aabb[index * 9 + 5]);
      mid.set(aabb[index * 9 + 6], aabb[index * 9 + 7], aabb[index * 9 + 8]);
      centroid.add(mid);
    }
    centroid.divideScale(length);
    return { min, max, mid, centroid };
  }
  private buildNodeMoreThanTwo = (worklist: Uint32Array, parentID: number, stackIndex: number, isLeft: boolean) => {
    const { min, max, centroid } = this.getParams(this.aabb, worklist);
    const length = this.nodes.length;
    new BVHNode(length, parentID, length + 1, 0)
      .buildFromPoints(min, max)
      .add2Nodes(this.nodes)
      .link2ParentIfRightchild(!isLeft, this.nodes)

    const { bestSplit, bestAxis } = this.sah.compute(min, max, centroid, this.aabb, worklist);

    if (bestAxis === null || bestSplit === null) {
      this.handleNotHasBestSplit(worklist, stackIndex);
    } else {
      this.handleHasBestSplit(worklist, stackIndex, bestAxis, bestSplit);
    }
  }
  private buildNode = (worklist: Uint32Array, parentID: number, stackIndex: number, isLeft = true) => {
    const length = worklist.length;
    if (length === 1) {
      this.buildNodeIfOne(worklist, parentID, isLeft);
    } else if (length === 2) {
      this.buildNodeIfTwo(worklist, parentID, isLeft);
    } else if (length > 2) {
      this.buildNodeMoreThanTwo(worklist, parentID, stackIndex, isLeft);
    }
  }
  private buildBVH = (worklist: Uint32Array) => {
    const parents = [-1];
    let index = 0;
    this.buildNode(worklist, -1, index);
    while (index >= 0) {
      const left = this.leftWorkLists[index];
      const right = this.rightWorkLists[index];
      if (left !== undefined) {
        this.leftWorkLists[index] = undefined;
        index++;
        parents.push(this.nodes.length - 1);
        this.buildNode(left, this.nodes.length - 1, index);
      } else if (right !== undefined) {
        this.rightWorkLists[index] = undefined;
        index++;
        const parentID = parents.pop();
        if (parentID === undefined) {
          console.log('something wrong when popping parent id');
        } else {
          this.buildNode(right, parentID, index, false);
        }
      } else {
        index--;
      }
    }

    this.resetAABB();
  }
  private prepare = (count: number, p: Float32Array, n: Float32Array, scale: number, position: Vec3) => {
    const worklist = new Uint32Array(count);
    for (let i = 0; i < count; i++) {
      const triangleCount = i * 9;
      const p1 = new Vector3(p[triangleCount], p[triangleCount + 1], p[triangleCount + 2]).multiplyScale(scale).add(position);
      const p2 = new Vector3(p[triangleCount + 3], p[triangleCount + 4], p[triangleCount + 5]).multiplyScale(scale).add(position);
      const p3 = new Vector3(p[triangleCount + 6], p[triangleCount + 7], p[triangleCount + 8]).multiplyScale(scale).add(position);
      const n1 = new Vector3(p[triangleCount], p[triangleCount + 1], p[triangleCount + 2]).normalize();
      const n2 = new Vector3(p[triangleCount + 3], p[triangleCount + 4], p[triangleCount + 5]).normalize();
      const n3 = new Vector3(p[triangleCount + 6], p[triangleCount + 7], p[triangleCount + 8]).normalize();

      const xmin = Math.min(p1.x, p2.x, p3.x);
      const ymin = Math.min(p1.y, p2.y, p3.y);
      const zmin = Math.min(p1.z, p2.z, p3.z);

      const xmax = Math.max(p1.x, p2.x, p3.x);
      const ymax = Math.max(p1.y, p2.y, p3.y);
      const zmax = Math.max(p1.z, p2.z, p3.z);

      const pmin = new Vector3(xmin, ymin, zmin);
      const pmax = new Vector3(xmax, ymax, zmax);
      const center = new Vector3((pmin.x + pmax.x) / 2, (pmin.y + pmax.y) / 2, (pmin.z + pmax.z) / 2);

      this.setTriangle([p1, p2, p3], [n1, n2, n3], i, 20);
      this.setAABB(pmin, pmax, center, triangleCount);
      worklist[i] = i;
    }
    return worklist;
  }
  public build = (count: number, p: Float32Array, n: Float32Array, scale: number, position: Vec3) => {
    const worklist = this.prepare(count, p, n, scale, position);
    this.buildBVH(worklist);
    return this;
  }
}