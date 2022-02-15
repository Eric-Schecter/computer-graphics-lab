import * as main from './shader/others/main.glsl';
import * as opUnion from './shader/others/opUnion.glsl';
import * as random from './shader/others/random.glsl';
import * as prefix from './shader/others/prefix.glsl';
import * as ray from './shader/struct/ray.glsl';
import * as camera from './shader/struct/camera.glsl';
import * as sphere from './shader/struct/sphere.glsl';
import * as box from './shader/struct/box.glsl';
import * as hitinfo from './shader/struct/hitinfo.glsl';
import * as weight from './shader/struct/weight.glsl';

import * as acesfilm from './shader/postprocess/acesfilm.glsl';
import * as gamacorrect from './shader/postprocess/gamacorrect.glsl';
import * as vignette from './shader/postprocess/vignette.glsl';
import * as translate from './shader/math/translate.glsl';
import * as defines from './shader/others/define.glsl';
import * as sampleLight from './shader/sampling/light.glsl';
// import * as sampleBsdf from './shader/sampling/bsdf.glsl';
import * as misWeight from './shader/others/misweight.glsl';
import * as generateRay from './shader/others/ray.glsl';
import * as getLight from './shader/others/getlight.glsl';
import * as russianRoulette from './shader/algrithem/russianRoulette.glsl';
import * as computePdf from './shader/pdf/pdf.glsl';
import * as luminance from './shader/others/luminance.glsl';
import * as getLobe from './shader/others/lobe.glsl';
import * as getWeight from './shader/others/weight.glsl';
import * as mixedApproxFresnel from './shader/others/mixedApproxFresnel.glsl';

import * as diffuseBRDF from './shader/bsdf/diffuseBRDF.glsl';
import * as metallicBRDF from './shader/bsdf/metallicBRDF.glsl';
import * as distribution from './shader/bsdf/distribution.glsl';
import * as schlickFresnel from './shader/bsdf/schlickFresnel.glsl';
import * as geometry from './shader/bsdf/geometry.glsl';
import * as clearcoat from './shader/bsdf/clearcoat.glsl';
import * as BSDF from './shader/bsdf/bsdf.glsl';
import * as BTDF from './shader/bsdf/btdf.glsl';
import * as dielectricFresnel from './shader/bsdf/dielectricFresnel.glsl';

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
      'bool scene(Ray ray,bool isShadowRay,inout HitInfo res,int preID){',
      'int id = 0;',
      'res = HitInfo(DefaultGeometry,Material(vec3(0.),vec3(0.),0.,0.,0.,1.,vec3(1.),0.,0.),id);',
      ...meshes.map(mesh => mesh.hitInfo),
      'res.material.roughness = max(res.material.roughness,ROUGHNESS);', // limit roughness not to be 0
      'res.material.clearcoatGloss = max(res.material.clearcoatGloss,ROUGHNESS);', // limit clearcoatGloss not to be 0
      'return res.geometry.dist<LIMIT;',
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

    const structs = [ray, camera, hitinfo, sphere, box, weight];
    const maths = [translate];
    const postprocess = [gamacorrect, acesfilm, vignette];
    const bsdf = [dielectricFresnel, distribution, schlickFresnel, geometry, diffuseBRDF, metallicBRDF, computePdf, clearcoat, BTDF, BSDF];
    const algrithem = [russianRoulette];
    const sampling = [misWeight, sampleLight];

    const shaderArr = [
      prefix,
      defines,
      ...structs,
      ...uniforms,
      ...maths,
      random,
      luminance,
      getLobe,
      getWeight,
      ...bsdf,
      mixedApproxFresnel,
      ...algrithem,
      ...postprocess,
      ...this.generate(store.dataset),
      generateRay,
      getLight,
      ...sampling,
      main
    ];
    const shader = shaderArr.join('\n');
    console.log(shader);
    return shader;
  }
}