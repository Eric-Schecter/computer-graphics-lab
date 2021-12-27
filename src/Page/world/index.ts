import * as vertexShader from './shader/template/default.vert';
import * as fragmentShader from './shader/template/default.frag';
import * as renderFragmentShader from './shader/template/render.frag';
import { UniformData } from '../../types';
import { ComputeProgram, RenderProgram, FrameBufferHandler } from './program';
import { Store } from '../renderer/store';
import { Clock } from './clock';
import { TaskHandler } from './taskHandler';
import { SingleObserver, UFrame, UPixelCurrent, UPixelPre, USingleData } from './uniform';

export class World {
  private timer = 0;
  private gl: WebGL2RenderingContext | null = null;
  private renderProgram: RenderProgram;
  private computeProgram: ComputeProgram;
  private clock = new Clock();
  private frame = new UFrame(0);
  constructor(canvas: HTMLCanvasElement, private taskHandler: TaskHandler) {
    this.gl = canvas.getContext('webgl2');
    if (!this.gl) {
      throw new Error('create webgl failed');
    }
    const { width, height } = canvas;
    const resolution = new SingleObserver('uResolution', 'vec2', new USingleData([width, height]));
    const frame = new SingleObserver('uFrame', 'int', this.frame);
    const framebufferHandler = new FrameBufferHandler(this.gl, width, height);
    this.createComputeProgram(this.gl, framebufferHandler, resolution, frame);
    this.createRenderProgram(this.gl, resolution);
    this.draw();
  }
  private createComputeProgram = (gl: WebGL2RenderingContext, framebufferHandler: FrameBufferHandler, resolution: SingleObserver, frame: SingleObserver) => {
    this.computeProgram = new ComputeProgram(gl, framebufferHandler, vertexShader, fragmentShader);
    this.computeProgram.addParameter(new SingleObserver('uTime', 'float', new USingleData(0)));
    this.computeProgram.addParameter(frame);
    this.computeProgram.addParameter(new SingleObserver('uPixel', 'sampler2D', new UPixelPre(this.computeProgram)));
    this.computeProgram.addParameter(resolution);
  }
  private createRenderProgram = (gl: WebGL2RenderingContext, resolution: SingleObserver) => {
    this.renderProgram = new RenderProgram(gl, vertexShader, renderFragmentShader);
    this.renderProgram.addParameter(new SingleObserver('uPixel', 'vec2', new UPixelCurrent(this.computeProgram)));
    this.renderProgram.addParameter(resolution);
  }
  public destory = () => {
    cancelAnimationFrame(this.timer);
    this.computeProgram.destory();
    this.renderProgram.destory();
  }
  private draw = () => {
    this.clock.update();
    this.taskHandler.update(this.clock.delta, this.clock.now);
    // this.reset();
    this.renderProgram.update();

    this.timer = requestAnimationFrame(this.draw);
  }
  public reset = () => {
    this.frame.data = 0;
  }

  public updateShader = (store: Store) => {
    this.computeProgram.updateShader(store);
  }
  public updateParameter = (name: string, data: UniformData) => {
    this.computeProgram.updateParameter(name, data);
  }
}