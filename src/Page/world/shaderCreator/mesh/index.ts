//generate mesh shader by data

import { Instance } from "../../../types";
import { Generator } from "./generator";
import { GeometryGenerator } from "./geometry";
import * as opUnion from '../shader/opUnion.glsl';
import * as sphIntersection from '../shader/intersection/sphere.glsl';
import * as boxIntersection from '../shader/intersection/box.glsl';
import { PropGenerator, Parameters } from "./prop";
import { UniformGenerator } from "./uniform";

export class MeshGenerator implements Generator {
  private base = opUnion;
  private geometry = new GeometryGenerator();
  private prop = new PropGenerator();
  private uniform = new UniformGenerator();
  public generate = (data: Set<Instance>) => {
    const handledData = new Set<Parameters>();
    const intersections = new Set<string>();
    for (const d of data) {
      handledData.add(this.prop.generate(d));
      switch (d.type) {
        case 'box': { intersections.add(boxIntersection); break }
        case 'sphere': { intersections.add(sphIntersection); break }
      }
    }

    return [
      ...this.uniform.generate(handledData),
      this.base,
      ...intersections,
      ...this.geometry.generate(handledData)
    ]
  }
}