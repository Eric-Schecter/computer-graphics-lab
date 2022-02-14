import { USingleData } from "../uniform";
import { Program } from "./program";

export class RenderProgram extends Program {
  constructor(gl: WebGL2RenderingContext, vertex: string, fragment: string, size: USingleData<number[]>) {
    super(gl, vertex, fragment, size);
  }
}