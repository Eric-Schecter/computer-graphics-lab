import * as schlick from './shader/effect/schlick.glsl';

import * as spotlight from './shader/light/spotlight.glsl';

import * as main from './shader/basic.glsl';

import * as postprocess from './shader/postprocess/postprocess.glsl';

import { MeshGenerator } from './mesh';
import { Instance } from '../types';
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
]

const lights = [
  spotlight
]

const effects = [
  schlick
]

const meshGenerator = new MeshGenerator();

const createShader = (data: Set<Instance>, settings = {}) => {
  const meshes = meshGenerator.generate(data);
  const shaderArr = [
    ...prefix,
    ...defines,
    ...uniforms,
    ...structs,
    ...lights,
    ...effects,
    postprocess,
    meshes,
    main
  ];
  return shaderArr.join('\n');
}

export { createShader };