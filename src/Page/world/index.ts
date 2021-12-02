import * as vertexShader from './shader/template/default.vert';
import * as fragmentShader from './shader/template/default.frag';
import * as renderFragmentShader from './shader/template/render.frag';
import { UniformData } from '../types';
import { ComputeProgram, RenderProgram } from './program';
import { Scene } from './scene';

export class World {
  private timer = 0;
  private gl: WebGL2RenderingContext | null = null;
  private renderProgram: RenderProgram;
  private computeProgram: ComputeProgram;
  constructor(canvas: HTMLCanvasElement) {
    this.gl = canvas.getContext('webgl2');
    if (!this.gl) {
      console.log('create webgl failed');
      return;
    }
    const { width, height } = canvas;
    this.computeProgram = new ComputeProgram(this.gl, width, height, vertexShader, fragmentShader);
    this.renderProgram = new RenderProgram(this.gl, width, height, vertexShader, renderFragmentShader, this.computeProgram);
    this.draw();
  }
  public stop = () => {
    cancelAnimationFrame(this.timer);
  }
  public destory = () => {
    this.stop();
    if (this.gl) {
      this.computeProgram.destory();
      this.renderProgram.destory();
    }
  }
  private draw = () => {
    this.renderProgram.update();
    this.timer = requestAnimationFrame(this.draw);
  }

  public updateShader = (scene: Scene) => {
    this.computeProgram.updateShader(scene);
  }
  public updateParameter = (name: string, data: UniformData) => {
    this.computeProgram.updateParameter(name, data);
  }
}