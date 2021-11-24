import * as ray from './ray.glsl';
import * as camera from './camera.glsl';
import * as light from './light.glsl';
import * as shape from './shape.glsl';
import * as material from './material.glsl';
import * as sphere from './sphere.glsl';
import * as box from './box.glsl';
import * as hitinfo from './hitinfo.glsl';

export const structs = [
  ray,
  camera,
  hitinfo,
  // material,
  sphere,
  box,
  // shape,
  // light,
]