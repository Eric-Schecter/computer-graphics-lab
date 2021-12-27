import * as opUnion from '../shader/opUnion.glsl';
import { Mesh } from "../../instance/component";

export class MeshGenerator {
  public generate = (meshes: Mesh[]) => {
    const intersections = new Set<string>();
    const uniforms = new Set<string>();
    for (const d of meshes) {
      intersections.add(d.intersection);
      uniforms.add(d.uniform);
    }

    const geometries = [
      'HitInfo scene(Ray ray){',
      'HitInfo res = HitInfo(Geometry(1e10,vec3(0.)),defaultMaterial);',
      ...meshes.map(mesh=>mesh.hitInfo),
      'return res;',
      '}'
    ]

    return [
      opUnion,
      ...uniforms,
      ...intersections,
      ...geometries,
    ]
  }
}