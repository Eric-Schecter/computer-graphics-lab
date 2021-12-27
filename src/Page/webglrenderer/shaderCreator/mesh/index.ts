//generate mesh shader by data

import { GeometryGenerator } from "./geometry";
import * as opUnion from '../../shader/opUnion.glsl';
// import { Parameters } from "./prop";
import { UniformGenerator } from "./uniform";
import { IntersectionGenerator } from "./intersection";
import { Mesh } from "../../../instance/component";

export class MeshGenerator{
  private base = opUnion; // draw order: nearest
  private geometry = new GeometryGenerator();
  private uniform = new UniformGenerator();
  private intersection = new IntersectionGenerator();
  private members = new Set<Mesh>();
  public generate = (meshes:Mesh[]) => {
    this.members.clear();
    meshes.forEach(mesh=>this.members.add(mesh));
    return [
      this.base,
      ...this.uniform.generate(this.members),
      ...this.intersection.generate(this.members),
      ...this.geometry.generate(this.members)
    ]
  }
}