import * as main from './shader/others/main.glsl';
import * as opUnion from './shader/others/opUnion.glsl';
import * as randomVector from './shader/others/randomVector.glsl';
import * as prefix from './shader/others/prefix.glsl';
import * as ray from './shader/struct/ray.glsl';
import * as camera from './shader/struct/camera.glsl';
import * as sphere from './shader/struct/sphere.glsl';
import * as box from './shader/struct/box.glsl';
import * as hitinfo from './shader/struct/hitinfo.glsl';
import * as acesfilm from './shader/postprocess/acesfilm.glsl';
import * as gamacorrect from './shader/postprocess/gamacorrect.glsl';
import * as vignette from './shader/postprocess/vignette.glsl';
import * as translate from './shader/math/translate.glsl';
import * as defines from './shader/others/define.glsl';
import { Store } from '../reactrenderer/store';
import { Mesh } from '../instance/component';
import { Instance } from '../instance';

export class ShaderCreator {
  private generate = (set: Set<Instance>) => {
    const meshes: Mesh[] = [];
    for (const instance of set.values()) {
      if (instance instanceof Mesh) {
        meshes.push(instance);
      }
    }
    const intersections = new Set<string>();
    const uniforms = new Set<string>();
    for (const d of meshes) {
      intersections.add(d.intersection);
      uniforms.add(d.uniform);
    }

    const geometries = [
      'HitInfo scene(Ray ray){',
      'HitInfo res = HitInfo(Geometry(1e10,vec3(0.)),defaultMaterial);',
      ...meshes.map(mesh => mesh.hitInfo),
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
  public create = (store: Store, settings = {}, infos: Array<{ name: string, type: string }>) => {
    const uniforms = infos
      .filter(({ name }) => !name.includes('['))
      .map(({ name, type }) => `uniform ${type} ${name};`);

    const structs = [ray, camera, hitinfo, sphere, box];
    const maths = [translate];
    const postprocess = [gamacorrect, acesfilm, vignette];

    const shaderArr = [
      prefix,
      defines,
      ...structs,
      ...uniforms,
      ...maths,
      randomVector,
      ...postprocess,
      ...this.generate(store.dataset),
      main
    ];
    const shader = shaderArr.join('\n');
    console.log(shader);
    return shader;
  }
}