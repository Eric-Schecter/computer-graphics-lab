import * as schlick from '../shader/effect/schlick.glsl';

import * as spotlight from '../shader/light/spotlight.glsl';

import * as main from '../shader/basic.glsl';

import * as postprocess from '../shader/postprocess/postprocess.glsl';

import * as translate from '../shader/math/translate.glsl';

import * as randomVector from '../shader/randomVector.glsl';

import { structs } from '../shader/struct';
import { Scene } from '../scene';

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

// const lights = [
//   spotlight
// ]

// const effects = [
//   schlick
// ]

export class ShaderCreator {
  public create = (scene:Scene, settings = {}, infos: Array<{ name: string, type: string }>) => {
    const meshes = scene.generate();
    const uniforms = infos.map(({name, type}) => `uniform ${type} ${name};`)
    const shaderArr = [
      ...prefix,
      ...defines,
      ...structs,
      ...uniforms,
      ...maths,
      randomVector,
      // ...lights,
      // ...effects,
      postprocess,
      ...meshes,
      main
    ];
    const shader = shaderArr.join('\n');
    console.log(shader)
    return shader;
  }
}