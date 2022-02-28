import main from './shader/others/main.glsl';
import testVisibility from './shader/others/testVisibility.glsl';
import random from './shader/others/random.glsl';
import prefix from './shader/others/prefix.glsl';
import ray from './shader/struct/ray.glsl';
import camera from './shader/struct/camera.glsl';
import sphere from './shader/struct/sphere.glsl';
import box from './shader/struct/box.glsl';
import hitinfo from './shader/struct/hitinfo.glsl';
import weight from './shader/struct/weight.glsl';
import model from './shader/struct/model.glsl';

import acesfilm from './shader/postprocess/acesfilm.glsl';
import gamacorrect from './shader/postprocess/gamacorrect.glsl';
import vignette from './shader/postprocess/vignette.glsl';
import translate from './shader/math/translate.glsl';
import defines from './shader/others/define.glsl';
import sampleLight from './shader/sampling/light.glsl';
// import sampleBsdf from './shader/sampling/bsdf.glsl';
import misWeight from './shader/others/misweight.glsl';
import generateRay from './shader/others/ray.glsl';
import getLight from './shader/others/getlight.glsl';
import russianRoulette from './shader/algrithem/russianRoulette.glsl';
import computePdf from './shader/pdf/pdf.glsl';
import luminance from './shader/others/luminance.glsl';
import getLobe from './shader/others/lobe.glsl';
import getWeight from './shader/others/weight.glsl';
import mixedApproxFresnel from './shader/others/mixedApproxFresnel.glsl';

import diffuseBRDF from './shader/bsdf/diffuseBRDF.glsl';
import metallicBRDF from './shader/bsdf/metallicBRDF.glsl';
import distribution from './shader/bsdf/distribution.glsl';
import schlickFresnel from './shader/bsdf/schlickFresnel.glsl';
import geometry from './shader/bsdf/geometry.glsl';
import clearcoat from './shader/bsdf/clearcoat.glsl';
import BSDF from './shader/bsdf/bsdf.glsl';
import BTDF from './shader/bsdf/btdf.glsl';
import dielectricFresnel from './shader/bsdf/dielectricFresnel.glsl';

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
    for (const d of meshes) {
      intersections.add(d.intersection);
    }

    // const geometries = [
    //   'bool scene(Ray ray,bool isShadowRay,inout HitInfo res,int preID){',
    //   'int id = 0;',

    //   'res = HitInfo(DefaultGeometry,DefaultMaterial,id);',
    //   ...meshes.map(mesh => mesh.hitInfo),
    //   'res.material.roughness = max(res.material.roughness,ROUGHNESS);', // limit roughness not to be 0
    //   'res.material.clearcoatGloss = max(res.material.clearcoatGloss,ROUGHNESS);', // limit clearcoatGloss not to be 0
    //   'res.material.specular = max(res.material.specular,0.001);', // limit specular not to be 0 to avoid bug
    //   'return res.geometry.dist<LIMIT;',
    //   '}'
    // ]

    const geometries = [
      'bool scene(Ray ray,bool isShadowRay,inout HitInfo res,int preID){',
      'vec4 gInfo = vec4(vec3(0.),LIMIT);', // xyz:normal,w:dist
      'ivec4 oInfo = ivec4(0);',             // x:id,y:idIntersected,z:index,w:type
      ...meshes.map(mesh => mesh.hitInfo),

      'Material material;',
      'if(oInfo.w==DefaultPrimitive){',
      'return false;',
      '}else if(oInfo.w==BOX){',
      'material = box[oInfo.z].material;',
      '}else if(oInfo.w == SPHERE){',
      'material = sphere[oInfo.z].material;',
      '}',

      'res.geometry.dist = gInfo.w;',
      'res.geometry.normal = gInfo.xyz;',
      'res.id = oInfo.y;',
      'res.material.color = material.color;',
      'res.material.emissive = material.emissive;',
      'res.material.roughness = max(material.roughness,ROUGHNESS);',
      'res.material.metallic = material.metallic;',
      'res.material.specTrans = material.specTrans;',
      'res.material.specular = max(material.specular,0.001);',
      'res.material.specColor = material.specColor;',
      'res.material.clearcoat = material.clearcoat;',
      'res.material.clearcoatGloss = max(material.clearcoatGloss,ROUGHNESS);',
      'return true;',
      '}'
    ]

    return [
      testVisibility,
      ...intersections,
      ...geometries,
    ]
  }
  public create = (store: Store, settings = {}, infos: Array<{ name: string, type: string }>) => {
    const uniforms1 = infos
      .filter(({ name }) => !name.includes('['))
      .map(({ name, type }) => `uniform ${type} ${name};`);
    const uniforms2 = store.facotry.getUniforms;
    const structs = [ray, camera, hitinfo, sphere, box, weight, model];
    const maths = [translate];
    const postprocess = [gamacorrect, acesfilm, vignette];
    const bsdf = [dielectricFresnel, distribution, schlickFresnel, geometry, diffuseBRDF, metallicBRDF, computePdf, clearcoat, BTDF, BSDF];
    const algrithem = [russianRoulette];
    const sampling = [misWeight, sampleLight];

    const shaderArr = [
      prefix,
      defines,
      ...structs,
      ...uniforms1,
      ...uniforms2,
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
    const a = shaderArr.join('\n');
    console.log(a);
    return a;
  }
}