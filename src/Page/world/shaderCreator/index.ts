import * as schlick from './shader/effect/schlick.glsl';

import * as spotlight from './shader/light/spotlight.glsl';

import * as main from './shader/basic.glsl';

import * as postprocess from './shader/postprocess/postprocess.glsl';

import * as translate from './shader/math/translate.glsl';

import * as sphIntersection from './shader/intersection/sphere.glsl';
import * as boxIntersection from './shader/intersection/box.glsl';

import * as randomVector from './shader/randomVector.glsl';

import { MeshGenerator } from './mesh';
import { Instance } from '../../types';
import { structs } from './shader/struct';

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

const uniforms = [
  'uniform vec2 uResolution;',
  'uniform float uTime;',
  'uniform int uFrame;',
  'uniform sampler2D uPixel;',
  'uniform vec3 uCameraPos;'
]

const maths = [
  translate
]

const lights = [
  spotlight
]

const effects = [
  schlick
]
export class ShaderCreator {
  private meshGenerator = new MeshGenerator();
  public create = (data: Set<Instance>, settings = {}) => {
    const meshes = this.meshGenerator.generate(data);
    const shaderArr = [
      ...prefix,
      ...defines,
      ...uniforms,
      ...structs,
      ...maths,
      randomVector,
      sphIntersection,
      boxIntersection,
      ...lights,
      ...effects,
      postprocess,
      ...meshes,
      main
    ];
    const shader = shaderArr.join('\n');
    console.log(shader)
    return shader;
  }
}