import * as vertexShader from './shader/template/default.vert';
import * as fragmentShader from './shader/template/default.frag';
import * as renderFragmentShader from './shader/template/render.frag';
import { UniformData } from '../../types';
import { ComputeProgram, RenderProgram } from './program';
import { Store } from '../renderer/store';
import { Clock } from './clock';
import { TaskHandler } from './taskHandler';

export class World {
  private timer = 0;
  private gl: WebGL2RenderingContext | null = null;
  private renderProgram: RenderProgram;
  private computeProgram: ComputeProgram;
  private clock = new Clock();
  constructor(canvas: HTMLCanvasElement, private taskHandler: TaskHandler) {
    this.gl = canvas.getContext('webgl2');
    if (!this.gl) {
      throw new Error('create webgl failed');
    }
    const { width, height } = canvas;
    this.computeProgram = new ComputeProgram(this.gl, width, height, vertexShader, fragmentShader);
    this.renderProgram = new RenderProgram(this.gl, width, height, vertexShader, renderFragmentShader, this.computeProgram);
    this.draw();
  }
  public destory = () => {
    cancelAnimationFrame(this.timer);
    this.computeProgram.destory();
    this.renderProgram.destory();
  }
  private draw = () => {
    this.clock.update();
    this.taskHandler.update(this.clock.delta,this.clock.now);
    // this.reset();
    this.renderProgram.update();

    this.timer = requestAnimationFrame(this.draw);
  }
  public reset = () => {
    this.computeProgram.reset();
  }

  public updateShader = (store: Store) => {
    this.computeProgram.updateShader(store);
  }
  public updateParameter = (name: string, data: UniformData) => {
    this.computeProgram.updateParameter(name, data);
  }
}