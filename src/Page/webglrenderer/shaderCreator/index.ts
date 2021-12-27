import * as schlick from '../shader/effect/schlick.glsl';

import * as spotlight from '../shader/light/spotlight.glsl';

import * as main from '../shader/basic.glsl';

import * as acesfilm from '../shader/postprocess/acesfilm.glsl';
import * as gamacorrect from '../shader/postprocess/gamacorrect.glsl';
import * as vignette from '../shader/postprocess/vignette.glsl';

import * as translate from '../shader/math/translate.glsl';

import * as randomVector from '../shader/randomVector.glsl';

import { structs } from '../shader/struct';
import { Store } from '../../reactrenderer/store';

const prefix = [
  '#version 300 es',
  'precision highp float;',
  'precision highp int;',
  'out highp vec4 pc_fragColor;'
]

const defines = [
  '#define gl_FragColor pc_fragColor',
  '#define PI 3.14159265359',
  '#define GAMMA_FACTOR 2.2',
  '#define epsilon 1e-3',
  '#define saturate(x)clamp(x,0.,1.)',
]

const maths = [
  translate
]

const postprocess: string[] = [
  gamacorrect,
  acesfilm,
  vignette
]

export class ShaderCreator {
  public create = (store: Store, settings = {}, infos: Array<{ name: string, type: string }>) => {
    const meshes = store.generate();
    const uniforms = infos
    .filter(({name})=>!name.includes('['))
    .map(({ name, type }) => `uniform ${type} ${name};`)

    const shaderArr = [
      ...prefix,
      ...defines,
      ...structs,
      ...uniforms,
      ...maths,
      randomVector,
      ...postprocess,
      ...meshes,
      main
    ];
    const shader = shaderArr.join('\n');
    console.log(shader);
    return shader;
  }
}