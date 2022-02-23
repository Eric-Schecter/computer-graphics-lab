import { Vector3 } from "..";
import { Axis } from "./types";

export class SAH {
  private computeCostSingle = (min: Vector3, max: Vector3) => {
    const lengthx = max.x - min.x;
    const lengthy = max.y - min.y;
    const lengthz = max.z - min.z;
    return lengthx * lengthy + lengthy * lengthz + lengthz * lengthx;
  }
  private computeCostByAxis = (worklist: Uint32Array, aabb: Float32Array, axis: Axis, centroidByAxis: number) => {
    let leftCount = 0;
    let rightCount = 0;

    const lmin = new Vector3(Infinity, Infinity, Infinity);
    const lmax = new Vector3(-Infinity, -Infinity, -Infinity);
    const rmin = new Vector3(Infinity, Infinity, Infinity);
    const rmax = new Vector3(-Infinity, -Infinity, -Infinity);

    const min = new Vector3();
    const max = new Vector3();
    const mid = new Vector3();

    for (let i = 0; i < worklist.length; i++) {
      const index = worklist[i];
      min.set(aabb[index * 9 + 0], aabb[index * 9 + 1], aabb[index * 9 + 2]);
      max.set(aabb[index * 9 + 3], aabb[index * 9 + 4], aabb[index * 9 + 5]);
      mid.set(aabb[index * 9 + 6], aabb[index * 9 + 7], aabb[index * 9 + 8]);

      const center = mid[axis];

      if (center < centroidByAxis) {
        lmin.setSmallerByVector(min);
        lmax.setBiggerByVector(max);
        leftCount++;
      } else {
        rmin.setSmallerByVector(min);
        rmax.setBiggerByVector(max);
        rightCount++;
      }
    }

    if (leftCount === 0 || rightCount === 0) {
      return Infinity;
    }

    const leftSurface = this.computeCostSingle(lmin, lmax);
    const rightSurface = this.computeCostSingle(rmin, rmax);

    return leftSurface * leftCount + rightSurface * rightCount;
  }
  public compute = (min: Vector3, max: Vector3, centroid: Vector3, aabb: Float32Array, worklist: Uint32Array) => {
    let bestAxis: Axis | null = null;
    let bestSplit: number | null = null;
    const length = worklist.length;
    let minCost = length * this.computeCostSingle(min, max); //set the biggest cost at the beginning
    const axes: Axis[] = ['x', 'y', 'z'];
    for (let i = 0; i < axes.length; i++) {
      const axis = axes[i];
      const centroidByAxis = centroid[axis];
      const totalCost = this.computeCostByAxis(worklist, aabb, axis, centroidByAxis);
      if (totalCost < minCost) {
        minCost = totalCost;
        bestSplit = centroidByAxis;
        bestAxis = axis;
      }
    }
    return { bestSplit, bestAxis };
  }
}