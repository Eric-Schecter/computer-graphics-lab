//learn from threejs WebGLUniforms.js

import { UniformDataType } from "../../../types";
import { UpdateInfo } from "./updateinfo";

type Setter = (data: UniformDataType) => void;

export class UniformHandler {
  private table = new Map<string, Setter>();
  private textureID = -1;
  private isTexture = (gl: WebGL2RenderingContext, type: number) => {
    return type === gl.SAMPLER_2D
      || type === 0x8d66
      || type === gl.INT_SAMPLER_2D
      || type === gl.UNSIGNED_INT_SAMPLER_2D
      || type === gl.SAMPLER_2D_SHADOW
  }
  public init = (gl: WebGL2RenderingContext, program: WebGLProgram) => {
    const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < count; i++) {
      const info = gl.getActiveUniform(program, i);
      if (!info) { continue; }
      const { name, type } = info;
      const addr = gl.getUniformLocation(program, name);
      if (this.isTexture(gl, type)) {
        this.textureID++;
      }
      const setter = this.getPureArraySetter(gl, type, addr, this.textureID);
      if (setter) {
        this.table.set(name, setter)
      }
    }
  }
  private handleData = (data: UniformDataType) => {
    if (Array.isArray(data) || data instanceof WebGLTexture) {
      return data;
    }
    if (typeof data === 'number') {
      return [data];
    }
    return Object.values(data);
  }
  public update = ({ name, updater }: UpdateInfo) => {
    const setter = this.table.get(name);
    if (setter) {
      setter(this.handleData(updater.update()));
    }
  }
  public getPureArraySetter(gl: WebGL2RenderingContext, type: number, addr: WebGLUniformLocation | null, textureID: number) {
    switch (type) {
      case gl.FLOAT: return (data: number[]) => gl.uniform1fv(addr, data);
      case gl.FLOAT_VEC2: return (data: number[]) => gl.uniform2fv(addr, data);
      case gl.FLOAT_VEC3: return (data: number[]) => gl.uniform3fv(addr, data);
      case gl.FLOAT_VEC4: return (data: number[]) => gl.uniform4fv(addr, data);

      case gl.FLOAT_MAT2: return (data: number[]) => gl.uniformMatrix2fv(addr, false, data);
      case gl.FLOAT_MAT3: return (data: number[]) => gl.uniformMatrix3fv(addr, false, data);
      case gl.FLOAT_MAT4: return (data: number[]) => gl.uniformMatrix4fv(addr, false, data);

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
        return (texture: WebGLTexture) => {
          gl.activeTexture(gl.TEXTURE0 + textureID);
          gl.uniform1i(addr, textureID);
          gl.bindTexture(gl.TEXTURE_2D, texture);
        }

      // case gl.SAMPLER_CUBE:
      // case gl.INT_SAMPLER_CUBE:
      // case gl.UNSIGNED_INT_SAMPLER_CUBE:
      // case gl.SAMPLER_CUBE_SHADOW:
      //   return setValueT6Array;

    }
  }
}
