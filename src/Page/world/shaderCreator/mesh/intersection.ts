import * as sphIntersection from '../../shader/intersection/sphere.glsl';
import * as boxIntersection from '../../shader/intersection/box.glsl';
import { Object3D } from '../../component';

export class IntersectionGenerator {
  public generate = (data: Set<Object3D>) => {
    const intersections = new Set<string>();
    for (const d of data) {
      switch (d.type) {
        case 'box': { intersections.add(boxIntersection); break }
        case 'sphere': { intersections.add(sphIntersection); break }
      }
    }
    return Array.from(intersections);
  }
}