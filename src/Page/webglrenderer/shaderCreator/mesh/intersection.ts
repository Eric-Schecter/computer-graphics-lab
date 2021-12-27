import * as sphIntersection from '../../shader/intersection/sphere.glsl';
import * as boxIntersection from '../../shader/intersection/box.glsl';
import { Instance } from '../../../instance';
import { Box, Sphere } from '../../../instance/component';

export class IntersectionGenerator {
  public generate = (data: Set<Instance>) => {
    const intersections = new Set<string>();
    for (const d of data) {
      if (d instanceof Sphere) { intersections.add(sphIntersection) }
      if (d instanceof Box) { intersections.add(boxIntersection) }
    }
    return Array.from(intersections);
  }
}