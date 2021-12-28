import * as vertexShader from './shader/template/default.vert';
import * as fragmentShader from './shader/template/default.frag';
import * as renderFragmentShader from './shader/template/render.frag';
import { UniformData } from '../../types';
import { ComputeProgram, RenderProgram, FrameBufferHandler } from './program';
import { Store } from '../reactrenderer/store';
import { TaskHandler } from './taskHandler';
import { SingleObserver, UFrame, UPixelCurrent, UPixelPre, USingleData, UClock } from './uniform';
import { Clock } from './clock';

export class World {
  private timer = 0;
  private gl: WebGL2RenderingContext | null = null;
  private renderProgram: RenderProgram;
  private computeProgram: ComputeProgram;
  private clock = new Clock();
  private frame = new UFrame(0);
  private size: USingleData<number[]>;
  constructor(canvas: HTMLCanvasElement, private taskHandler: TaskHandler) {
    this.gl = canvas.getContext('webgl2');
    if (!this.gl) {
      throw new Error('create webgl failed');
    }
    const { width, height } = canvas;
    this.addResizeEvent(canvas);
    this.size = new USingleData([width, height]);
    const framebufferHandler = new FrameBufferHandler(this.gl, this.size);
    this.createComputeProgram(this.gl, framebufferHandler);
    this.createRenderProgram(this.gl);
    this.draw();
  }
  private addResizeEvent = (canvas: HTMLCanvasElement) => {
    window.addEventListener('resize', () => {
      const { offsetWidth, offsetHeight } = canvas;
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
      this.size.data = [offsetWidth, offsetHeight];
      this.reset();
    })
  }
  private createComputeProgram = (gl: WebGL2RenderingContext, framebufferHandler: FrameBufferHandler) => {
    this.computeProgram = new ComputeProgram(gl, framebufferHandler, vertexShader, fragmentShader, this.size);
    this.computeProgram.addParameter(new SingleObserver('uTime', 'float', new UClock(this.clock)));
    this.computeProgram.addParameter(new SingleObserver('uFrame', 'int', this.frame));
    this.computeProgram.addParameter(new SingleObserver('uPixel', 'sampler2D', new UPixelPre(this.computeProgram)));
    this.computeProgram.addParameter(new SingleObserver('uResolution', 'vec2', this.size));
  }
  private createRenderProgram = (gl: WebGL2RenderingContext) => {
    this.renderProgram = new RenderProgram(gl, vertexShader, renderFragmentShader, this.size);
    this.renderProgram.addParameter(new SingleObserver('uPixel', 'sampler2D', new UPixelCurrent(this.computeProgram)));
    this.renderProgram.addParameter(new SingleObserver('uResolution', 'vec2', this.size));
  }
  public destory = () => {
    cancelAnimationFrame(this.timer);
    this.computeProgram.destory();
    this.renderProgram.destory();
  }
  private draw = () => {
    this.clock.update();
    this.taskHandler.update(this.clock.delta, this.clock.now);
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