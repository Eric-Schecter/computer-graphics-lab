import { Program } from "./program";

export class RenderProgram extends Program {
  constructor(gl: WebGL2RenderingContext, vertex: string, fragment: string) {
    super(gl, vertex, fragment);
  }
}