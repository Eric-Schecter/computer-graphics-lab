import { ComputeProgram } from './computeProgram';
import { Program } from "./program";
import { SingleObserver, USingleData, UPixelCurrent } from '../uniform';

export class RenderProgram extends Program {
  constructor(gl: WebGL2RenderingContext, width: number, height: number, vertex: string, fragment: string, program: ComputeProgram) {
    super(gl, vertex, fragment);
    this.addParameter(new SingleObserver('uPixel', 'vec2', new UPixelCurrent(program)));
    this.addParameter(new SingleObserver('uResolution', 'vec2', new USingleData([width, height])));
  }
}