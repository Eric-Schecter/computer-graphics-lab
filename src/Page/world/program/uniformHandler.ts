//learn from threejs WebGLUniforms.js

import { UniformData } from "../../types";

type Setter = (data: number[] | WebGLTexture) => void;

export class UniformHandler {
  private table = new Map<string, Setter>();
  public init = (gl: WebGL2RenderingContext, program: WebGLProgram) => {
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(program, i);
      if (!info) { continue; }
      const { name, type } = info;
      console.log(info)
      const addr = gl.getUniformLocation(program, name);
      const setter = this.getPureArraySetter(gl, type, addr);
      if (setter) {
        this.table.set(name, setter);
      }
    }
  }
  private handleData = (data: UniformData) => {
    if (Array.isArray(data) || data instanceof WebGLTexture) {
      return data;
    }
    if (typeof data === 'number') {
      return [data];
    }
    return Object.values(data);
  }
  public update = (name: string, data: UniformData) => {
    const setter = this.table.get(name);
    if (setter) {
      setter(this.handleData(data));
    }
  }
  public getPureArraySetter(gl: WebGL2RenderingContext, type: number, addr: WebGLUniformLocation | null) {

    switch (type) {

      case gl.FLOAT: return (data: number[]) => gl.uniform1fv(addr, data);
      case gl.FLOAT_VEC2: return (data: number[]) => gl.uniform2fv(addr, data);
      case gl.FLOAT_VEC3: return (data: number[]) => gl.uniform3fv(addr, data);
      case gl.FLOAT_VEC4: return (data: number[]) => gl.uniform4fv(addr, data);

      // case gl.FLOAT_MAT2: return gl.uniformMatrix2fv;
      // case gl.FLOAT_MAT3: return gl.uniformMatrix3fv;
      // case gl.FLOAT_MAT4: return gl.uniformMatrix4fv;

      case gl.INT: case gl.BOOL: return (data: number[]) => gl.uniform1iv(addr, data);
      case gl.INT_VEC2: case gl.BOOL_VEC2: return (data: number[]) => gl.uniform2iv(addr, data);
      case gl.INT_VEC3: case gl.BOOL_VEC3: return (data: number[]) => gl.uniform3iv(addr, data);
      case gl.INT_VEC4: case gl.BOOL_VEC4: return (data: number[]) => gl.uniform4iv(addr, data);

      // case gl.UNSIGNED_INT: return gl.uniform1uiv;
      // case gl.UNSIGNED_INT_VEC2: return gl.uniform2uiv;
      // case gl.UNSIGNED_INT_VEC3: return gl.uniform3uiv;
      // case gl.UNSIGNED_INT_VEC4: return gl.uniform4uiv;

      case gl.SAMPLER_2D:
      case 0x8d66: // SAMPLER_EXTERNAL_OES
      case gl.INT_SAMPLER_2D:
      case gl.UNSIGNED_INT_SAMPLER_2D:
      case gl.SAMPLER_2D_SHADOW:
        return (data: WebGLTexture) => {
          gl.bindTexture(gl.TEXTURE_2D, data);
          gl.uniform1i(addr, 0); // todo dynamic location index and just set once 
        }

      // case gl.SAMPLER_CUBE:
      // case gl.INT_SAMPLER_CUBE:
      // case gl.UNSIGNED_INT_SAMPLER_CUBE:
      // case gl.SAMPLER_CUBE_SHADOW:
      //   return setValueT6Array;

    }
  }
}
