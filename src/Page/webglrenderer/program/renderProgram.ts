import { UpdaterKeep } from "../uniform";
import { Program } from "./program";

export class RenderProgram extends Program {
  constructor(gl: WebGL2RenderingContext, vertex: string, fragment: string, size: UpdaterKeep) {
    super(gl, vertex, fragment, size);
  }
}