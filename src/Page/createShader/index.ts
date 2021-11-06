import * as ray from './struct/ray.glsl';
import * as camera from './struct/camera.glsl';
import * as light from './struct/light.glsl';
import * as shape from './struct/shape.glsl';
import * as material from './struct/material.glsl';

import * as schlick from './effect/schlick.glsl';

import * as sdSphere from './sdf/sphere.glsl';
import * as sdPlane from './sdf/plane.glsl';

import * as spotlight from './light/spotlight.glsl';

import * as main from './basic.glsl';

import { MeshGenerator } from './mesh';
import { Instance } from '../types';

const defines = [
  '#define gl_FragColor pc_fragColor',
  '#define PI 3.14159265359',
  '#define GAMMA_FACTOR 2.2',
  '#define epsilon 1e-3',
  '#define saturate(x)clamp(x,0.,1.)',
]

const prefix = [
  '#version 300 es',
  'precision highp float;',
  'precision highp int;',
  'out highp vec4 pc_fragColor;'
]

const uniforms = [
  'uniform vec2 uResolution;',
  'uniform float uTime;',
]

const structs = [
  ray,
  camera,
  material,
  shape,
  light
]

const lights = [
  spotlight
]

const postprocess = [
  `vec3 postEffects(vec3 col,vec2 coord){
    col=pow(col,vec3(1./GAMMA_FACTOR));
    
    //Vignette
    col*=.5+.5*pow(16.*coord.x*coord.y*(1.-coord.x)*(1.-coord.y),.1);
    
    return col;
  }`,
]

const effects = [
  schlick
]

const sdfs = [
  sdPlane,
  sdSphere,
]

const meshGenerator = new MeshGenerator();

const createShader = (data: Set<Instance>, settings = {}) => {
  const meshes = meshGenerator.generate(data);
  const shaderArr = [
    ...prefix,
    ...defines,
    ...uniforms,
    ...structs,
    ...sdfs,
    ...lights,
    ...effects,
    ...postprocess,
    meshes,
    main
  ];
  return shaderArr.join('\n');
}

export { createShader };